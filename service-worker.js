const cacheName = 'dreampop-cache-v1';
const assets = [
  'index.html',
  'manifest.json',
  'style.css',        // optional, if you create CSS separately
  'app.js',           // optional, if you create JS separately
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key!==cacheName).map(key => caches.delete(key)))));
});
