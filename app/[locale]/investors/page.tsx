import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/pages/HomePage';
import { getDynamicProducts } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Espace Investisseurs',
    description: 'Relations investisseurs et dossier confidentiel Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getDynamicProducts(locale);
  return <HomePage products={products} />;
}
