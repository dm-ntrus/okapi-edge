import { setRequestLocale } from 'next-intl/server';
import { CareersPage } from '@/components/pages/CareersPage';
import { getDynamicJobs } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Carrières',
    description: 'Rejoignez les équipes ingénierie et produit d’Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jobs = await getDynamicJobs(locale);
  return <CareersPage jobs={jobs} />;
}
