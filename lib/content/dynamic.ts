import {
  BLOG_POSTS,
  JOB_OPENINGS,
  PRESS_RELEASES,
  SAAS_PRODUCTS,
} from '@/content/mock-data';
import {
  listPublishedJobs,
  listPublishedPosts,
  listPublishedPress,
  listPublishedProducts,
  getPostBySlug,
} from '@/lib/db/queries';
import type { BlogPost, JobOpening, PressRelease, SaasProduct } from '@/types';

function normalizeLocale(locale?: string) {
  return locale === 'en' ? 'en' : 'fr';
}

export async function getDynamicPosts(locale?: string): Promise<BlogPost[]> {
  const loc = normalizeLocale(locale);
  const rows = await listPublishedPosts(loc);
  if (!rows?.length) {
    return loc === 'en' ? BLOG_POSTS : BLOG_POSTS;
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
