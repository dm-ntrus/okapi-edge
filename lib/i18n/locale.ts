import { setRequestLocale as setNextIntlRequestLocale } from 'next-intl/server';
import { isLocale } from './config';
import { routing, type Locale } from './routing';

/** Narrow route `locale` param to a supported Locale (defaults to `fr`). */
export function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : routing.defaultLocale;
}

/** Type-safe wrapper around next-intl `setRequestLocale`. */
export function setRequestLocale(locale: string): Locale {
  const resolved = resolveLocale(locale);
  setNextIntlRequestLocale(resolved);
  return resolved;
}
