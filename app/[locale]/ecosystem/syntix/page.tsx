import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SyntixPharmaDetailPage } from '@/components/pages/SyntixPharmaDetailPage';
import { getDynamicProduct } from '@/lib/content/dynamic';
import { buildProductMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildProductMetadata(locale, 'syntix', '/ecosystem/syntix');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('syntix-pharma', locale);
  if (!product) notFound();
  return <SyntixPharmaDetailPage product={product} />;
}
