import { isDbConfigured } from '@/lib/db/client';
import { listNewsletterCampaigns } from '@/lib/newsletter/queries';
import { CampaignsCrud } from '@/components/admin/newsletter/CampaignsCrud';

export default async function AdminNewsletterCampaignsPage() {
  const campaigns = (await listNewsletterCampaigns()) ?? [];
  return <CampaignsCrud campaigns={campaigns} dbOk={isDbConfigured()} />;
}
