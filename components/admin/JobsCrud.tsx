'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { upsertJobAction, deleteJobAction } from '@/lib/admin/actions';
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

export type AdminJob = {
  id: string;
  locale?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities?: string[];
  requirements?: string[];
  published: boolean;
};

export function JobsCrud({ jobs, dbOk }: { jobs: AdminJob[]; dbOk: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminJob | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Offres carrières"
        description="Publiez et mettez à jour les postes ouverts. Les candidatures arrivent dans la boîte de réception."
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
              Nouvelle offre
            </Button>
          ) : null
        }
      />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Poste</TableHead>
              <TableHead>Langue</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-[var(--oe-text-muted)] py-10">
                  Aucune offre pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium text-[var(--oe-text)] max-w-[200px] truncate">{job.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{(job.locale ?? 'fr').toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell className="text-[var(--oe-text-secondary)]">{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Badge variant={job.published ? 'success' : 'warning'}>
                      {job.published ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {dbOk && String(job.id).includes(':') ? (
                      <div className="inline-flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditing(job);
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
                              await deleteJobAction(String(job.id));
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier l’offre' : 'Créer une offre'}</DialogTitle>
            <DialogDescription>
              Décrivez le poste clairement. Responsabilités et prérequis : une ligne par élément.
            </DialogDescription>
          </DialogHeader>
          <form
            key={editing?.id ?? 'new'}
            className="space-y-4"
            action={(fd) => {
              startTransition(async () => {
                await upsertJobAction(fd);
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
                  className="flex h-10 w-full rounded-md border border-[var(--oe-border)] bg-[var(--oe-bg)] px-3 text-sm"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </Field>
              <Field label="Titre du poste" htmlFor="title" required>
                <Input id="title" name="title" required defaultValue={editing?.title} placeholder="Staff Engineer — Edge" />
              </Field>
              <Field label="Département" htmlFor="department">
                <Input id="department" name="department" defaultValue={editing?.department} placeholder="Ingénierie Systems" />
              </Field>
              <Field label="Lieu / modalité" htmlFor="location">
                <Input id="location" name="location" defaultValue={editing?.location} placeholder="Remote EU / Afrique" />
              </Field>
              <Field label="Type de contrat" htmlFor="type">
                <Input id="type" name="type" defaultValue={editing?.type} placeholder="CDI" />
              </Field>
            </div>
            <Field label="Résumé" htmlFor="summary" required hint="Pitch court visible dans la liste des postes.">
              <Textarea id="summary" name="summary" required rows={2} defaultValue={editing?.summary} />
            </Field>
            <Field label="Responsabilités" htmlFor="responsibilities" hint="Une responsabilité par ligne.">
              <Textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                defaultValue={(editing?.responsibilities ?? []).join('\n')}
                placeholder={"Architecturer les services Edge\nDéfinir les SLOs"}
              />
            </Field>
            <Field label="Prérequis" htmlFor="requirements" hint="Une exigence par ligne.">
              <Textarea
                id="requirements"
                name="requirements"
                rows={4}
                defaultValue={(editing?.requirements ?? []).join('\n')}
                placeholder={"8+ ans systèmes distribués\nAnglais professionnel"}
              />
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
                Publier l’offre sur la page Carrières
              </Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer l’offre'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
