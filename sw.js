const CACHE_NAME ='v1_cache_Musica_gratis',
urlsToCache= [
    './style.css',
    './image/logomusica.png',
    './script.js'
]

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
            .then(()=>self.skipWaiting())
        })    
        .catch(err =>console.log("Fallo registro d cache",err))
    )
})

self.addEventListener('activate', e=>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cachesNames =>{
            cacheNames.map(cacheName=>{
                if(cacheWhitelist.indexOf(cacheName) ===-1)
                {
                    return caches.delete(cacheName)
                }
            })
        })
        .then(()=>self.clients.claim())    
    )
})
self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res)
            {
                return res
            }
            return fetch(e.request)
        })
    )
})