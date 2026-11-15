// One lightweight process serves prepared builds on their original loopback origins.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const entries = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon'};
for (const entry of entries) {
 const root=path.resolve(entry.root);
 http.createServer((req,res)=>{
  if(entry.api && req.url.startsWith('/api/')) {
   const proxy=http.request({host:'127.0.0.1',port:entry.api,path:req.url,method:req.method,headers:{...req.headers,host:`127.0.0.1:${entry.api}`}}, upstream=>{res.writeHead(upstream.statusCode,upstream.headers);upstream.pipe(res);});
   proxy.on('error',()=>{res.writeHead(502,{'Content-Type':'application/json'}).end(JSON.stringify({error:'Local demo API unavailable'}));});
   req.pipe(proxy); return;
  }
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400).end();return;}
  const requested=path.resolve(root,'.'+pathname);
  const relative=path.relative(root,requested);
  if(relative.startsWith('..') || relative.split(path.sep).some(s=>s.startsWith('.'))) {res.writeHead(403).end();return;}
  let file=requested;
  try {if(!fs.statSync(file).isFile()) file=path.join(root,'index.html');} catch {file=path.extname(requested)?null:path.join(root,'index.html');}
  if(!file || !fs.existsSync(file)) {res.writeHead(404).end();return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
 }).listen(entry.port,'127.0.0.1',()=>console.log(`${entry.name}: http://127.0.0.1:${entry.port}`));
}
