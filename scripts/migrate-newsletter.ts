/**
 * Apply newsletter schema + migrate inquiry(kind=newsletter) → newsletter_subscriber.
 * Usage: pnpm exec tsx scripts/migrate-newsletter.ts
 */
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { config as loadEnv } from 'dotenv';
import { randomBytes } from 'crypto';
import { Surreal } from 'surrealdb';

loadEnv({ path: resolve(process.cwd(), '.env.local') });
loadEnv({ path: resolve(process.cwd(), '.env') });

function token() {
  return randomBytes(24).toString('hex');
}

async function main() {
  const url = process.env.SURREAL_URL!;
  const namespace = process.env.SURREAL_NAMESPACE!;
  const database = process.env.SURREAL_DATABASE!;
  const username = process.env.SURREAL_USER!;
  const password = process.env.SURREAL_PASS!;

  const db = new Surreal();
  await db.connect(url, {
    namespace,
    database,
    authentication: { namespace, username, password },
  });

  console.log('Applying newsletter schema…');
  const schema = readFileSync(resolve(process.cwd(), 'surreal/schema.surql'), 'utf8');
  // Apply only newsletter-related DEFINE statements by running full schema (IF NOT EXISTS)
  await db.query(schema).collect();
  console.log('Schema applied.');

  const [inquiries] = await db
    .query<{ email: string; full_name?: string; locale?: string; id: unknown }[][]>(
      "SELECT id, email, full_name, locale FROM inquiry WHERE kind = 'newsletter'",
    )
    .collect();

  let migrated = 0;
  let skipped = 0;
  for (const row of inquiries ?? []) {
    const email = String(row.email || '')
      .toLowerCase()
      .trim();
    if (!email) continue;

    const [existing] = await db
      .query<{ id: unknown }[][]>(
        'SELECT id FROM newsletter_subscriber WHERE email = $email LIMIT 1',
        { email },
      )
      .collect();

    if (existing?.length) {
      skipped += 1;
      continue;
    }

    await db
      .query(
        `CREATE newsletter_subscriber CONTENT {
          email: $email,
          full_name: $full_name,
          locale: $locale,
          status: 'active',
          source: 'migration',
          tags: ['migrated'],
          confirm_token: $confirm_token,
          unsubscribe_token: $unsubscribe_token,
          confirmed_at: time::now(),
          unsubscribed_at: NONE
        }`,
        {
          email,
          full_name: row.full_name || email.split('@')[0],
          locale: row.locale === 'en' ? 'en' : 'fr',
          confirm_token: token(),
          unsubscribe_token: token(),
        },
      )
      .collect();
    migrated += 1;
  }

  console.log(`Migrated ${migrated} subscribers (${skipped} already present).`);
  await db.close();
  console.log('DONE');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
