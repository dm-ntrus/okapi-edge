import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  title: {
    default: 'Admin',
    template: '%s | Okapi Edge Admin',
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return children;
}
