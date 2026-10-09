import type { CSSProperties } from 'react';

const paths = {
  home: 'M3 10.5 12 3l9 7.5M5 9v12h14V9M9 21v-7h6v7',
  buildings: 'M3 21V7h8v14M11 21V3h10v18M1 21h22M6 11h2m-2 4h2m7-8h3m-3 4h3m-3 4h3',
  compass: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5-4-2.5 5.5L8 16l2.5-5.5L16 8Z',
  chart: 'M4 3v18h17M8 16l4-5 4 2 5-7M17 6h4v4',
  shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6',
  key: 'M14 3a6 6 0 1 1-3 11l-7 7H1v-3l7-7a6 6 0 0 1 6-8Zm2 4h.01M5 17l2 2',
  target: 'M21 12a9 9 0 1 1-9-9M17 12a5 5 0 1 1-5-5m0 5 9-9m-5 0h5v5',
  flag: 'M5 22V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0',
  signal: 'M4 18v3m5-7v7m5-12v12m5-17v17',
  phone: 'm7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
} as const;
export type IconName = keyof typeof paths;

/** Shared optical size and stroke weight for all interface pictograms. */
export function Icon({ name, size = 24, badge = false, style }: { name: IconName; size?: number; badge?: boolean; style?: CSSProperties }) {
  const glyph = <svg className="brand-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} pathLength="1" /></svg>;
  return badge ? <span className="icon-badge" style={style}>{glyph}</span> : glyph;
}
