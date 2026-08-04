import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/constants';

export const runtime = 'edge';
export const alt = `${SITE_NAME} — Enterprise Software & Distributed AI`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(145deg, #1a1410 0%, #2a211a 45%, #1a1410 100%)',
          color: '#f5f0e8',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#c4a574',
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Enterprise Software. Distributed Systems & AI.
          </div>
          <div style={{ fontSize: 28, color: '#c4b5a5', lineHeight: 1.35 }}>
            Application platforms and intelligence systems for modern organizations.
          </div>
        </div>
        <div style={{ fontSize: 22, color: '#8a7a6a' }}>okapiedge.com</div>
      </div>
    ),
    { ...size },
  );
}
