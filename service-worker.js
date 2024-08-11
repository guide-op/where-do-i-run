const cacheName = 'wdir-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

// Serve content (cache-first version, to be removed)
//self.addEventListener('fetch', event => {
//    event.respondWith(
//        caches.match(event.request)
//            .then(response => {
//                return response || fetch(event.request);
//            })
//    );
//});

// Serve network-first, fallback to cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});

// Update and drop outdated caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(keyList.map(key => {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }))
        )
    );
});
