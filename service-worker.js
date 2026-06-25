const CACHE_NAME = "conversion-tool-v1.1.1";

const urlsToCache = [

  "/",
  "/index.html",

  "/css/style.css",

  "/pages/gas/index.html",
  "/pages/gas/pressure.html",
  "/pages/gas/temp20.html",
  "/pages/gas/recovery.html",
  "/pages/gas/filling.html",

  "/pages/electric/index.html",
  "/pages/electric/equivalentresistance.html",
  "/pages/electric/resistancetemp20.html",
  "/pages/electric/contactresistance.html",

  "/pages/education/index.html",
  "/pages/education/electricconversions.html",
  "/pages/education/gasconversions.html",

  "/pages/education/other/index.html",
  "/pages/education/other/torque.html",

  "/js/gas/pressure.js",
  "/js/gas/temp20.js",
  "/js/gas/recovery.js",
  "/js/gas/filling.js",
  
  "/js/electric/equivalentresistance.js",
  "/js/electric/resistancetemp20.js",
  "/js/electric/contactresistance.js",

  "/js/other/torque.js",
  
  "/images/001.gif",
  "/images/006.gif",
  "/images/007.png",
  "/images/SET1.png"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        if(response){
          return response;
        }

        return fetch(event.request);

      })

  );

});