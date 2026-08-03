import * as React from 'react';
import { cn } from '@/lib/utils';

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-x-auto oe-table-wrap -mx-0">
      <table className={cn('w-full min-w-[40rem] caption-bottom text-sm', className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('[&_tr]:border-b [&_tr]:border-[var(--oe-border)]', className)} {...props} />
  );
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b border-[var(--oe-border)] transition-colors hover:bg-[var(--oe-surface-hover)]',
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'h-11 px-2 sm:px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-[var(--oe-text-muted)]',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-2 sm:px-4 py-3 sm:py-3.5 align-middle text-[var(--oe-text-secondary)]', className)} {...props} />
  );
}
