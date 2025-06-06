import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals'
import { trackEvent } from '@/components/analytics/AnalyticsProvider'

// Web Vitals thresholds
const VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  FID: { good: 100, poor: 300 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
}

// Get rating based on value and thresholds
function getRating(value: number, metric: keyof typeof VITALS_THRESHOLDS): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = VITALS_THRESHOLDS[metric]
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

// Send analytics data
function sendToAnalytics(metric: any) {
  const { name, value, id } = metric
  const rating = getRating(value, name)

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(value),
      rating,
      id,
    })
  }

  // Send to Google Analytics
  trackEvent('web_vitals', name, rating, Math.round(value))

  // You can also send to your own analytics endpoint
  if (process.env.NEXT_PUBLIC_API_URL) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/vitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: name,
        value: Math.round(value),
        rating,
        id,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail analytics requests
    })
  }
}

// Initialize Web Vitals reporting
export function reportWebVitals() {
  getCLS(sendToAnalytics)
  getFCP(sendToAnalytics)
  getFID(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  // Observe long tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          trackEvent('performance', 'long_task', 'duration', Math.round(entry.duration))
        }
      }
    })
    longTaskObserver.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    // Long task observer not supported
  }

  // Observe resource timing
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('chunk') || entry.name.includes('bundle')) {
          const duration = Math.round(entry.duration)
          if (duration > 1000) {
            trackEvent('performance', 'slow_resource', entry.name, duration)
          }
        }
      }
    })
    resourceObserver.observe({ entryTypes: ['resource'] })
  } catch (e) {
    // Resource observer not supported
  }
}

// Prefetch critical resources
export function prefetchCriticalResources() {
  if (typeof window === 'undefined') return

  // Prefetch fonts
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  ]

  fontLinks.forEach((href) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = 'style'
    document.head.appendChild(link)
  })

  // Preconnect to third-party origins
  const origins = [
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ]

  origins.forEach((origin) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    document.head.appendChild(link)
  })
}

// Lazy load images
export function setupLazyLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return
  }

  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src!
        img.removeAttribute('data-src')
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}