import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import { routing, type Locale } from './routing';
import { isLocale } from './config';

type MetaPage =
  | 'home'
  | 'about'
  | 'vision'
  | 'tech'
  | 'ecosystem'
  | 'careers'
  | 'blog'
  | 'press'
  | 'contact'
  | 'legal'
  | 'investors';

type ProductMetaKey = 'edu' | 'syntix' | 'pos' | 'hospitals' | 'fueloils';

function asLocale(locale: string): Locale {
  return isLocale(locale) ? locale : routing.defaultLocale;
}

/** Build absolute localized path, e.g. `/fr/about`. */
export function localePath(locale: string, path = ''): string {
  const normalized = path === '/' ? '' : path.replace(/\/$/, '');
  const suffix = normalized && !normalized.startsWith('/') ? `/${normalized}` : normalized;
  return `/${locale}${suffix}`;
}

/** Canonical + hreflang alternates for a public route. */
export function buildLocaleAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}${localePath(l, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${localePath(routing.defaultLocale, path)}`;

  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages,
  };
}

export async function buildPageMetadata(
  locale: string,
  page: MetaPage,
  path = '',
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace: 'meta' });
  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    alternates: buildLocaleAlternates(locale, path),
    openGraph: {
      title: t(`${page}.title`),
      description: t(`${page}.description`),
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === 'en' ? 'en_US' : 'fr_FR')),
      url: `${SITE_URL}${localePath(locale, path)}`,
      siteName: 'Okapi Edge',
      type: 'website',
    },
  };
}

export async function buildProductMetadata(
  locale: string,
  product: ProductMetaKey,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace: 'meta' });
  return {
    title: t(`products.${product}.title`),
    description: t(`products.${product}.description`),
    alternates: buildLocaleAlternates(locale, path),
    openGraph: {
      title: t(`products.${product}.title`),
      description: t(`products.${product}.description`),
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: `${SITE_URL}${localePath(locale, path)}`,
      siteName: 'Okapi Edge',
      type: 'website',
    },
  };
}

export async function buildBlogPostMetadata(
  locale: string,
  slug: string,
  post?: { title?: string; excerpt?: string } | null,
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace: 'meta' });
  const title = post?.title || t('blogPost.fallbackTitle');
  const description = post?.excerpt || t('blog.description');
  const path = `/blog/${slug}`;

  return {
    title,
    description,
    alternates: buildLocaleAlternates(locale, path),
    openGraph: {
      title,
      description,
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: `${SITE_URL}${localePath(locale, path)}`,
      siteName: 'Okapi Edge',
      type: 'article',
    },
  };
}

export type { Locale, MetaPage, ProductMetaKey };
