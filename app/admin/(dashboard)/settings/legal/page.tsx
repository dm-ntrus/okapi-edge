import { getSetting } from '@/lib/db/queries';
import { DEFAULT_SITE_LEGAL } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { LegalSettingsForm } from '@/components/admin/LegalSettingsForm';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function str(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function sectionLocale(
  sections: Record<string, unknown> | null,
  id: string,
  locale: 'fr' | 'en',
) {
  const section = asRecord(sections?.[id]);
  return asRecord(section?.[locale]) ?? asRecord(section?.fr) ?? asRecord(section?.en);
}

export default async function AdminLegalSettingsPage() {
  const setting = await getSetting('site.legal');
  const value = asRecord(setting?.value);
  const header = asRecord(value?.header);
  const headerFr = asRecord(header?.fr);
  const headerEn = asRecord(header?.en);
  const sections = asRecord(value?.sections);
  const publisherFr = sectionLocale(sections, 'publisher', 'fr');
  const publisherEn = sectionLocale(sections, 'publisher', 'en');
  const hostingFr = sectionLocale(sections, 'hosting', 'fr');
  const hostingEn = sectionLocale(sections, 'hosting', 'en');
  const dataFr = sectionLocale(sections, 'data', 'fr');
  const dataEn = sectionLocale(sections, 'data', 'en');
  const ipFr = sectionLocale(sections, 'ip', 'fr');
  const ipEn = sectionLocale(sections, 'ip', 'en');

  const values = {
    legalName: str(value?.legal_name ?? value?.legalName, DEFAULT_SITE_LEGAL.legalName),
    entityType: str(value?.entity_type ?? value?.entityType, DEFAULT_SITE_LEGAL.entityType),
    entityLabelFr: str(asRecord(value?.entity_label ?? value?.entityLabel)?.fr, DEFAULT_SITE_LEGAL.entityLabel.fr),
    entityLabelEn: str(asRecord(value?.entity_label ?? value?.entityLabel)?.en, DEFAULT_SITE_LEGAL.entityLabel.en),
    registration: str(value?.registration, DEFAULT_SITE_LEGAL.registration),
    badgeFr: str(headerFr?.badge, DEFAULT_SITE_LEGAL.header.fr.badge),
    badgeEn: str(headerEn?.badge, DEFAULT_SITE_LEGAL.header.en.badge),
    titleFr: str(headerFr?.title, DEFAULT_SITE_LEGAL.header.fr.title),
    titleEn: str(headerEn?.title, DEFAULT_SITE_LEGAL.header.en.title),
    updatedAtFr: str(
      headerFr?.updated_at ?? headerFr?.updatedAt,
      DEFAULT_SITE_LEGAL.header.fr.updatedAt,
    ),
    updatedAtEn: str(
      headerEn?.updated_at ?? headerEn?.updatedAt,
      DEFAULT_SITE_LEGAL.header.en.updatedAt,
    ),
    publisherTitleFr: str(publisherFr?.title, DEFAULT_SITE_LEGAL.sections.publisher.fr.title),
    publisherTitleEn: str(publisherEn?.title, DEFAULT_SITE_LEGAL.sections.publisher.en.title),
    publisherBodyFr: str(publisherFr?.body, DEFAULT_SITE_LEGAL.sections.publisher.fr.body),
    publisherBodyEn: str(publisherEn?.body, DEFAULT_SITE_LEGAL.sections.publisher.en.body),
    publisherFooterFr: str(publisherFr?.footer, DEFAULT_SITE_LEGAL.sections.publisher.fr.footer),
    publisherFooterEn: str(publisherEn?.footer, DEFAULT_SITE_LEGAL.sections.publisher.en.footer),
    hostingTitleFr: str(hostingFr?.title, DEFAULT_SITE_LEGAL.sections.hosting.fr.title),
    hostingTitleEn: str(hostingEn?.title, DEFAULT_SITE_LEGAL.sections.hosting.en.title),
    hostingBodyFr: str(hostingFr?.body, DEFAULT_SITE_LEGAL.sections.hosting.fr.body),
    hostingBodyEn: str(hostingEn?.body, DEFAULT_SITE_LEGAL.sections.hosting.en.body),
    dataTitleFr: str(dataFr?.title, DEFAULT_SITE_LEGAL.sections.data.fr.title),
    dataTitleEn: str(dataEn?.title, DEFAULT_SITE_LEGAL.sections.data.en.title),
    dataBodyFr: str(dataFr?.body, DEFAULT_SITE_LEGAL.sections.data.fr.body),
    dataBodyEn: str(dataEn?.body, DEFAULT_SITE_LEGAL.sections.data.en.body),
    ipTitleFr: str(ipFr?.title, DEFAULT_SITE_LEGAL.sections.ip.fr.title),
    ipTitleEn: str(ipEn?.title, DEFAULT_SITE_LEGAL.sections.ip.en.title),
    ipBodyFr: str(ipFr?.body, DEFAULT_SITE_LEGAL.sections.ip.fr.body),
    ipBodyEn: str(ipEn?.body, DEFAULT_SITE_LEGAL.sections.ip.en.body),
  };

  return <LegalSettingsForm values={values} dbOk={isDbConfigured()} />;
}
