import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
const root = path.resolve('out');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.txt':'text/plain', '.webp':'image/webp', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.xml':'application/xml', '.woff2':'font/woff2', '.ttf':'font/ttf', '.png':'image/png', '.jpg':'image/jpeg', '.mp4':'video/mp4', '.mov':'video/quicktime' };
http.createServer(async (req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    const info=await stat(file);
    const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      let start=match?.[1]?Number(match[1]):0;
      let end=match?.[2]?Number(match[2]):info.size-1;
      if(match&&!match[1]&&match[2]){start=Math.max(0,info.size-Number(match[2]));end=info.size-1;}
      if(!match||start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}
      end=Math.min(end,info.size-1);
      res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${info.size}`});
      if(req.method==='HEAD')res.end();else createReadStream(file,{start,end}).pipe(res);
    }else{
      res.writeHead(200,{...headers,'Content-Length':info.size});
      if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);
    }
  }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}
}).listen(3000,'127.0.0.1',()=>console.log('BestMark static preview: http://127.0.0.1:3000'));
