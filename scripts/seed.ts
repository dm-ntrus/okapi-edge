/**
 * Seed Surreal Cloud with complete bilingual enterprise content.
 * Usage: pnpm db:seed
 *        pnpm db:seed:force
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';
import { Surreal, Table } from 'surrealdb';
import { config as loadEnv } from 'dotenv';
import {
  SEED_INQUIRIES,
  SEED_JOBS,
  SEED_POSTS,
  SEED_PRESS,
  SEED_PRODUCTS,
  SEED_SETTINGS,
} from '../content/seed-enterprise';
import {
  EXTRA_JOBS,
  EXTRA_POSTS,
  EXTRA_PRESS,
  EXTRA_SETTINGS,
  SEED_TEAM,
} from '../content/seed-i18n-complete';

loadEnv({ path: resolve(process.cwd(), '.env.local') });
loadEnv({ path: resolve(process.cwd(), '.env') });

const FORCE = process.argv.includes('--force');

const ALL_POSTS = [...SEED_POSTS, ...EXTRA_POSTS];
const ALL_JOBS = [...SEED_JOBS, ...EXTRA_JOBS];
const ALL_PRESS = [...SEED_PRESS, ...EXTRA_PRESS];
const ALL_SETTINGS = [...SEED_SETTINGS, ...EXTRA_SETTINGS];

function buildAuth(namespace: string, database: string, username: string, password: string) {
  const level = (process.env.SURREAL_AUTH_LEVEL ?? 'namespace').toLowerCase();
  if (level === 'root') return { username, password };
  if (level === 'database') return { namespace, database, username, password };
  return { namespace, username, password };
}

async function countOf(db: Surreal, table: string) {
  try {
    const [rows] = await db
      .query<[{ count: number }[]]>(`SELECT count() AS count FROM ${table} GROUP ALL`)
      .collect();
    return rows?.[0]?.count ?? 0;
  } catch {
    return 0;
  }
}

async function createIn(db: Surreal, table: string, data: Record<string, unknown>) {
  await db.create(new Table(table)).content(data);
}

async function applySchema(db: Surreal) {
  const schema = readFileSync(resolve(process.cwd(), 'surreal/schema.surql'), 'utf8');
  for (const chunk of schema
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('--') && !s.startsWith('OPTION'))) {
    if (
      chunk.startsWith('DEFINE NAMESPACE') ||
      chunk.startsWith('DEFINE DATABASE') ||
      chunk.startsWith('USE ')
    ) {
      continue;
    }
    try {
      await db.query(`${chunk};`).collect();
    } catch (e) {
      console.warn('schema warn:', chunk.slice(0, 72), e instanceof Error ? e.message : e);
    }
  }
}

async function localeBreakdown(db: Surreal, table: string) {
  try {
    const [rows] = await db
      .query<{ locale: string; c: number }[][]>(
        `SELECT locale, count() AS c FROM ${table} GROUP BY locale`,
      )
      .collect();
    return rows ?? [];
  } catch {
    return [];
  }
}

async function main() {
  const url = process.env.SURREAL_URL;
  const namespace = process.env.SURREAL_NAMESPACE ?? 'okapi_edge_site';
  const database = process.env.SURREAL_DATABASE ?? 'okapi_edge_db';
  const username = process.env.SURREAL_USER;
  const password = process.env.SURREAL_PASS;

  if (!url || !username || !password) {
    throw new Error('Configure SURREAL_URL, SURREAL_USER et SURREAL_PASS dans .env.local');
  }

  console.log(`Connecting → ${url}`);
  console.log(`NS/DB → ${namespace}/${database}`);
  console.log(`Auth level → ${process.env.SURREAL_AUTH_LEVEL ?? 'namespace'}`);
  console.log(
    `Catalog → posts=${ALL_POSTS.length} jobs=${ALL_JOBS.length} press=${ALL_PRESS.length} products=${SEED_PRODUCTS.length} team=${SEED_TEAM.length}`,
  );

  const db = new Surreal();
  await db.connect(url, {
    namespace,
    database,
    authentication: buildAuth(namespace, database, username, password),
  });
  console.log('CONNECTED');

  await applySchema(db);
  console.log('SCHEMA applied');

  if (FORCE) {
    for (const table of ['post', 'job', 'press', 'product', 'inquiry', 'setting', 'team']) {
      try {
        await db.query(`DELETE ${table};`).collect();
        console.log(`Wiped ${table}`);
      } catch (e) {
        console.warn(`wipe ${table}:`, e instanceof Error ? e.message : e);
      }
    }
  }

  if (FORCE || (await countOf(db, 'post')) === 0) {
    for (const post of ALL_POSTS) {
      const { image, seo_title, seo_description, ...rest } = post;
      await createIn(db, 'post', {
        ...rest,
        ...(image ? { image } : {}),
        ...(seo_title ? { seo_title } : {}),
        ...(seo_description ? { seo_description } : {}),
      });
    }
    console.log(`Seeded ${ALL_POSTS.length} posts (FR+EN)`);
  } else {
    console.log(`Skip posts (existing=${await countOf(db, 'post')}) — use --force`);
  }

  if (FORCE || (await countOf(db, 'job')) === 0) {
    for (const job of ALL_JOBS) await createIn(db, 'job', job);
    console.log(`Seeded ${ALL_JOBS.length} jobs (FR+EN)`);
  } else {
    console.log(`Skip jobs (existing=${await countOf(db, 'job')}) — use --force`);
  }

  if (FORCE || (await countOf(db, 'press')) === 0) {
    for (const item of ALL_PRESS) {
      const { download_url, ...rest } = item;
      await createIn(db, 'press', {
        ...rest,
        ...(download_url ? { download_url } : {}),
      });
    }
    console.log(`Seeded ${ALL_PRESS.length} press (FR+EN)`);
  } else {
    console.log(`Skip press (existing=${await countOf(db, 'press')}) — use --force`);
  }

  if (FORCE || (await countOf(db, 'product')) === 0) {
    for (const p of SEED_PRODUCTS) await createIn(db, 'product', p);
    console.log(`Seeded ${SEED_PRODUCTS.length} products (FR+EN)`);
  } else {
    console.log(`Skip products (existing=${await countOf(db, 'product')}) — use --force`);
  }

  if (FORCE || (await countOf(db, 'team')) === 0) {
    for (const member of SEED_TEAM) {
      const { image, ...rest } = member;
      await createIn(db, 'team', {
        ...rest,
        ...(image ? { image } : {}),
      });
    }
    console.log(`Seeded ${SEED_TEAM.length} team members (FR+EN)`);
  } else {
    console.log(`Skip team (existing=${await countOf(db, 'team')}) — use --force`);
  }

  if (FORCE || (await countOf(db, 'inquiry')) === 0) {
    for (const item of SEED_INQUIRIES) await createIn(db, 'inquiry', item);
    console.log(`Seeded ${SEED_INQUIRIES.length} sample inquiries`);
  }

  if (FORCE || (await countOf(db, 'setting')) === 0) {
    for (const s of ALL_SETTINGS) await createIn(db, 'setting', s);
    console.log(`Seeded ${ALL_SETTINGS.length} settings`);
  }

  if ((await countOf(db, 'admin')) === 0) {
    const email = (process.env.ADMIN_EMAIL ?? 'admin@okapiedge.com').toLowerCase();
    const pass = process.env.ADMIN_PASSWORD ?? 'ChangeMeNow!2026';
    await createIn(db, 'admin', {
      email,
      name: process.env.ADMIN_NAME ?? 'Okapi Owner',
      password_hash: await bcrypt.hash(pass, 12),
      role: 'owner',
    });
    console.log(`Created admin ${email}`);
  } else {
    console.log(`Admin exists (count=${await countOf(db, 'admin')})`);
  }

  const summary = {
    admin: await countOf(db, 'admin'),
    post: await countOf(db, 'post'),
    job: await countOf(db, 'job'),
    press: await countOf(db, 'press'),
    product: await countOf(db, 'product'),
    team: await countOf(db, 'team'),
    inquiry: await countOf(db, 'inquiry'),
    setting: await countOf(db, 'setting'),
  };
  console.log('FINAL COUNTS', summary);
  console.log('POSTS BY LOCALE', await localeBreakdown(db, 'post'));
  console.log('JOBS BY LOCALE', await localeBreakdown(db, 'job'));
  console.log('PRODUCTS BY LOCALE', await localeBreakdown(db, 'product'));
  console.log('TEAM BY LOCALE', await localeBreakdown(db, 'team'));

  await db.close();
  console.log('Seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
