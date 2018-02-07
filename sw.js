var staticCacheName = 'review-app-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        // Open a cache named 'review-app-v1'
        // Add urls to cache
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/restaurant.html',
                'css/app.css',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg',
                'data/restaurants.json'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('review-') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
        // fetch(event.request).then(function(response) {
        //     if (response.status == 404) {
        //         // return new Response("Whoops, this page doesn't exist");
        //         return fetch('img/1.jpg');
        //     }
        //     return response;
        // }).catch(function() {
        //     return new Response("Offline");
        // })
    );
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
});