import ffmpeg from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const directory='public/video/perspective';
await mkdir(directory,{recursive:true});
const fontDirectory=path.resolve('public/fonts').replaceAll('\\','/');
const fontCache=path.resolve('.asset-cache/font-cache').replaceAll('\\','/');
const fontConfig=path.resolve('.asset-cache/perspective-fonts.conf');
await mkdir(fontCache,{recursive:true});
await writeFile(fontConfig,'<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd"><fontconfig><dir>'+fontDirectory+'</dir><cachedir>'+fontCache+'</cachedir></fontconfig>');
process.env.FONTCONFIG_FILE=fontConfig;
const {default:sharp}=await import('sharp');
const scenes=[
 {slug:'fortune-towers',area:'MALLAMPET',name:'Fortune Towers',category:'RESIDENTIAL / WEST HYDERABAD',exit:'ORR EXIT 4A',main:'.asset-cache/fortune-towers',detail:'.asset-cache/fortune-night',line:'A new view of urban living.',portrait:false},
 {slug:'the-harvest',area:'KOKAPET',name:'The Harvest',category:'COMMERCIAL / WEST HYDERABAD',exit:'ORR EXIT 1',main:'public/images/harvest.webp',detail:'public/images/harvest-cover.webp',line:'An address for your ambitions.',portrait:true},
 {slug:'lios-premium-villas',area:'TUKKUGUDA',name:'LIOS Premium Villas',category:'VILLAS / SOUTH HYDERABAD',exit:'ORR EXIT 14',main:'public/images/lios-villas.jpg',detail:'public/images/lios-street.webp',line:'A different pace of life.',portrait:true},
];
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
for(const [index,scene] of scenes.entries()){
 if(process.argv[2] && process.argv[2]!==scene.slug) continue;
 // Preserve source dimensions and proportions: no intermediate enlargement or square crop.
 const photo='data:image/jpeg;base64,'+(await sharp(scene.main).jpeg({quality:98}).toBuffer()).toString('base64');
 const inset='data:image/jpeg;base64,'+(await sharp(scene.detail).jpeg({quality:98}).toBuffer()).toString('base64');
 const child=spawn(ffmpeg,['-hide_banner','-loglevel','error','-f','image2pipe','-framerate','30','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','16','-pix_fmt','yuv420p','-movflags','+faststart','-y',directory+'/'+scene.slug+'-hd.mp4'],{stdio:['pipe','ignore','pipe']});
 let errors='';child.stderr.on('data',d=>errors+=d);
 const completion=once(child,'close');
 for(let frame=0;frame<240;frame++){
  const t=frame/30;
  const reveal=ease(t/1.3), title=ease(t/1.1), card=ease((t-.4)/1.6), route=ease((t-.6)/3.8);
  const mx=scene.portrait?422:348, mw=scene.portrait?344:564, mh=scene.portrait?444:408, my=scene.portrait?24:42;
  const cx=(scene.portrait?745:712)+(1-card)*16, cy=scene.portrait?225:220, cw=scene.portrait?180:200, ch=scene.portrait?205:224;
  const photoTravel=Math.sin(t/8*Math.PI)*3;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 960 540">
  <defs><clipPath id="main"><rect x="${mx}" y="${my}" width="${mw*(.94+.06*reveal)}" height="${mh}"/></clipPath><clipPath id="detail"><rect x="${cx}" y="${cy}" width="${cw}" height="${ch}"/></clipPath><linearGradient id="edge"><stop stop-color="#0b1c2b"/><stop offset="1" stop-color="#0b1c2b" stop-opacity="0"/></linearGradient></defs>
  <rect width="960" height="540" fill="#0b1c2b"/>
  <g clip-path="url(#main)"><image x="${mx-3}" y="${my-3-photoTravel}" width="${mw+6}" height="${mh+9}" preserveAspectRatio="xMidYMid slice" href="${photo}"/></g>
  ${!scene.portrait?`<rect x="${mx}" y="${my}" width="100" height="${mh}" fill="url(#edge)"/>`:''}
  <rect x="${mx}" y="${my}" width="${mw*(.94+.06*reveal)}" height="${mh}" fill="none" stroke="#dfc79e" stroke-opacity=".25" stroke-width=".5"/>
  <text x="38" y="118" font-family="Manrope" font-size="105" fill="#d6b785" opacity=".09">0${index+1}</text>
  <path d="M42 159H${42+115*(.5+.5*reveal)}" stroke="#d6b785" stroke-width="1.5"/>
  <text x="42" y="194" font-family="Manrope" font-size="10" letter-spacing="1.4" fill="#d6b785">${scene.category}</text>
  <g opacity="${.6+.4*title}" transform="translate(0 ${(1-title)*12})"><text x="40" y="258" font-family="Newsreader" font-weight="450" font-size="46" fill="#faf6ec">${scene.area.charAt(0)+scene.area.slice(1).toLowerCase()}</text><text x="42" y="297" font-family="Manrope" font-size="19" fill="#e7d5b5">${scene.name}</text><text x="42" y="331" font-family="Manrope" font-size="12" fill="#b6c1c9">${scene.line}</text></g>
  <g opacity="${.65+.35*card}"><rect x="${cx-4}" y="${cy-4}" width="${cw+8}" height="${ch+8}" fill="#0b1c2b"/><g clip-path="url(#detail)"><image x="${cx}" y="${cy}" width="${cw}" height="${ch}" preserveAspectRatio="xMidYMid slice" href="${inset}"/></g><rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" fill="none" stroke="#e9d9be" stroke-opacity=".7" stroke-width=".7"/></g>
  <path d="M42 490H918" stroke="#394753"/><path d="M42 490H${42+876*route}" stroke="#d6b785" stroke-width="1"/>
  ${[42,372,690].map((x,i)=>`<circle cx="${x}" cy="490" r="${i===1?3:2.5}" fill="${route>(x-42)/876?'#e6cf9f':'#61717d'}"/>`).join('')}
  <text x="42" y="477" font-family="Manrope" font-size="9" letter-spacing="1" fill="#d6b785">${scene.exit}</text><text x="372" y="477" font-family="Manrope" font-size="9" letter-spacing="1" fill="#d6b785">${scene.area}</text><text x="690" y="477" font-family="Manrope" font-size="9" letter-spacing="1" fill="#d6b785">${scene.name.toUpperCase()}</text>
  <text x="42" y="517" font-family="Manrope" font-size="8" letter-spacing="1" fill="#a5b4bf">DEVELOPER RENDERS / CONNECTION DIAGRAM, NOT A MAP</text>
  </svg>`;
  const png=await sharp(Buffer.from(svg)).png().toBuffer();
  if(frame===120)await writeFile(directory+'/'+scene.slug+'-hd.webp',await sharp(png).webp({quality:95}).toBuffer());
  if(!child.stdin.write(png))await once(child.stdin,'drain');
 }
 child.stdin.end(); const [code]=await completion;
 if(code!==0)throw new Error(errors);
 console.log('Rendered Full HD / 30 fps:',scene.slug);
}


