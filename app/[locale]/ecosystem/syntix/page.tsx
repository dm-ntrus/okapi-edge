import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SyntixPharmaDetailPage } from '@/components/pages/SyntixPharmaDetailPage';
import { getDynamicProduct } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Syntix Pharma',
    description: 'Plateforme pharmaceutique Syntix Pharma.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('syntix-pharma', locale);
  if (!product) notFound();
  return <SyntixPharmaDetailPage product={product} />;
}
