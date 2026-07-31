'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getDb } from '@/lib/db/client';
import { createIn, deleteId, mergeId } from '@/lib/db/ops';
import { canWrite, requireSession } from '@/lib/auth/session';
import { createInquiry } from '@/lib/db/queries';

async function assertEditor() {
  const session = await requireSession();
  if (!canWrite(session.role)) throw new Error('FORBIDDEN');
  return session;
}

function revalidatePublic() {
  revalidatePath('/', 'layout');
  revalidatePath('/admin', 'layout');
}

function localeOf(formData: FormData) {
  return String(formData.get('locale') || 'fr') === 'en' ? 'en' : 'fr';
}

function lines(value: FormDataEntryValue | null) {
  return String(value || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function csv(value: FormDataEntryValue | null) {
  return String(value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseMetrics(raw: string) {
  return lines(raw).map((line) => {
    const [label, value] = line.split('|').map((s) => s.trim());
    return { label: label || 'Metric', value: value || '' };
  });
}

function parseFeatures(raw: string) {
  return lines(raw).map((line) => {
    const [title, desc, icon] = line.split('|').map((s) => s.trim());
    return {
      title: title || 'Feature',
      desc: desc || '',
      icon: icon || 'Zap',
    };
  });
}

/* ─── Posts ─── */

export async function upsertPostAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const id = String(formData.get('id') || '');
  const image = String(formData.get('image') || '').trim();
  const data = {
    locale: localeOf(formData),
    title: String(formData.get('title') || '').trim(),
    slug: String(formData.get('slug') || '').trim(),
    category: String(formData.get('category') || 'Inside Okapi').trim(),
    author: String(formData.get('author') || 'Okapi Edge').trim(),
    date_label: String(formData.get('date_label') || '').trim(),
    read_time: String(formData.get('read_time') || '5 min').trim(),
    excerpt: String(formData.get('excerpt') || '').trim(),
    content: String(formData.get('content') || '').trim(),
    ...(image ? { image } : {}),
    tags: csv(formData.get('tags')),
    published: formData.get('published') === 'on',
    updated_at: new Date().toISOString(),
  };
  if (!data.title || !data.slug) throw new Error('TITLE_SLUG_REQUIRED');
  if (id) await mergeId(db, id, data);
  else await createIn(db, 'post', data);
  revalidatePublic();
}

export async function deletePostAction(id: string) {
  await assertEditor();
  await deleteId(await getDb(), id);
  revalidatePublic();
}

/* ─── Jobs ─── */

export async function upsertJobAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const id = String(formData.get('id') || '');
  const data = {
    locale: localeOf(formData),
    title: String(formData.get('title') || '').trim(),
    department: String(formData.get('department') || 'Produit').trim(),
    location: String(formData.get('location') || 'Remote').trim(),
    type: String(formData.get('type') || 'CDI').trim(),
    summary: String(formData.get('summary') || '').trim(),
    responsibilities: lines(formData.get('responsibilities')),
    requirements: lines(formData.get('requirements')),
    published: formData.get('published') === 'on',
    updated_at: new Date().toISOString(),
  };
  if (!data.title) throw new Error('TITLE_REQUIRED');
  if (id) await mergeId(db, id, data);
  else await createIn(db, 'job', data);
  revalidatePublic();
}

export async function deleteJobAction(id: string) {
  await assertEditor();
  await deleteId(await getDb(), id);
  revalidatePublic();
}

/* ─── Press ─── */

export async function upsertPressAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const id = String(formData.get('id') || '');
  const download = String(formData.get('download_url') || '').trim();
  const data = {
    locale: localeOf(formData),
    title: String(formData.get('title') || '').trim(),
    date_label: String(formData.get('date_label') || '').trim(),
    category: String(formData.get('category') || '').trim(),
    summary: String(formData.get('summary') || '').trim(),
    ...(download ? { download_url: download } : {}),
    published: formData.get('published') === 'on',
    updated_at: new Date().toISOString(),
  };
  if (!data.title) throw new Error('TITLE_REQUIRED');
  if (id) await mergeId(db, id, data);
  else await createIn(db, 'press', data);
  revalidatePublic();
}

/** @deprecated use upsertPressAction */
export async function createPressAction(formData: FormData) {
  return upsertPressAction(formData);
}

export async function deletePressAction(id: string) {
  await assertEditor();
  await deleteId(await getDb(), id);
  revalidatePublic();
}

/* ─── Products ─── */

export async function upsertProductAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const id = String(formData.get('id') || '');
  const data = {
    locale: localeOf(formData),
    key: String(formData.get('key') || '').trim(),
    name: String(formData.get('name') || '').trim(),
    subtitle: String(formData.get('subtitle') || '').trim(),
    tagline: String(formData.get('tagline') || '').trim(),
    category: String(formData.get('category') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    full_description: String(formData.get('full_description') || '').trim(),
    tags: csv(formData.get('tags')),
    metrics: parseMetrics(String(formData.get('metrics') || '')),
    features: parseFeatures(String(formData.get('features') || '')),
    subdomain_url: String(formData.get('subdomain_url') || '').trim(),
    badge: String(formData.get('badge') || '').trim(),
    color: String(formData.get('color') || '#22D3EE').trim(),
    bg_gradient: String(formData.get('bg_gradient') || 'from-slate-900 to-slate-950').trim(),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
    updated_at: new Date().toISOString(),
  };
  if (!data.key || !data.name) throw new Error('KEY_NAME_REQUIRED');
  if (id) await mergeId(db, id, data);
  else await createIn(db, 'product', data);
  revalidatePublic();
}

export async function deleteProductAction(id: string) {
  await assertEditor();
  await deleteId(await getDb(), id);
  revalidatePublic();
}

/* ─── Inquiries ─── */

export async function updateInquiryStatusAction(id: string, status: string) {
  await assertEditor();
  const allowed = ['new', 'in_progress', 'closed'] as const;
  if (!allowed.includes(status as (typeof allowed)[number])) {
    throw new Error('INVALID_STATUS');
  }
  await mergeId(await getDb(), id, { status, updated_at: new Date().toISOString() });
  revalidatePath('/admin/inquiries');
}

export async function deleteInquiryAction(id: string) {
  await assertEditor();
  await deleteId(await getDb(), id);
  revalidatePath('/admin/inquiries');
}

/* ─── Public forms ─── */

const publicInquirySchema = z.object({
  kind: z.enum(['b2b', 'investor', 'newsletter', 'career', 'contact']),
  locale: z.enum(['fr', 'en']).optional(),
  full_name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().optional(),
});

export async function submitPublicInquiryAction(input: z.infer<typeof publicInquirySchema>) {
  try {
    const data = publicInquirySchema.parse(input);
    const created = await createInquiry(data);
    if (!created) {
      return { ok: false as const, offline: true as const, error: 'Base indisponible. Réessayez plus tard.' };
    }
    return { ok: true as const, offline: false as const };
  } catch (error) {
    console.error('[inquiry]', error);
    return {
      ok: false as const,
      offline: false as const,
      error: error instanceof z.ZodError ? 'Données invalides.' : 'Envoi impossible.',
    };
  }
}
