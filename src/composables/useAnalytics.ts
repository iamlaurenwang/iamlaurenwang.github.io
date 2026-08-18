// Google Analytics 4 via gtag.js.
//
// The script is injected at runtime rather than hard-coded into index.html so a
// missing measurement id (local dev, forks) quietly disables tracking instead of
// requesting a broken tag. See docs/analytics.md.

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let initialized = false

// Referrer of the previous page view, so SPA navigations chain to each other
// while the first view keeps the real external referrer.
let lastPageLocation: string | null = null

export function initAnalytics(): void {
  if (initialized || !MEASUREMENT_ID) return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag() reads the `arguments` object, so this cannot be an arrow function.
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())
  // Automatic page views only ever see `/` under hash history, so they are off
  // and router.afterEach reports every navigation by hand instead.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false })
}

export function trackPageView(path: string): void {
  if (!initialized) return

  // GA4 derives its Page path dimension from page_location and drops the
  // fragment, so `/#/teaching` would collapse into `/`. Report the hash route as
  // if it were a real path to keep the per-page reports usable.
  const pageLocation = `${window.location.origin}${path}`

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: pageLocation,
    page_referrer: lastPageLocation ?? document.referrer,
  })

  lastPageLocation = pageLocation
}
