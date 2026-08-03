import { routing, type Locale } from './routing';

/** BCP 47 tags used for Intl / metadata (distinct from URL locale codes). */
export const LOCALE_TAGS: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
};

/** Text direction per locale — ready for RTL locales later. */
export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
};

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export function getLocaleDir(locale: string): 'ltr' | 'rtl' {
  return isLocale(locale) ? LOCALE_DIR[locale] : 'ltr';
}

export function getLocaleTag(locale: string): string {
  return isLocale(locale) ? LOCALE_TAGS[locale] : LOCALE_TAGS[routing.defaultLocale];
}
