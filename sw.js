const staticCacheName = 'beta-cache-3';
const assets = [
  './',
  './favicon.ico',
  './index.html',
  './play.html',
  './path.html',
  './path-1.html',
  './path-5.html',
  './ext/style_index.css',
  './ext/style_play.css',
  './ext/style_path.css',
  './ext/Recursive-SemiBold-CASL=0-CRSV=1-MONO=0-slnt=0.ttf',
  './ext/RobotoMono-Regular.ttf',
  './ext/1.jpg',
  './ext/logo-head.png',
  './ext/dukhbhanjani.mp3'
];

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});