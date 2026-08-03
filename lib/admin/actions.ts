'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getDb } from '@/lib/db/client';
import { createIn, deleteId, mergeId, q } from '@/lib/db/ops';
import { canWrite, requireSession } from '@/lib/auth/session';
import { createInquiry } from '@/lib/db/queries';
import { recordId } from '@/lib/db/types';

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

/* ─── Team ─── */

export async function upsertTeamAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const id = String(formData.get('id') || '');
  const image = String(formData.get('image') || '').trim();
  const linkedin = String(formData.get('linkedin') || '').trim();
  const twitter = String(formData.get('twitter') || '').trim();
  const data: Record<string, unknown> = {
    locale: localeOf(formData),
    key: String(formData.get('key') || '').trim(),
    name: String(formData.get('name') || '').trim(),
    role: String(formData.get('role') || '').trim(),
    bio: String(formData.get('bio') || '').trim(),
    image: image || undefined,
    linkedin: linkedin || undefined,
    twitter: twitter || undefined,
    sort_order: Number(formData.get('sort_order') || 0),
    published: formData.get('published') === 'on',
    updated_at: new Date().toISOString(),
  };
  if (!data.key || !data.name) throw new Error('KEY_NAME_REQUIRED');
  if (id) await mergeId(db, id, data);
  else await createIn(db, 'team', data);
  revalidatePublic();
}

export async function deleteTeamAction(id: string) {
  await assertEditor();
  await deleteId(await getDb(), id);
  revalidatePublic();
}

/* ─── Contact settings ─── */

export async function upsertContactSettingAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const value = {
    email: String(formData.get('email') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    sales_email: String(formData.get('sales_email') || '').trim(),
    press_email: String(formData.get('press_email') || '').trim(),
    security_email: String(formData.get('security_email') || '').trim(),
    location_short: {
      fr: String(formData.get('location_short_fr') || '').trim(),
      en: String(formData.get('location_short_en') || '').trim(),
    },
    hq: {
      fr: {
        title: String(formData.get('hq_title_fr') || '').trim(),
        address_line1: String(formData.get('address_line1_fr') || '').trim(),
        address_line2: String(formData.get('address_line2_fr') || '').trim(),
      },
      en: {
        title: String(formData.get('hq_title_en') || '').trim(),
        address_line1: String(formData.get('address_line1_en') || '').trim(),
        address_line2: String(formData.get('address_line2_en') || '').trim(),
      },
    },
  };
  if (!value.email) throw new Error('EMAIL_REQUIRED');

  const [rows] = await q<[{ id: unknown }[]]>(
    db,
    'SELECT id FROM setting WHERE key = $key LIMIT 1',
    { key: 'site.contact' },
  );
  const existingId = rows?.[0]?.id ? recordId(rows[0].id) : '';

  if (existingId) {
    await mergeId(db, existingId, { value, updated_at: new Date().toISOString() });
  } else {
    await createIn(db, 'setting', {
      key: 'site.contact',
      value,
      updated_at: new Date().toISOString(),
    });
  }
  revalidatePublic();
}

/* ─── Legal settings ─── */

export async function upsertLegalSettingAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const str = (key: string) => String(formData.get(key) || '').trim();

  const value = {
    entity_type: str('entity_type') || 'etablissement',
    entity_label: {
      fr: str('entity_label_fr') || 'établissement',
      en: str('entity_label_en') || 'establishment',
    },
    registration: str('registration'),
    legal_name: str('legal_name') || 'Okapi Edge',
    header: {
      fr: {
        badge: str('badge_fr'),
        title: str('title_fr'),
        updated_at: str('updated_at_fr'),
      },
      en: {
        badge: str('badge_en'),
        title: str('title_en'),
        updated_at: str('updated_at_en'),
      },
    },
    sections: {
      publisher: {
        fr: {
          title: str('publisher_title_fr'),
          body: str('publisher_body_fr'),
          footer: str('publisher_footer_fr'),
        },
        en: {
          title: str('publisher_title_en'),
          body: str('publisher_body_en'),
          footer: str('publisher_footer_en'),
        },
      },
      hosting: {
        fr: { title: str('hosting_title_fr'), body: str('hosting_body_fr') },
        en: { title: str('hosting_title_en'), body: str('hosting_body_en') },
      },
      data: {
        fr: { title: str('data_title_fr'), body: str('data_body_fr') },
        en: { title: str('data_title_en'), body: str('data_body_en') },
      },
      ip: {
        fr: { title: str('ip_title_fr'), body: str('ip_body_fr') },
        en: { title: str('ip_title_en'), body: str('ip_body_en') },
      },
    },
  };

  if (!value.legal_name) throw new Error('LEGAL_NAME_REQUIRED');

  const [rows] = await q<[{ id: unknown }[]]>(
    db,
    'SELECT id FROM setting WHERE key = $key LIMIT 1',
    { key: 'site.legal' },
  );
  const existingId = rows?.[0]?.id ? recordId(rows[0].id) : '';

  if (existingId) {
    await mergeId(db, existingId, { value, updated_at: new Date().toISOString() });
  } else {
    await createIn(db, 'setting', {
      key: 'site.legal',
      value,
      updated_at: new Date().toISOString(),
    });
  }
  revalidatePublic();
}

/* ─── About settings ─── */

export async function upsertAboutSettingAction(formData: FormData) {
  await assertEditor();
  const db = await getDb();
  const str = (key: string) => String(formData.get(key) || '').trim();

  const timeline = Array.from({ length: 6 })
    .map((_, i) => ({
      year: str(`timeline_year_${i}`),
      fr: str(`timeline_fr_${i}`),
      en: str(`timeline_en_${i}`),
    }))
    .filter((item) => item.year || item.fr || item.en);

  const value = {
    hero: {
      fr: {
        eyebrow: str('hero_eyebrow_fr'),
        title: str('hero_title_fr'),
        description: str('hero_description_fr'),
      },
      en: {
        eyebrow: str('hero_eyebrow_en'),
        title: str('hero_title_en'),
        description: str('hero_description_en'),
      },
    },
    history: {
      fr: {
        eyebrow: str('history_eyebrow_fr'),
        title: str('history_title_fr'),
        body1: str('history_body1_fr'),
        body2: str('history_body2_fr'),
      },
      en: {
        eyebrow: str('history_eyebrow_en'),
        title: str('history_title_en'),
        body1: str('history_body1_en'),
        body2: str('history_body2_en'),
      },
    },
    timeline,
    governance: {
      fr: {
        eyebrow: str('governance_eyebrow_fr'),
        title: str('governance_title_fr'),
        description: str('governance_description_fr'),
        hq_label: str('governance_hq_label_fr'),
      },
      en: {
        eyebrow: str('governance_eyebrow_en'),
        title: str('governance_title_en'),
        description: str('governance_description_en'),
        hq_label: str('governance_hq_label_en'),
      },
    },
    ambition: {
      fr: {
        title: str('ambition_title_fr'),
        description: str('ambition_description_fr'),
        cta: str('ambition_cta_fr'),
      },
      en: {
        title: str('ambition_title_en'),
        description: str('ambition_description_en'),
        cta: str('ambition_cta_en'),
      },
    },
  };

  if (!value.hero.fr.title || !value.hero.en.title) throw new Error('ABOUT_TITLE_REQUIRED');

  const [rows] = await q<[{ id: unknown }[]]>(
    db,
    'SELECT id FROM setting WHERE key = $key LIMIT 1',
    { key: 'site.about' },
  );
  const existingId = rows?.[0]?.id ? recordId(rows[0].id) : '';

  if (existingId) {
    await mergeId(db, existingId, { value, updated_at: new Date().toISOString() });
  } else {
    await createIn(db, 'setting', {
      key: 'site.about',
      value,
      updated_at: new Date().toISOString(),
    });
  }
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
