import Link from 'next/link';
import {
  FileText,
  Briefcase,
  Newspaper,
  Boxes,
  Inbox,
  ArrowRight,
} from 'lucide-react';
import { getAdminStats } from '@/lib/db/queries';
import { isDbConfigured } from '@/lib/db/client';
import { ensureOwnerExists } from '@/lib/auth/actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Button } from '@/components/admin/ui/button';

const LINKS = [
  { href: '/admin/posts', label: 'Articles', key: 'posts' as const, icon: FileText },
  { href: '/admin/jobs', label: 'Offres', key: 'jobs' as const, icon: Briefcase },
  { href: '/admin/press', label: 'Presse', key: 'press' as const, icon: Newspaper },
  { href: '/admin/products', label: 'Produits', key: 'products' as const, icon: Boxes },
  { href: '/admin/inquiries', label: 'Nouveaux leads', key: 'newInquiries' as const, icon: Inbox },
];

const LEAD_SHORTCUTS = [
  { href: '/admin/inquiries/contact', label: 'Contact' },
  { href: '/admin/inquiries/b2b', label: 'Partenariats & B2B' },
  { href: '/admin/inquiries/investors', label: 'Investisseurs' },
  { href: '/admin/newsletter', label: 'Newsletter' },
];

export default async function AdminDashboardPage() {
  if (isDbConfigured()) {
    await ensureOwnerExists();
  }

  const stats = (await getAdminStats()) ?? {
    posts: 0,
    jobs: 0,
    press: 0,
    products: 0,
    newInquiries: 0,
  };

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        description="Vue d’ensemble du contenu CMS et des leads entrants. Utilisez la navigation pour créer, modifier ou publier."
        dbOk={isDbConfigured()}
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="group">
              <Card className="h-full transition-colors group-hover:border-[var(--oe-accent)]/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{item.label}</CardDescription>
                    <Icon className="h-4 w-4 text-[var(--oe-text-muted)]" />
                  </div>
                  <CardTitle className="text-3xl tabular-nums">{stats[item.key]}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Démarrage</CardTitle>
          <CardDescription>
            Workflow recommandé pour publier du contenu bilingue production-ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-[var(--oe-text-secondary)]">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Vérifiez que Surreal Cloud est connectée (badge vert ci-dessus).</li>
            <li>Créez ou éditez un article / produit dans la langue FR, puis dupliquez l’équivalent EN.</li>
            <li>Contrôlez le rendu sur <code className="text-[var(--oe-accent)]">/fr</code> et <code className="text-[var(--oe-accent)]">/en</code>.</li>
            <li>Traitez les leads dans la boîte de réception (statut Nouveau → En cours → Clos).</li>
          </ol>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild>
              <Link href="/admin/posts">
                Gérer le blog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/inquiries/contact">Ouvrir Contact</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/inquiries">Toute l’inbox</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {LEAD_SHORTCUTS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-xs text-[var(--oe-accent)]/80 hover:text-[var(--oe-accent)] underline-offset-2 hover:underline"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
