'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { deleteCampaignAction } from '@/lib/newsletter/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';
import { Card } from '@/components/admin/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/admin/ui/table';

export type AdminCampaign = {
  id: string;
  subject: string;
  locale: string;
  status: string;
  audience: string;
  sent_at?: string | null;
  stats?: { recipients?: number; sent?: number; failed?: number };
  created_at?: string;
};

export function CampaignsCrud({
  campaigns,
  dbOk,
}: {
  campaigns: AdminCampaign[];
  dbOk: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Campagnes"
        description="Créez, prévisualisez et envoyez des newsletters aux abonnés actifs."
        dbOk={dbOk}
        actions={
          dbOk ? (
            <Button asChild>
              <Link href="/admin/newsletter/campaigns/new">
                <Plus className="h-4 w-4" />
                Nouvelle campagne
              </Link>
            </Button>
          ) : null
        }
      />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sujet</TableHead>
              <TableHead>Langue</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Envois</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-[var(--oe-text-muted)] py-10">
                  Aucune campagne. Créez la première.
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-[var(--oe-text)] max-w-[240px] truncate">
                    {c.subject}
                  </TableCell>
                  <TableCell>{c.locale.toUpperCase()}</TableCell>
                  <TableCell className="text-[var(--oe-text-secondary)] text-xs">{c.audience}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        c.status === 'sent'
                          ? 'success'
                          : c.status === 'draft'
                            ? 'secondary'
                            : 'warning'
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="tabular-nums text-[var(--oe-text-secondary)] text-sm">
                    {c.stats?.sent != null ? `${c.stats.sent}/${c.stats.recipients ?? 0}` : '—'}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/newsletter/campaigns/${encodeURIComponent(c.id)}`}>
                        <Pencil className="h-3.5 w-3.5" />
                        Ouvrir
                      </Link>
                    </Button>
                    {c.status === 'draft' ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={pending}
                        onClick={() => {
                          if (!confirm('Supprimer cette campagne ?')) return;
                          startTransition(async () => {
                            await deleteCampaignAction(c.id);
                            router.refresh();
                          });
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
