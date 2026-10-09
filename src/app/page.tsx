import Link from 'next/link';
import { Icon } from '@/components/icon';
import { Arrow, Button, Eyebrow } from '@/components/ui';
import { ProjectGrid } from '@/components/projects';
import { CorridorMap } from '@/components/corridor';
import { ContactCTA } from '@/components/cta';
import { VideoHero } from '@/components/video-hero';
import { TrustMetrics } from '@/components/trust-metrics';
export default function Home() {
  return <>
    <VideoHero />
    <TrustMetrics />
    <section className="section container" id="projects"><div className="section-heading" data-reveal><div><Eyebrow>OUR CURRENT PROJECT MANDATES</Eyebrow><h2>Selected projects.<br /><em>Dedicated sales focus.</em></h2></div><div className="section-heading-side"><p>Residential apartments, premium villas and commercial offices. A limited portfolio, supported by dedicated marketing and sales.</p><Link href="/projects/" className="text-link">View all projects <Arrow /></Link></div></div><ProjectGrid /><p className="collection-note">Project imagery shows architectural renders. Ask our team for current availability and specifications.</p></section>
    <CorridorMap />
    <section className="section container expertise"><div className="section-heading" data-reveal><div><Eyebrow>WHAT BESTMARK DOES</Eyebrow><h2>For developers.<br /><em>For investors.</em></h2></div><p className="section-heading-side">We bring project sales, digital marketing, market intelligence and investor advisory together under one accountable partner.</p></div><div className="expertise-grid"><Link href="/services/#investors" className="expertise-card" data-reveal><div className="service-top"><span className="service-number">01</span><Icon name="home" size={29} badge /></div><span className="micro">FOR INVESTORS & BUYERS</span><h3>Find the property<br />that fits your plans.</h3><p>Curated property opportunities, corridor research and due diligence support, matched to your budget, investment horizon and risk appetite.</p><span className="text-link">Find your direction <Arrow /></span></Link><Link href="/services/#developers" className="expertise-card dark-card" data-reveal><div className="service-top"><span className="service-number">02</span><Icon name="buildings" size={29} badge /></div><span className="micro">FOR DEVELOPERS</span><h3>Take your project<br />from launch to sales.</h3><p>Project positioning, pricing strategy, digital campaigns, lead management and sales closures for selected developer mandates.</p><span className="text-link">Explore a partnership <Arrow /></span></Link></div></section>
    <section className="story-section container"><div className="story-image" data-reveal><img src="/images/lios-villas.webp" alt="LIOS villa architectural render" width="900" height="700" loading="lazy" /><span className="story-stamp">HYDERABAD<br /><strong>Since 2009</strong><span>LOCAL ROOTS. LONG VIEW.</span></span></div><div className="story-copy" data-reveal><Eyebrow>THE BESTMARK STORY</Eyebrow><h2>From consultancy<br />to strategic<br /><em>sales partner.</em></h2><p>Established in 2009, BestMark has grown from a Hyderabad real estate consultancy into a strategic marketing and sales partner for selected projects.</p><p>We combine local market knowledge with digital demand generation and a disciplined sales process, serving developers, experienced investors and a new generation of property buyers.</p><Link href="/about/" className="text-link">More about BestMark <Arrow /></Link></div></section>
    <ContactCTA />
  </>;
}
