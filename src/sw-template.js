
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// background sync
workbox.loadModule('workbox-background-sync');

// Revisa el archivo y directorio en el cual estas e instala todo lo que esta en el precache ( del archivo workbox-config.js)
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Destructuracion de objetos
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;




// Añadimos archivos estaticos
registerRoute( 
  new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
  // Aplicando la estrategoia de revisar el cache primero 
  new CacheFirst()
)
registerRoute( 
  new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
  // Aplicando la estrategoia de revisar el cache primero 
  new CacheFirst()
)


// se utilizara la estrategia network first para cualquier archivo que no este en el cache

registerRoute(
  new RegExp('http://localhost:4000/api/auth/renew'),
  new NetworkFirst()
)
registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkFirst()
)


// Posteos Offline

const bgSyncPlugin = new BackgroundSyncPlugin('posteos offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});
registerRoute(
  new RegExp('http://localhost:4000/api/events'),
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
