import type { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`oe-container ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`oe-section border-b border-[var(--oe-border)] ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl mb-8 sm:mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow ? (
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[var(--oe-accent)] mb-3 sm:mb-4">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[var(--oe-text)] leading-[1.15] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[var(--oe-text-secondary)] leading-relaxed font-body">
          {description}
        </p>
      ) : null}
    </div>
  );
}
