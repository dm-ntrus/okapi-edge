'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Download } from 'lucide-react';
import {
  adminCreateSubscriberAction,
  adminDeleteSubscriberAction,
  adminUpdateSubscriberStatusAction,
} from '@/lib/newsletter/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Field } from '@/components/admin/ui/field';
import { Badge } from '@/components/admin/ui/badge';
import { Card } from '@/components/admin/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/admin/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/admin/ui/dialog';
import { Label } from '@/components/admin/ui/label';

export type AdminSubscriber = {
  id: string;
  email: string;
  full_name?: string | null;
  locale: string;
  status: string;
  source: string;
  tags?: string[];
  created_at?: string;
  confirmed_at?: string | null;
};

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'secondary' | 'destructive'> = {
  active: 'success',
  pending: 'warning',
  unsubscribed: 'secondary',
  bounced: 'destructive',
};

export function SubscribersCrud({
  subscribers,
  dbOk,
}: {
  subscribers: AdminSubscriber[];
  dbOk: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'unsubscribed'>('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return subscribers.filter((s) => {
      if (filter !== 'all' && s.status !== filter) return false;
      if (!q.trim()) return true;
      const hay = `${s.email} ${s.full_name ?? ''} ${(s.tags ?? []).join(' ')}`.toLowerCase();
      return hay.includes(q.toLowerCase().trim());
    });
  }, [subscribers, filter, q]);

  function exportCsv() {
    const header = ['email', 'full_name', 'locale', 'status', 'source', 'tags', 'created_at'];
    const lines = [
      header.join(','),
      ...filtered.map((s) =>
        [
          s.email,
          JSON.stringify(s.full_name ?? ''),
          s.locale,
          s.status,
          s.source,
          JSON.stringify((s.tags ?? []).join(';')),
          s.created_at ?? '',
        ].join(','),
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <AdminPageHeader
        title="Abonnés newsletter"
        description="CRM des contacts newsletter : statut, tags, export CSV et désabonnement."
        dbOk={dbOk}
        actions={
          dbOk ? (
            <>
              <Button variant="outline" onClick={exportCsv}>
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button onClick={() => setOpen(true)}>
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </>
          ) : null
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Input
          placeholder="Rechercher e-mail, nom, tag…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {(['all', 'active', 'pending', 'unsubscribed'] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Tous' : f}
            </Button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>E-mail</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Langue</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-[var(--oe-text-muted)] py-10">
                  Aucun abonné.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-[var(--oe-text)]">{s.email}</TableCell>
                  <TableCell className="text-[var(--oe-text-secondary)]">{s.full_name || '—'}</TableCell>
                  <TableCell>{(s.locale || 'fr').toUpperCase()}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[s.status] ?? 'secondary'}>{s.status}</Badge>
                  </TableCell>
                  <TableCell className="text-[var(--oe-text-muted)] text-xs">{s.source}</TableCell>
                  <TableCell className="text-right space-x-1">
                    {s.status !== 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={pending}
                        onClick={() =>
                          startTransition(async () => {
                            await adminUpdateSubscriberStatusAction(s.id, 'active');
                            router.refresh();
                          })
                        }
                      >
                        Activer
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={pending}
                        onClick={() =>
                          startTransition(async () => {
                            await adminUpdateSubscriberStatusAction(s.id, 'unsubscribed');
                            router.refresh();
                          })
                        }
                      >
                        Désabo
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={pending}
                      onClick={() => {
                        if (!confirm(`Supprimer ${s.email} ?`)) return;
                        startTransition(async () => {
                          await adminDeleteSubscriberAction(s.id);
                          router.refresh();
                        });
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un abonné</DialogTitle>
            <DialogDescription>Ajout manuel (source admin). Peut être activé immédiatement.</DialogDescription>
          </DialogHeader>
          <form
            action={(fd) => {
              startTransition(async () => {
                try {
                  await adminCreateSubscriberAction(fd);
                  setOpen(false);
                  router.refresh();
                } catch (e) {
                  alert(e instanceof Error ? e.message : 'Erreur');
                }
              });
            }}
            className="space-y-4"
          >
            <Field label="E-mail" htmlFor="email">
              <Input id="email" name="email" type="email" required placeholder="contact@entreprise.com" />
            </Field>
            <Field label="Nom" htmlFor="full_name">
              <Input id="full_name" name="full_name" placeholder="Optionnel" />
            </Field>
            <Field label="Langue" htmlFor="locale">
              <select
                id="locale"
                name="locale"
                defaultValue="fr"
                className="oe-admin-input"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
              </select>
            </Field>
            <Field label="Tags (virgules)" htmlFor="tags">
              <Input id="tags" name="tags" placeholder="investors, b2b" />
            </Field>
            <div className="flex items-center gap-2">
              <input id="activate" name="activate" type="checkbox" defaultChecked className="rounded" />
              <Label htmlFor="activate">Activer immédiatement (sans double opt-in)</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                Créer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
