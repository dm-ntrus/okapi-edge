'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { upsertPostAction, deletePostAction } from '@/lib/admin/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
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

export type AdminPost = {
  id: string;
  locale?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date_label: string;
  read_time: string;
  excerpt: string;
  content: string;
  image?: string | null;
  tags?: string[];
  published: boolean;
};

export function PostsCrud({ posts, dbOk }: { posts: AdminPost[]; dbOk: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPost | null>(null);
  const [pending, startTransition] = useTransition();

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(post: AdminPost) {
    setEditing(post);
    setOpen(true);
  }

  function refresh() {
    router.refresh();
  }

  return (
    <div>
      <AdminPageHeader
        title="Articles blog"
        description="Gérez le contenu éditorial publié sur le site (FR / EN). Chaque article dispose d’un slug unique par langue."
        dbOk={dbOk}
        actions={
          dbOk ? (
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Nouvel article
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
              <TableHead>Slug</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-[var(--oe-text-muted)] py-10">
                  Aucun article. Créez le premier contenu.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium text-[var(--oe-text)] max-w-[220px] truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{(post.locale ?? 'fr').toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[var(--oe-text-secondary)]">/{post.slug}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Badge variant={post.published ? 'success' : 'warning'}>
                      {post.published ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {dbOk && String(post.id).includes(':') ? (
                      <div className="inline-flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-rose-400 hover:text-rose-300"
                          onClick={() => {
                            startTransition(async () => {
                              await deletePostAction(String(post.id));
                              refresh();
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier l’article' : 'Créer un article'}</DialogTitle>
            <DialogDescription>
              Renseignez les champs obligatoires. Le slug doit être unique pour la langue choisie.
            </DialogDescription>
          </DialogHeader>

          <form
            key={editing?.id ?? 'new'}
            className="space-y-4"
            action={(fd) => {
              startTransition(async () => {
                await upsertPostAction(fd);
                setOpen(false);
                setEditing(null);
                refresh();
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
              <Field label="Titre" htmlFor="title" required hint="Titre affiché sur le site et en SEO.">
                <Input id="title" name="title" required defaultValue={editing?.title} placeholder="Ex. Playbook Edge 2026" />
              </Field>
              <Field label="Slug URL" htmlFor="slug" required hint="Identifiant URL, sans espaces (ex. edge-playbook-2026).">
                <Input id="slug" name="slug" required defaultValue={editing?.slug} placeholder="edge-playbook-2026" />
              </Field>
              <Field label="Catégorie" htmlFor="category">
                <Input id="category" name="category" defaultValue={editing?.category} placeholder="Tech & Souveraineté" />
              </Field>
              <Field label="Auteur" htmlFor="author">
                <Input id="author" name="author" defaultValue={editing?.author} placeholder="Okapi Edge" />
              </Field>
              <Field label="Date affichée" htmlFor="date_label" hint="Libellé libre, localisé (ex. 12 Mars 2026).">
                <Input id="date_label" name="date_label" defaultValue={editing?.date_label} placeholder="12 Mars 2026" />
              </Field>
              <Field label="Temps de lecture" htmlFor="read_time">
                <Input id="read_time" name="read_time" defaultValue={editing?.read_time ?? '5 min'} placeholder="6 min" />
              </Field>
              <Field label="URL de l’image" htmlFor="image" hint="Optionnel — image de couverture.">
                <Input id="image" name="image" defaultValue={editing?.image ?? ''} placeholder="https://…" />
              </Field>
            </div>

            <Field label="Tags" htmlFor="tags" hint="Séparés par des virgules.">
              <Input
                id="tags"
                name="tags"
                defaultValue={(editing?.tags ?? []).join(', ')}
                placeholder="Edge, RGPD, Architecture"
              />
            </Field>

            <Field label="Extrait" htmlFor="excerpt" required hint="Résumé court pour listes et meta description.">
              <Textarea id="excerpt" name="excerpt" required rows={2} defaultValue={editing?.excerpt} />
            </Field>

            <Field label="Contenu" htmlFor="content" required hint="Corps de l’article (Markdown basique accepté).">
              <Textarea id="content" name="content" required rows={10} defaultValue={editing?.content} />
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
                Publier immédiatement sur le site
              </Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? 'Enregistrement…' : editing ? 'Enregistrer les modifications' : 'Créer l’article'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
