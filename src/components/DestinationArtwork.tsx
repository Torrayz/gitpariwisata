import type { ArtworkTheme } from '@/lib/destinations';

const PALETTES: Record<
  ArtworkTheme,
  { skyStart: string; skyEnd: string; sun: string; back: string; mid: string; front: string }
> = {
  volcanic: {
    skyStart: '#1e293b',
    skyEnd: '#c2410c',
    sun: '#fde68a',
    back: '#431407',
    mid: '#7c2d12',
    front: '#1c1917',
  },
  archipelago: {
    skyStart: '#0f172a',
    skyEnd: '#0f766e',
    sun: '#fef08a',
    back: '#115e59',
    mid: '#0d9488',
    front: '#134e4a',
  },
  heritage: {
    skyStart: '#292524',
    skyEnd: '#b45309',
    sun: '#fed7aa',
    back: '#57534e',
    mid: '#44403c',
    front: '#1c1917',
  },
  highland: {
    skyStart: '#142921',
    skyEnd: '#2e6f57',
    sun: '#ecfccb',
    back: '#1b4332',
    mid: '#2d6a4f',
    front: '#081c15',
  },
  lake: {
    skyStart: '#172554',
    skyEnd: '#0369a1',
    sun: '#e0f2fe',
    back: '#1e3a8a',
    mid: '#0284c7',
    front: '#0f172a',
  },
  coast: {
    skyStart: '#083344',
    skyEnd: '#0891b2',
    sun: '#fef9c3',
    back: '#155e75',
    mid: '#0e7490',
    front: '#164e63',
  },
};

export function DestinationArtwork({
  theme,
  label,
  className = 'h-44 w-full',
}: {
  theme: ArtworkTheme;
  label: string;
  className?: string;
}) {
  const palette = PALETTES[theme];
  const gradId = `sky-${theme}`;

  return (
    <svg
      viewBox="0 0 600 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Ilustrasi lanskap ${label}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyStart} />
          <stop offset="100%" stopColor={palette.skyEnd} />
        </linearGradient>
      </defs>
      <rect width="600" height="260" fill={`url(#${gradId})`} />
      <circle cx="470" cy="72" r="34" fill={palette.sun} fillOpacity="0.88" />
      <path
        d="M0 170 Q120 110 240 160 T480 140 L600 165 L600 260 L0 260 Z"
        fill={palette.back}
        fillOpacity="0.85"
      />
      <path
        d="M0 198 Q160 145 310 190 T600 178 L600 260 L0 260 Z"
        fill={palette.mid}
      />
      <path
        d="M0 225 Q180 202 360 222 T600 212 L600 260 L0 260 Z"
        fill={palette.front}
      />
    </svg>
  );
}
