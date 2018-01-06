const VERSION = '001';
const filesToCache = [
  // HTML
  'https://atrogolo.github.io/Materialize/',
  'https://atrogolo.github.io/Materialize/index.html',
  'samples/cards.html',
  'samples/carousel.html',
  'samples/collections.html',
  'samples/forms.html',
  'samples/materialbox.html',
  'samples/scrollfire.html',
  // Font and CSS
  '/Materialize/favicons/favicon-16x16.png?v=2',
  '/Materialize/favicons/favicon-32x32.png?v=2',
  'fonts/material-icons-v33.woff2',
  'fonts/monserrat-v12.woff2',
  'https://atrogolo.github.io/Materialize/css/fonts/fontawesome-webfont.woff2',
  'css/materialize.min.css',
  'css/my_style.css',
  'css/my_fontawesome.min.css',
  // Images
  'css/backgrounds/background1.jpg',
  'css/backgrounds/background2.jpg',
  'css/backgrounds/background3.jpg',
  'css/backgrounds/bg_middle_crop.jpg',
  'css/backgrounds/bg_middle.jpg',
  'css/backgrounds/bg_sunrise_crop.jpg',
  'css/backgrounds/bg_sunrise.jpg',
  'css/backgrounds/cards_ascanio.jpg',
  'css/backgrounds/cards_colosseum.jpg',
  'css/backgrounds/cards_vespa.jpg',
  'css/backgrounds/italy_flag.jpg',
  'css/backgrounds/me.jpg',
  // Scripts
  'js/materialize.min.js',
  'js/init.js',
  'js/cards.js',
  'js/materialbox.js',
  'js/scrollfire.js',
  'https://code.jquery.com/jquery-2.1.1.min.js' //, 'https://www.google-analytics.com/analytics.js'
];

// Install event listener - First event on service worker detection
self.addEventListener('install', function (event) {
  console.log("Installing SW - Version: " + VERSION);

  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
    .catch(function (error) {
      console.error("INSTALL FAILED! ", error);
    })
  );
});

// Activate event listener - Remove other caches different from the last one
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== VERSION) {
          console.log("Deleting cache key: " + key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch event listener - Every network request will be intercepted here
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(VERSION)
    .then(function (cache) {
      console.log("Fetch event for request: " + event.request);

      // cache first, fallback to network
      return cache.match(event.request, {
          ignoreSearch: true
        })
        .then(function (response) {
          console.log("Response from cache: " + response);
          return response || fetch(event.request);
        });
    })
  );
});