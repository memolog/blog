const CACHE_MAIN = 'main1671593841462';
const precacheList = [
  
  '/',
  '/2022/how-to-align-the-legen-in-the-fieldset.html',
  '/2022/autocomplete-fields-have-an-appropriate-control-group.html',
  '/2022/the-meaning-of-autocomplete-in-the-accessibility.html',
  '/2020/book-programming-typescript.html',
  '/2022/the-two-ways-to-use-autocomplete-attribute.html',
  '/2022/npm-script-warns-permission-errors-in-the-cache-directory.html',
  '/2022/Unexpected-reserved-word-interface-on-jest.html',
  '/2022/webpack-5-compiles-code-with-es2015.html',
  '/2020/got-100-lighthouse-score-in-all-categories-on-mobile.html',
  '/2020/logical-assignment-operators.html',
  '/assets/images/neha-maheen-mahfin-3szSK-40AWM-unsplash/neha-maheen-mahfin-3szSK-40AWM-unsplash.svg',
  '/assets/images/bingqi-huang-wpi1d9-o4vo-unsplash/bingqi-huang-wpi1d9-o4vo-unsplash.svg',
  '/assets/images/srikanta-h-u-Ju0DX6yhcBE-unsplash/srikanta-h-u-Ju0DX6yhcBE-unsplash.svg',
  '/assets/images/bulkan-evcimen-LZg_PuyFPGo-unsplash/bulkan-evcimen-LZg_PuyFPGo-unsplash.svg',
  '/assets/images/craig-manners-vtG_gpJn9OM-unsplash/craig-manners-vtG_gpJn9OM-unsplash.svg',
  '/assets/images/pavan-prasad-nw1slFnKRYE-unsplash/pavan-prasad-nw1slFnKRYE-unsplash.svg',
  '/assets/images/glen-carrie-gsPnE6rMRns-unsplash/glen-carrie-gsPnE6rMRns-unsplash.svg',
  '/assets/images/martin-bennie-xVgHduP61HY-unsplash/martin-bennie-xVgHduP61HY-unsplash.svg',
  '/assets/images/ben-koorengevel-tpIWpoW3_Wc-unsplash/ben-koorengevel-tpIWpoW3_Wc-unsplash.svg',
  '/assets/images/cath-smith-PF5_cqOQFT4-unsplash/cath-smith-PF5_cqOQFT4-unsplash.svg',
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
