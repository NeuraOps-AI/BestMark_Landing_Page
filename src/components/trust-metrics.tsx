import Link from 'next/link';
import { Arrow, Eyebrow } from './ui';

export function TrustMetrics() {
  return <section className="trust-section container" id="track-record" aria-labelledby="trust-title">
    <div className="trust-heading" data-reveal>
      <div><Eyebrow>THE BESTMARK TRACK RECORD</Eyebrow><h2 id="trust-title">Experience you can<br /><em>build on.</em></h2></div>
      <p>Local knowledge. Lasting relationships.<br />On the ground in Hyderabad since 2009.</p>
    </div>
    <div className="trust-metrics">
      <div className="trust-metric" data-reveal><span className="trust-metric-index">01 / EXPERIENCE</span><p className="trust-number">17<span>+</span></p><h3>Years on the ground</h3><p className="trust-detail">Understanding Hyderabad, one address at a time.</p></div>
      <div className="trust-metric" data-reveal><span className="trust-metric-index">02 / VALUE MARKETED</span><p className="trust-number"><span className="trust-currency">₹</span>1,200<span className="trust-unit">Cr+</span></p><h3>Merchandise value marketed</h3><p className="trust-detail">Project marketing backed by a disciplined sales process.</p></div>
      <div className="trust-metric" data-reveal><span className="trust-metric-index">03 / PROJECTS</span><p className="trust-number">40<span>+</span></p><h3>Projects advised &amp; driven</h3><p className="trust-detail">Selected mandates. Dedicated attention.</p></div>
    </div>
    <div className="trust-bottom"><span>BESTMARK INFRA LLP · EST. 2009</span><Link className="text-link" href="/about/">The story behind the numbers <Arrow diagonal /></Link></div>
  </section>;
}
