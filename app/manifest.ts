import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Okapi Edge',
    description:
      'Enterprise application platforms and artificial intelligence systems for modern organizations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1410',
    theme_color: '#1a1410',
    lang: 'fr',
    icons: [
      {
        src: '/opengraph-image',
        sizes: '1200x630',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
