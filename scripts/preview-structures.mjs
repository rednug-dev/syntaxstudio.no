import http from 'node:http';
import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
  try {
    const url = new URL(req.url,'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if(pathname==='/qa') {
      const width=Math.min(2560,Math.max(320,Number(url.searchParams.get('width'))||390));
      const height=Math.min(1200,Math.max(390,Number(url.searchParams.get('height'))||844));
      const route=url.searchParams.get('page')||'/en';
      const previewOrigin='http://localhost:3018';
      const src=new URL(route,previewOrigin);
      if(src.origin!==previewOrigin)throw new Error('Local preview only');
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex'});
      res.end(`<!doctype html><html><head><meta name="robots" content="noindex"><title>Syntax responsive review ${width}px</title><style>body{margin:0;background:#b6b0a6;font:12px Arial}p{margin:0;padding:12px;text-align:center}iframe{display:block;border:0;width:${width}px;height:${height}px;margin:auto;background:#e9e7e2}</style></head><body><p>Local review / ${width} × ${height} CSS pixels</p><iframe title="Syntax at ${width} pixels" src="${src.href.replaceAll('&','&amp;').replaceAll('"','&quot;')}"></iframe></body></html>`);return;
    }
    let file;
    if(pathname==='/') file=path.join(root,'docs/rebrand/structures.html');
    else if(pathname==='/rationale') file=path.join(root,'docs/rebrand/structural-exploration-2026-09.md');
    else if(pathname==='/font.woff2') {
      const names=await readdir(path.join(root,'.next/static/media'));
      const name=names.find(name=>name.startsWith('rP2Yp2ywxg089UriI5_g4vlH9VoD8Cmcqbu0_')&&name.endsWith('.woff2'));
      if(!name)throw new Error('Font unavailable');
      file=path.join(root,'.next/static/media',name);
    } else {
      file=path.resolve(root,'public',pathname.slice(1));
      if(!file.startsWith(path.join(root,'public')+path.sep))throw new Error('Outside public');
    }
    const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(3017,'127.0.0.1',()=>console.log('Structural studies: http://localhost:3017'));
