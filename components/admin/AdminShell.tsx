'use client';

import { useEffect, useState, type ReactNode } from 'react';
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
  MapPin,
  UserRound,
  Scale,
  BookOpen,
  Menu,
  X,
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
  { href: '/admin/team', label: 'Équipe dirigeante', icon: UserRound },
  { href: '/admin/settings/about', label: 'Page À propos', icon: BookOpen },
  { href: '/admin/settings/contact', label: 'Adresses & contacts', icon: MapPin },
  { href: '/admin/settings/legal', label: 'Mentions légales', icon: Scale },
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
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof Inbox;
  exact?: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'oe-tap flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
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

function NavSections({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
      <div className="space-y-1">
        {CONTENT_NAV.map((item) => (
          <NavLink key={item.href} {...item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </div>
      <div>
        <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--oe-text-muted)]">
          Newsletter
        </p>
        <div className="space-y-1">
          {NEWSLETTER_NAV.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      <div>
        <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--oe-text-muted)]">
          Leads & contacts
        </p>
        <div className="space-y-1">
          {LEADS_NAV.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </nav>
  );
}

function ShellFooter({
  email,
  role,
  dbOk,
  onNavigate,
}: {
  email: string;
  role: string;
  dbOk: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="p-4 space-y-3 border-t border-[var(--oe-border)]">
      <div className="rounded-lg border border-[var(--oe-border)] bg-[var(--oe-surface)] p-3 space-y-2">
        <div className="text-xs text-[var(--oe-text-secondary)] truncate">{email}</div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{role}</Badge>
          <Badge variant={dbOk ? 'success' : 'warning'} className="gap-1">
            <Database className="h-3 w-3" />
            {dbOk ? 'Live' : 'Offline'}
          </Badge>
        </div>
      </div>
      <form action={logoutAction}>
        <Button type="submit" variant="ghost" className="w-full justify-start min-h-11">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </form>
      <Button asChild variant="outline" className="w-full min-h-11">
        <Link href="/fr" target="_blank" onClick={onNavigate}>
          <ExternalLink className="h-3.5 w-3.5" />
          Voir le site
        </Link>
      </Button>
    </div>
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('oe-scroll-lock', menuOpen);
    return () => document.body.classList.remove('oe-scroll-lock');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-dvh min-w-0 bg-[var(--oe-bg)] text-[var(--oe-text)] flex overflow-x-clip">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-[var(--oe-border)] bg-[var(--oe-bg-elevated)]">
        <div className="px-5 py-5">
          <div className="font-heading text-lg font-semibold tracking-tight text-[var(--oe-text)]">
            Okapi Edge
          </div>
          <p className="mt-1 text-xs text-[var(--oe-text-muted)]">Console d’administration</p>
        </div>
        <Separator />
        <NavSections pathname={pathname} />
        <ShellFooter email={email} role={role} dbOk={dbOk} />
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-40 border-b border-[var(--oe-border)] bg-[var(--oe-bg-elevated)]/95 backdrop-blur-md pt-[var(--oe-safe-top)]">
          <div className="px-3 py-2.5 flex items-center justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <div className="font-heading text-sm font-semibold truncate">Okapi Edge Admin</div>
              <div className="text-[10px] text-[var(--oe-text-muted)] truncate">{email}</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge variant={dbOk ? 'success' : 'warning'} className="gap-1">
                <Database className="h-3 w-3" />
                {dbOk ? 'Live' : 'Off'}
              </Badge>
              <button
                type="button"
                className="oe-tap oe-touch inline-flex items-center justify-center rounded-lg text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)]"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        {menuOpen ? (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
            />
            <div className="relative z-10 flex h-full w-[min(20rem,88vw)] flex-col border-r border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] pt-[var(--oe-safe-top)] pb-[var(--oe-safe-bottom)] shadow-2xl">
              <div className="px-4 py-4 flex items-center justify-between gap-2 border-b border-[var(--oe-border)]">
                <div>
                  <div className="font-heading text-base font-semibold">Navigation</div>
                  <p className="text-xs text-[var(--oe-text-muted)]">Console admin</p>
                </div>
                <button
                  type="button"
                  className="oe-tap oe-touch inline-flex items-center justify-center rounded-lg hover:bg-[var(--oe-surface-hover)]"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavSections pathname={pathname} onNavigate={() => setMenuOpen(false)} />
              <ShellFooter
                email={email}
                role={role}
                dbOk={dbOk}
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
          </div>
        ) : null}

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-auto pb-[max(1.5rem,var(--oe-safe-bottom))]">
          {children}
        </main>
      </div>
    </div>
  );
}
