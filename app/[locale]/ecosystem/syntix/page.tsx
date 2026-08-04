import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SyntixPharmaDetailPage } from '@/components/pages/SyntixPharmaDetailPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDynamicProduct } from '@/lib/content/dynamic';
import { buildProductMetadata } from '@/lib/i18n/metadata';
import { breadcrumbSchema, softwareApplicationSchema } from '@/lib/seo/schema';

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
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(locale, product),
          breadcrumbSchema(locale, [
            { name: 'Home', path: '/' },
            { name: 'Ecosystem', path: '/ecosystem' },
            { name: product.name, path: '/ecosystem/syntix' },
          ]),
        ]}
      />
      <SyntixPharmaDetailPage product={product} />
    </>
  );
}
