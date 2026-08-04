import { SITE_NAME, SITE_URL, PRODUCT_ROUTES } from '@/lib/constants';
import { localePath } from '@/lib/i18n/metadata';
import type { BlogPost, JobOpening, SaasProduct, SiteContact } from '@/types';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DEFAULT_IMAGE = `${SITE_URL}/opengraph-image`;

export function organizationSchema(contact?: SiteContact | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description:
      'Okapi Edge builds enterprise application platforms and artificial intelligence systems for modern organizations.',
    email: contact?.email || 'contact@okapiedge.com',
    telephone: contact?.phone || undefined,
    address: contact
      ? {
          '@type': 'PostalAddress',
          streetAddress: [contact.addressLine1, contact.addressLine2].filter(Boolean).join(', '),
          addressLocality: contact.locationShort,
        }
      : undefined,
    sameAs: [] as string[],
  };
}

export function websiteSchema(locale: string) {
  const home = `${SITE_URL}${localePath(locale, '/')}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale === 'en' ? 'en-US' : 'fr-FR',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${home}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(
  locale: string,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${localePath(locale, item.path)}`,
    })),
  };
}

export function softwareApplicationSchema(
  locale: string,
  product: SaasProduct,
) {
  const path = PRODUCT_ROUTES[product.id] ?? '/ecosystem';
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: product.description || product.tagline,
    url: `${SITE_URL}${localePath(locale, path)}`,
    image: DEFAULT_IMAGE,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
      description: 'Enterprise licensing — contact sales',
    },
    provider: { '@id': ORG_ID },
    keywords: product.tags?.join(', '),
  };
}

export function blogPostingSchema(locale: string, post: BlogPost) {
  const url = `${SITE_URL}${localePath(locale, `/blog/${post.slug}`)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image || '/opengraph-image'}`,
    datePublished: guessIsoDate(post.date),
    dateModified: guessIsoDate(post.date),
    author: {
      '@type': 'Person',
      name: post.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGE,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    inLanguage: locale === 'en' ? 'en-US' : 'fr-FR',
    url,
  };
}

export function jobPostingSchema(locale: string, job: JobOpening) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: [job.summary, ...(job.responsibilities || [])].filter(Boolean).join('\n'),
    datePosted: new Date().toISOString().slice(0, 10),
    employmentType: mapEmploymentType(job.type),
    hiringOrganization: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
    url: `${SITE_URL}${localePath(locale, '/careers')}`,
  };
}

function mapEmploymentType(type: string) {
  const t = type.toLowerCase();
  if (t.includes('stage') || t.includes('intern')) return 'INTERN';
  if (t.includes('contrat') || t.includes('cdi') || t.includes('full')) return 'FULL_TIME';
  if (t.includes('part')) return 'PART_TIME';
  if (t.includes('temp') || t.includes('cdd')) return 'TEMPORARY';
  return 'FULL_TIME';
}

/** Best-effort parse of display dates like "12 mars 2026" / "Mar 12, 2026". */
function guessIsoDate(label: string): string {
  const parsed = Date.parse(label);
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
  return new Date().toISOString();
}
