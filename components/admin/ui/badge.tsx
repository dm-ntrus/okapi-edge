import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--oe-accent-soft)] text-[var(--oe-accent-strong)]',
        secondary: 'border-[var(--oe-border)] bg-[var(--oe-bg-muted)] text-[var(--oe-text-secondary)]',
        success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
        warning: 'border-amber-500/25 bg-amber-500/10 text-amber-200',
        destructive: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
        outline: 'border-[var(--oe-border-strong)] text-[var(--oe-text-secondary)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
