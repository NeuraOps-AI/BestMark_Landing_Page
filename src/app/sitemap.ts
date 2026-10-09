import type { MetadataRoute } from 'next';
import { projects, insights } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/projects/', '/services/', '/about/', '/insights/', '/contact/', '/privacy/', ...projects.map(p => `/projects/${p.slug}/`), ...insights.map(x => `/insights/${x.slug}/`)].map(path => ({ url: `https://bestmark.in${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 })); }
