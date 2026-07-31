import { randomBytes } from 'crypto';
import { withDb } from '@/lib/db/client';
import { createIn, deleteId, mergeId, q } from '@/lib/db/ops';
import { StringRecordId } from 'surrealdb';
import type {
  ContentLocale,
  NewsletterAudience,
  NewsletterCampaignRecord,
  NewsletterCampaignStats,
  NewsletterDeliveryRecord,
  NewsletterSubscriberRecord,
  NewsletterSubscriberStatus,
} from '@/lib/db/types';
import { recordId, serializeRow, serializeRows } from '@/lib/db/types';

export function newToken() {
  return randomBytes(24).toString('hex');
}

export async function listNewsletterSubscribers() {
  return withDb(async (db) => {
    const [rows] = await q<[NewsletterSubscriberRecord[]]>(
      db,
      'SELECT * FROM newsletter_subscriber ORDER BY created_at DESC LIMIT 2000',
    );
    return serializeRows(rows ?? []);
  });
}

export async function getNewsletterSubscriberByEmail(email: string) {
  return withDb(async (db) => {
    const [rows] = await q<[NewsletterSubscriberRecord[]]>(
      db,
      'SELECT * FROM newsletter_subscriber WHERE email = $email LIMIT 1',
      { email: email.toLowerCase().trim() },
    );
    return rows?.[0] ? serializeRow(rows[0]) : null;
  });
}

export async function getNewsletterSubscriberByConfirmToken(token: string) {
  return withDb(async (db) => {
    const [rows] = await q<[NewsletterSubscriberRecord[]]>(
      db,
      'SELECT * FROM newsletter_subscriber WHERE confirm_token = $token LIMIT 1',
      { token },
    );
    return rows?.[0] ? serializeRow(rows[0]) : null;
  });
}

export async function getNewsletterSubscriberByUnsubToken(token: string) {
  return withDb(async (db) => {
    const [rows] = await q<[NewsletterSubscriberRecord[]]>(
      db,
      'SELECT * FROM newsletter_subscriber WHERE unsubscribe_token = $token LIMIT 1',
      { token },
    );
    return rows?.[0] ? serializeRow(rows[0]) : null;
  });
}

export async function createNewsletterSubscriber(data: {
  email: string;
  full_name?: string | null;
  locale?: ContentLocale;
  source?: NewsletterSubscriberRecord['source'];
  tags?: string[];
  status?: NewsletterSubscriberStatus;
}) {
  return withDb(async (db) => {
    const payload = {
      email: data.email.toLowerCase().trim(),
      full_name: data.full_name ?? null,
      locale: data.locale ?? 'fr',
      status: data.status ?? 'pending',
      source: data.source ?? 'footer',
      tags: data.tags ?? [],
      confirm_token: newToken(),
      unsubscribe_token: newToken(),
      confirmed_at: data.status === 'active' ? new Date().toISOString() : null,
      unsubscribed_at: null,
    };
    const row = await createIn(db, 'newsletter_subscriber', payload);
    return row ? serializeRow(row as NewsletterSubscriberRecord) : null;
  });
}

export async function updateNewsletterSubscriber(
  id: string,
  data: Partial<NewsletterSubscriberRecord>,
) {
  return withDb(async (db) => {
    await mergeId(db, id, { ...data, updated_at: new Date().toISOString() });
    return true;
  });
}

export async function deleteNewsletterSubscriber(id: string) {
  return withDb(async (db) => {
    await deleteId(db, id);
    return true;
  });
}

export async function listAudienceSubscribers(opts: {
  audience: NewsletterAudience;
  audience_locale?: ContentLocale | null;
  audience_tags?: string[];
}) {
  return withDb(async (db) => {
    if (opts.audience === 'locale' && opts.audience_locale) {
      const [rows] = await q<[NewsletterSubscriberRecord[]]>(
        db,
        `SELECT * FROM newsletter_subscriber
         WHERE status = 'active' AND locale = $locale
         ORDER BY created_at ASC`,
        { locale: opts.audience_locale },
      );
      return serializeRows(rows ?? []);
    }
    if (opts.audience === 'tags' && opts.audience_tags?.length) {
      const [rows] = await q<[NewsletterSubscriberRecord[]]>(
        db,
        `SELECT * FROM newsletter_subscriber
         WHERE status = 'active' AND array::intersect(tags, $tags) != []
         ORDER BY created_at ASC`,
        { tags: opts.audience_tags },
      );
      return serializeRows(rows ?? []);
    }
    const [rows] = await q<[NewsletterSubscriberRecord[]]>(
      db,
      `SELECT * FROM newsletter_subscriber WHERE status = 'active' ORDER BY created_at ASC`,
    );
    return serializeRows(rows ?? []);
  });
}

export async function getNewsletterStats() {
  return withDb(async (db) => {
    const [[active], [pending], [unsubscribed], [campaigns], [sent]] = await Promise.all([
      q<[{ c: number }[]]>(
        db,
        "SELECT count() AS c FROM newsletter_subscriber WHERE status = 'active' GROUP ALL",
      ),
      q<[{ c: number }[]]>(
        db,
        "SELECT count() AS c FROM newsletter_subscriber WHERE status = 'pending' GROUP ALL",
      ),
      q<[{ c: number }[]]>(
        db,
        "SELECT count() AS c FROM newsletter_subscriber WHERE status = 'unsubscribed' GROUP ALL",
      ),
      q<[{ c: number }[]]>(db, 'SELECT count() AS c FROM newsletter_campaign GROUP ALL'),
      q<[{ c: number }[]]>(
        db,
        "SELECT count() AS c FROM newsletter_campaign WHERE status = 'sent' GROUP ALL",
      ),
    ]);
    return {
      active: Number(active?.[0]?.c ?? 0),
      pending: Number(pending?.[0]?.c ?? 0),
      unsubscribed: Number(unsubscribed?.[0]?.c ?? 0),
      campaigns: Number(campaigns?.[0]?.c ?? 0),
      sentCampaigns: Number(sent?.[0]?.c ?? 0),
    };
  });
}

export async function listNewsletterCampaigns() {
  return withDb(async (db) => {
    const [rows] = await q<[NewsletterCampaignRecord[]]>(
      db,
      'SELECT * FROM newsletter_campaign ORDER BY created_at DESC LIMIT 200',
    );
    return serializeRows(rows ?? []);
  });
}

export async function getNewsletterCampaign(id: string) {
  return withDb(async (db) => {
    const rid = id.includes(':') ? id : `newsletter_campaign:${id}`;
    try {
      const row = await db.select(new StringRecordId(rid)).json();
      if (row && typeof row === 'object' && !Array.isArray(row)) {
        return serializeRow(row as NewsletterCampaignRecord);
      }
      if (Array.isArray(row) && row[0]) {
        return serializeRow(row[0] as NewsletterCampaignRecord);
      }
    } catch {
      /* fall through */
    }
    const [rows] = await q<[NewsletterCampaignRecord[]]>(
      db,
      'SELECT * FROM newsletter_campaign WHERE id = type::thing($rid) LIMIT 1',
      { rid },
    );
    return rows?.[0] ? serializeRow(rows[0]) : null;
  });
}

export async function createNewsletterCampaign(data: {
  locale: ContentLocale;
  subject: string;
  preheader?: string | null;
  html_body: string;
  audience?: NewsletterAudience;
  audience_locale?: ContentLocale | null;
  audience_tags?: string[];
  created_by?: string | null;
}) {
  return withDb(async (db) => {
    const payload = {
      locale: data.locale,
      subject: data.subject,
      preheader: data.preheader ?? null,
      html_body: data.html_body,
      status: 'draft' as const,
      audience: data.audience ?? 'all_active',
      audience_locale: data.audience_locale ?? null,
      audience_tags: data.audience_tags ?? [],
      scheduled_at: null,
      sent_at: null,
      stats: { recipients: 0, sent: 0, failed: 0 } satisfies NewsletterCampaignStats,
      created_by: data.created_by ?? null,
    };
    const row = await createIn(db, 'newsletter_campaign', payload);
    return row ? serializeRow(row as NewsletterCampaignRecord) : null;
  });
}

export async function updateNewsletterCampaign(
  id: string,
  data: Partial<NewsletterCampaignRecord>,
) {
  return withDb(async (db) => {
    await mergeId(db, id, { ...data, updated_at: new Date().toISOString() });
    return true;
  });
}

export async function deleteNewsletterCampaign(id: string) {
  return withDb(async (db) => {
    await deleteId(db, id);
    return true;
  });
}

export async function createNewsletterDelivery(data: {
  campaign: string;
  subscriber: string;
  email: string;
}) {
  return withDb(async (db) => {
    const campaignRid = data.campaign.includes(':')
      ? data.campaign
      : `newsletter_campaign:${data.campaign}`;
    const subscriberRid = data.subscriber.includes(':')
      ? data.subscriber
      : `newsletter_subscriber:${data.subscriber}`;

    const [rows] = await q<[NewsletterDeliveryRecord[]]>(
      db,
      `CREATE newsletter_delivery CONTENT {
        campaign: type::thing($campaign),
        subscriber: type::thing($subscriber),
        email: $email,
        status: 'queued',
        provider_id: NONE,
        error: NONE,
        sent_at: NONE
      }`,
      { campaign: campaignRid, subscriber: subscriberRid, email: data.email },
    );
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? serializeRow(row as NewsletterDeliveryRecord) : null;
  });
}

export async function updateNewsletterDelivery(
  id: string,
  data: Partial<NewsletterDeliveryRecord>,
) {
  return withDb(async (db) => {
    await mergeId(db, id, data);
    return true;
  });
}

export async function listDeliveriesForCampaign(campaignId: string) {
  return withDb(async (db) => {
    const rid = campaignId.includes(':') ? campaignId : `newsletter_campaign:${campaignId}`;
    const [rows] = await q<[NewsletterDeliveryRecord[]]>(
      db,
      'SELECT * FROM newsletter_delivery WHERE campaign = type::record($rid) ORDER BY created_at DESC',
      { rid },
    );
    return serializeRows(
      (rows ?? []).map((r) => ({
        ...r,
        campaign: recordId(r.campaign),
        subscriber: recordId(r.subscriber),
      })),
    );
  });
}
