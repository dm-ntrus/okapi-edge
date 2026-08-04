import { setRequestLocale } from 'next-intl/server';
import { CareersPage } from '@/components/pages/CareersPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDynamicJobs } from '@/lib/content/dynamic';
import { buildPageMetadata } from '@/lib/i18n/metadata';
import { breadcrumbSchema, jobPostingSchema } from '@/lib/seo/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'careers', '/careers');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jobs = await getDynamicJobs(locale);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ]),
          ...jobs.slice(0, 20).map((job) => jobPostingSchema(locale, job)),
        ]}
      />
      <CareersPage jobs={jobs} />
    </>
  );
}
