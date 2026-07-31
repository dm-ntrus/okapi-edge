import { StringRecordId, Table, type Surreal } from 'surrealdb';

export async function q<T extends unknown[]>(
  db: Surreal,
  sql: string,
  bindings?: Record<string, unknown>,
): Promise<T> {
  return (await db.query(sql, bindings).collect()) as T;
}

export async function createIn<T extends Record<string, unknown>>(
  db: Surreal,
  table: string,
  data: T,
) {
  const result = await db.create<T>(new Table(table)).content(data).json();
  return (Array.isArray(result) ? result[0] : result) as T & { id: unknown };
}

export async function mergeId<T extends Record<string, unknown>>(
  db: Surreal,
  id: string,
  data: Partial<T>,
) {
  return db.update(new StringRecordId(id)).merge(data).json();
}

export async function deleteId(db: Surreal, id: string) {
  return db.delete(new StringRecordId(id)).json();
}
