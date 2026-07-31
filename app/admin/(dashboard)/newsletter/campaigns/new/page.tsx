import { isDbConfigured } from '@/lib/db/client';
import { isEmailConfigured } from '@/lib/email/resend';
import { getNewsletterStats } from '@/lib/newsletter/queries';
import { CampaignEditor } from '@/components/admin/newsletter/CampaignEditor';

export default async function AdminNewsletterCampaignNewPage() {
  const stats = (await getNewsletterStats()) ?? { active: 0 };
  return (
    <CampaignEditor
      dbOk={isDbConfigured()}
      emailOk={isEmailConfigured()}
      activeCount={stats.active ?? 0}
    />
  );
}
