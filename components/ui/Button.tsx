import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-[var(--oe-accent)] text-[var(--oe-accent-ink)] hover:bg-[var(--oe-accent-strong)] shadow-[0_1px_0_rgba(92,61,46,0.12)]',
  secondary:
    'bg-transparent text-[var(--oe-text)] border border-[var(--oe-border-strong)] hover:bg-[var(--oe-surface-hover)] hover:border-[var(--oe-accent)]/40',
  ghost:
    'bg-transparent text-[var(--oe-text-secondary)] hover:text-[var(--oe-text)] hover:bg-[var(--oe-surface-hover)]',
};

const sizeClass: Record<Size, string> = {
  md: 'min-h-11 h-11 px-5 text-sm',
  lg: 'min-h-12 h-12 px-6 text-base sm:text-[0.9375rem]',
};

function buttonClass(variant: Variant, size: Size, className?: string) {
  return cn(
    'oe-tap inline-flex items-center justify-center gap-2 rounded-[var(--oe-radius)] font-heading font-semibold tracking-tight transition-all duration-200 ease-[var(--oe-ease)] disabled:opacity-50 disabled:pointer-events-none',
    variantClass[variant],
    sizeClass[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type="button" className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
