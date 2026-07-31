import { isDbConfigured } from '@/lib/db/client';
import { isEmailConfigured } from '@/lib/email/resend';
import {
  getNewsletterStats,
  listNewsletterCampaigns,
} from '@/lib/newsletter/queries';
import { NewsletterDashboard } from '@/components/admin/newsletter/NewsletterDashboard';

export default async function AdminNewsletterPage() {
  const dbOk = isDbConfigured();
  const stats = dbOk
    ? ((await getNewsletterStats()) ?? {
        active: 0,
        pending: 0,
        unsubscribed: 0,
        campaigns: 0,
        sentCampaigns: 0,
      })
    : { active: 0, pending: 0, unsubscribed: 0, campaigns: 0, sentCampaigns: 0 };

  const campaigns = dbOk ? ((await listNewsletterCampaigns()) ?? []).slice(0, 5) : [];

  return (
    <NewsletterDashboard
      stats={stats}
      emailOk={isEmailConfigured()}
      dbOk={dbOk}
      recentCampaigns={campaigns}
    />
  );
}
