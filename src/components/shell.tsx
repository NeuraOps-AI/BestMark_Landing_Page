'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './ui';
import { contact } from '@/lib/content';
const links = [['Projects', '/projects/'], ['Our expertise', '/services/'], ['Our story', '/about/'], ['Insights', '/insights/']];
export function Logo() {
  return <span className="brand-lockup"><span className="logo-crop"><img src="/images/bestmark-logo-original.jpeg" alt="BestMark.in" width="1599" height="1132" /></span><span className="brand-caption">INFRA LLP · EST. 2009</span></span>;
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 30); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (e.key === 'Tab') {
        const items = [toggle.current, ...Array.from(nav.current?.querySelectorAll<HTMLAnchorElement>('a') || [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open]);
  return <header className={`header ${pathname === '/' ? 'header-overlay' : ''} ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}><div className="header-inner container"><Link href="/" aria-label="BestMark home" onClick={() => setOpen(false)}><Logo /></Link><button ref={toggle} className={`menu-toggle ${open ? 'open' : ''}`} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span /><span /></button><nav ref={nav} id="main-navigation" className={open ? 'is-open' : ''} aria-label="Main navigation">{links.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{name}</Link>)}<Link href="/contact/" className="nav-contact" onClick={() => setOpen(false)}>Let’s talk <Arrow diagonal /></Link></nav></div></header>;
}
export function Footer() {
  return <footer className="footer"><div className="container footer-top"><div><Link href="/" aria-label="BestMark home" className="footer-logo"><Logo /></Link><p>Real estate marketing.<br />Project sales & advisory.</p></div><div><span className="footer-label">EXPLORE</span>{links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</div><div><span className="footer-label">START A CONVERSATION</span><a href={`tel:${contact.tel}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><Link href="/contact/">Visit our Gachibowli office <Arrow diagonal /></Link></div><div><span className="footer-label">FIND US</span><p>{contact.address}</p><span className="office-hours">Monday–Saturday · 10am–7pm</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} BestMark Infra LLP</span><span>Hyderabad, with perspective.</span><Link href="/privacy/">Privacy & information</Link></div></footer>;
}
export function MotionObserver() {
  const path = usePathname();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
    const scan = () => {
      const cards = document.querySelectorAll<HTMLElement>('#main .project-card, #main .expertise-card, #main .insight-card, #main .values-grid article, #main .service-list article, #main .process-flow article, #main .contact-methods>div, #main .enquiry-form, #main .detail-facts, #main .perspective-project, #main .perspective-film');
      cards.forEach(el => {
        el.dataset.reveal = '';
        el.dataset.motionCard = '';
        if (!el.style.transitionDelay) {
          const siblings = Array.from(el.parentElement?.children || []);
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 3) * 70}ms`;
        }
      });
      document.querySelectorAll<HTMLElement>('#main h1, #main h2, #main h3, #main p, #main .enquiry-form, #main .detail-facts').forEach(el => {
        if (!el.closest('[data-reveal], .cinematic-hero')) el.dataset.reveal = '';
      });
      document.querySelectorAll('[data-reveal]:not(.in-view)').forEach(el => observer.observe(el));
    };
    scan();
    const changes = new MutationObserver(scan);
    changes.observe(document.getElementById('main')!, { childList: true, subtree: true });
    return () => { observer.disconnect(); changes.disconnect(); };
  }, [path]);
  return null;
}
