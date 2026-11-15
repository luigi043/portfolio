const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf'};
http.createServer((req,res) => {
 let requested;
 try { requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
 catch { res.writeHead(400).end(); return; }
 const file = path.resolve(root, '.' + (requested === '/' ? '/index.html' : requested));
 const relative = path.relative(root,file);
 if (relative.startsWith('..') || relative.split(path.sep).some(segment => segment.startsWith('.')) || requested.startsWith('/react-portfolio-candidate')) { res.writeHead(403).end(); return; }
 fs.stat(file,(err,stat) => {
  if(err || !stat.isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
 });
}).listen(5185,'127.0.0.1',()=>console.log('Static portfolio: http://127.0.0.1:5185'));
