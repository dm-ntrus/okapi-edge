import * as React from 'react';
import { Label } from '@/components/admin/ui/label';
import { cn } from '@/lib/utils';

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required ? <span className="text-rose-400" aria-hidden>*</span> : null}
      </Label>
      {children}
      {hint ? <p className="text-xs text-[var(--oe-text-muted)] leading-relaxed">{hint}</p> : null}
    </div>
  );
}
