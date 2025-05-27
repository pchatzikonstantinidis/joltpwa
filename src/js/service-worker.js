// Service Worker for JoltPWA - UI Separation Only
const CACHE_VERSION = 'v2';
const CACHE_NAME = `joltpwa-cache-${CACHE_VERSION}`;

// Simple token management for UI separation
const PWA_TOKEN = {
    value: 'pwa',

    addToUrl: (url) => {
        try {
            const urlObj = new URL(url);
            if (!urlObj.searchParams.has('token')) {
                urlObj.searchParams.set('token', PWA_TOKEN.value);
            }
            return urlObj.toString();
        } catch (error) {
            const separator = url.includes('?') ? '&' : '?';
            return url.includes('token=') ? url : `${url}${separator}token=${PWA_TOKEN.value}`;
        }
    },

    isNeeded: (url) => {
        return !url.includes('token=') && !url.match(/\.(css|js|png|jpg|svg|ico|woff|woff2)$/i);
    }
};

// Install event - cache essential files
self.addEventListener('install', (event) => {
    console.log('🔧 JoltPWA | Service Worker installing');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('🔧 JoltPWA | Caching app shell');
            return cache.addAll([
                './',
                './index.html',
                './offline.html',
                './manifest.json',
                './src/css/styles.css',
                './src/css/pwa-styles.css',
                './src/js/pwa-manager.js',
                './src/js/pwa-install.js',
                './src/assets/icons/android-chrome-192x192.png',
                './icons/android-chrome-512x512.png',
                './icons/apple-touch-icon.png',
                './icons/favicon-32x32.png',
                './icons/maskable-icon.png',
                './icons/favicon-16x16.png'
            ]).catch(error => {
                console.warn('🔧 JoltPWA | Cache error:', error);
            });
        })
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('🔧 JoltPWA | Service Worker activating');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🔧 JoltPWA | Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-http(s) requests
    if (!request.url.startsWith('http')) return;

    // Handle navigation requests with token management
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(PWA_TOKEN.isNeeded(request.url) ? PWA_TOKEN.addToUrl(request.url) : request.url)
                .then(response => {
                    // Cache successful navigation responses
                    if (response.ok) {
                        return response;
                    }
                    throw new Error('Network response was not ok');
                })
                .catch(() => {
                    // Return offline page for failed navigations
                    return caches.match('./offline.html') || caches.match('/offline.html');
                })
        );
        return;
    }

    // Cache-first strategy for assets
    if (request.destination === 'style' || request.destination === 'script' ||
        request.destination === 'image' || request.destination === 'font') {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(request).then(response => {
                    // Cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
        return;
    }

    // Network-first for other requests
    event.respondWith(
        fetch(request)
            .catch(() => caches.match(request))
    );
});

// Simple message handling for PWA mode detection
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'GET_PWA_STATUS') {
        console.log('🔧 JoltPWA | Status request received');
        event.ports[0]?.postMessage({
            isPWA: true,
            version: CACHE_VERSION
        });
    }
});

console.log('🔧 JoltPWA | Service Worker loaded');