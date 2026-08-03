import { setRequestLocale } from 'next-intl/server';
import { VisionImpactPage } from '@/components/pages/VisionImpactPage';
import { buildPageMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'vision', '/vision');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VisionImpactPage />;
}
