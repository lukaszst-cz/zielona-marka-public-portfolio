/* KORVIO ELEKTRO: lokalna powloka PWA publikacja aktualnej wersji. */
const CACHE_NAME='korvio-elektro-marketplace-2026-11-09-v2';
const PRECACHE=['./','./index.html','./gazetka.html','./marketplace.css','./magazine-base.css','./magazine.css','./marketplace.js','./app.js','./magazine.js','./products.js','./zielona-marka.js','./manifest.webmanifest','./assets/gazetka/electrician.webp','./assets/gazetka/cover.webp','./assets/brand/korvio-mark.svg','./brand-identity.css'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('eltravia-elektro-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith((async()=>{try{const res=await fetch(request);if(res.ok){const cache=await caches.open(CACHE_NAME);await cache.put(request,res.clone())}return res}catch(_){return await caches.match(request)||await caches.match('./index.html')}})());
 }else{
  event.respondWith((async()=>{const saved=await caches.match(request);if(!/\.(?:css|js|json|webmanifest|svg)$/i.test(new URL(request.url).pathname)&&saved)return saved;try{const res=await fetch(request);if(res.ok){const cache=await caches.open(CACHE_NAME);await cache.put(request,res.clone())}return res}catch(err){if(saved)return saved;throw err}})());
 }
});
