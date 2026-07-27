const CACHE = 'son-daqui-francia-2026-v1-2-final-countdown-v4';
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon.svg",
  "./assets/son-daqui.jpg",
  "./assets/mondialfolk.gif",
  "./assets/mapa-routerra.png",
  "./assets/fonts/Abisinia-Regular.ttf",
  "./assets/places/beuzec.jpg",
  "./assets/places/evron.jpg",
  "./assets/places/galiza.jpg",
  "./assets/places/jard.jpg",
  "./assets/places/laval.jpg",
  "./assets/places/la-roche-sur-yon.jpg",
  "./assets/places/les-sables.jpg",
  "./assets/places/mont.jpg",
  "./assets/places/pontorson.jpg",
  "./assets/places/quimper.jpg",
  "./assets/places/saint.jpg",
  "./assets/places/villedieu.jpg",
  "./assets/festivals/prendre-air-evron.png",
  "./assets/festivals/la-roche-sur-yon-parade-2026.png",
  "./assets/festivals/vendee-folk-jard-sur-mer.jpg",
  "./assets/festivals/vendee-folk-st-avaugourd-des-landes.jpg",
  "./assets/docs/checklist-bretagne-26.pdf",
  "./assets/docs/itinerario-son-daqui.pdf",
  "./assets/docs/recomendacions-bretagne-26.pdf",
  "./assets/docs/road-book-galice-2026.pdf"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Para servizos externos como meteoroloxía ou xogos embebidos, mellor rede directa.
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(request).catch(() => new Response('', { status: 503, statusText: 'Offline' })));
    return;
  }

  // Navegación: se non hai rede, devolver index.html cacheado.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => response)
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto: cache-first con actualización en rede cando sexa posible.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
        return response;
      });
    })
  );
});
