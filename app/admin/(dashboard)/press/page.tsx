import { listAllPress } from '@/lib/db/queries';
import { PRESS_RELEASES } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { PressCrud } from '@/components/admin/PressCrud';

export default async function AdminPressPage() {
  const fromDb = await listAllPress();
  const items =
    fromDb ??
    PRESS_RELEASES.map((p) => ({
      id: p.id,
      locale: 'fr',
      title: p.title,
      date_label: p.date,
      category: p.category,
      summary: p.summary,
      download_url: p.downloadUrl,
      published: true,
    }));

  return <PressCrud items={items} dbOk={isDbConfigured()} />;
}
