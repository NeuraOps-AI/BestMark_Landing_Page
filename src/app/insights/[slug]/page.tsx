import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insights } from '@/lib/content';
import { Eyebrow, Button } from '@/components/ui';
export function generateStaticParams() { return insights.map(x => ({ slug: x.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const x = insights.find(x => x.slug === slug); return { title: x?.title, description: x?.summary }; }
export default async function Insight({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const x = insights.find(x => x.slug === slug); if (!x) notFound(); return <article className="container article-page"><Link href="/insights/" className="back-link">← All insights</Link><Eyebrow>{x.category}</Eyebrow><h1>{x.title}</h1><p className="article-lead">{x.summary}</p><div className="article-body">{x.paragraphs.map(p => <p key={p}>{p}</p>)}<div className="article-callout"><h3>Put your plans in perspective.</h3><p>Discuss your requirements with BestMark’s Hyderabad team.</p><Button href="/contact/">Start a conversation</Button></div></div></article>; }
