import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/pages/HomePage';
import { getDynamicProducts } from '@/lib/content/dynamic';
import { buildPageMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'home', '/');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getDynamicProducts(locale);
  return <HomePage products={products} />;
}
