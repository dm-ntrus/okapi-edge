import { Surreal } from 'surrealdb';

const globalForSurreal = globalThis as unknown as {
  __oeSurreal?: Surreal;
  __oeSurrealReady?: Promise<Surreal>;
  __oeSurrealKey?: string;
};

function env(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

export function isDbConfigured() {
  return Boolean(process.env.SURREAL_URL?.trim());
}

function connectionKey() {
  return [
    process.env.SURREAL_URL,
    process.env.SURREAL_NAMESPACE,
    process.env.SURREAL_DATABASE,
    process.env.SURREAL_USER,
  ].join('|');
}

/**
 * Surreal Cloud namespace users need `{ namespace, username, password }`.
 * Root users use `{ username, password }` only.
 * Set SURREAL_AUTH_LEVEL=root|namespace|database (default: namespace for Cloud).
 */
function buildAuth(namespace: string, database: string, username: string, password: string) {
  const level = (process.env.SURREAL_AUTH_LEVEL ?? 'namespace').toLowerCase();
  if (level === 'root') return { username, password };
  if (level === 'database') return { namespace, database, username, password };
  return { namespace, username, password };
}

export async function getDb(): Promise<Surreal> {
  if (!isDbConfigured()) {
    throw new Error('SURREAL_URL is not configured');
  }

  const key = connectionKey();
  if (globalForSurreal.__oeSurreal && globalForSurreal.__oeSurrealKey === key) {
    return globalForSurreal.__oeSurreal;
  }

  if (globalForSurreal.__oeSurreal) {
    try {
      await globalForSurreal.__oeSurreal.close();
    } catch {
      /* ignore */
    }
    globalForSurreal.__oeSurreal = undefined;
    globalForSurreal.__oeSurrealReady = undefined;
  }

  if (!globalForSurreal.__oeSurrealReady) {
    globalForSurreal.__oeSurrealReady = (async () => {
      const db = new Surreal();
      const url = env('SURREAL_URL');
      const namespace = env('SURREAL_NAMESPACE', 'okapi_edge_site');
      const database = env('SURREAL_DATABASE', 'okapi_edge_db');
      const username = env('SURREAL_USER');
      const password = env('SURREAL_PASS');

      await db.connect(url, {
        namespace,
        database,
        authentication: buildAuth(namespace, database, username, password),
      });

      globalForSurreal.__oeSurreal = db;
      globalForSurreal.__oeSurrealKey = key;
      return db;
    })();
  }

  return globalForSurreal.__oeSurrealReady;
}

export async function withDb<T>(fn: (db: Surreal) => Promise<T>): Promise<T | null> {
  if (!isDbConfigured()) return null;
  try {
    const db = await getDb();
    return await fn(db);
  } catch (error) {
    console.error('[surreal]', error);
    return null;
  }
}
