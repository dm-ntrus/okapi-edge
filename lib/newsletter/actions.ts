'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { canWrite, requireSession } from '@/lib/auth/session';
import { isDbConfigured } from '@/lib/db/client';
import {
  isEmailConfigured,
  sendCampaignEmail,
  sendConfirmEmail,
} from '@/lib/email/resend';
import {
  createNewsletterCampaign,
  createNewsletterDelivery,
  createNewsletterSubscriber,
  deleteNewsletterCampaign,
  deleteNewsletterSubscriber,
  getNewsletterCampaign,
  getNewsletterSubscriberByConfirmToken,
  getNewsletterSubscriberByEmail,
  getNewsletterSubscriberByUnsubToken,
  listAudienceSubscribers,
  updateNewsletterCampaign,
  updateNewsletterDelivery,
  updateNewsletterSubscriber,
} from '@/lib/newsletter/queries';

async function assertEditor() {
  const session = await requireSession();
  if (!canWrite(session.role)) throw new Error('FORBIDDEN');
  return session;
}

function revalidateNewsletter() {
  revalidatePath('/admin/newsletter', 'layout');
  revalidatePath('/', 'layout');
}

const subscribeSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(1).max(120).optional(),
  locale: z.enum(['fr', 'en']).optional(),
});

export async function subscribeNewsletterAction(input: {
  email: string;
  full_name?: string;
  locale?: 'fr' | 'en';
}): Promise<{ ok: boolean; error?: string; pending?: boolean; already?: boolean }> {
  const parsed = subscribeSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'EMAIL_INVALID' };
  if (!isDbConfigured()) return { ok: false, error: 'DB_OFFLINE' };

  const email = parsed.data.email.toLowerCase().trim();
  const locale = parsed.data.locale ?? 'fr';
  const existing = await getNewsletterSubscriberByEmail(email);

  if (existing) {
    if (existing.status === 'active') return { ok: true, already: true };
    if (existing.status === 'unsubscribed') {
      await updateNewsletterSubscriber(existing.id, {
        status: 'pending',
        confirm_token: existing.confirm_token,
        unsubscribed_at: null,
        locale,
        full_name: parsed.data.full_name ?? existing.full_name,
      });
      const mail = await sendConfirmEmail({
        to: email,
        locale,
        confirmToken: existing.confirm_token,
      });
      if (!mail.ok && !mail.offline) return { ok: false, error: mail.error };
      // Dev without Resend: auto-activate so the flow remains usable
      if (!mail.ok && mail.offline) {
        await updateNewsletterSubscriber(existing.id, {
          status: 'active',
          confirmed_at: new Date().toISOString(),
        });
        return { ok: true, pending: false };
      }
      return { ok: true, pending: true };
    }
    // pending or bounced → resend confirm
    const mail = await sendConfirmEmail({
      to: email,
      locale: existing.locale || locale,
      confirmToken: existing.confirm_token,
    });
    if (!mail.ok && mail.offline) {
      await updateNewsletterSubscriber(existing.id, {
        status: 'active',
        confirmed_at: new Date().toISOString(),
      });
      return { ok: true, pending: false };
    }
    return { ok: true, pending: true };
  }

  const created = await createNewsletterSubscriber({
    email,
    full_name: parsed.data.full_name,
    locale,
    source: 'footer',
    status: 'pending',
  });
  if (!created) return { ok: false, error: 'CREATE_FAILED' };

  const mail = await sendConfirmEmail({
    to: email,
    locale,
    confirmToken: created.confirm_token,
  });

  if (!mail.ok && mail.offline) {
    // Without Resend, activate immediately (local/dev) so CRM still works
    await updateNewsletterSubscriber(created.id, {
      status: 'active',
      confirmed_at: new Date().toISOString(),
    });
    revalidateNewsletter();
    return { ok: true, pending: false };
  }

  if (!mail.ok) return { ok: false, error: mail.error };
  revalidateNewsletter();
  return { ok: true, pending: true };
}

export async function confirmNewsletterAction(
  token: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!token?.trim()) return { ok: false, error: 'TOKEN_MISSING' };
  if (!isDbConfigured()) return { ok: false, error: 'DB_OFFLINE' };
  const sub = await getNewsletterSubscriberByConfirmToken(token.trim());
  if (!sub) return { ok: false, error: 'TOKEN_INVALID' };
  if (sub.status === 'active') return { ok: true };
  await updateNewsletterSubscriber(sub.id, {
    status: 'active',
    confirmed_at: new Date().toISOString(),
  });
  revalidateNewsletter();
  return { ok: true };
}

export async function unsubscribeNewsletterAction(
  token: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!token?.trim()) return { ok: false, error: 'TOKEN_MISSING' };
  if (!isDbConfigured()) return { ok: false, error: 'DB_OFFLINE' };
  const sub = await getNewsletterSubscriberByUnsubToken(token.trim());
  if (!sub) return { ok: false, error: 'TOKEN_INVALID' };
  await updateNewsletterSubscriber(sub.id, {
    status: 'unsubscribed',
    unsubscribed_at: new Date().toISOString(),
  });
  revalidateNewsletter();
  return { ok: true };
}

/* ─── Admin subscribers ─── */

export async function adminCreateSubscriberAction(formData: FormData) {
  await assertEditor();
  if (!isDbConfigured()) throw new Error('DB_OFFLINE');
  const email = String(formData.get('email') || '')
    .toLowerCase()
    .trim();
  const full_name = String(formData.get('full_name') || '').trim() || null;
  const locale = String(formData.get('locale') || 'fr') === 'en' ? 'en' : 'fr';
  const tags = String(formData.get('tags') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const activate = formData.get('activate') === 'on';

  if (!email.includes('@')) throw new Error('EMAIL_INVALID');
  const existing = await getNewsletterSubscriberByEmail(email);
  if (existing) throw new Error('EMAIL_EXISTS');

  await createNewsletterSubscriber({
    email,
    full_name,
    locale,
    tags,
    source: 'admin',
    status: activate ? 'active' : 'pending',
  });
  revalidateNewsletter();
}

export async function adminUpdateSubscriberStatusAction(
  id: string,
  status: 'pending' | 'active' | 'unsubscribed' | 'bounced',
) {
  await assertEditor();
  const patch: Record<string, unknown> = { status };
  if (status === 'active') patch.confirmed_at = new Date().toISOString();
  if (status === 'unsubscribed') patch.unsubscribed_at = new Date().toISOString();
  await updateNewsletterSubscriber(id, patch);
  revalidateNewsletter();
}

export async function adminDeleteSubscriberAction(id: string) {
  await assertEditor();
  await deleteNewsletterSubscriber(id);
  revalidateNewsletter();
}

/* ─── Admin campaigns ─── */

export async function upsertCampaignAction(formData: FormData) {
  const session = await assertEditor();
  if (!isDbConfigured()) throw new Error('DB_OFFLINE');

  const id = String(formData.get('id') || '').trim();
  const locale = String(formData.get('locale') || 'fr') === 'en' ? 'en' : 'fr';
  const subject = String(formData.get('subject') || '').trim();
  const preheader = String(formData.get('preheader') || '').trim() || null;
  const html_body = String(formData.get('html_body') || '').trim();
  const audienceRaw = String(formData.get('audience') || 'all_active');
  const audience =
    audienceRaw === 'locale' || audienceRaw === 'tags' ? audienceRaw : 'all_active';
  const audience_locale =
    String(formData.get('audience_locale') || '') === 'en' ? 'en' : 'fr';
  const audience_tags = String(formData.get('audience_tags') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!subject || !html_body) throw new Error('SUBJECT_BODY_REQUIRED');

  if (id) {
    await updateNewsletterCampaign(id, {
      locale,
      subject,
      preheader,
      html_body,
      audience,
      audience_locale: audience === 'locale' ? audience_locale : null,
      audience_tags: audience === 'tags' ? audience_tags : [],
    });
    revalidateNewsletter();
    return { id };
  }

  const created = await createNewsletterCampaign({
    locale,
    subject,
    preheader,
    html_body,
    audience,
    audience_locale: audience === 'locale' ? audience_locale : null,
    audience_tags: audience === 'tags' ? audience_tags : [],
    created_by: session.email,
  });
  revalidateNewsletter();
  return { id: created?.id ?? '' };
}

export async function deleteCampaignAction(id: string) {
  await assertEditor();
  await deleteNewsletterCampaign(id);
  revalidateNewsletter();
}

export async function sendCampaignAction(
  id: string,
): Promise<{ ok: boolean; error?: string; sent?: number; failed?: number }> {
  await assertEditor();
  if (!isDbConfigured()) return { ok: false, error: 'DB_OFFLINE' };
  if (!isEmailConfigured()) {
    return {
      ok: false,
      error: 'RESEND_API_KEY manquant. Ajoutez-la dans .env.local pour envoyer.',
    };
  }

  const campaign = await getNewsletterCampaign(id);
  if (!campaign) return { ok: false, error: 'CAMPAIGN_NOT_FOUND' };
  if (campaign.status === 'sending') return { ok: false, error: 'ALREADY_SENDING' };
  if (campaign.status === 'sent') return { ok: false, error: 'ALREADY_SENT' };

  const recipients = await listAudienceSubscribers({
    audience: campaign.audience,
    audience_locale: campaign.audience_locale,
    audience_tags: campaign.audience_tags,
  });

  if (!recipients?.length) return { ok: false, error: 'NO_RECIPIENTS' };

  await updateNewsletterCampaign(id, {
    status: 'sending',
    stats: { recipients: recipients.length, sent: 0, failed: 0 },
  });

  let sent = 0;
  let failed = 0;

  for (const sub of recipients) {
    const delivery = await createNewsletterDelivery({
      campaign: campaign.id,
      subscriber: sub.id,
      email: sub.email,
    });

    const result = await sendCampaignEmail({
      to: sub.email,
      locale: campaign.locale,
      subject: campaign.subject,
      preheader: campaign.preheader,
      htmlBody: campaign.html_body,
      unsubscribeToken: sub.unsubscribe_token,
    });

    if (result.ok) {
      sent += 1;
      if (delivery) {
        await updateNewsletterDelivery(delivery.id, {
          status: 'sent',
          provider_id: result.id,
          sent_at: new Date().toISOString(),
        });
      }
    } else {
      failed += 1;
      if (delivery) {
        await updateNewsletterDelivery(delivery.id, {
          status: 'failed',
          error: result.error,
        });
      }
    }

    // Soft rate-limit ~8/s
    await new Promise((r) => setTimeout(r, 120));
  }

  await updateNewsletterCampaign(id, {
    status: 'sent',
    sent_at: new Date().toISOString(),
    stats: { recipients: recipients.length, sent, failed },
  });

  revalidateNewsletter();
  return { ok: true, sent, failed };
}

export { isEmailConfigured };
