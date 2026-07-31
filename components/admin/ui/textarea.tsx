import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[96px] w-full rounded-md border border-[var(--oe-border-strong)] bg-[var(--oe-surface)] px-3 py-2 text-sm text-[var(--oe-text)] shadow-sm placeholder:text-[var(--oe-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oe-accent)]/30 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
