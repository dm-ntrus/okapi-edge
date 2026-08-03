import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { OkapiEduDetailPage } from '@/components/pages/OkapiEduDetailPage';
import { getDynamicProduct } from '@/lib/content/dynamic';
import { buildProductMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildProductMetadata(locale, 'edu', '/ecosystem/edu');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('okapi-edu', locale);
  if (!product) notFound();
  return <OkapiEduDetailPage product={product} />;
}
