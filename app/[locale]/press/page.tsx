import { setRequestLocale } from 'next-intl/server';
import { PressPage } from '@/components/pages/PressPage';
import { getDynamicPress } from '@/lib/content/dynamic';
import { buildPageMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'press', '/press');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = await getDynamicPress(locale);
  return <PressPage items={items} />;
}
