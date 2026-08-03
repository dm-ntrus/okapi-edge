import { getSetting } from '@/lib/db/queries';
import { DEFAULT_SITE_CONTACT } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { ContactSettingsForm } from '@/components/admin/ContactSettingsForm';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function str(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

export default async function AdminContactSettingsPage() {
  const setting = await getSetting('site.contact');
  const value = asRecord(setting?.value);
  const hq = asRecord(value?.hq);
  const hqFr = asRecord(hq?.fr);
  const hqEn = asRecord(hq?.en);
  const loc = asRecord(value?.location_short);

  const values = {
    email: str(value?.email, DEFAULT_SITE_CONTACT.email),
    phone: str(value?.phone, DEFAULT_SITE_CONTACT.phone),
    salesEmail: str(value?.sales_email, DEFAULT_SITE_CONTACT.salesEmail),
    pressEmail: str(value?.press_email, DEFAULT_SITE_CONTACT.pressEmail),
    securityEmail: str(value?.security_email, DEFAULT_SITE_CONTACT.securityEmail),
    locationShortFr: str(loc?.fr, DEFAULT_SITE_CONTACT.locationShort.fr),
    locationShortEn: str(loc?.en, DEFAULT_SITE_CONTACT.locationShort.en),
    hqTitleFr: str(hqFr?.title, DEFAULT_SITE_CONTACT.hq.fr.title),
    hqTitleEn: str(hqEn?.title, DEFAULT_SITE_CONTACT.hq.en.title),
    addressLine1Fr: str(
      hqFr?.address_line1 ?? hqFr?.addressLine1,
      DEFAULT_SITE_CONTACT.hq.fr.addressLine1,
    ),
    addressLine1En: str(
      hqEn?.address_line1 ?? hqEn?.addressLine1,
      DEFAULT_SITE_CONTACT.hq.en.addressLine1,
    ),
    addressLine2Fr: str(
      hqFr?.address_line2 ?? hqFr?.addressLine2,
      DEFAULT_SITE_CONTACT.hq.fr.addressLine2,
    ),
    addressLine2En: str(
      hqEn?.address_line2 ?? hqEn?.addressLine2,
      DEFAULT_SITE_CONTACT.hq.en.addressLine2,
    ),
  };

  return <ContactSettingsForm values={values} dbOk={isDbConfigured()} />;
}
