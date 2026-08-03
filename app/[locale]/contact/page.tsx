import { setRequestLocale } from 'next-intl/server';
import { ContactB2bPage } from '@/components/pages/ContactB2bPage';
import { buildPageMetadata } from '@/lib/i18n/metadata';
import { getSiteContact } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'contact', '/contact');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const contact = await getSiteContact(locale);
  return <ContactB2bPage contact={contact} />;
}
