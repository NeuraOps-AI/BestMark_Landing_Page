'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Arrow, Eyebrow } from './ui';
type Corridor = 'west' | 'south';
const locations = [
  { name: 'Fortune Towers', area: 'Mallampet', exit: 'Exit 4A', slug: 'fortune-towers', corridor: 'west', image: '/images/fortune-night.webp', detail: 'A new view of urban living.' },
  { name: 'The Harvest', area: 'Kokapet', exit: 'Exit 1', slug: 'the-harvest', corridor: 'west', image: '/images/harvest.webp', detail: 'An address for your ambitions.' },
  { name: 'LIOS Premium Villas', area: 'Tukkuguda', exit: 'Exit 14', slug: 'lios-premium-villas', corridor: 'south', image: '/images/lios-street.webp', detail: 'A different pace of life.' },
] as const;
export function CorridorMap() {
  const [corridor, setCorridor] = useState<Corridor>('west');
  const [selected, setSelected] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [position, setPosition] = useState(0);
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const project = locations[selected];
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: {saveData?:boolean} }).connection;
    setPlaying(!reduced.matches && !connection?.saveData);
    const preference = () => { if(reduced.matches) setPlaying(false); };
    reduced.addEventListener('change', preference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold:0.1});
    if(section.current) observer.observe(section.current);
    return () => { observer.disconnect(); reduced.removeEventListener('change', preference); };
  }, []);
  useEffect(() => {
    const player=video.current;
    if(!player) return;
    let cancelled=false;
    const sync=()=>{
      if(playing && visible && !document.hidden && !failed) void player.play().catch((error:DOMException)=>{if(!cancelled && error.name==='NotAllowedError')setPlaying(false);});
      else player.pause();
    };
    sync(); document.addEventListener('visibilitychange',sync);
    return ()=>{cancelled=true;player.pause();document.removeEventListener('visibilitychange',sync);};
  },[playing,visible,selected,failed]);
  function select(index:number) { if(index===selected){ if(video.current) video.current.currentTime=0; setPosition(0); return; } setSelected(index);setCorridor(locations[index].corridor);setReady(false);setFailed(false);setPosition(0); }
  function change(value:Corridor){ select(value==='west'?1:2); }
  function advance(){ if(corridor==='west')select(selected===1?0:1); else {if(video.current){video.current.currentTime=0;void video.current.play();}} }
  return <section ref={section} className="perspective-section" id="corridors" aria-labelledby="perspective-title"><div className="container">
    <div className="perspective-heading" data-reveal><div><Eyebrow light>THE CITY, IN PERSPECTIVE</Eyebrow><h2 id="perspective-title">Different places.<br/><em>Distinct possibilities.</em></h2></div><div className="perspective-intro"><p>Three project stories. Two Hyderabad corridors. Explore each address through its own architecture, spaces and character.</p><span>DISCOVER A PERSPECTIVE OF YOUR OWN</span></div></div>
    <div className="perspective-controls"><div className="perspective-tabs" aria-label="Choose a corridor"><button aria-pressed={corridor==='west'} onClick={()=>change('west')}><span>01</span> West Hyderabad</button><button aria-pressed={corridor==='south'} onClick={()=>change('south')}><span>02</span> South Hyderabad</button></div><span className="perspective-control-note">PROJECT STORIES / IN MOTION</span></div>
    <div className="perspective-film">
      <div className="perspective-film-top"><span>{corridor.toUpperCase()} HYDERABAD <i/> {project.area.toUpperCase()}</span><button onClick={()=>setPlaying(!playing)} disabled={failed} aria-label={playing?'Pause perspective film':'Play perspective film'}><span aria-hidden="true">{playing?'Ⅱ':'▷'}</span>{playing?'Pause film':'Play film'}</button></div>
      <div className="perspective-screen"><img src={`/video/perspective/${project.slug}-hd.webp`} alt={`${project.name} motion composition showing its developer renderings and ${project.area} location`} width="1920" height="1080" loading="lazy"/>{!failed && <video key={project.slug} ref={video} className={ready?'is-ready':''} src={`/video/perspective/${project.slug}-hd.mp4`} muted playsInline preload="none" tabIndex={-1} onLoadedData={()=>setReady(true)} onTimeUpdate={e=>setPosition(e.currentTarget.currentTime/8)} onEnded={advance} onError={()=>{setFailed(true);setPlaying(false);}}/>}</div>
      <div className="perspective-film-bottom"><div><span className="perspective-kicker">{project.area} · ORR {project.exit}</span><h3>{project.name}</h3><p>{project.detail}</p></div><Link className="perspective-explore" href={`/projects/${project.slug}/`}>Explore the project <Arrow diagonal/></Link></div>
      <div className="perspective-playback" aria-label="Film progress"><span style={{width:`${Math.min(100,position*100)}%`}}/></div>
    </div>
    <div className="perspective-projects" aria-label="Choose a project film">{locations.map((p,i)=><button key={p.slug} className={`perspective-project ${selected===i?'selected':''}`} aria-pressed={selected===i} onClick={()=>select(i)} aria-label={`Watch ${p.name} in ${p.area}`}><img src={p.image} alt="" width="100" height="100" loading="lazy"/><span><small>0{i+1} / {p.area}</small><strong>{p.name}</strong><span>{selected===i?'NOW SHOWING':'WATCH PROJECT STORY'}</span></span><Arrow diagonal/></button>)}</div>
    <div className="perspective-notes"><span>Developer architectural renders · Individual project visuals · Connection diagram is illustrative</span><Link href={`/insights/${corridor==='west'?'west-hyderabad':'south-hyderabad'}/`}>Explore the {corridor} corridor <Arrow/></Link></div>
  </div></section>;
}


