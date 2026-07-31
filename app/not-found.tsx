import { Link } from '@/lib/i18n/navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--oe-bg)] text-[var(--oe-text)] flex flex-col items-center justify-center px-4">
      <p className="font-mono text-[var(--oe-accent)] text-sm mb-4">404</p>
      <h1 className="font-heading text-3xl font-bold mb-4">Page introuvable</h1>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-[var(--oe-accent)] text-[var(--oe-accent-ink)] font-semibold text-sm hover:bg-[var(--oe-accent-strong)] transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
