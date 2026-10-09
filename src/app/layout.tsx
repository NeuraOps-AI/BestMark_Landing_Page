import type { Metadata } from 'next';
import { Header, Footer, MotionObserver } from '@/components/shell';
import { BrandIntro } from '@/components/brand-intro';
import './globals.css';
import './typography.css';
import './hero-layout.css';
import './brand-intro.css';
import './gradient-theme.css';
import './card-design.css';
import './spacing.css';
import './responsive.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://bestmark.in'),
  title: { default: 'BestMark | Real Estate Sales & Marketing, Hyderabad', template: '%s | BestMark' },
  description: 'BestMark Infra LLP is a strategic real estate sales and marketing partner offering project mandates, digital marketing and investor advisory across West and South Hyderabad.',
  openGraph: { title: 'BestMark | Real Estate Sales & Marketing, Hyderabad', description: 'Project sales, digital marketing and investor advisory across West and South Hyderabad.', images: ['/images/fortune-towers.webp'], type: 'website', locale: 'en_IN' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/fonts/newsreader-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/manrope-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><a href="#main" className="skip-link">Skip to content</a><BrandIntro /><Header /><main id="main">{children}</main><Footer /><MotionObserver /></body></html>;
}


