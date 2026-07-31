import type { ReactNode } from 'react';
import { Badge } from '@/components/admin/ui/badge';

export function AdminPageHeader({
  title,
  description,
  dbOk,
  actions,
}: {
  title: string;
  description: string;
  dbOk: boolean;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-[var(--oe-text)]">{title}</h1>
          <Badge variant={dbOk ? 'success' : 'warning'}>
            {dbOk ? 'SurrealDB connectée' : 'Mode hors-ligne'}
          </Badge>
        </div>
        <p className="text-sm text-[var(--oe-text-secondary)] max-w-2xl leading-relaxed">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
    </div>
  );
}
