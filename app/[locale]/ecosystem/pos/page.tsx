import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { OkapiPosDetailPage } from '@/components/pages/OkapiPosDetailPage';
import { getDynamicProduct } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Okapi POS',
    description: 'Point de vente Okapi POS.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('okapi-pos', locale);
  if (!product) notFound();
  return <OkapiPosDetailPage product={product} />;
}
