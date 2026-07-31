import { setRequestLocale } from 'next-intl/server';
import { ContactB2bPage } from '@/components/pages/ContactB2bPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Contact B2B',
    description: 'Contactez Okapi Edge pour partenariats et projets entreprise.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactB2bPage />;
}
