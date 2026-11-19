const CACHE='eltravia-360-shell-v1';
const SHELL=['./','./index.html','./styles.css','./app.js','./core.mjs','./manifest.webmanifest','./favicon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('eltravia-360-')).map(k=>caches.delete(k)))),self.clients.claim()]));});
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',clone)).catch(()=>{});}return res;}).catch(async()=>await caches.match('./index.html')||Response.error()));return;
 }
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(res=>{if(res.ok&&url.pathname.startsWith(new URL(self.registration.scope).pathname)){const clone=res.clone();caches.open(CACHE).then(c=>c.put(request,clone)).catch(()=>{});}return res;})));
});
