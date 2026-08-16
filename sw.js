const CACHE = 'power-pwa-v5_0';
const ASSETS = [
  './',
  './index.html?v=5',
  './styles.css?v=5.0',
  './app.js?v=5.0',
  './manifest.webmanifest?v=5',
  './icon-192.png?v=5',
  './icon-512.png?v=5',
  './media/videos/squat.mp4',
  './media/videos/incline_pushup.mp4',
  './media/videos/glute_bridge.mp4',
  './media/videos/plank.mp4',
  './media/images/squat_triptych.png',
  './media/images/incline_triptych.png',
  './media/images/glute_triptych.png',
  './media/images/plank_triptych.png'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(()=>{}));
});
self.addEventListener('activate', event => {
  event.waitUntil((async ()=>{
    const names = await caches.keys();
    await Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async ()=>{
    try {
      const fresh = await fetch(event.request, {cache:'no-store'});
      const cache = await caches.open(CACHE);
      cache.put(event.request, fresh.clone());
      return fresh;
    } catch (err) {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return caches.match('./index.html?v=5');
    }
  })());
});
