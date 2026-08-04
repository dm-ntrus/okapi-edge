import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
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

const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

function asLocale(locale: string): Locale {
  return isLocale(locale) ? locale : routing.defaultLocale;
}

function ogLocale(locale: string) {
  return locale === 'en' ? 'en_US' : 'fr_FR';
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

function socialFields(title: string, description: string, locale: string, path: string): Pick<
  Metadata,
  'openGraph' | 'twitter'
> {
  const url = `${SITE_URL}${localePath(locale, path)}`;
  return {
    openGraph: {
      title,
      description,
      locale: ogLocale(locale),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale(l)),
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export async function buildPageMetadata(
  locale: string,
  page: MetaPage,
  path = '',
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace: 'meta' });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const social = socialFields(title, description, locale, path);

  return {
    // Home title already includes the brand — avoid "Brand | Brand"
    title: page === 'home' ? { absolute: title } : title,
    description,
    alternates: buildLocaleAlternates(locale, path),
    ...social,
  };
}

export async function buildProductMetadata(
  locale: string,
  product: ProductMetaKey,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace: 'meta' });
  const title = t(`products.${product}.title`);
  const description = t(`products.${product}.description`);
  return {
    title,
    description,
    alternates: buildLocaleAlternates(locale, path),
    ...socialFields(title, description, locale, path),
  };
}

export async function buildBlogPostMetadata(
  locale: string,
  slug: string,
  post?: {
    title?: string;
    excerpt?: string;
    image?: string;
    author?: string;
    date?: string;
    seo_title?: string | null;
    seo_description?: string | null;
  } | null,
): Promise<Metadata> {
  const t = await getTranslations({ locale: asLocale(locale), namespace: 'meta' });
  const title = post?.seo_title || post?.title || t('blogPost.fallbackTitle');
  const description = post?.seo_description || post?.excerpt || t('blog.description');
  const path = `/blog/${slug}`;
  const url = `${SITE_URL}${localePath(locale, path)}`;
  const imageUrl = post?.image
    ? post.image.startsWith('http')
      ? post.image
      : `${SITE_URL}${post.image}`
    : OG_IMAGE.url;

  return {
    title,
    description,
    alternates: buildLocaleAlternates(locale, path),
    openGraph: {
      title,
      description,
      locale: ogLocale(locale),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale(l)),
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post?.date,
      authors: post?.author ? [post.author] : undefined,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export type { Locale, MetaPage, ProductMetaKey };
