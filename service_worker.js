const CACHE_NAME = "v1";
const ASSETS_TO_CACHE = [
   "/",
   "/index.html",
   "/about.html",
   "/help.html",
   "/script.js",
   "/style.css",
];

// Install event: caching static assets
self.addEventListener("install", (event) => {
   console.log("Service Worker: Installing", event);

   event.waitUntil(
      caches
         .open(CACHE_NAME)
         .then((cache) => {
            // console.log("Service Worker: Caching files");
            return cache.addAll(ASSETS_TO_CACHE);
         })
         .then(() => self.skipWaiting())
   );
});

// Activate event: cleaning up old caches
self.addEventListener("activate", (event) => {
   // console.log("Service Worker: Activated");
   event.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cache) => {
               if (cache !== CACHE_NAME) {
                  // console.log("Service Worker: Removing old cache", cache);
                  return caches.delete(cache);
               }
            })
         );
      })
   );
   // console.log(self.clients);
   return self.clients.claim();
});

// Fetch event: respond with cached assets or fetch from network
self.addEventListener("fetch", (event) => {
   // console.log("Service Worker: Fetching", event.request);
   event.respondWith(
      caches
         .match(event.request)
         .then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
         })
         .catch(() => caches.match("/offline.html")) // Fallback to offline page if no network
   );
});
