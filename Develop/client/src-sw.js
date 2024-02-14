const {
  precacheAndRoute,
  registerRoute,
} = require('workbox-precaching/precacheAndRoute');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigation requests
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })
);

// Cache other assets using CacheFirst strategy
registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);
