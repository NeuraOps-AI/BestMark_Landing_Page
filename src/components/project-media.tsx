'use client';
import { useEffect, useId, useRef, useState } from 'react';
import type { ProjectImage } from '@/lib/project-information';
import { Arrow } from './ui';
function ImageDialog({ images, selected, onSelect, onClose }: { images: ProjectImage[]; selected: number | null; onSelect: (value: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => { if (selected !== null && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  const image = selected === null ? null : images[selected];
  function close() { dialog.current?.close(); onClose(); }
  function move(delta: number) { onSelect(((selected ?? 0) + delta + images.length) % images.length); }
  return <dialog ref={dialog} className="image-dialog" aria-labelledby={titleId} onClose={onClose} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}}}><div className="dialog-toolbar"><div><h2 id={titleId}>{image?.caption}</h2><p>{image?.kind}</p></div><button type="button" onClick={close} aria-label="Close image viewer" autoFocus>×</button></div>{image && <img src={image.src} alt={`${image.caption} — ${image.kind}`} />}<div className="dialog-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous image">←</button><span aria-live="polite">{(selected??0)+1} / {images.length}</span><button type="button" onClick={()=>move(1)} aria-label="Next image">→</button></div></dialog>;
}
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [selected,setSelected]=useState<number|null>(null);
  return <><div className="official-gallery">{images.map((image,index)=><button key={image.src} className="gallery-item" onClick={()=>setSelected(index)} aria-label={`View ${image.caption}`}><span className="gallery-photo"><img src={image.src} alt={`${image.caption} — ${image.kind}`} loading="lazy" width="1000" height="650"/><span className="image-arrow"><Arrow diagonal /></span></span><span className="gallery-caption">{image.caption}<span>{image.kind}</span></span></button>)}</div><ImageDialog images={images} selected={selected} onSelect={setSelected} onClose={()=>setSelected(null)}/></>;
}
export function FloorPlans({ images }: { images: ProjectImage[] }) {
  const [active,setActive]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  return <div className="floor-plan-browser"><div className="floor-plan-tabs" aria-label="Choose a project plan">{images.map((image,i)=><button key={image.src} aria-pressed={active===i} onClick={()=>setActive(i)}>{image.caption}</button>)}</div><button className="floor-plan-preview" onClick={()=>setSelected(active)} aria-label={`Enlarge ${images[active].caption} floor plan`}><img src={images[active].src} alt={`${images[active].caption} floor plan`} loading="lazy" width="900" height="1000"/><span>Enlarge floor plan <Arrow diagonal /></span></button><ImageDialog images={images} selected={selected} onSelect={setSelected} onClose={()=>setSelected(null)}/></div>;
}
