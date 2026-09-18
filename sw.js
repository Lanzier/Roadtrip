const CACHE = 'model3-roadtrip-pwa-v7';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './config.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Let online map / navigation services use the network directly.
  if (url.hostname.includes('amap.com') || url.hostname.includes('autonavi.com')) return;

  event.respondWith(
    fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
  );
});
