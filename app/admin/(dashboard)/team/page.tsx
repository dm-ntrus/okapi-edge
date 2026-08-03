import { listAllTeam } from '@/lib/db/queries';
import { TEAM_MEMBERS } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { TeamCrud } from '@/components/admin/TeamCrud';

export default async function AdminTeamPage() {
  const fromDb = await listAllTeam();
  const members =
    fromDb ??
    TEAM_MEMBERS.map((m, i) => ({
      id: m.id,
      locale: 'fr',
      key: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      image: m.image,
      linkedin: m.linkedin ?? null,
      twitter: m.twitter ?? null,
      sort_order: i,
      published: true,
    }));

  return <TeamCrud members={members} dbOk={isDbConfigured()} />;
}
