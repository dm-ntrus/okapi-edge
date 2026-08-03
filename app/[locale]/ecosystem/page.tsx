import { setRequestLocale } from 'next-intl/server';
import { EcosystemPage } from '@/components/pages/EcosystemPage';
import { getDynamicProducts } from '@/lib/content/dynamic';
import { buildPageMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'ecosystem', '/ecosystem');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getDynamicProducts(locale);
  return <EcosystemPage products={products} />;
}
