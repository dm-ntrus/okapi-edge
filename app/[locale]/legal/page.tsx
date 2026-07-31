import { setRequestLocale } from 'next-intl/server';
import { LegalPage } from '@/components/pages/LegalPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Mentions Légales',
    description: 'Mentions légales et politique de confidentialité Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage />;
}
