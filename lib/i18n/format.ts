import { getLocaleTag } from './config';

/** Locale-aware number formatting (counts, metrics). */
export function formatNumber(
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(getLocaleTag(locale), options).format(value);
}

/** Locale-aware date formatting. */
export function formatDate(
  value: string | number | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(getLocaleTag(locale), options).format(date);
}

/** Compact relative / short date for lists (blog, press, careers). */
export function formatShortDate(value: string | number | Date, locale: string): string {
  return formatDate(value, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Currency helper — defaults to USD; pass CDF when needed. */
export function formatCurrency(
  value: number,
  locale: string,
  currency = 'USD',
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(getLocaleTag(locale), {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}
