const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./style.css",
  "./components/Contador.js",
];

const CACHE_NAME = "v3_cache_contador_react";

/* Self --> Significa si mismo (this) */

/* 1 - Install) Lo primero que hace el Service Worker */
self.addEventListener("install", (e) => {
  /* Espera a que algo suceda (a que se ejecute el que permite usar cache) */
  e.waitUntil(
    /* Retorna una promesa */
    caches.open(CACHE_NAME).then((cache) => {
      /* Retorna una promesa */
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});

/* 2 - Active) */
self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
      caches.keys().then((cacheNames)=> {
          return Promise.all(cacheNames.map(cacheName => {
                /* Chequeo si esta en mi white list de caches, si no está lo borro*/
                return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
          }));
      })
      /* Lo pide del cache */
      .then(() => self.clients.claim())
    );
  });

  /* 3 - Fetch) Se dispara cada vez y retorna las peticiones*/
self.addEventListener("fetch", (e) => {
    /* Chequeo si la request esta dentro de mi cache */
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});