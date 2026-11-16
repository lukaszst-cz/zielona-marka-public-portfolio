/* ELTRAVIA ELEKTRO: lokalna powloka PWA publikacja aktualnej wersji. */
const CACHE_NAME='eltravia-pro-20261112-wordmark-clean-01';
const PRECACHE=['./','./index.html','./katalog.html','./gazetka.html','./landing.css','./landing.js','./catalog-pro.css','./catalog-pro.js','./eltravia-readability.css','./eltravia-continuity.js','./pro-brand-and-tools.css','./pro-cable-calculator.js','./assets/brand/eltravia-pro-emblem.svg','./marketplace.css','./magazine-base.css','./magazine.css','./marketplace.js','./app.js','./magazine.js','./products.js','./zielona-marka.js','./manifest.webmanifest','./assets/gazetka/electrician.webp','./assets/gazetka/cover.webp','./assets/brand/eltravia-helmet-clean-v2.webp','./assets/brand/eltravia-jacket-clean-v2.webp','./brand-20261112.css','./eltravia-unified-20261112.css','./assets/brand/eltravia-wordmark-light.svg','./brand-identity.css','./premium.css','./premium.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('eltravia-elektro-')||k.startsWith('eltravia-premium-')||k.startsWith('eltravia-pro-'))&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith((async()=>{try{const res=await fetch(request);if(res.ok){const cache=await caches.open(CACHE_NAME);await cache.put(request,res.clone())}return res}catch(_){return await caches.match(request)||await caches.match('./index.html')}})());
 }else{
  event.respondWith((async()=>{const isMutable=/\.(?:css|js|json|webmanifest)$/i.test(new URL(request.url).pathname);const saved=await caches.match(request);if(!isMutable&&saved)return saved;try{const res=await fetch(request);if(res.ok){const cache=await caches.open(CACHE_NAME);await cache.put(request,res.clone())}return res}catch(e){if(saved)return saved;throw e}})());
 }
});
