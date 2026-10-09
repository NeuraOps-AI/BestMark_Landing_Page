import {unlink} from 'node:fs/promises';
import path from 'node:path';
// Exclude source footage from the generated deployment; public originals are preserved.
const root=path.resolve('out/video');
for(const name of ['AdobeStock_2109443897.mov','AdobeStock_2099763362.mov','AdobeStock_2086329237.mov','AdobeStock_2100205545.mov']){
const target=path.resolve(root,name);if(!target.startsWith(root+path.sep))throw new Error('Invalid export path');
await unlink(target).catch(e=>{if(e.code!=='ENOENT')throw e;});}
