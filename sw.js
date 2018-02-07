var CACHE_NAME = 'review-app-v1';
var CACHED_URLS = [
    // Out HTML
    'index.html',
    'restaurant.html',
    // Stylesheeds
    'css/normalize.css',    
    'css/app.css',    
    // JavaScript
    'js/app.js',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    // Images
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
    'img/map-offline.jpg',
    // Data
    'data/restaurants.json'    
];

var googleMapsAPIJS = "https://maps.googleapis.com/maps/api/js?key="+
"AIzaSyATi96BnTTiBHHCaBaQ4Esly55jSiMimrM&libraries=places&callback=initMap";

self.addEventListener('install', function(event) {
    // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
    event.waitUntil(precache());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

function precache() {
    return caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHED_URLS);
    });
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}