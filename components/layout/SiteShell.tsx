'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { SiteContact } from '@/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InvestorsModal } from '@/components/modals/InvestorsModal';

interface SiteShellProps {
  children: ReactNode;
  contact?: SiteContact | null;
}

export function SiteShell({ children, contact }: SiteShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInvestorsModalOpen, setIsInvestorsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('oe:toggle-search'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const investorsParam = searchParams.get('investors');
    if (investorsParam === '1' || pathname === '/investors') {
      setIsInvestorsModalOpen(true);
    }
  }, [pathname, searchParams]);

  return (
    <div className="min-h-screen min-w-0 bg-[var(--oe-bg)] text-[var(--oe-text)] flex flex-col font-body">
      <Header onOpenInvestorsModal={() => setIsInvestorsModalOpen(true)} />
      <main className="flex-grow min-w-0 w-full">{children}</main>
      <Footer onOpenInvestorsModal={() => setIsInvestorsModalOpen(true)} contact={contact} />
      <InvestorsModal
        isOpen={isInvestorsModalOpen}
        onClose={() => setIsInvestorsModalOpen(false)}
      />
    </div>
  );
}
