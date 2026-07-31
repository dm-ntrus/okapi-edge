import type { ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export function ProductTile({
  href,
  name,
  subtitle,
  description,
  accent,
  icon,
}: {
  href: string;
  name: string;
  subtitle: string;
  description: string;
  accent: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-5 sm:p-7 md:p-8 transition-all duration-300 hover:border-[var(--oe-border-strong)] hover:bg-[var(--oe-surface-hover)] active:scale-[0.99] oe-tap"
    >
      <div>
        <div
          className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--oe-border)]"
          style={{ color: accent, backgroundColor: `${accent}14` }}
        >
          {icon}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-text-muted)] mb-3">
          {subtitle}
        </p>
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--oe-text)] tracking-tight mb-3">
          {name}
        </h3>
        <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed">{description}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[var(--oe-accent)]">
        <span>Découvrir</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
