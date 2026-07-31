/**
 * Try multiple Surreal Cloud auth strategies.
 */
import { resolve } from 'path';
import { config as loadEnv } from 'dotenv';
import { Surreal } from 'surrealdb';

loadEnv({ path: resolve(process.cwd(), '.env.local') });

const url = process.env.SURREAL_URL!;
const namespace = process.env.SURREAL_NAMESPACE!;
const database = process.env.SURREAL_DATABASE!;
const username = process.env.SURREAL_USER!;
const password = process.env.SURREAL_PASS!;

async function tryStrategy(name: string, fn: () => Promise<void>) {
  const db = new Surreal();
  try {
    await fn.call(null);
    // rebind - fn needs db. Rewrite differently.
  } catch {
    /* unused */
  }
  await db.close().catch(() => undefined);
}

async function main() {
  console.log({ url, namespace, database, username: username.slice(0, 6) + '***', passLen: password.length });

  const strategies: Array<{ name: string; run: (db: Surreal) => Promise<void> }> = [
    {
      name: 'connect+auth root',
      run: async (db) => {
        await db.connect(url, {
          namespace,
          database,
          authentication: { username, password },
        });
      },
    },
    {
      name: 'connect then signin root',
      run: async (db) => {
        await db.connect(url);
        await db.signin({ username, password });
        await db.use({ namespace, database });
      },
    },
    {
      name: 'connect then signin namespace',
      run: async (db) => {
        await db.connect(url);
        await db.signin({ namespace, username, password });
        await db.use({ namespace, database });
      },
    },
    {
      name: 'connect then signin database',
      run: async (db) => {
        await db.connect(url);
        await db.signin({ namespace, database, username, password });
      },
    },
    {
      name: 'connect+auth variables variables',
      run: async (db) => {
        await db.connect(url, {
          authentication: { username, password },
        });
        await db.use({ namespace, database });
      },
    },
    {
      name: 'https endpoint',
      run: async (db) => {
        const https = url.replace('wss://', 'https://');
        await db.connect(https, {
          namespace,
          database,
          authentication: { username, password },
        });
      },
    },
  ];

  for (const s of strategies) {
    const db = new Surreal();
    try {
      await s.run(db);
      const [rows] = await db.query<[{ c: number }[]]>('SELECT count() AS c FROM post GROUP ALL').collect();
      console.log(`OK [${s.name}] posts=${rows?.[0]?.c ?? 0}`);
      await db.close();
      return;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`FAIL [${s.name}] ${msg}`);
      await db.close().catch(() => undefined);
    }
  }

  process.exit(1);
}

main();
