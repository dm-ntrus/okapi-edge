export const SITE_NAME = 'Okapi Edge';
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://okapiedge.com';

export const PRODUCT_ROUTES: Record<string, string> = {
  'okapi-edu': '/ecosystem/edu',
  'syntix-pharma': '/ecosystem/syntix',
  'okapi-pos': '/ecosystem/pos',
  'okapi-hospitals': '/ecosystem/hospitals',
  'okapi-fueloils': '/ecosystem/fueloils',
};

export const STATIC_PATHS = [
  '',
  '/vision',
  '/about',
  '/tech-sovereignty',
  '/ecosystem',
  '/ecosystem/edu',
  '/ecosystem/syntix',
  '/ecosystem/pos',
  '/ecosystem/hospitals',
  '/ecosystem/fueloils',
  '/careers',
  '/press',
  '/contact',
  '/blog',
  '/legal',
  '/investors',
] as const;
