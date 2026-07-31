import { listInquiries } from '@/lib/db/queries';
import { isDbConfigured } from '@/lib/db/client';
import { InquiriesCrud } from '@/components/admin/InquiriesCrud';

export default async function AdminB2bInquiriesPage() {
  const inquiries = (await listInquiries()) ?? [];
  return <InquiriesCrud inquiries={inquiries} dbOk={isDbConfigured()} initialChannel="b2b" />;
}
