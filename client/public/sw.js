/* =========================================================
   DIAMOND SUITES CRYSTAL RIVER
   Lightweight Asset + Image Cache
   ========================================================= */

const CACHE_VERSION = 'crystal-river-v1'

const IMAGE_CACHE = `${CACHE_VERSION}-images`
const STATIC_CACHE = `${CACHE_VERSION}-static`

const ALL_CACHES = [
  IMAGE_CACHE,
  STATIC_CACHE,
]

/*
 * Never cache these.
 *
 * Important:
 * - form/API requests
 * - Azure Functions
 * - reCAPTCHA
 * - analytics
 * - POST requests
 */
const NEVER_CACHE_PATTERNS = [
  '/api/',
  'send-inquiry',
  'recaptcha',
  'google.com/recaptcha',
  'gstatic.com/recaptcha',
  'azurewebsites.net',
]

function shouldNeverCache(url) {
  return NEVER_CACHE_PATTERNS.some((pattern) =>
    url.href.toLowerCase().includes(pattern.toLowerCase())
  )
}

function isImageRequest(request, url) {
  if (request.destination === 'image') {
    return true
  }

  return /\.(avif|webp|png|jpe?g|gif|svg)$/i.test(url.pathname)
}

function isStaticAsset(request, url) {
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    return true
  }

  return /\.(css|js|woff2?|ttf)$/i.test(url.pathname)
}

/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener('install', () => {
  /*
   * Activate the new worker without waiting for
   * every old tab to close.
   */
  self.skipWaiting()
})

/* =========================================================
   ACTIVATE
   Delete caches from older versions.
   ========================================================= */

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()

      await Promise.all(
        cacheNames
          .filter((cacheName) => {
            const belongsToThisSite =
              cacheName.startsWith('crystal-river-')

            const isCurrent =
              ALL_CACHES.includes(cacheName)

            return belongsToThisSite && !isCurrent
          })
          .map((cacheName) => caches.delete(cacheName))
      )

      await self.clients.claim()
    })()
  )
})

/* =========================================================
   IMAGE CACHE
   STALE-WHILE-REVALIDATE

   1. Return cached image immediately when available.
   2. Fetch current version in background.
   3. Update cache.
   ========================================================= */

async function staleWhileRevalidateImage(request) {
  const cache = await caches.open(IMAGE_CACHE)

  const cachedResponse = await cache.match(request)

  const networkPromise = fetch(request)
    .then(async (networkResponse) => {
      if (
        networkResponse &&
        networkResponse.ok &&
        networkResponse.type !== 'opaque'
      ) {
        await cache.put(
          request,
          networkResponse.clone()
        )
      }

      return networkResponse
    })
    .catch(() => null)

  /*
   * Cached copy wins immediately.
   */
  if (cachedResponse) {
    /*
     * Allow refresh to continue in background.
     */
    networkPromise.catch(() => null)

    return cachedResponse
  }

  /*
   * First visit, so we need the network copy.
   */
  const networkResponse = await networkPromise

  if (networkResponse) {
    return networkResponse
  }

  return Response.error()
}

/* =========================================================
   STATIC CACHE
   CACHE FIRST
   ========================================================= */

async function cacheFirstStatic(request) {
  const cache = await caches.open(STATIC_CACHE)

  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)

    if (
      networkResponse &&
      networkResponse.ok &&
      networkResponse.type !== 'opaque'
    ) {
      await cache.put(
        request,
        networkResponse.clone()
      )
    }

    return networkResponse
  } catch {
    return Response.error()
  }
}

/* =========================================================
   FETCH
   ========================================================= */

self.addEventListener('fetch', (event) => {
  const { request } = event

  /*
   * Cache GET requests only.
   */
  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)

  /*
   * Do not touch external API/form requests.
   */
  if (shouldNeverCache(url)) {
    return
  }

  /*
   * Only cache same-origin assets.
   */
  if (url.origin !== self.location.origin) {
    return
  }

  /*
   * Images
   */
  if (isImageRequest(request, url)) {
    event.respondWith(
      staleWhileRevalidateImage(request)
    )

    return
  }

  /*
   * Compiled CSS / JS / fonts
   */
  if (isStaticAsset(request, url)) {
    event.respondWith(
      cacheFirstStatic(request)
    )
  }
})