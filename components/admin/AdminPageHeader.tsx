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
      <div className="space-y-2 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-[var(--oe-text)]">
            {title}
          </h1>
          <Badge variant={dbOk ? 'success' : 'warning'} className="shrink-0">
            <span className="sm:hidden">{dbOk ? 'Live' : 'Offline'}</span>
            <span className="hidden sm:inline">{dbOk ? 'SurrealDB connectée' : 'Mode hors-ligne'}</span>
          </Badge>
        </div>
        <p className="text-sm text-[var(--oe-text-secondary)] max-w-2xl leading-relaxed">{description}</p>
      </div>
      {actions ? (
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto sm:shrink-0 [&_button]:w-full sm:[&_button]:w-auto [&_a]:w-full sm:[&_a]:w-auto">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
