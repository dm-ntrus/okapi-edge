import { setRequestLocale } from 'next-intl/server';
import { VisionImpactPage } from '@/components/pages/VisionImpactPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Vision & Engagements',
    description: 'Vision, manifeste et engagements d’Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VisionImpactPage />;
}
