/**
 * Patch inquiry.kind ASSERT to include 'contact'.
 * Usage: pnpm exec tsx scripts/patch-inquiry-kind.ts
 */
import { resolve } from 'path';
import { config as loadEnv } from 'dotenv';
import { Surreal } from 'surrealdb';

loadEnv({ path: resolve(process.cwd(), '.env.local') });
loadEnv({ path: resolve(process.cwd(), '.env') });

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

  await db
    .query(
      `DEFINE FIELD OVERWRITE kind ON inquiry TYPE string DEFAULT 'b2b'
       ASSERT $value IN ['b2b', 'investor', 'newsletter', 'career', 'contact'];`,
    )
    .collect();

  console.log('inquiry.kind ASSERT updated (contact included)');
  await db.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
