const CACHE_NAME = 'petit-sudiste-v1';
const URLS = [
  '/petit-sudiste-tablette/tablette.html',
  '/petit-sudiste-tablette/jeux.html',
  '/petit-sudiste-tablette/sorties.html',
  '/petit-sudiste-tablette/menage.html',
  '/petit-sudiste-tablette/videos.html',
  '/petit-sudiste-tablette/data.json',
];

// Installation — mise en cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
  );
  self.skipWaiting();
});

// Activation — supprime les anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — réseau d'abord, cache en fallback
self.addEventListener('fetch', e => {
  // Ne pas cacher les requêtes externes (météo, emailjs...)
  if (!e.request.url.includes('mediapan.github.io') && 
      !e.request.url.includes('raw.githubusercontent.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Mettre à jour le cache avec la nouvelle version
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // Pas de réseau — utiliser le cache
        return caches.match(e.request);
      })
  );
});
