'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { SAAS_PRODUCTS, BLOG_POSTS, JOB_OPENINGS } from '@/content/mock-data';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { Search, X, ArrowRight, FileText, Briefcase, Box } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const t = useTranslations('search');
  const tA11y = useTranslations('a11y');
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

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
    router.push(path);
    onClose();
  };

  const node = (
    <div
      className="fixed inset-0 z-[10050] flex items-end sm:items-start justify-center bg-black/75 sm:pt-20 sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tA11y('searchDialog')}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[80vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] shadow-2xl overflow-hidden pb-[var(--oe-safe-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-white/15 sm:hidden" />

        <div className="p-3 sm:p-4 border-b border-[var(--oe-border)] flex items-center gap-2 sm:gap-3">
          <Search className="w-5 h-5 text-[var(--oe-accent)] shrink-0 pointer-events-none" />
          <input
            type="search"
            autoFocus
            enterKeyHint="search"
            placeholder={t('placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base text-[var(--oe-text)] placeholder-[var(--oe-text-muted)] focus:outline-none min-h-11"
            aria-label={tA11y('search')}
          />
          <button
            type="button"
            onClick={onClose}
            className="oe-tap inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)]"
            aria-label={tA11y('close')}
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-5">
          {filteredProducts.length > 0 && (
            <ResultGroup icon={Box} label={t('groups.platforms')} accent="text-[var(--oe-accent)]">
              {filteredProducts.map((p) => (
                <ResultItem
                  key={p.id}
                  title={`${p.name} — ${p.subtitle}`}
                  subtitle={p.description}
                  onClick={() => go(PRODUCT_ROUTES[p.id] || '/ecosystem')}
                />
              ))}
            </ResultGroup>
          )}

          {filteredPosts.length > 0 && (
            <ResultGroup icon={FileText} label={t('groups.articles')} accent="text-sky-400">
              {filteredPosts.map((post) => (
                <ResultItem
                  key={post.id}
                  title={post.title}
                  subtitle={`${post.category} • ${post.date}`}
                  onClick={() => go(`/blog/${post.slug}`)}
                />
              ))}
            </ResultGroup>
          )}

          {filteredJobs.length > 0 && (
            <ResultGroup icon={Briefcase} label={t('groups.careers')} accent="text-amber-400">
              {filteredJobs.map((j) => (
                <ResultItem
                  key={j.id}
                  title={j.title}
                  subtitle={`${j.department} • ${j.location}`}
                  onClick={() => go('/careers')}
                />
              ))}
            </ResultGroup>
          )}

          {filteredProducts.length === 0 &&
            filteredPosts.length === 0 &&
            filteredJobs.length === 0 && (
              <p className="text-center py-10 text-sm text-[var(--oe-text-muted)] px-4">
                {t('noResults', { query: query || '…' })}
              </p>
            )}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}

function ResultGroup({
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
      <div className={`text-[11px] font-mono uppercase mb-2 flex items-center gap-2 ${accent}`}>
        <Icon className="w-3.5 h-3.5 pointer-events-none" />
        <span>{label}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ResultItem({
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
      className="oe-tap w-full text-left min-h-14 p-3 rounded-xl hover:bg-[var(--oe-surface-hover)] active:bg-white/[0.06] flex items-center justify-between gap-3 group transition-colors"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold text-[var(--oe-text)] group-hover:text-[var(--oe-accent-strong)] line-clamp-2">
          {title}
        </div>
        <div className="text-xs text-[var(--oe-text-muted)] line-clamp-2 mt-0.5">{subtitle}</div>
      </div>
      <ArrowRight className="w-4 h-4 shrink-0 text-[var(--oe-text-muted)] pointer-events-none group-hover:text-[var(--oe-accent)]" />
    </button>
  );
}
