
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// background sync
workbox.loadModule('workbox-background-sync');

// Revisa el archivo y directorio en el cual estas e instala todo lo que esta en el precache ( del archivo workbox-config.js)
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Destructuracion de objetos
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

// *** Optimización  *** //
const cacheNetworkFirst = [
  '/api/auth/renew',
  '/api/events'
]
// *** Optimización  *** //
const cacheFirstMetwork = [
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
]


// Añadimos archivos estaticos
registerRoute( 
 ({request,url}) => {
    // console.log({ request, url });
  if (cacheFirstMetwork.includes(url.href)) return true;
  return false;
  },
  new CacheFirst()
)

// se utilizara la estrategia network first para cualquier archivo que no este en el cache
// *** Optimización  *** //
registerRoute(
  ({request,url}) => {
    // console.log({ request, url });
    if (cacheNetworkFirst.includes(url.pathname)) return true;

    return false;
  },
  new NetworkFirst()
)


// Posteos Offline
const bgSyncPlugin = new BackgroundSyncPlugin('posteos offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});
registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
)


// Delete Online
registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
)

// PUT Online

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PUT'
)
