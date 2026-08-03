'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { upsertTeamAction, deleteTeamAction } from '@/lib/admin/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { Field } from '@/components/admin/ui/field';
import { Badge } from '@/components/admin/ui/badge';
import { Card } from '@/components/admin/ui/card';
import { Label } from '@/components/admin/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/admin/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/admin/ui/dialog';

export type AdminTeamMember = {
  id: string;
  locale?: string;
  key: string;
  name: string;
  role: string;
  bio: string;
  image?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  sort_order: number;
  published: boolean;
};

export function TeamCrud({ members, dbOk }: { members: AdminTeamMember[]; dbOk: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminTeamMember | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Équipe dirigeante"
        description="Profils affichés sur /about. Une fiche par langue (clé + locale)."
        dbOk={dbOk}
        actions={
          dbOk ? (
            <Button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Nouveau membre
            </Button>
          ) : null
        }
      />

      <Card className="overflow-hidden">
        <div className="oe-table-wrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Langue</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-[var(--oe-text-muted)] py-10">
                    Aucun membre. Seed la base ou ajoutez un profil.
                  </TableCell>
                </TableRow>
              ) : (
                members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[var(--oe-border)] bg-[var(--oe-bg)]">
                          {m.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={m.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-[var(--oe-accent)]">
                              {m.name.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[var(--oe-text)] truncate">{m.name}</div>
                          <div className="text-xs text-[var(--oe-text-muted)] font-mono truncate">{m.key}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{(m.locale ?? 'fr').toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-[var(--oe-text-secondary)]">
                      {m.role}
                    </TableCell>
                    <TableCell>{m.sort_order}</TableCell>
                    <TableCell>
                      <Badge variant={m.published ? 'success' : 'warning'}>
                        {m.published ? 'Publié' : 'Brouillon'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {dbOk && String(m.id).includes(':') ? (
                        <div className="inline-flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditing(m);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-rose-400"
                            onClick={() =>
                              startTransition(async () => {
                                await deleteTeamAction(String(m.id));
                                router.refresh();
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier le membre' : 'Nouveau membre'}</DialogTitle>
            <DialogDescription>
              Les profils publiés apparaissent dans la section Équipe dirigeante.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              startTransition(async () => {
                await upsertTeamAction(formData);
                setOpen(false);
                router.refresh();
              });
            }}
          >
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Clé">
                <Input name="key" required defaultValue={editing?.key} placeholder="patrick-mwamba" />
              </Field>
              <Field label="Langue">
                <select
                  name="locale"
                  defaultValue={editing?.locale ?? 'fr'}
                  className="oe-admin-input"
                >
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                </select>
              </Field>
            </div>
            <Field label="Nom">
              <Input name="name" required defaultValue={editing?.name} />
            </Field>
            <Field label="Rôle">
              <Input name="role" required defaultValue={editing?.role} />
            </Field>
            <Field label="Bio">
              <Textarea name="bio" rows={4} required defaultValue={editing?.bio} />
            </Field>
            <Field label="Photo (URL)">
              <Input name="image" defaultValue={editing?.image ?? ''} placeholder="https://..." />
            </Field>
            <Field label="LinkedIn (URL)">
              <Input name="linkedin" defaultValue={editing?.linkedin ?? ''} />
            </Field>
            <Field label="Ordre">
              <Input
                name="sort_order"
                type="number"
                defaultValue={editing?.sort_order ?? 0}
              />
            </Field>
            <div className="flex items-center gap-2">
              <input
                id="published"
                name="published"
                type="checkbox"
                defaultChecked={editing?.published ?? true}
                className="h-4 w-4"
              />
              <Label htmlFor="published">Publié</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? 'Enregistrement…' : 'Enregistrer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
