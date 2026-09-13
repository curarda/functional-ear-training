/* Uygulamayı çevrimdışı çalıştıran servis işçisi.

   Uygulamanın kendisinde hiç ağ çağrısı yok — sesler Web Audio ile sentezleniyor,
   ilerleme localStorage'da. Tek dış bağımlılık Google Fonts, o da aşağıda
   önbelleğe alınıyor; böylece çevrimdışı görünüm çevrimiçiyle birebir aynı.

   CACHE adı değişince eski önbellek atılır — sync.py bunu otomatik artırıyor. */
var CACHE = 'fk-v7';
var ASSETS = ['./', './index.html', './manifest.webmanifest',
              './icon-180.png', './icon-192.png', './icon-512.png'];

/* yazı tipleri başka origin'de ama CORS açık, o yüzden normal biçimde saklanabiliyor */
var FONT_ORIGINS = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

function cacheable(url) {
  return url.origin === location.origin || FONT_ORIGINS.indexOf(url.origin) >= 0;
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Yazı tipleri: önce önbellek (hiç değişmezler, her açılışta ağa gitmek anlamsız).
   Geri kalan her şey: önce ağ, olmazsa önbellek — çevrimiçiyken hep güncel sürüm. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (!cacheable(url)) return;

  var isFont = FONT_ORIGINS.indexOf(url.origin) >= 0;

  e.respondWith(
    (isFont ? caches.match(e.request) : Promise.resolve(null)).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (fallback) {
          /* gezinme isteği ağa çıkamadıysa uygulamanın kendisini ver */
          if (fallback) return fallback;
          if (e.request.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        });
      });
    })
  );
});
