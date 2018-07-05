if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
    }).catch(function(err) {
    });
}

self.addEventListener('install', function(e) {
    console.log("installing service worker");
    e.waitUntil(
        caches.open('restaurant-review-sources').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/',
                '/img/',
                '/js/'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
