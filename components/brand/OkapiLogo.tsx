'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
}

export function OkapiLogo({
  className = '',
  size = 'md',
  showText = true,
  showTagline = false,
}: LogoProps) {
  const uid = useId().replace(/:/g, '');

  const sizeMap = {
    sm: { icon: 28, text: 'text-sm', sub: 'text-[9px]', gap: 'gap-1.5' },
    md: { icon: 36, text: 'text-base', sub: 'text-[10px]', gap: 'gap-2' },
    lg: { icon: 48, text: 'text-xl', sub: 'text-[11px]', gap: 'gap-2.5' },
    xl: { icon: 64, text: 'text-2xl', sub: 'text-[12px]', gap: 'gap-3' },
  };

  const currentSize = sizeMap[size];
  const hideGrad = `okapi-hide-${uid}`;
  const creamGrad = `okapi-cream-${uid}`;
  const goldGrad = `okapi-gold-${uid}`;

  return (
    <div className={cn('inline-flex items-center select-none max-w-full', currentSize.gap, className)}>
      <div className="relative shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 block shrink-0 rounded-xl bg-[#241C16] p-1 ring-1 ring-[#C4A574]/35 shadow-[0_0_0_1px_rgba(245,240,232,0.06)] [max-width:none] [height:auto]"
          style={{ width: currentSize.icon, height: currentSize.icon }}
          aria-hidden
        >
          <defs>
            <linearGradient id={hideGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8DCC8" />
              <stop offset="55%" stopColor="#C4A574" />
              <stop offset="100%" stopColor="#8B5E3C" />
            </linearGradient>
            <linearGradient id={creamGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBF5" />
              <stop offset="100%" stopColor="#E8DCC8" />
            </linearGradient>
            <linearGradient id={goldGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E6C8" />
              <stop offset="100%" stopColor="#C4A574" />
            </linearGradient>
          </defs>

          <rect x="4" y="4" width="92" height="92" rx="14" fill="#1A1410" />

          <path
            d="M 15 40 H 35 L 42 48"
            stroke={`url(#${hideGrad})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="15" cy="40" r="3" fill="#C4A574" />
          <path
            d="M 10 58 H 30 L 38 65"
            stroke={`url(#${hideGrad})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="58" r="3" fill="#E8DCC8" />
          <path
            d="M 18 76 H 32 L 36 80"
            stroke={`url(#${hideGrad})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="18" cy="76" r="2.5" fill="#8B5E3C" />

          <path
            d="M 36 50 C 42 54, 48 56, 52 52"
            stroke={`url(#${hideGrad})`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 38 60 C 44 64, 50 66, 54 62"
            stroke={`url(#${hideGrad})`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 40 70 C 46 74, 52 76, 56 72"
            stroke={`url(#${hideGrad})`}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M 48 28 C 45 12, 54 8, 58 18 C 60 25, 56 32, 52 35 Z"
            fill={`url(#${creamGrad})`}
            opacity="0.95"
          />
          <path d="M 50 25 C 48 16, 53 12, 56 18 Z" fill="#5C3D2E" />
          <path
            d="M 58 26 C 60 14, 70 12, 68 22 C 67 28, 62 33, 58 35 Z"
            fill={`url(#${creamGrad})`}
            opacity="0.85"
          />

          <path
            d="M 52 35 C 58 36, 68 38, 76 46 C 82 52, 80 60, 74 62 C 68 64, 60 62, 56 58 C 50 52, 45 45, 42 38 Z"
            fill={`url(#${creamGrad})`}
          />
          <path d="M 72 52 C 78 54, 78 60, 72 62 C 68 63, 66 60, 68 56 Z" fill="#1A1410" />

          <ellipse cx="62" cy="44" rx="2.5" ry="3.5" fill="#1A1410" />
          <circle cx="63" cy="43" r="1" fill="#C4A574" />

          <polygon
            points="76,22 78,28 84,30 78,32 76,38 74,32 68,30 74,28"
            fill={`url(#${goldGrad})`}
          />
        </svg>
      </div>

      {showText ? (
        <div className="flex flex-col min-w-0 overflow-hidden">
          <div
            className={`font-heading font-semibold tracking-tight text-[var(--oe-text)] flex items-center gap-1 leading-none truncate ${currentSize.text}`}
          >
            <span>Okapi</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8DCC8] via-[#C4A574] to-[#A67C52]">
              Edge
            </span>
          </div>
          {showTagline ? (
            <span
              className={`font-mono text-[var(--oe-text-muted)] tracking-widest mt-1 ${currentSize.sub}`}
            >
              Global Edge Tech Group
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
