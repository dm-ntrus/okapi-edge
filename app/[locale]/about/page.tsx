import { setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/components/pages/AboutPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'À propos',
    description: 'Histoire, équipe et manifeste d’Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage />;
}
