// Fidel Flashcards offline helper. Change the version number below whenever you update the site.
const V = "fidel-v2";
const FILES = ["./", "./index.html", "./manifest.json", "./sw.js", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    // Our own files: try the internet first (so updates arrive), fall back to the saved copy offline.
    e.respondWith(
      fetch(r)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(V).then((c) => c.put(r, copy)); }
          return res;
        })
        .catch(() => caches.match(r).then((m) => m || caches.match("./index.html")))
    );
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    // Letter fonts: save them after the first visit so they also work offline.
    e.respondWith(
      caches.open(V).then((c) =>
        c.match(r).then((m) => {
          const f = fetch(r).then((res) => { c.put(r, res.clone()); return res; }).catch(() => m);
          return m || f;
        })
      )
    );
  }
});
