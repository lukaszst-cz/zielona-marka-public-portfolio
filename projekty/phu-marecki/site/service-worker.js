/* PHU Marecki PWA: site and app offline shell, versioned cache */
const CACHE_PREFIX = 'phu-marecki-pwa-';
const CACHE_NAME = CACHE_PREFIX + '2026-11-06-r2';
const OFFLINE_SHELL = [
  '/', '/index.html', '/app.html',
  '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png',
  '/merged-dynamics.css', '/merged-dynamics.js',
  '/dynamics-app.css', '/dynamics-app.js',
  '/assets/hero.jpg', '/assets/logo.png', '/assets/logo-header.png'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(async cache => {
    // One missing auxiliary image must not break the whole service worker.
    await Promise.all(OFFLINE_SHELL.map(url => cache.add(url).catch(() => {})));
  }));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(
    names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(c => c.put(request, copy)));
      }
      return response;
    }).catch(async () => {
      return await caches.match(request, {ignoreSearch:true}) ||
        await caches.match('/app.html') || await caches.match('/index.html') ||
        Response.error();
    }));
    return;
  }
  event.respondWith(caches.match(request, {ignoreSearch:true}).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(c => c.put(request, copy)));
      }
      return response;
    });
  }));
});
