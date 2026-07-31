import { notFound } from 'next/navigation';
import { isDbConfigured } from '@/lib/db/client';
import { isEmailConfigured } from '@/lib/email/resend';
import {
  getNewsletterCampaign,
  getNewsletterStats,
} from '@/lib/newsletter/queries';
import { CampaignEditor } from '@/components/admin/newsletter/CampaignEditor';

type Props = { params: Promise<{ id: string }> };

export default async function AdminNewsletterCampaignEditPage({ params }: Props) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const campaign = await getNewsletterCampaign(decoded);
  if (!campaign) notFound();
  const stats = (await getNewsletterStats()) ?? { active: 0 };

  return (
    <CampaignEditor
      campaign={campaign}
      dbOk={isDbConfigured()}
      emailOk={isEmailConfigured()}
      activeCount={stats.active ?? 0}
    />
  );
}
