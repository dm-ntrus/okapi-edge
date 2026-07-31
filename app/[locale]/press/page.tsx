import { setRequestLocale } from 'next-intl/server';
import { PressPage } from '@/components/pages/PressPage';
import { getDynamicPress } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Espace Presse',
    description: 'Communiqués et actualités Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = await getDynamicPress(locale);
  return <PressPage items={items} />;
}
