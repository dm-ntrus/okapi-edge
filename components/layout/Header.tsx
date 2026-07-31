'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { OkapiLogo } from '@/components/brand/OkapiLogo';
import { SAAS_PRODUCTS } from '@/content/mock-data';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import {
  ChevronDown,
  Search,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Newspaper,
  Building,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenInvestorsModal: () => void;
}

const GROUP_PATHS = ['/vision', '/about', '/tech-sovereignty', '/careers', '/press'] as const;

export function Header({ onOpenSearch, onOpenInvestorsModal }: HeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGroupActive = GROUP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const closeMenus = () => {
    setMegaMenuOpen(false);
    setGroupDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const switchLocale = (nextLocale: 'fr' | 'en') => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    document.body.classList.toggle('oe-scroll-lock', mobileMenuOpen);
    return () => document.body.classList.remove('oe-scroll-lock');
  }, [mobileMenuOpen]);

  useEffect(() => {
    closeMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navClass = (active: boolean) =>
    `oe-tap px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      active ? 'text-[var(--oe-text)]' : 'text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)]'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--oe-border)] bg-[color-mix(in_srgb,var(--oe-bg)_88%,transparent)] backdrop-blur-xl pt-[var(--oe-safe-top)]">
      <div className="oe-container">
        <div className="flex h-14 sm:h-[4.25rem] items-center justify-between gap-3">
          <Link href="/" onClick={closeMenus} aria-label="Okapi Edge" className="oe-tap shrink-0">
            <OkapiLogo size="sm" showText className="sm:hidden" />
            <OkapiLogo size="md" showText className="hidden sm:inline-flex" />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            <Link href="/" className={navClass(pathname === '/')}>
              {t('nav_home')}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setGroupDropdownOpen(true)}
              onMouseLeave={() => setGroupDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
                className={`${navClass(isGroupActive)} inline-flex items-center gap-1`}
                aria-expanded={groupDropdownOpen}
              >
                {t('nav_group')}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${groupDropdownOpen ? 'rotate-180 text-[var(--oe-accent)]' : ''}`}
                />
              </button>

              {groupDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] p-1.5 shadow-2xl shadow-black/40">
                  {[
                    { href: '/vision', icon: Sparkles, label: t('nav_vision') },
                    { href: '/about', icon: Building, label: t('nav_about') },
                    { href: '/tech-sovereignty', icon: ShieldCheck, label: t('nav_tech') },
                    { href: '/careers', icon: Briefcase, label: t('nav_careers') },
                    { href: '/press', icon: Newspaper, label: t('nav_press') },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className="oe-tap flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--oe-text-secondary)] hover:bg-[var(--oe-surface-hover)] hover:text-[var(--oe-text)] transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-[var(--oe-accent)]" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <Link
                href="/ecosystem"
                className={`${navClass(pathname.startsWith('/ecosystem'))} inline-flex items-center gap-1`}
              >
                {t('nav_ecosystem')}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${megaMenuOpen ? 'rotate-180 text-[var(--oe-accent)]' : ''}`}
                />
              </Link>

              {megaMenuOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] p-4 sm:p-5 shadow-2xl shadow-black/50">
                  <div className="mb-4 flex items-end justify-between border-b border-[var(--oe-border)] pb-3 gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--oe-accent)]">
                        Solutions
                      </p>
                      <p className="font-heading text-sm font-semibold text-[var(--oe-text)] mt-1">
                        Plateformes enterprise
                      </p>
                    </div>
                    <Link
                      href="/ecosystem"
                      onClick={closeMenus}
                      className="oe-tap text-xs text-[var(--oe-accent)] inline-flex items-center gap-1 hover:text-[var(--oe-accent-strong)] shrink-0"
                    >
                      Tout voir <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {SAAS_PRODUCTS.map((prod) => (
                      <Link
                        key={prod.id}
                        href={PRODUCT_ROUTES[prod.id] ?? '/ecosystem'}
                        onClick={closeMenus}
                        className="oe-tap rounded-[var(--oe-radius)] border border-transparent px-3 py-3 hover:border-[var(--oe-border)] hover:bg-[var(--oe-surface-hover)] transition-colors"
                      >
                        <div className="font-heading text-sm font-semibold text-[var(--oe-text)]">{prod.name}</div>
                        <div className="mt-1 text-xs text-[var(--oe-text-muted)] line-clamp-2">
                          {prod.tagline}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className={navClass(pathname.startsWith('/blog'))}>
              {t('nav_blog')}
            </Link>
            <Link href="/contact" className={navClass(pathname.startsWith('/contact'))}>
              {t('nav_contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center rounded-full border border-[var(--oe-border)] p-0.5 text-xs font-mono">
              {(['fr', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => switchLocale(l)}
                  className={`oe-tap rounded-full px-2.5 py-1.5 uppercase transition-colors ${
                    locale === l
                      ? 'bg-white/10 text-[var(--oe-text)]'
                      : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenSearch}
              className="oe-tap oe-touch inline-flex items-center justify-center rounded-lg text-[var(--oe-text-secondary)] hover:bg-white/[0.05] hover:text-[var(--oe-text)] transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-4 w-4" />
            </button>

            <Button
              variant="secondary"
              size="md"
              className="hidden md:inline-flex h-10 px-3.5 text-xs"
              onClick={onOpenInvestorsModal}
            >
              {t('nav_investors')}
            </Button>

            <button
              type="button"
              className="oe-tap oe-touch lg:hidden inline-flex items-center justify-center rounded-lg text-[var(--oe-text)] hover:bg-white/[0.05]"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--oe-border)] pb-[max(1rem,var(--oe-safe-bottom))]">
            <nav className="py-3 space-y-0.5 max-h-[min(70vh,32rem)] overflow-y-auto" aria-label="Mobile">
              {[
                ['/', t('nav_home')],
                ['/vision', t('nav_vision')],
                ['/about', t('nav_about')],
                ['/tech-sovereignty', t('nav_tech')],
                ['/ecosystem', t('nav_ecosystem')],
                ['/careers', t('nav_careers')],
                ['/press', t('nav_press')],
                ['/blog', t('nav_blog')],
                ['/contact', t('nav_contact')],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenus}
                  className="oe-tap flex min-h-12 items-center rounded-lg px-3 text-base text-[var(--oe-text-secondary)] hover:bg-[var(--oe-surface-hover)] hover:text-[var(--oe-text)]"
                >
                  {label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  onOpenInvestorsModal();
                }}
                className="oe-tap flex min-h-12 w-full items-center rounded-lg px-3 text-base text-[var(--oe-accent)]"
              >
                {t('nav_investors')}
              </button>

              <div className="mt-3 flex items-center gap-2 px-3 pt-3 border-t border-[var(--oe-border)]">
                <span className="text-xs text-[var(--oe-text-muted)]">Langue</span>
                <div className="flex items-center rounded-full border border-[var(--oe-border)] p-0.5 text-xs font-mono">
                  {(['fr', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => switchLocale(l)}
                      className={`oe-tap rounded-full px-3 py-2 uppercase ${
                        locale === l ? 'bg-white/10 text-[var(--oe-text)]' : 'text-[var(--oe-text-muted)]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
