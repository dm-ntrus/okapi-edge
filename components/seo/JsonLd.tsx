import type { ReactNode } from 'react';

/** Safe JSON-LD script tag for search engines and AI crawlers. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // JSON-LD must not be escaped as HTML text content beyond JSON.stringify
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

export function JsonLdBlock({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
