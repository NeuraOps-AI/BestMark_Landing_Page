import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon, type IconName } from '@/components/icon';
import { insights } from '@/lib/content';
import { PageIntro, Arrow } from '@/components/ui';
import { ContactCTA } from '@/components/cta';
export const metadata: Metadata = { title: 'Insights' };
export default function Insights() { return <><PageIntro label="THE LOCAL PERSPECTIVE" title="A city worth understanding." description="Location guides and practical perspectives to help you ask better questions about Hyderabad real estate." /><section className="container insight-grid">{insights.map((x, i) => <Link key={x.slug} href={`/insights/${x.slug}/`} className="insight-card" data-reveal><div className={`insight-art art-${i}`}><span><Icon name={(['compass', 'pin', 'shield'] as IconName[])[i]} size={52} /></span><svg viewBox="0 0 300 240" fill="none" aria-hidden="true"><ellipse cx="150" cy="140" rx="120" ry="80" stroke="currentColor" /><ellipse cx="150" cy="140" rx="85" ry="110" stroke="currentColor" /><path d="M0 220 300 30M20 240 300 90" stroke="currentColor" /></svg></div><div className="insight-copy"><span className="micro">{x.category}</span><h2>{x.title}</h2><p>{x.summary}</p><span className="text-link">Read the perspective <Arrow /></span></div></Link>)}</section><ContactCTA /></>; }
