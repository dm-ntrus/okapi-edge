'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { upsertProductAction, deleteProductAction } from '@/lib/admin/actions';
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

export type AdminProduct = {
  id: string;
  locale?: string;
  key: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string;
  full_description: string;
  tags?: string[];
  metrics?: { label: string; value: string }[];
  features?: { title: string; desc: string; icon: string }[];
  subdomain_url: string;
  badge: string;
  color: string;
  bg_gradient: string;
  published: boolean;
  sort_order: number;
};

function metricsToText(metrics?: { label: string; value: string }[]) {
  return (metrics ?? []).map((m) => `${m.label}|${m.value}`).join('\n');
}

function featuresToText(features?: { title: string; desc: string; icon: string }[]) {
  return (features ?? []).map((f) => `${f.title}|${f.desc}|${f.icon}`).join('\n');
}

export function ProductsCrud({ products, dbOk }: { products: AdminProduct[]; dbOk: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <AdminPageHeader
        title="Produits SaaS"
        description="Portfolio dynamique affiché sur l’accueil et l’écosystème. Une fiche par langue (clé + locale)."
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
              Nouveau produit
            </Button>
          ) : null
        }
      />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Langue</TableHead>
              <TableHead>Clé</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Ordre</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-medium text-[var(--oe-text)]">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{(p.locale ?? 'fr').toUpperCase()}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-[var(--oe-text-secondary)]">{p.key}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.sort_order}</TableCell>
                <TableCell>
                  <Badge variant={p.published ? 'success' : 'warning'}>
                    {p.published ? 'Publié' : 'Brouillon'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {dbOk && String(p.id).includes(':') ? (
                    <div className="inline-flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditing(p);
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
                            await deleteProductAction(String(p.id));
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
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier le produit' : 'Créer un produit'}</DialogTitle>
            <DialogDescription>
              Métriques : une ligne <code className="text-[var(--oe-accent)]">Libellé|Valeur</code>. Fonctionnalités :{' '}
              <code className="text-[var(--oe-accent)]">Titre|Description|Icone</code>.
            </DialogDescription>
          </DialogHeader>
          <form
            key={editing?.id ?? 'new'}
            className="space-y-4"
            action={(fd) => {
              startTransition(async () => {
                await upsertProductAction(fd);
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
              <Field label="Clé technique" htmlFor="key" required hint="Identifiant stable (ex. okapi-edu).">
                <Input id="key" name="key" required defaultValue={editing?.key} placeholder="okapi-edu" />
              </Field>
              <Field label="Nom commercial" htmlFor="name" required>
                <Input id="name" name="name" required defaultValue={editing?.name} />
              </Field>
              <Field label="Sous-titre" htmlFor="subtitle">
                <Input id="subtitle" name="subtitle" defaultValue={editing?.subtitle} />
              </Field>
              <Field label="Catégorie" htmlFor="category">
                <Input id="category" name="category" defaultValue={editing?.category} />
              </Field>
              <Field label="Badge" htmlFor="badge">
                <Input id="badge" name="badge" defaultValue={editing?.badge} placeholder="Enterprise Suite" />
              </Field>
              <Field label="Couleur accent" htmlFor="color" hint="Code hexadécimal.">
                <Input id="color" name="color" defaultValue={editing?.color ?? '#22D3EE'} placeholder="#22D3EE" />
              </Field>
              <Field label="Ordre d’affichage" htmlFor="sort_order">
                <Input id="sort_order" name="sort_order" type="number" defaultValue={editing?.sort_order ?? 0} />
              </Field>
              <Field label="URL produit" htmlFor="subdomain_url">
                <Input id="subdomain_url" name="subdomain_url" defaultValue={editing?.subdomain_url} placeholder="https://edu.okapiedge.com" />
              </Field>
              <Field label="Dégradé fond" htmlFor="bg_gradient">
                <Input id="bg_gradient" name="bg_gradient" defaultValue={editing?.bg_gradient} />
              </Field>
            </div>
            <Field label="Tagline" htmlFor="tagline">
              <Input id="tagline" name="tagline" defaultValue={editing?.tagline} />
            </Field>
            <Field label="Tags" htmlFor="tags" hint="Séparés par des virgules.">
              <Input id="tags" name="tags" defaultValue={(editing?.tags ?? []).join(', ')} />
            </Field>
            <Field label="Description courte" htmlFor="description" required>
              <Textarea id="description" name="description" required rows={2} defaultValue={editing?.description} />
            </Field>
            <Field label="Description complète" htmlFor="full_description" required>
              <Textarea id="full_description" name="full_description" required rows={4} defaultValue={editing?.full_description} />
            </Field>
            <Field label="Métriques" htmlFor="metrics" hint="Format : Libellé|Valeur (une par ligne).">
              <Textarea
                id="metrics"
                name="metrics"
                rows={3}
                className="font-mono text-xs"
                defaultValue={metricsToText(editing?.metrics)}
                placeholder={'Satisfaction|98.5%\nDisponibilité|99.99%'}
              />
            </Field>
            <Field label="Fonctionnalités" htmlFor="features" hint="Format : Titre|Description|NomIconeLucide.">
              <Textarea
                id="features"
                name="features"
                rows={4}
                className="font-mono text-xs"
                defaultValue={featuresToText(editing?.features)}
                placeholder={'Analytics IA|Suivi en temps réel|BrainCircuit'}
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
                Visible sur le site public
              </Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer le produit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
