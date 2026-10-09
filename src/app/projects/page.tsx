import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { ProjectGrid } from '@/components/projects';
import { ContactCTA } from '@/components/cta';
export const metadata: Metadata = { title: 'Selected projects' };
export default function Projects() { return <><PageIntro label="THE SELECTED COLLECTION" title="A place for your next chapter." description="Discover residential, villa and commercial projects across Hyderabad. Explore the address, then start a conversation about the details." /><section className="container listing-section"><ProjectGrid filterable /><p className="collection-note">Architectural renders are illustrative. Project details, availability and approvals should be confirmed before purchase.</p></section><ContactCTA /></>; }
