import Link from 'next/link';
import type { ReactNode } from 'react';
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'light' : ''}`}><span />{children}</p>;
}
export function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`button ${secondary ? 'secondary' : ''}`}>{children}<Arrow /></Link>;
}
export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return <section className="page-intro container"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p className="intro-copy">{description}</p></section>;
}
