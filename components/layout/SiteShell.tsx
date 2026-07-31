'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { InvestorsModal } from '@/components/modals/InvestorsModal';

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInvestorsModalOpen, setIsInvestorsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
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
    <div className="min-h-screen bg-[var(--oe-bg)] text-[var(--oe-text)] flex flex-col font-body">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenInvestorsModal={() => setIsInvestorsModalOpen(true)}
      />
      <main className="flex-grow">{children}</main>
      <Footer onOpenInvestorsModal={() => setIsInvestorsModalOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <InvestorsModal
        isOpen={isInvestorsModalOpen}
        onClose={() => setIsInvestorsModalOpen(false)}
      />
    </div>
  );
}
