'use client';

import { useEffect } from 'react';
import { getLocaleDir } from '@/lib/i18n/config';

/**
 * Syncs `<html lang>` and `dir` with the active public locale.
 * Root layout owns `<html>` (shared with /admin); this keeps document-level
 * locale attributes correct without nesting html elements.
 */
export function DocumentLocale({ locale }: { locale: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = getLocaleDir(locale);
    root.dataset.locale = locale;
  }, [locale]);

  return null;
}
