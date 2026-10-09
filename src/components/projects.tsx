'use client';
import Link from 'next/link';
import { useState } from 'react';
import { projects, type Project } from '@/lib/content';
import { Arrow } from './ui';
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <article className="project-card" data-reveal style={{ transitionDelay: `${index * 90}ms` }}><Link href={`/projects/${project.slug}/`} className="project-image" aria-label={`Explore ${project.name}`}><img src={project.image} alt={`${project.name} architectural render`} width="900" height="1000" loading="lazy" /><span className="project-type">{project.type}</span><span className="image-arrow"><Arrow diagonal /></span></Link><div className="project-copy"><p className="micro">{project.location} <span>·</span> {project.exit}</p><Link href={`/projects/${project.slug}/`}><h3>{project.name}</h3></Link><p>{project.details[0]}</p><Link className="text-link" href={`/projects/${project.slug}/`}>Discover the project <Arrow /></Link></div></article>;
}
export function ProjectGrid({ filterable = false }: { filterable?: boolean }) {
  const [filter, setFilter] = useState('All projects');
  const visible = projects.filter(p => filter === 'All projects' || p.type === filter);
  return <>{filterable && <div className="filter-bar" aria-label="Filter projects">{['All projects', 'Residences', 'Villas', 'Commercial'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}<span aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</span></div>}<div className="project-grid">{visible.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></>;
}
