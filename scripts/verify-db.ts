/**
 * Verify Surreal Cloud connectivity + table counts.
 * Usage: pnpm db:verify
 */
import { resolve } from 'path';
import { config as loadEnv } from 'dotenv';
import { Surreal } from 'surrealdb';

loadEnv({ path: resolve(process.cwd(), '.env.local') });
loadEnv({ path: resolve(process.cwd(), '.env') });

function buildAuth(namespace: string, database: string, username: string, password: string) {
  const level = (process.env.SURREAL_AUTH_LEVEL ?? 'namespace').toLowerCase();
  if (level === 'root') return { username, password };
  if (level === 'database') return { namespace, database, username, password };
  return { namespace, username, password };
}

async function countOf(db: Surreal, table: string) {
  try {
    const [rows] = await db
      .query<[{ c: number }[]]>(`SELECT count() AS c FROM ${table} GROUP ALL`)
      .collect();
    return rows?.[0]?.c ?? 0;
  } catch {
    return -1;
  }
}

async function main() {
  const url = process.env.SURREAL_URL;
  const namespace = process.env.SURREAL_NAMESPACE!;
  const database = process.env.SURREAL_DATABASE!;
  const username = process.env.SURREAL_USER!;
  const password = process.env.SURREAL_PASS!;

  if (!url || !username || !password) {
    throw new Error('Missing SURREAL_* env in .env.local');
  }

  console.log(`Connecting → ${url}`);
  console.log(`NS/DB → ${namespace}/${database}`);
  console.log(`Auth → ${process.env.SURREAL_AUTH_LEVEL ?? 'namespace'} / ${username.slice(0, 4)}***`);

  const db = new Surreal();
  await db.connect(url, {
    namespace,
    database,
    authentication: buildAuth(namespace, database, username, password),
  });

  console.log('CONNECTED OK');

  const counts = {
    admin: await countOf(db, 'admin'),
    post: await countOf(db, 'post'),
    job: await countOf(db, 'job'),
    press: await countOf(db, 'press'),
    product: await countOf(db, 'product'),
    inquiry: await countOf(db, 'inquiry'),
    setting: await countOf(db, 'setting'),
  };
  console.log('COUNTS', JSON.stringify(counts, null, 2));

  const [byLocale] = await db
    .query<{ locale: string; c: number }[][]>(
      'SELECT locale, count() AS c FROM post GROUP BY locale',
    )
    .collect()
    .catch(() => [[]]);
  console.log('POSTS BY LOCALE', byLocale);

  await db.close();
  console.log('DONE');
}

main().catch((err) => {
  console.error('VERIFY FAILED', err);
  process.exit(1);
});
