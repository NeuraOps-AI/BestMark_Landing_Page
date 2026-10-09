import ffmpeg from 'ffmpeg-static';
import {spawnSync} from 'node:child_process';
import {mkdir,stat} from 'node:fs/promises';
const files=['AdobeStock_2109443897.mov','AdobeStock_2099763362.mov','AdobeStock_2086329237.mov','AdobeStock_2100205545.mov'];
await mkdir('public/video/hero',{recursive:true});
function run(args){const r=spawnSync(ffmpeg,['-hide_banner','-loglevel','error',...args],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr);}
run(['-i','public/video/'+files[0],'-frames:v','1','-vf','scale=1600:900','-y','public/video/hero/poster.jpg']);
for(const [name,width,crf] of [['skyline',1600,24],['skyline-mobile',960,26]]){
const inputs=files.flatMap(f=>['-t','6','-i','public/video/'+f]);inputs.push('-loop','1','-t','0.85','-i','public/video/hero/poster.jpg');
const streams=Array.from({length:5},(_,i)=>`[${i}:v]scale=${width}:${width*9/16},setsar=1,fps=25,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS[v${i}]`);
const filters=[...streams,'[v0][v1]xfade=transition=fade:duration=0.85:offset=5.15[x1]','[x1][v2]xfade=transition=fade:duration=0.85:offset=10.3[x2]','[x2][v3]xfade=transition=fade:duration=0.85:offset=15.45[x3]','[x3][v4]xfade=transition=fade:duration=0.85:offset=20.6[out]'].join(';');
run([...inputs,'-filter_complex',filters,'-map','[out]','-an','-c:v','libx264','-preset','fast','-crf',String(crf),'-pix_fmt','yuv420p','-movflags','+faststart','-y',`public/video/hero/${name}.mp4`]);
console.log(name,Math.round((await stat(`public/video/hero/${name}.mp4`)).size/1024)+' KB');}
