const CACHE_MAIN = 'main1726986050708';
const precacheList = [
  
  '/',
  '/2022/npm-script-warns-permission-errors-in-the-cache-directory.html',
  '/2024/the-book-of-why.html',
  '/2020/book-programming-typescript.html',
  '/2022/webpack-5-compiles-code-with-es2015.html',
  '/2022/Unexpected-reserved-word-interface-on-jest.html',
  '/2022/the-two-ways-to-use-autocomplete-attribute.html',
  '/2020/fragmenting-flex-layout.html',
  '/2020/logical-assignment-operators.html',
  '/2020/got-100-lighthouse-score-in-all-categories-on-mobile.html',
  '/2020/flex-layout-algorithm.html',
  '/assets/images/pavan-prasad-nw1slFnKRYE-unsplash/pavan-prasad-nw1slFnKRYE-unsplash.svg',
  '/assets/images/generated-image-of-the-book-of-why/generated-image-of-the-book-of-why.svg',
  '/assets/images/bulkan-evcimen-LZg_PuyFPGo-unsplash/bulkan-evcimen-LZg_PuyFPGo-unsplash.svg',
  '/assets/images/martin-bennie-xVgHduP61HY-unsplash/martin-bennie-xVgHduP61HY-unsplash.svg',
  '/assets/images/glen-carrie-gsPnE6rMRns-unsplash/glen-carrie-gsPnE6rMRns-unsplash.svg',
  '/assets/images/craig-manners-vtG_gpJn9OM-unsplash/craig-manners-vtG_gpJn9OM-unsplash.svg',
  '/assets/images/tomas-malik-zlSzh2FP7LY-unsplash/tomas-malik-zlSzh2FP7LY-unsplash.svg',
  '/assets/images/cath-smith-PF5_cqOQFT4-unsplash/cath-smith-PF5_cqOQFT4-unsplash.svg',
  '/assets/images/ben-koorengevel-tpIWpoW3_Wc-unsplash/ben-koorengevel-tpIWpoW3_Wc-unsplash.svg',
  '/assets/images/sarah-madaio-fpZHGVBzlYk-unsplash/sarah-madaio-fpZHGVBzlYk-unsplash.svg',
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
