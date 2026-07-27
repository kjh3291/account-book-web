const CACHE_NAME = "account-book-pwa-v121";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 네트워크 우선(network-first) 전략: 온라인일 때는 항상 최신 파일을 받아오고,
// 오프라인일 때만 캐시된 파일로 대체합니다.
// (이전 버전은 캐시가 있으면 항상 캐시를 먼저 반환해서, 코드를 수정해도
// 이미 설치된 PWA/기기에서는 새 버전이 반영되지 않는 문제가 있었습니다.)
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() =>
        caches.match(event.request).then(cachedResponse => cachedResponse || caches.match("./index.html"))
      )
  );
});
