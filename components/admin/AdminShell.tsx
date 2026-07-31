'use client';

import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Newspaper,
  Boxes,
  Inbox,
  LogOut,
  ExternalLink,
  Database,
  MessageSquare,
  Handshake,
  Users,
  Mail,
  Send,
  Building2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/lib/auth/actions';
import { Button } from '@/components/admin/ui/button';
import { Badge } from '@/components/admin/ui/badge';
import { Separator } from '@/components/admin/ui/separator';
import { cn } from '@/lib/utils';

const CONTENT_NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/posts', label: 'Articles blog', icon: FileText },
  { href: '/admin/jobs', label: 'Offres carrières', icon: Briefcase },
  { href: '/admin/press', label: 'Communiqués', icon: Newspaper },
  { href: '/admin/products', label: 'Produits SaaS', icon: Boxes },
];

const NEWSLETTER_NAV = [
  { href: '/admin/newsletter', label: 'Vue d’ensemble', icon: Mail, exact: true },
  { href: '/admin/newsletter/subscribers', label: 'Abonnés', icon: Users },
  { href: '/admin/newsletter/campaigns', label: 'Campagnes', icon: Send },
];

const LEADS_NAV = [
  { href: '/admin/inquiries/contact', label: 'Contact', icon: MessageSquare },
  { href: '/admin/inquiries/b2b', label: 'Partenariats & B2B', icon: Handshake },
  { href: '/admin/inquiries/investors', label: 'Investisseurs', icon: Building2 },
  { href: '/admin/inquiries', label: 'Toute l’inbox', icon: Inbox, exact: true },
];

function NavLink({
  href,
  label,
  icon: Icon,
  exact,
  pathname,
}: {
  href: string;
  label: string;
  icon: typeof Inbox;
  exact?: boolean;
  pathname: string;
}) {
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
        active
          ? 'bg-[var(--oe-accent-soft)] text-[var(--oe-accent-strong)] border border-[var(--oe-accent)]/25'
          : 'text-[var(--oe-text-secondary)] hover:bg-[var(--oe-surface-hover)] hover:text-[var(--oe-text)] border border-transparent',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

export function AdminShell({
  children,
  email,
  role,
  dbOk,
}: {
  children: ReactNode;
  email: string;
  role: string;
  dbOk: boolean;
}) {
  const pathname = usePathname();
  const mobileNav = [...CONTENT_NAV, ...NEWSLETTER_NAV, ...LEADS_NAV];

  return (
    <div className="min-h-dvh bg-[var(--oe-bg)] text-[var(--oe-text)] flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-[var(--oe-border)] bg-[var(--oe-bg-elevated)]">
        <div className="px-5 py-5">
          <div className="font-heading text-lg font-semibold tracking-tight text-[var(--oe-text)]">
            Okapi Edge
          </div>
          <p className="mt-1 text-xs text-[var(--oe-text-muted)]">Console d’administration</p>
        </div>
        <Separator />
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          <div className="space-y-1">
            {CONTENT_NAV.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </div>
          <div>
            <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--oe-text-muted)]">
              Newsletter
            </p>
            <div className="space-y-1">
              {NEWSLETTER_NAV.map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} />
              ))}
            </div>
          </div>
          <div>
            <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--oe-text-muted)]">
              Leads & contacts
            </p>
            <div className="space-y-1">
              {LEADS_NAV.map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} />
              ))}
            </div>
          </div>
        </nav>
        <div className="p-4 space-y-3 border-t border-[var(--oe-border)]">
          <div className="rounded-lg border border-[var(--oe-border)] bg-[var(--oe-surface)] p-3 space-y-2">
            <div className="text-xs text-[var(--oe-text-secondary)] truncate">{email}</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{role}</Badge>
              <Badge variant={dbOk ? 'success' : 'warning'} className="gap-1">
                <Database className="h-3 w-3" />
                {dbOk ? 'Live' : 'Offline'}
              </Badge>
            </div>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="ghost" className="w-full justify-start">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </form>
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/fr" target="_blank">
              <ExternalLink className="h-3.5 w-3.5" />
              Voir le site
            </Link>
          </Button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden border-b border-[var(--oe-border)] px-3 py-3 overflow-x-auto bg-[var(--oe-bg-elevated)]">
          <div className="flex gap-2 min-w-max">
            {mobileNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-[var(--oe-border)] px-3 py-1.5 text-xs text-[var(--oe-text-secondary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
