const CACHE_MAIN = 'main1742764495104';
const precacheList = [
  
  '/',
  '/2025/a-crash-course-on-crises.html',
  '/2024/beyond-weird.html',
  '/2024/after-everything-bubble.html',
  '/2024/battle-of-nagashino.html',
  '/2024/introduction-to-animal-psychology.html',
  '/2024/origin-of-samurai-goverment.html',
  '/2022/npm-script-warns-permission-errors-in-the-cache-directory.html',
  '/2024/the-book-of-why.html',
  '/2022/Unexpected-reserved-word-interface-on-jest.html',
  '/2022/the-two-ways-to-use-autocomplete-attribute.html',
  '/assets/images/broken_piggy_bank/broken_piggy_bank.svg',
  '/assets/images/generated-image-of-beyond-weird/generated-image-of-beyond-weird.svg',
  '/assets/images/generated-image-of-after-everything-bubble/generated-image-of-after-everything-bubble.svg',
  '/assets/images/generated-image-of-battle-of-nagashino-2/generated-image-of-battle-of-nagashino-2.svg',
  '/assets/images/generated-image-of-introduction-animal-psychology/generated-image-of-introduction-animal-psychology.svg',
  '/assets/images/generated-image-of-origin-of-samurai/generated-image-of-origin-of-samurai.svg',
  '/assets/images/pavan-prasad-nw1slFnKRYE-unsplash/pavan-prasad-nw1slFnKRYE-unsplash.svg',
  '/assets/images/generated-image-of-the-book-of-why/generated-image-of-the-book-of-why.svg',
  '/assets/images/glen-carrie-gsPnE6rMRns-unsplash/glen-carrie-gsPnE6rMRns-unsplash.svg',
  '/assets/images/craig-manners-vtG_gpJn9OM-unsplash/craig-manners-vtG_gpJn9OM-unsplash.svg',
  '/css/prism.css',
  '/css/global_async.css',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_MAIN).then(cache => cache.addAll(precacheList))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_MAIN)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (precacheList.includes(url.pathname)) {
    return event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response
        }
        return fetch(request.clone());
      })
    );
  }

  if (request.method === 'GET' && url.origin === location.origin) {
    return event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }

        return fetch(request.clone()).then(response => {
          caches.open(CACHE_MAIN).then(cache => {
            cache.put(request, response);
          });
          return response.clone();
        });
      })
    );
  }
});
