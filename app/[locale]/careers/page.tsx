import { setRequestLocale } from 'next-intl/server';
import { CareersPage } from '@/components/pages/CareersPage';
import { getDynamicJobs } from '@/lib/content/dynamic';
import { buildPageMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'careers', '/careers');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jobs = await getDynamicJobs(locale);
  return <CareersPage jobs={jobs} />;
}
