import { setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/components/pages/AboutPage';
import { buildPageMetadata } from '@/lib/i18n/metadata';
import { getDynamicTeam, getSiteAbout } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'about', '/about');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [about, team] = await Promise.all([getSiteAbout(locale), getDynamicTeam(locale)]);
  return <AboutPage about={about} team={team} />;
}
