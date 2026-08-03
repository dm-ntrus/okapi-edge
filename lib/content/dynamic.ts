import {
  BLOG_POSTS,
  DEFAULT_SITE_ABOUT,
  DEFAULT_SITE_CONTACT,
  DEFAULT_SITE_LEGAL,
  JOB_OPENINGS,
  PRESS_RELEASES,
  SAAS_PRODUCTS,
  TEAM_MEMBERS,
} from '@/content/mock-data';
import {
  listPublishedJobs,
  listPublishedPosts,
  listPublishedPress,
  listPublishedProducts,
  listPublishedTeam,
  getPostBySlug,
  getSetting,
} from '@/lib/db/queries';
import type {
  AboutTimelineItem,
  BlogPost,
  JobOpening,
  LegalSection,
  LegalSectionId,
  PressRelease,
  SaasProduct,
  SiteAbout,
  SiteContact,
  SiteLegal,
  TeamMember,
} from '@/types';

function normalizeLocale(locale?: string) {
  return locale === 'en' ? 'en' : 'fr';
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function localizedField(value: unknown, locale: 'fr' | 'en', fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  const obj = asRecord(value);
  if (!obj) return fallback;
  return asString(obj[locale], asString(obj.fr ?? obj.en, fallback));
}

export async function getDynamicPosts(locale?: string): Promise<BlogPost[]> {
  const loc = normalizeLocale(locale);
  const rows = await listPublishedPosts(loc);
  if (!rows?.length) {
    return BLOG_POSTS;
  }
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    category: r.category as BlogPost['category'],
    author: r.author,
    date: r.date_label,
    readTime: r.read_time,
    excerpt: r.excerpt,
    content: r.content,
    image: r.image ?? '',
    tags: r.tags ?? [],
  }));
}

export async function getDynamicPost(slug: string, locale?: string): Promise<BlogPost | null> {
  const loc = normalizeLocale(locale);
  const row = await getPostBySlug(slug, loc);
  if (row) {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category as BlogPost['category'],
      author: row.author,
      date: row.date_label,
      readTime: row.read_time,
      excerpt: row.excerpt,
      content: row.content,
      image: row.image ?? '',
      tags: row.tags ?? [],
    };
  }
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getDynamicJobs(locale?: string): Promise<JobOpening[]> {
  const loc = normalizeLocale(locale);
  const rows = await listPublishedJobs(loc);
  if (!rows?.length) return JOB_OPENINGS;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    department: r.department as JobOpening['department'],
    location: r.location,
    type: r.type,
    summary: r.summary,
    responsibilities: r.responsibilities ?? [],
    requirements: r.requirements ?? [],
  }));
}

export async function getDynamicPress(locale?: string): Promise<PressRelease[]> {
  const loc = normalizeLocale(locale);
  const rows = await listPublishedPress(loc);
  if (!rows?.length) return PRESS_RELEASES;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    date: r.date_label,
    category: r.category,
    summary: r.summary,
    downloadUrl: r.download_url ?? undefined,
  }));
}

export async function getDynamicProducts(locale?: string): Promise<SaasProduct[]> {
  const loc = normalizeLocale(locale);
  const rows = await listPublishedProducts(loc);
  if (!rows?.length) return SAAS_PRODUCTS;
  return rows.map((r) => ({
    id: r.key,
    name: r.name,
    subtitle: r.subtitle,
    tagline: r.tagline,
    category: r.category,
    description: r.description,
    fullDescription: r.full_description,
    tags: r.tags ?? [],
    metrics: r.metrics ?? [],
    features: r.features ?? [],
    subdomainUrl: r.subdomain_url,
    badge: r.badge,
    color: r.color,
    bgGradient: r.bg_gradient,
  }));
}

export async function getDynamicProduct(
  key: string,
  locale?: string,
): Promise<SaasProduct | null> {
  const products = await getDynamicProducts(locale);
  return products.find((p) => p.id === key) ?? null;
}

export async function getDynamicTeam(locale?: string): Promise<TeamMember[]> {
  const loc = normalizeLocale(locale);
  const rows = await listPublishedTeam(loc);
  if (!rows?.length) return TEAM_MEMBERS;
  return rows.map((r) => ({
    id: r.key || r.id,
    name: r.name,
    role: r.role,
    bio: r.bio,
    image: r.image ?? '',
    linkedin: r.linkedin ?? undefined,
    twitter: r.twitter ?? undefined,
  }));
}

export async function getSiteContact(locale?: string): Promise<SiteContact> {
  const loc = normalizeLocale(locale);
  const fallback: SiteContact = {
    email: DEFAULT_SITE_CONTACT.email,
    phone: DEFAULT_SITE_CONTACT.phone,
    locationShort: DEFAULT_SITE_CONTACT.locationShort[loc],
    salesEmail: DEFAULT_SITE_CONTACT.salesEmail,
    pressEmail: DEFAULT_SITE_CONTACT.pressEmail,
    securityEmail: DEFAULT_SITE_CONTACT.securityEmail,
    hqTitle: DEFAULT_SITE_CONTACT.hq[loc].title,
    addressLine1: DEFAULT_SITE_CONTACT.hq[loc].addressLine1,
    addressLine2: DEFAULT_SITE_CONTACT.hq[loc].addressLine2,
  };

  const setting = await getSetting('site.contact');
  const value = asRecord(setting?.value);
  if (!value) return fallback;

  const hqRoot = asRecord(value.hq);
  const hqLocale = asRecord(hqRoot?.[loc]) ?? asRecord(hqRoot?.fr) ?? asRecord(hqRoot?.en);
  const legacyHq = typeof value.hq === 'string' ? value.hq : '';

  return {
    email: asString(value.email, fallback.email),
    phone: asString(value.phone, fallback.phone),
    locationShort: localizedField(
      value.location_short,
      loc,
      fallback.locationShort || legacyHq,
    ),
    salesEmail: asString(value.sales_email, fallback.salesEmail),
    pressEmail: asString(value.press_email, fallback.pressEmail),
    securityEmail: asString(value.security_email, fallback.securityEmail),
    hqTitle: asString(hqLocale?.title, fallback.hqTitle),
    addressLine1: asString(
      hqLocale?.address_line1 ?? hqLocale?.addressLine1,
      fallback.addressLine1,
    ),
    addressLine2: asString(
      hqLocale?.address_line2 ?? hqLocale?.addressLine2,
      fallback.addressLine2,
    ),
  };
}

const LEGAL_SECTION_IDS: LegalSectionId[] = ['publisher', 'hosting', 'data', 'ip'];

function legalSectionFrom(
  sectionsRoot: Record<string, unknown> | null,
  id: LegalSectionId,
  locale: 'fr' | 'en',
): LegalSection {
  const fallback = DEFAULT_SITE_LEGAL.sections[id][locale] as {
    title: string;
    body: string;
    footer?: string;
  };
  const sectionRoot = asRecord(sectionsRoot?.[id]);
  const localized =
    asRecord(sectionRoot?.[locale]) ?? asRecord(sectionRoot?.fr) ?? asRecord(sectionRoot?.en);
  const footer = asString(localized?.footer, fallback.footer ?? '');
  return {
    id,
    title: asString(localized?.title, fallback.title),
    body: asString(localized?.body, fallback.body),
    ...(footer ? { footer } : {}),
  };
}

export async function getSiteLegal(locale?: string): Promise<SiteLegal> {
  const loc = normalizeLocale(locale);
  const fallbackHeader = DEFAULT_SITE_LEGAL.header[loc];
  const fallback: SiteLegal = {
    entityType: DEFAULT_SITE_LEGAL.entityType,
    entityLabel: DEFAULT_SITE_LEGAL.entityLabel[loc],
    registration: DEFAULT_SITE_LEGAL.registration,
    legalName: DEFAULT_SITE_LEGAL.legalName,
    badge: fallbackHeader.badge,
    title: fallbackHeader.title,
    updatedAt: fallbackHeader.updatedAt,
    sections: LEGAL_SECTION_IDS.map((id) => {
      const section = DEFAULT_SITE_LEGAL.sections[id][loc] as {
        title: string;
        body: string;
        footer?: string;
      };
      return {
        id,
        title: section.title,
        body: section.body,
        ...(section.footer ? { footer: section.footer } : {}),
      };
    }),
  };

  const setting = await getSetting('site.legal');
  const value = asRecord(setting?.value);
  if (!value) return fallback;

  const headerRoot = asRecord(value.header);
  const headerLocale =
    asRecord(headerRoot?.[loc]) ?? asRecord(headerRoot?.fr) ?? asRecord(headerRoot?.en);
  const sectionsRoot = asRecord(value.sections);
  const entityLabelRoot = asRecord(value.entity_label ?? value.entityLabel);

  return {
    entityType: asString(value.entity_type ?? value.entityType, fallback.entityType),
    entityLabel: localizedField(
      value.entity_label ?? value.entityLabel,
      loc,
      asString(entityLabelRoot?.[loc], fallback.entityLabel),
    ),
    registration: asString(value.registration, fallback.registration),
    legalName: asString(value.legal_name ?? value.legalName, fallback.legalName),
    badge: asString(headerLocale?.badge, fallback.badge),
    title: asString(headerLocale?.title, fallback.title),
    updatedAt: asString(
      headerLocale?.updated_at ?? headerLocale?.updatedAt,
      fallback.updatedAt,
    ),
    sections: LEGAL_SECTION_IDS.map((id) => legalSectionFrom(sectionsRoot, id, loc)),
  };
}

function localizedBlock(
  root: Record<string, unknown> | null,
  locale: 'fr' | 'en',
): Record<string, unknown> | null {
  if (!root) return null;
  return asRecord(root[locale]) ?? asRecord(root.fr) ?? asRecord(root.en);
}

export async function getSiteAbout(locale?: string): Promise<SiteAbout> {
  const loc = normalizeLocale(locale);
  const fallback: SiteAbout = {
    hero: { ...DEFAULT_SITE_ABOUT.hero[loc] },
    history: { ...DEFAULT_SITE_ABOUT.history[loc] },
    timeline: DEFAULT_SITE_ABOUT.timeline.map((item) => ({
      year: item.year,
      label: item[loc],
    })),
    governance: { ...DEFAULT_SITE_ABOUT.governance[loc] },
    ambition: { ...DEFAULT_SITE_ABOUT.ambition[loc] },
  };

  const setting = await getSetting('site.about');
  const value = asRecord(setting?.value);
  if (!value) return fallback;

  const hero = localizedBlock(asRecord(value.hero), loc);
  const history = localizedBlock(asRecord(value.history), loc);
  const governance = localizedBlock(asRecord(value.governance), loc);
  const ambition = localizedBlock(asRecord(value.ambition), loc);

  let timeline: AboutTimelineItem[] = fallback.timeline;
  if (Array.isArray(value.timeline) && value.timeline.length > 0) {
    timeline = value.timeline.map((raw, index) => {
      const item = asRecord(raw);
      const year = asString(item?.year, fallback.timeline[index]?.year ?? String(2024 + index));
      const label =
        asString(item?.[loc]) ||
        asString(item?.label) ||
        asString(item?.fr) ||
        asString(item?.en) ||
        fallback.timeline[index]?.label ||
        '';
      return { year, label };
    });
  }

  return {
    hero: {
      eyebrow: asString(hero?.eyebrow, fallback.hero.eyebrow),
      title: asString(hero?.title, fallback.hero.title),
      description: asString(hero?.description, fallback.hero.description),
    },
    history: {
      eyebrow: asString(history?.eyebrow, fallback.history.eyebrow),
      title: asString(history?.title, fallback.history.title),
      body1: asString(history?.body1, fallback.history.body1),
      body2: asString(history?.body2, fallback.history.body2),
    },
    timeline,
    governance: {
      eyebrow: asString(governance?.eyebrow, fallback.governance.eyebrow),
      title: asString(governance?.title, fallback.governance.title),
      description: asString(governance?.description, fallback.governance.description),
      hqLabel: asString(
        governance?.hq_label ?? governance?.hqLabel,
        fallback.governance.hqLabel,
      ),
    },
    ambition: {
      title: asString(ambition?.title, fallback.ambition.title),
      description: asString(ambition?.description, fallback.ambition.description),
      cta: asString(ambition?.cta, fallback.ambition.cta),
    },
  };
}
