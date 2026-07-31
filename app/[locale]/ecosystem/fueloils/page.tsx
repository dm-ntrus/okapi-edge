import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { OkapiFuelOilsDetailPage } from '@/components/pages/OkapiFuelOilsDetailPage';
import { getDynamicProduct } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Okapi FuelOils',
    description: 'Plateforme FuelOils Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('okapi-fueloils', locale);
  if (!product) notFound();
  return <OkapiFuelOilsDetailPage product={product} />;
}
