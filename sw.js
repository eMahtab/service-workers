console.log("This is sw.js and its awesome");

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/index.html',
  '/sounds/911.ogg',
  '/images/911.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});




self.addEventListener('fetch', function(event) {
	console.log("Request "+event.request.url)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});