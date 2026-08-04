import { Suspense } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { getLocaleDir } from '@/lib/i18n/config';
import { getSiteContact } from '@/lib/content/dynamic';
import { SiteShell } from '@/components/layout/SiteShell';
import { DocumentLocale } from '@/components/layout/DocumentLocale';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, contact] = await Promise.all([getMessages(), getSiteContact(locale)]);
  const dir = getLocaleDir(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Sync <html lang> ASAP for crawlers that execute minimal JS */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dir)};document.documentElement.dataset.locale=${JSON.stringify(locale)};`,
        }}
      />
      <DocumentLocale locale={locale} />
      <JsonLd data={[organizationSchema(contact), websiteSchema(locale)]} />
      <div lang={locale} dir={dir} className="min-h-dvh">
        <Suspense fallback={null}>
          <SiteShell contact={contact}>{children}</SiteShell>
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}
