export type AdminRole = 'owner' | 'editor' | 'viewer';
export type ContentLocale = 'fr' | 'en';

export type AdminRecord = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: AdminRole;
  created_at?: string;
  updated_at?: string;
};

export type PostRecord = {
  id: string;
  locale: ContentLocale;
  title: string;
  slug: string;
  category: string;
  author: string;
  date_label: string;
  read_time: string;
  excerpt: string;
  content: string;
  image?: string | null;
  tags: string[];
  published: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type JobRecord = {
  id: string;
  locale: ContentLocale;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PressRecord = {
  id: string;
  locale: ContentLocale;
  title: string;
  date_label: string;
  category: string;
  summary: string;
  download_url?: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProductRecord = {
  id: string;
  locale: ContentLocale;
  key: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string;
  full_description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: { title: string; desc: string; icon: string }[];
  subdomain_url: string;
  badge: string;
  color: string;
  bg_gradient: string;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type InquiryKind = 'b2b' | 'investor' | 'newsletter' | 'career' | 'contact';
export type InquiryStatus = 'new' | 'in_progress' | 'closed';

export type TeamRecord = {
  id: string;
  locale: ContentLocale;
  key: string;
  name: string;
  role: string;
  bio: string;
  image?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SettingRecord = {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at?: string;
};

/** Normalized public contact / HQ payload (locale-resolved). */
export type SiteContactInfo = {
  email: string;
  phone: string;
  locationShort: string;
  salesEmail: string;
  pressEmail: string;
  securityEmail: string;
  hqTitle: string;
  addressLine1: string;
  addressLine2: string;
};

export type InquiryRecord = {
  id: string;
  kind: InquiryKind;
  locale?: ContentLocale | null;
  full_name: string;
  organization?: string | null;
  email: string;
  phone?: string | null;
  interest?: string | null;
  message?: string | null;
  meta?: Record<string, unknown>;
  status: InquiryStatus;
  created_at?: string;
  updated_at?: string;
};

export type NewsletterSubscriberStatus = 'pending' | 'active' | 'unsubscribed' | 'bounced';
export type NewsletterSubscriberSource = 'footer' | 'admin' | 'import' | 'migration';

export type NewsletterSubscriberRecord = {
  id: string;
  email: string;
  full_name?: string | null;
  locale: ContentLocale;
  status: NewsletterSubscriberStatus;
  source: NewsletterSubscriberSource;
  tags: string[];
  confirm_token: string;
  unsubscribe_token: string;
  confirmed_at?: string | null;
  unsubscribed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type NewsletterCampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
export type NewsletterAudience = 'all_active' | 'locale' | 'tags';

export type NewsletterCampaignStats = {
  recipients: number;
  sent: number;
  failed: number;
  opened?: number;
};

export type NewsletterCampaignRecord = {
  id: string;
  locale: ContentLocale;
  subject: string;
  preheader?: string | null;
  html_body: string;
  status: NewsletterCampaignStatus;
  audience: NewsletterAudience;
  audience_locale?: ContentLocale | null;
  audience_tags?: string[];
  scheduled_at?: string | null;
  sent_at?: string | null;
  stats?: NewsletterCampaignStats;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type NewsletterDeliveryStatus = 'queued' | 'sent' | 'failed' | 'bounced';

export type NewsletterDeliveryRecord = {
  id: string;
  campaign: string;
  subscriber: string;
  email: string;
  status: NewsletterDeliveryStatus;
  provider_id?: string | null;
  error?: string | null;
  sent_at?: string | null;
  created_at?: string;
};

export function recordId(id: unknown): string {
  if (typeof id === 'string') return id;
  if (id && typeof id === 'object' && 'toString' in id) {
    return String(id);
  }
  return '';
}

/** Convert Surreal Date / RecordId / toJSON values into RSC-safe plain data. */
export function serializeRow<T extends { id?: unknown }>(row: T): T & { id: string } {
  const plain = JSON.parse(
    JSON.stringify(row, (_key, value) => {
      if (value instanceof Date) return value.toISOString();
      return value;
    }),
  ) as T;
  return { ...plain, id: recordId(row.id) };
}

export function serializeRows<T extends { id?: unknown }>(rows: T[]): Array<T & { id: string }> {
  return rows.map(serializeRow);
}

