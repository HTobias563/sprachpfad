/* Sprachpfad Service Worker: alle Dateien vorab cachen, Updates erst nach Bestätigung aktivieren */
const VERSION = 'v20260920171941';
const CACHE = 'sprachpfad-' + VERSION;
const ASSETS = ['./', './apple-touch-icon.png', './data/hangul.js', './data/ja.js', './data/kana.js', './data/ko.js', './data/vi.js', './icon-192.png', './icon-512.png', './icon.svg', './index.html', './manifest.webmanifest', './src/core/builders.js', './src/core/migrations.js', './src/core/progress.js', './src/core/session.js', './src/core/srs.js', './src/core/store.js', './src/core/text.js', './src/exercises/choose.js', './src/exercises/cloze.js', './src/exercises/index.js', './src/exercises/intro.js', './src/exercises/match.js', './src/exercises/script.js', './src/exercises/speak.js', './src/exercises/tiles.js', './src/exercises/tip.js', './src/lang/ja/index.js', './src/lang/ja/kana.js', './src/lang/ko/hangul.js', './src/lang/ko/index.js', './src/lang/numbers.js', './src/lang/profile.js', './src/lang/registry.js', './src/lang/vi/index.js', './src/lang/vi/tones.js', './src/main.js', './src/platform/sfx.js', './src/platform/sr.js', './src/platform/sw-client.js', './src/platform/tts.js', './src/ui/dom.js', './src/ui/icons.js', './src/ui/parts.js', './src/ui/router.js', './src/ui/screens/done.js', './src/ui/screens/home.js', './src/ui/screens/onboarding.js', './src/ui/screens/practice.js', './src/ui/screens/profile.js', './src/ui/screens/session.js', './src/ui/screens/travel.js', './src/ui/sheet.js', './src/ui/shell.js', './src/ui/theme.js', './src/ui/toast.js', './src/version.js', './styles/app.css'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      return await fetch(e.request);
    } catch (err) {
      if (e.request.mode === 'navigate') { const idx = await cache.match('./index.html'); if (idx) return idx; }
      return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }
  })());
});
