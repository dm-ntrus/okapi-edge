import { setRequestLocale } from 'next-intl/server';
import { TechSovereigntyPage } from '@/components/pages/TechSovereigntyPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Technologie & IA',
    description: 'Ingénierie edge, Zero-Trust et souveraineté technologique.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TechSovereigntyPage />;
}
