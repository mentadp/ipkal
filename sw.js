const CACHE_NAME = "subkal-v0.1";
const CACHE_URLS = [
	"assets/main.css",

	"assets/icon-192.png",
	"assets/icon-512.png",

	"assets/main.js",

	"index.html",
	"manifest.json",
]

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(CACHE_URLS);
		})
	);
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheName) {
			return Promise.all(
				cacheName.map(function(cacheName) {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request, { cacheName: CACHE_NAME })
			.then(function(response) {
				if (response) {
					return response;
				}
				return fetch(event.request);
			})
	);
});