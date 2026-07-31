import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/pages/HomePage';
import { getDynamicProducts } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: undefined });
  return {
    title: t('meta_home_title'),
    description: t('meta_home_description'),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getDynamicProducts(locale);
  return <HomePage products={products} />;
}
