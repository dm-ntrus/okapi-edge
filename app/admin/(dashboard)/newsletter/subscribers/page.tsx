import { isDbConfigured } from '@/lib/db/client';
import { listNewsletterSubscribers } from '@/lib/newsletter/queries';
import { SubscribersCrud } from '@/components/admin/newsletter/SubscribersCrud';

export default async function AdminNewsletterSubscribersPage() {
  const subscribers = (await listNewsletterSubscribers()) ?? [];
  return <SubscribersCrud subscribers={subscribers} dbOk={isDbConfigured()} />;
}
