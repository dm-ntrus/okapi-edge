import { setRequestLocale } from 'next-intl/server';
import { LegalPage } from '@/components/pages/LegalPage';
import { buildPageMetadata } from '@/lib/i18n/metadata';
import { getSiteLegal } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'legal', '/legal');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const legal = await getSiteLegal(locale);
  return <LegalPage legal={legal} />;
}
