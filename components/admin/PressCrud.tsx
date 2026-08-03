'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { upsertPressAction, deletePressAction } from '@/lib/admin/actions';
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

export type AdminPress = {
  id: string;
  locale?: string;
  title: string;
  date_label: string;
  category: string;
  summary: string;
  download_url?: string | null;
  published: boolean;
};

export function PressCrud({ items, dbOk }: { items: AdminPress[]; dbOk: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPress | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Communiqués de presse"
        description="Salle de presse : annonces corporate, partenariats et certifications."
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
              Nouveau communiqué
            </Button>
          ) : null
        }
      />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Langue</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-[var(--oe-text-muted)] py-10">
                  Aucun communiqué.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-[var(--oe-text)] max-w-[240px] truncate">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{(item.locale ?? 'fr').toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-[var(--oe-text-secondary)]">{item.date_label}</TableCell>
                  <TableCell>
                    <Badge variant={item.published ? 'success' : 'warning'}>
                      {item.published ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {dbOk && String(item.id).includes(':') ? (
                      <div className="inline-flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditing(item);
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
                              await deletePressAction(String(item.id));
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
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier le communiqué' : 'Créer un communiqué'}</DialogTitle>
            <DialogDescription>Contenu visible dans l’espace presse public.</DialogDescription>
          </DialogHeader>
          <form
            key={editing?.id ?? 'new'}
            className="space-y-4"
            action={(fd) => {
              startTransition(async () => {
                await upsertPressAction(fd);
                setOpen(false);
                setEditing(null);
                router.refresh();
              });
            }}
          >
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Langue" htmlFor="locale" required>
                <select
                  id="locale"
                  name="locale"
                  defaultValue={editing?.locale ?? 'fr'}
                  className="oe-admin-input"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </Field>
              <Field label="Date affichée" htmlFor="date_label">
                <Input id="date_label" name="date_label" defaultValue={editing?.date_label} placeholder="15 Janvier 2026" />
              </Field>
            </div>
            <Field label="Titre" htmlFor="title" required>
              <Input id="title" name="title" required defaultValue={editing?.title} />
            </Field>
            <Field label="Catégorie" htmlFor="category">
              <Input id="category" name="category" defaultValue={editing?.category} placeholder="Corporate" />
            </Field>
            <Field label="Résumé" htmlFor="summary" required>
              <Textarea id="summary" name="summary" required rows={4} defaultValue={editing?.summary} />
            </Field>
            <Field label="URL du PDF" htmlFor="download_url" hint="Optionnel — lien de téléchargement.">
              <Input id="download_url" name="download_url" defaultValue={editing?.download_url ?? ''} placeholder="https://…" />
            </Field>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--oe-border)] bg-[var(--oe-surface)] px-3 py-3">
              <input
                id="published"
                name="published"
                type="checkbox"
                defaultChecked={editing?.published ?? true}
                className="h-4 w-4 rounded border-white/20"
              />
              <Label htmlFor="published" className="font-normal text-[var(--oe-text-secondary)]">
                Publier sur le site
              </Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
