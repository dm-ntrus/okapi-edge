'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/i18n/navigation';
import { SAAS_PRODUCTS, BLOG_POSTS, JOB_OPENINGS } from '@/content/mock-data';
import { PRODUCT_ROUTES } from '@/lib/constants';
import { Search, X, ArrowRight, FileText, Briefcase, Box } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('oe-scroll-lock');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('oe-scroll-lock');
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase();
  const filteredProducts = SAAS_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
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

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-start justify-center bg-black/70 backdrop-blur-md sm:pt-16 sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Recherche"
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[80vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-[var(--oe-border)] bg-[var(--oe-bg-elevated)] shadow-2xl overflow-hidden pb-[var(--oe-safe-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-white/15 sm:hidden" />

        <div className="p-3 sm:p-4 border-b border-[var(--oe-border)] flex items-center gap-2 sm:gap-3">
          <Search className="w-5 h-5 text-[var(--oe-accent)] shrink-0" />
          <input
            type="search"
            autoFocus
            enterKeyHint="search"
            placeholder="Rechercher…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base text-[var(--oe-text)] placeholder-[var(--oe-text-muted)] focus:outline-none min-h-11"
          />
          <button
            type="button"
            onClick={onClose}
            className="oe-tap oe-touch inline-flex items-center justify-center rounded-lg text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)]"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-5">
          {filteredProducts.length > 0 && (
            <ResultGroup icon={Box} label="Plateformes" accent="text-[var(--oe-accent)]">
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
            <ResultGroup icon={FileText} label="Articles" accent="text-sky-400">
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
            <ResultGroup icon={Briefcase} label="Carrières" accent="text-amber-400">
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
                Aucun résultat pour « {query || '…'} ». Essayez Edu, POS, Pharma…
              </p>
            )}
        </div>
      </div>
    </div>
  );
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
        <Icon className="w-3.5 h-3.5" />
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
      <ArrowRight className="w-4 h-4 shrink-0 text-[var(--oe-text-muted)] group-hover:text-[var(--oe-accent)] group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
