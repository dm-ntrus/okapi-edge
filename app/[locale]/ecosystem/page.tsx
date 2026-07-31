import { setRequestLocale } from 'next-intl/server';
import { EcosystemPage } from '@/components/pages/EcosystemPage';
import { getDynamicProducts } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Solutions & Plateformes',
    description: 'Écosystème SaaS Okapi Edge : Edu, Syntix, POS, Hospitals, FuelOils.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getDynamicProducts(locale);
  return <EcosystemPage products={products} />;
}
