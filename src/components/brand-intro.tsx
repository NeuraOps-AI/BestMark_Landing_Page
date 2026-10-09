'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './shell';

/** Replay on every homepage load; deep links go straight to their content. */
export function BrandIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (pathname !== '/') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || window.location.hash) { setVisible(false); return; }
    const timer = window.setTimeout(() => setVisible(false), 3400);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  if (!visible || pathname !== '/') return null;
  return <div className="brand-intro" aria-hidden="true">
    <div className="intro-curtain intro-curtain-top" /><div className="intro-curtain intro-curtain-bottom" />
    <div className="intro-composition">
      <span className="intro-coordinate">HYDERABAD / INDIA</span>
      <div className="intro-rule"><span /></div>
      <div className="intro-wordmark"><Logo /><span className="intro-caret" /></div>
      <p className="intro-signature">{'Real estate. Real conviction.'.split('').map((letter, i) => <span key={i} style={{ animationDelay: `${1100 + i * 24}ms` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}</p>
      <div className="intro-rule intro-rule-bottom"><span /></div>
      <span className="intro-est">EST. 2009 · A LONGER VIEW</span>
    </div>
    <span className="intro-corner intro-corner-left" /><span className="intro-corner intro-corner-right" />
  </div>;
}
