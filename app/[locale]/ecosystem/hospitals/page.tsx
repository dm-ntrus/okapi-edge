import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { OkapiHospitalsDetailPage } from '@/components/pages/OkapiHospitalsDetailPage';
import { getDynamicProduct } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Okapi Hospitals',
    description: 'Plateforme hospitalière Okapi Hospitals.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('okapi-hospitals', locale);
  if (!product) notFound();
  return <OkapiHospitalsDetailPage product={product} />;
}
