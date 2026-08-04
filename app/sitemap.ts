import type { MetadataRoute } from 'next';
import { getDynamicPosts } from '@/lib/content/dynamic';
import { SITE_URL, STATIC_PATHS } from '@/lib/constants';
import { routing } from '@/lib/i18n/routing';
import { localePath } from '@/lib/i18n/metadata';

function languageAlternates(path: string): MetadataRoute.Sitemap[number]['alternates'] {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}${localePath(locale, path || '/')}`;
  }
  return { languages };
}

function parsePostDate(label: string): Date {
  const parsed = Date.parse(label);
  return Number.isNaN(parsed) ? new Date() : new Date(parsed);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const postsByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale,
      posts: await getDynamicPosts(locale),
    })),
  );

  for (const path of STATIC_PATHS) {
    const normalized = path || '/';
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, normalized)}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.startsWith('/ecosystem/') ? 0.8 : 0.7,
        alternates: languageAlternates(normalized),
      });
    }
  }

  // Deduplicate blog slugs across locales while keeping per-locale URLs
  const seen = new Set<string>();
  for (const { locale, posts } of postsByLocale) {
    for (const post of posts) {
      const key = `${locale}:${post.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const path = `/blog/${post.slug}`;
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: parsePostDate(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: languageAlternates(path),
      });
    }
  }

  return entries;
}
