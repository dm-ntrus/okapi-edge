import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { OkapiHospitalsDetailPage } from '@/components/pages/OkapiHospitalsDetailPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDynamicProduct } from '@/lib/content/dynamic';
import { buildProductMetadata } from '@/lib/i18n/metadata';
import { breadcrumbSchema, softwareApplicationSchema } from '@/lib/seo/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildProductMetadata(locale, 'hospitals', '/ecosystem/hospitals');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const product = await getDynamicProduct('okapi-hospitals', locale);
  if (!product) notFound();
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(locale, product),
          breadcrumbSchema(locale, [
            { name: 'Home', path: '/' },
            { name: 'Ecosystem', path: '/ecosystem' },
            { name: product.name, path: '/ecosystem/hospitals' },
          ]),
        ]}
      />
      <OkapiHospitalsDetailPage product={product} />
    </>
  );
}
