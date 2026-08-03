'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { OkapiLogo } from '@/components/brand/OkapiLogo';
import { SAAS_PRODUCTS, BLOG_POSTS, JOB_OPENINGS } from '@/content/mock-data';
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
  FileText,
  Box,
} from 'lucide-react';

interface HeaderProps {
  onOpenInvestorsModal: () => void;
}

const NAV_TOGGLE_ID = 'oe-nav-toggle';
const SEARCH_TOGGLE_ID = 'oe-search-toggle';

const GROUP_PATHS = ['/vision', '/about', '/tech-sovereignty', '/careers', '/press'] as const;

const GROUP_ITEMS = [
  { href: '/vision', icon: Sparkles, key: 'vision' as const },
  { href: '/about', icon: Building, key: 'about' as const },
  { href: '/tech-sovereignty', icon: ShieldCheck, key: 'tech' as const },
  { href: '/careers', icon: Briefcase, key: 'careers' as const },
  { href: '/press', icon: Newspaper, key: 'press' as const },
];

function closeToggle(id: string) {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (el) el.checked = false;
}

function closeAllOverlays() {
  closeToggle(NAV_TOGGLE_ID);
  closeToggle(SEARCH_TOGGLE_ID);
}

export function Header({ onOpenInvestorsModal }: HeaderProps) {
  const tNav = useTranslations('nav');
  const tA11y = useTranslations('a11y');
  const tMega = useTranslations('megaMenu');
  const tCommon = useTranslations('common');
  const tSearch = useTranslations('search');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState(false);
  const [query, setQuery] = useState('');

  const isGroupActive = GROUP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const switchLocale = (nextLocale: 'fr' | 'en') => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  // Close native overlays after client navigations
  useEffect(() => {
    closeAllOverlays();
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    if (isGroupActive) setMobileGroupOpen(true);
  }, [isGroupActive]);

  useEffect(() => {
    const onToggleSearch = () => {
      const el = document.getElementById(SEARCH_TOGGLE_ID) as HTMLInputElement | null;
      if (!el) return;
      el.checked = !el.checked;
    };
    window.addEventListener('oe:toggle-search', onToggleSearch);
    return () => window.removeEventListener('oe:toggle-search', onToggleSearch);
  }, []);

  const q = query.toLowerCase();
  const filteredProducts = SAAS_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
  const filteredPosts = BLOG_POSTS.filter(
    (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q),
  );
  const filteredJobs = JOB_OPENINGS.filter(
    (j) => j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q),
  );

  const go = (path: string) => {
    closeAllOverlays();
    router.push(path);
  };

  const navClass = (active: boolean) =>
    `oe-tap px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      active ? 'text-[var(--oe-text)]' : 'text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)]'
    }`;

  const iconBtn =
    'oe-tap inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl select-none [-webkit-user-select:none]';

  return (
    <>
      {/* Native toggles — open/close without React onClick (works on all mobile browsers) */}
      <input type="checkbox" id={NAV_TOGGLE_ID} className="peer/nav oe-native-toggle" />
      <input type="checkbox" id={SEARCH_TOGGLE_ID} className="peer/search oe-native-toggle" />

      <div className="pt-[var(--oe-safe-top)]" aria-hidden>
        <div className="h-14 sm:h-[4.25rem]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-[9999] border-b border-[var(--oe-border)] bg-[var(--oe-bg)] pt-[var(--oe-safe-top)]">
        <div className="oe-container min-w-0">
          <div className="flex h-14 sm:h-[4.25rem] items-center justify-between gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              onClick={closeAllOverlays}
              aria-label={tA11y('brand')}
              className="oe-tap min-w-0 shrink overflow-hidden"
            >
              <span className="block sm:hidden">
                <OkapiLogo size="sm" showText />
              </span>
              <span className="hidden sm:block">
                <OkapiLogo size="md" showText />
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label={tA11y('primaryNav')}>
              <Link href="/" className={navClass(pathname === '/')}>
                {tNav('home')}
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setGroupDropdownOpen(true)}
                onMouseLeave={() => setGroupDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setGroupDropdownOpen((v) => !v)}
                  className={`${navClass(isGroupActive)} inline-flex items-center gap-1`}
                  aria-expanded={groupDropdownOpen}
                >
                  {tNav('group')}
                  <ChevronDown
                    className={`h-3.5 w-3.5 pointer-events-none transition-transform ${
                      groupDropdownOpen ? 'rotate-180 text-[var(--oe-accent)]' : ''
                    }`}
                  />
                </button>

                {groupDropdownOpen ? (
                  <div className="absolute start-0 top-full mt-2 w-64 rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] p-1.5 shadow-2xl shadow-black/40">
                    {GROUP_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setGroupDropdownOpen(false)}
                        className="oe-tap flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--oe-text-secondary)] hover:bg-[var(--oe-surface-hover)] hover:text-[var(--oe-text)]"
                      >
                        <item.icon className="h-4 w-4 text-[var(--oe-accent)] pointer-events-none" />
                        {tNav(item.key)}
                      </Link>
                    ))}
                  </div>
                ) : null}
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
                  {tNav('ecosystem')}
                  <ChevronDown
                    className={`h-3.5 w-3.5 pointer-events-none transition-transform ${
                      megaMenuOpen ? 'rotate-180 text-[var(--oe-accent)]' : ''
                    }`}
                  />
                </Link>

                {megaMenuOpen ? (
                  <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] p-4 sm:p-5 shadow-2xl shadow-black/50">
                    <div className="mb-4 flex items-end justify-between border-b border-[var(--oe-border)] pb-3 gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--oe-accent)]">
                          {tMega('eyebrow')}
                        </p>
                        <p className="font-heading text-sm font-semibold text-[var(--oe-text)] mt-1">
                          {tMega('title')}
                        </p>
                      </div>
                      <Link
                        href="/ecosystem"
                        onClick={() => setMegaMenuOpen(false)}
                        className="oe-tap text-xs text-[var(--oe-accent)] inline-flex items-center gap-1 shrink-0"
                      >
                        {tMega('viewAll')} <ArrowRight className="h-3 w-3 pointer-events-none" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {SAAS_PRODUCTS.map((prod) => (
                        <Link
                          key={prod.id}
                          href={PRODUCT_ROUTES[prod.id] ?? '/ecosystem'}
                          onClick={() => setMegaMenuOpen(false)}
                          className="oe-tap rounded-[var(--oe-radius)] border border-transparent px-3 py-3 hover:border-[var(--oe-border)] hover:bg-[var(--oe-surface-hover)]"
                        >
                          <div className="font-heading text-sm font-semibold text-[var(--oe-text)]">
                            {prod.name}
                          </div>
                          <div className="mt-1 text-xs text-[var(--oe-text-muted)] line-clamp-2">
                            {prod.tagline}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <Link href="/blog" className={navClass(pathname.startsWith('/blog'))}>
                {tNav('blog')}
              </Link>
              <Link href="/contact" className={navClass(pathname.startsWith('/contact'))}>
                {tNav('contact')}
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
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

              {/* Native label — works even if React handlers fail */}
              <label
                htmlFor={SEARCH_TOGGLE_ID}
                className={`${iconBtn} text-[var(--oe-text-secondary)] hover:bg-white/[0.06] hover:text-[var(--oe-text)] active:bg-white/[0.1]`}
                aria-label={tA11y('search')}
              >
                <Search className="h-5 w-5 pointer-events-none" aria-hidden />
              </label>

              <div className="hidden md:block">
                <Button
                  variant="secondary"
                  size="md"
                  className="h-10 px-3.5 text-xs w-auto"
                  onClick={() => {
                    closeAllOverlays();
                    onOpenInvestorsModal();
                  }}
                >
                  {tNav('investors')}
                </Button>
              </div>

              <label
                htmlFor={NAV_TOGGLE_ID}
                className={`${iconBtn} border border-[var(--oe-border)] bg-[var(--oe-surface)] text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)] active:bg-[var(--oe-surface-hover)] lg:hidden`}
                aria-label={tA11y('openMenu')}
              >
                <Menu className="h-5 w-5 pointer-events-none" aria-hidden />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer — visibility via body:has(#oe-nav-toggle:checked) in globals.css */}
      <div className="oe-mobile-drawer fixed inset-0 z-[10000] flex-col">
        <label
          htmlFor={NAV_TOGGLE_ID}
          className="absolute inset-0 bg-black/70"
          aria-label={tA11y('closeMenu')}
        />
        <div className="absolute inset-x-0 bottom-0 top-[calc(3.5rem+var(--oe-safe-top))] flex flex-col border-t border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] pb-[var(--oe-safe-bottom)] sm:top-[calc(4.25rem+var(--oe-safe-top))]">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--oe-border)] px-4 py-3">
            <p className="font-heading text-sm font-semibold">{tA11y('mobileNav')}</p>
            <label
              htmlFor={NAV_TOGGLE_ID}
              className={`${iconBtn} border border-[var(--oe-border)]`}
              aria-label={tA11y('closeMenu')}
            >
              <X className="h-5 w-5 pointer-events-none" />
            </label>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-3" aria-label={tA11y('mobileNav')}>
            <Link
              href="/"
              onClick={closeAllOverlays}
              className="oe-tap flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[var(--oe-text)] active:bg-[var(--oe-surface-hover)]"
            >
              {tNav('home')}
            </Link>

            <div className="overflow-hidden rounded-lg border border-[var(--oe-border)]">
              <button
                type="button"
                onClick={() => setMobileGroupOpen((v) => !v)}
                className="oe-tap flex min-h-12 w-full items-center justify-between gap-2 px-3 text-base font-medium text-[var(--oe-text)] active:bg-[var(--oe-surface-hover)]"
                aria-expanded={mobileGroupOpen}
              >
                <span>{tNav('group')}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 pointer-events-none transition-transform ${
                    mobileGroupOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileGroupOpen ? (
                <div className="space-y-0.5 border-t border-[var(--oe-border)] bg-[var(--oe-surface)]/40 px-1.5 py-1.5">
                  {GROUP_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAllOverlays}
                      className="oe-tap flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-[var(--oe-text-secondary)] active:bg-[var(--oe-surface-hover)]"
                    >
                      <item.icon className="h-4 w-4 text-[var(--oe-accent)] pointer-events-none" />
                      {tNav(item.key)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              href="/ecosystem"
              onClick={closeAllOverlays}
              className="oe-tap flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[var(--oe-text)] active:bg-[var(--oe-surface-hover)]"
            >
              {tNav('ecosystem')}
            </Link>
            <Link
              href="/blog"
              onClick={closeAllOverlays}
              className="oe-tap flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[var(--oe-text)] active:bg-[var(--oe-surface-hover)]"
            >
              {tNav('blog')}
            </Link>
            <Link
              href="/contact"
              onClick={closeAllOverlays}
              className="oe-tap flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[var(--oe-text)] active:bg-[var(--oe-surface-hover)]"
            >
              {tNav('contact')}
            </Link>

            <div className="mt-2 space-y-2 border-t border-[var(--oe-border)] pt-3">
              <button
                type="button"
                onClick={() => {
                  closeAllOverlays();
                  onOpenInvestorsModal();
                }}
                className="oe-tap flex min-h-12 w-full items-center justify-center rounded-xl border border-[var(--oe-accent)]/35 bg-[var(--oe-accent-soft)] px-3 text-sm font-semibold text-[var(--oe-accent-strong)]"
              >
                {tNav('investors')}
              </button>

              <label
                htmlFor={SEARCH_TOGGLE_ID}
                onClick={() => closeToggle(NAV_TOGGLE_ID)}
                className="oe-tap flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--oe-border)] px-3 text-sm font-medium text-[var(--oe-text-secondary)] active:bg-[var(--oe-surface-hover)]"
              >
                <Search className="h-4 w-4 pointer-events-none" />
                {tA11y('search')}
              </label>

              <div className="flex items-center justify-between gap-3 px-1 pt-1">
                <span className="text-xs text-[var(--oe-text-muted)]">{tCommon('language')}</span>
                <div className="flex items-center rounded-full border border-[var(--oe-border)] p-0.5 text-xs font-mono">
                  {(['fr', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => switchLocale(l)}
                      className={`oe-tap min-h-10 rounded-full px-4 uppercase ${
                        locale === l ? 'bg-white/10 text-[var(--oe-text)]' : 'text-[var(--oe-text-muted)]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Search panel — visibility via body:has(#oe-search-toggle:checked) in globals.css */}
      <div className="oe-search-drawer fixed inset-0 z-[10050] items-end justify-center bg-black/75 sm:items-start sm:px-4 sm:pt-20">
        <label htmlFor={SEARCH_TOGGLE_ID} className="absolute inset-0" aria-label={tA11y('close')} />
        <div className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] pb-[var(--oe-safe-bottom)] shadow-2xl sm:max-h-[80vh] sm:max-w-2xl sm:rounded-2xl">
          <div className="mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-white/15 sm:hidden" />
          <div className="flex items-center gap-2 border-b border-[var(--oe-border)] p-3 sm:gap-3 sm:p-4">
            <Search className="h-5 w-5 shrink-0 text-[var(--oe-accent)] pointer-events-none" />
            <input
              type="search"
              enterKeyHint="search"
              placeholder={tSearch('placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-11 w-full bg-transparent text-base text-[var(--oe-text)] placeholder-[var(--oe-text-muted)] focus:outline-none"
              aria-label={tA11y('search')}
            />
            <label
              htmlFor={SEARCH_TOGGLE_ID}
              className={`${iconBtn} text-[var(--oe-text-muted)] hover:bg-[var(--oe-surface-hover)] hover:text-[var(--oe-text)]`}
              aria-label={tA11y('close')}
            >
              <X className="h-5 w-5 pointer-events-none" />
            </label>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-3 sm:p-4">
            {filteredProducts.length > 0 ? (
              <SearchGroup icon={Box} label={tSearch('groups.platforms')} accent="text-[var(--oe-accent)]">
                {filteredProducts.map((p) => (
                  <SearchItem
                    key={p.id}
                    title={`${p.name} — ${p.subtitle}`}
                    subtitle={p.description}
                    onClick={() => go(PRODUCT_ROUTES[p.id] || '/ecosystem')}
                  />
                ))}
              </SearchGroup>
            ) : null}

            {filteredPosts.length > 0 ? (
              <SearchGroup icon={FileText} label={tSearch('groups.articles')} accent="text-sky-400">
                {filteredPosts.map((post) => (
                  <SearchItem
                    key={post.id}
                    title={post.title}
                    subtitle={`${post.category} • ${post.date}`}
                    onClick={() => go(`/blog/${post.slug}`)}
                  />
                ))}
              </SearchGroup>
            ) : null}

            {filteredJobs.length > 0 ? (
              <SearchGroup icon={Briefcase} label={tSearch('groups.careers')} accent="text-amber-400">
                {filteredJobs.map((j) => (
                  <SearchItem
                    key={j.id}
                    title={j.title}
                    subtitle={`${j.department} • ${j.location}`}
                    onClick={() => go('/careers')}
                  />
                ))}
              </SearchGroup>
            ) : null}

            {filteredProducts.length === 0 &&
            filteredPosts.length === 0 &&
            filteredJobs.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-[var(--oe-text-muted)]">
                {tSearch('noResults', { query: query || '…' })}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

function SearchGroup({
  icon: Icon,
  label,
  accent,
  children,
}: {
  icon: typeof Box;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={`mb-2 flex items-center gap-2 font-mono text-[11px] uppercase ${accent}`}>
        <Icon className="h-3.5 w-3.5 pointer-events-none" />
        <span>{label}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SearchItem({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="oe-tap group flex min-h-14 w-full items-center justify-between gap-3 rounded-xl p-3 text-left transition-colors hover:bg-[var(--oe-surface-hover)] active:bg-white/[0.06]"
    >
      <div className="min-w-0">
        <div className="line-clamp-2 text-sm font-semibold text-[var(--oe-text)] group-hover:text-[var(--oe-accent-strong)]">
          {title}
        </div>
        <div className="mt-0.5 line-clamp-2 text-xs text-[var(--oe-text-muted)]">{subtitle}</div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-[var(--oe-text-muted)] pointer-events-none" />
    </button>
  );
}
