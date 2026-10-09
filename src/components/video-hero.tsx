'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Arrow, Button } from './ui';

const scenes = [
  { title: 'Daylight', time: 0 },
  { title: 'City panorama', time: 5.15 },
  { title: 'Blue hour', time: 10.3 },
  { title: 'After dusk', time: 15.45 },
];

export function VideoHero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState('');
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(21.45);
  const [unavailable, setUnavailable] = useState(false);
  const active = position >= 15.45 ? 3 : position >= 10.3 ? 2 : position >= 5.15 ? 1 : 0;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSource(window.matchMedia('(max-width: 720px)').matches ? '/video/hero/skyline-mobile.mp4' : '/video/hero/skyline.mp4');
    setPlaying(!reduced.matches && !connection?.saveData);
    const stop = () => { if (reduced.matches) setPlaying(false); };
    reduced.addEventListener('change', stop);
    return () => reduced.removeEventListener('change', stop);
  }, []);

  useEffect(() => {
    const player = video.current;
    const target = section.current;
    if (!player || !target || !source) return;
    let visible = true;
    let cancelled = false;
    const sync = () => {
      if (playing && visible && !document.hidden) {
        void player.play().catch((error: DOMException) => {
          // Leaving the viewport can interrupt a pending play request. Keep the
          // visitor's playback preference so the film resumes when visible.
          if (!cancelled && error.name === 'NotAllowedError') setPlaying(false);
        });
      } else player.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(target);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { cancelled = true; observer.disconnect(); document.removeEventListener('visibilitychange', sync); player.pause(); };
  }, [playing, source]);

  function selectScene(index: number) {
    if (!video.current || unavailable) return;
    video.current.currentTime = scenes[index].time;
    setPosition(scenes[index].time);
  }

  return <section ref={section} className="cinematic-hero" aria-label="BestMark real estate sales and marketing">
    <div className="cinema-background" aria-hidden="true">
      <img src="/video/hero/poster.jpg" alt="" width="1600" height="900" fetchPriority="high" />
      {source && <video ref={video} src={source} className={ready && !unavailable ? 'is-ready' : ''} muted playsInline loop preload="metadata" tabIndex={-1}
        onLoadedData={() => setReady(true)} onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onTimeUpdate={e => setPosition(e.currentTarget.currentTime)} onError={() => { setUnavailable(true); setPlaying(false); }} />}
    </div>
    <div className="cinema-shade" aria-hidden="true" />
    <div className="cinema-content">
      <p className="cinema-eyebrow"><span />BESTMARK INFRA LLP / EST. 2009</p>
      <p className="cinema-role">HYDERABAD’S STRATEGIC SALES & MARKETING PARTNER</p>
      <h1><span className="cinema-headline-primary">We market real estate.</span><em>We drive sales.</em></h1>
      <p className="cinema-description">We help developers market and sell selected projects, and help investors find the right property across West and South Hyderabad.</p>
      <div className="cinema-actions"><Button href="/projects/">Explore our projects</Button><Link href="/contact/?project=Developer%20partnership" className="cinema-partner">Discuss your project <Arrow diagonal /></Link></div>
    </div>
    <div className="cinema-location"><span />WEST & SOUTH HYDERABAD</div>
    <div className="cinema-bottom">
      <div className="cinema-film-label"><span className="cinema-film-dot"/>HYDERABAD IN MOTION<small>City footage · Not project imagery</small></div>
      <div className="cinema-controls" aria-label="Skyline film controls">
        <div className="cinema-scenes">{scenes.map((scene, i) => <button key={scene.title} type="button" aria-label={`Show skyline scene ${i + 1}: ${scene.title}`} aria-pressed={active === i} disabled={unavailable || !ready} onClick={() => selectScene(i)}><span className="cinema-scene-number">0{i + 1}</span><span className="cinema-scene-title">{scene.title}</span><span className="cinema-progress"><span style={{ width: active === i ? `${Math.min(100, Math.max(0, (position - scene.time) / ((scenes[i + 1]?.time ?? duration) - scene.time) * 100))}%` : '0%' }}/></span></button>)}</div>
        <button type="button" className="cinema-play" disabled={unavailable || !ready} aria-label={playing ? 'Pause skyline video' : 'Play skyline video'} onClick={() => setPlaying(p => !p)}>{playing ? <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M5 4h3v12H5zm7 0h3v12h-3z"/></svg> : <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="m6 3 11 7-11 7z"/></svg>}</button>
      </div>
      <a className="cinema-scroll" href="#track-record" aria-label="Scroll to BestMark track record">SCROLL TO EXPLORE <span>↓</span></a>
    </div>
  </section>;
}
