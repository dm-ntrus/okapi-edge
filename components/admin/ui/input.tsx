import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-md border border-[var(--oe-border-strong)] bg-[var(--oe-surface)] px-3 py-2 text-base text-[var(--oe-text)] shadow-sm transition-colors placeholder:text-[var(--oe-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oe-accent)]/30 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
