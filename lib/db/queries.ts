import { withDb } from '@/lib/db/client';
import { createIn, q } from '@/lib/db/ops';
import type {
  InquiryRecord,
  JobRecord,
  PostRecord,
  PressRecord,
  ProductRecord,
  SettingRecord,
  TeamRecord,
} from '@/lib/db/types';
import { serializeRow, serializeRows } from '@/lib/db/types';

export type ContentLocale = 'fr' | 'en';

function normalizeLocale(locale?: string): ContentLocale {
  return locale === 'en' ? 'en' : 'fr';
}

export async function listPublishedPosts(locale?: string) {
  const loc = normalizeLocale(locale);
  return withDb(async (db) => {
    const [rows] = await q<[PostRecord[]]>(
      db,
      'SELECT * FROM post WHERE published = true AND locale = $locale ORDER BY created_at DESC',
      { locale: loc },
    );
    return serializeRows(rows ?? []);
  });
}

export async function listAllPosts() {
  return withDb(async (db) => {
    const [rows] = await q<[PostRecord[]]>(
      db,
      'SELECT * FROM post ORDER BY locale ASC, created_at DESC',
    );
    return serializeRows(rows ?? []);
  });
}

export async function getPostBySlug(slug: string, locale?: string) {
  const loc = normalizeLocale(locale);
  return withDb(async (db) => {
    const [rows] = await q<[PostRecord[]]>(
      db,
      'SELECT * FROM post WHERE slug = $slug AND locale = $locale AND published = true LIMIT 1',
      { slug, locale: loc },
    );
    const row = rows?.[0];
    return row ? serializeRow(row) : null;
  });
}

export async function listPublishedJobs(locale?: string) {
  const loc = normalizeLocale(locale);
  return withDb(async (db) => {
    const [rows] = await q<[JobRecord[]]>(
      db,
      'SELECT * FROM job WHERE published = true AND locale = $locale ORDER BY created_at DESC',
      { locale: loc },
    );
    return serializeRows(rows ?? []);
  });
}

export async function listAllJobs() {
  return withDb(async (db) => {
    const [rows] = await q<[JobRecord[]]>(
      db,
      'SELECT * FROM job ORDER BY locale ASC, created_at DESC',
    );
    return serializeRows(rows ?? []);
  });
}

export async function listPublishedPress(locale?: string) {
  const loc = normalizeLocale(locale);
  return withDb(async (db) => {
    const [rows] = await q<[PressRecord[]]>(
      db,
      'SELECT * FROM press WHERE published = true AND locale = $locale ORDER BY created_at DESC',
      { locale: loc },
    );
    return serializeRows(rows ?? []);
  });
}

export async function listAllPress() {
  return withDb(async (db) => {
    const [rows] = await q<[PressRecord[]]>(
      db,
      'SELECT * FROM press ORDER BY locale ASC, created_at DESC',
    );
    return serializeRows(rows ?? []);
  });
}

export async function listPublishedProducts(locale?: string) {
  const loc = normalizeLocale(locale);
  return withDb(async (db) => {
    const [rows] = await q<[ProductRecord[]]>(
      db,
      'SELECT * FROM product WHERE published = true AND locale = $locale ORDER BY sort_order ASC',
      { locale: loc },
    );
    return serializeRows(rows ?? []);
  });
}

export async function listAllProducts() {
  return withDb(async (db) => {
    const [rows] = await q<[ProductRecord[]]>(
      db,
      'SELECT * FROM product ORDER BY locale ASC, sort_order ASC',
    );
    return serializeRows(rows ?? []);
  });
}

export async function listPublishedTeam(locale?: string) {
  const loc = normalizeLocale(locale);
  return withDb(async (db) => {
    const [rows] = await q<[TeamRecord[]]>(
      db,
      'SELECT * FROM team WHERE published = true AND locale = $locale ORDER BY sort_order ASC',
      { locale: loc },
    );
    return serializeRows(rows ?? []);
  });
}

export async function listAllTeam() {
  return withDb(async (db) => {
    const [rows] = await q<[TeamRecord[]]>(
      db,
      'SELECT * FROM team ORDER BY locale ASC, sort_order ASC',
    );
    return serializeRows(rows ?? []);
  });
}

export async function getSetting(key: string) {
  return withDb(async (db) => {
    const [rows] = await q<[SettingRecord[]]>(
      db,
      'SELECT * FROM setting WHERE key = $key LIMIT 1',
      { key },
    );
    const row = rows?.[0];
    return row ? serializeRow(row) : null;
  });
}

export async function listSettings() {
  return withDb(async (db) => {
    const [rows] = await q<[SettingRecord[]]>(
      db,
      'SELECT * FROM setting ORDER BY key ASC',
    );
    return serializeRows(rows ?? []);
  });
}

export async function listInquiries() {
  return withDb(async (db) => {
    const [rows] = await q<[InquiryRecord[]]>(
      db,
      'SELECT * FROM inquiry ORDER BY created_at DESC LIMIT 200',
    );
    return serializeRows(rows ?? []);
  });
}

export async function createInquiry(
  data: Omit<InquiryRecord, 'id' | 'created_at' | 'updated_at' | 'status'> & {
    status?: InquiryRecord['status'];
  },
) {
  return withDb(async (db) => {
    const payload: Record<string, unknown> = {
      kind: data.kind,
      full_name: data.full_name,
      email: data.email,
      status: data.status ?? 'new',
    };
    if (data.locale) payload.locale = data.locale;
    if (data.organization) payload.organization = data.organization;
    if (data.phone) payload.phone = data.phone;
    if (data.interest) payload.interest = data.interest;
    if (data.message) payload.message = data.message;
    if (data.meta) payload.meta = data.meta;

    const row = await createIn(db, 'inquiry', payload);
    return row ? serializeRow(row as InquiryRecord) : null;
  });
}

export async function getAdminStats() {
  return withDb(async (db) => {
    const [[posts], [jobs], [press], [products], [team], [inquiries]] = await Promise.all([
      q<[{ count: number }[]]>(db, 'SELECT count() AS count FROM post GROUP ALL'),
      q<[{ count: number }[]]>(db, 'SELECT count() AS count FROM job GROUP ALL'),
      q<[{ count: number }[]]>(db, 'SELECT count() AS count FROM press GROUP ALL'),
      q<[{ count: number }[]]>(db, 'SELECT count() AS count FROM product GROUP ALL'),
      q<[{ count: number }[]]>(db, 'SELECT count() AS count FROM team GROUP ALL'),
      q<[{ count: number }[]]>(
        db,
        "SELECT count() AS count FROM inquiry WHERE status = 'new' GROUP ALL",
      ),
    ]);
    return {
      posts: Number(posts?.[0]?.count ?? 0),
      jobs: Number(jobs?.[0]?.count ?? 0),
      press: Number(press?.[0]?.count ?? 0),
      products: Number(products?.[0]?.count ?? 0),
      team: Number(team?.[0]?.count ?? 0),
      newInquiries: Number(inquiries?.[0]?.count ?? 0),
    };
  });
}
