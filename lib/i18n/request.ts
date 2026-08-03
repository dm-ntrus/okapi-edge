import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getLocaleTag } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'fr' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Dynamic JSON import — keep in sync with messages/{locale}.json
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Africa/Kinshasa',
    now: new Date(),
    // Used by next-intl formatters when available
    formats: {
      dateTime: {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
      },
      number: {
        precise: { maximumFractionDigits: 2 },
        currency: { style: 'currency', currency: 'USD' },
      },
    },
    getMessageFallback({ namespace, key }) {
      const path = [namespace, key].filter(Boolean).join('.');
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n] Missing message: ${locale}.${path}`);
      }
      return path;
    },
  };
});

// Re-export for consumers that need BCP-47 tags alongside request config
export { getLocaleTag };
