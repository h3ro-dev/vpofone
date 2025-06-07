<<<<<<< HEAD
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
=======
/**
 * Performance Optimization Utilities for VP of One
 * Handles performance monitoring, optimization, and best practices
 */

// Performance monitoring configuration
export const performanceConfig = {
  enableWebVitals: true,
  enableResourceTiming: true,
  enableLongTasks: true,
  reportingThreshold: {
    FCP: 1800, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1,  // Cumulative Layout Shift
    TTFB: 600, // Time to First Byte
  },
};

// Resource hints for critical assets
export const resourceHints = {
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  dnsPrefetch: [
    'https://cdn.jsdelivr.net',
    'https://unpkg.com',
  ],
  preload: [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  ],
};

// Image optimization configuration
export const imageOptimizationConfig = {
  formats: ['webp', 'avif'],
  sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  quality: 85,
  minimumCacheTTL: 60,
};

// Performance observer for monitoring
export function initPerformanceObserver() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // Monitor Long Tasks
  if (performanceConfig.enableLongTasks && 'PerformanceLongTaskTiming' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn('Long Task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name,
        });
        
        // Report to analytics if duration exceeds threshold
        if (entry.duration > 50) {
          reportPerformanceMetric('long_task', entry.duration);
        }
      });
    });
    
    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Long Task Observer not supported');
    }
  }

  // Monitor Resource Timing
  if (performanceConfig.enableResourceTiming) {
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.duration > 1000) {
          console.warn('Slow resource detected:', {
            name: entry.name,
            duration: entry.duration,
            transferSize: entry.transferSize,
          });
        }
      });
    });
    
    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.error('Resource Timing Observer not supported');
    }
  }
}

// Lazy loading utilities
export const lazyLoadConfig = {
  rootMargin: '50px 0px',
  threshold: 0.01,
};

export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = lazyLoadConfig
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, options);
}

// Component lazy loading with retry logic
export function lazyLoadWithRetry(
  importFunc: () => Promise<any>,
  retries = 3,
  delay = 1000
): Promise<any> {
  return new Promise((resolve, reject) => {
    importFunc()
      .then(resolve)
      .catch((error) => {
        if (retries > 0) {
          setTimeout(() => {
            lazyLoadWithRetry(importFunc, retries - 1, delay)
              .then(resolve)
              .catch(reject);
          }, delay);
        } else {
          reject(error);
        }
      });
  });
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - (lastRan || 0) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Report performance metrics
function reportPerformanceMetric(metric: string, value: number) {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric, {
      event_category: 'Performance',
      value: Math.round(value),
      non_interaction: true,
    });
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('performance' in window)) return;
  
  const performance = window.performance as any;
  if (!performance.memory) return;
  
  const memoryThreshold = 50 * 1024 * 1024; // 50MB
  
  setInterval(() => {
    const usedMemory = performance.memory.usedJSHeapSize;
    const totalMemory = performance.memory.totalJSHeapSize;
    
    if (usedMemory > memoryThreshold) {
      console.warn('High memory usage detected:', {
        used: `${Math.round(usedMemory / 1024 / 1024)}MB`,
        total: `${Math.round(totalMemory / 1024 / 1024)}MB`,
        percentage: `${Math.round((usedMemory / totalMemory) * 100)}%`,
      });
    }
  }, 30000); // Check every 30 seconds
}

// Prefetch utilities
export function prefetchRoute(url: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

// Critical CSS extraction placeholder
export function getCriticalCSS(html: string): string {
  // This would be implemented during build time
  // Placeholder for critical CSS extraction logic
  return '';
}

// Service Worker registration for offline support
export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    
    console.log('Service Worker registered:', registration.scope);
    
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available, prompt user to reload
            console.log('New content available, please refresh!');
          }
        });
      }
    });
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

// Web Vitals tracking
export async function trackWebVitals() {
  if (typeof window === 'undefined') return;
  
  try {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
    
    getCLS(onMetric);
    getFID(onMetric);
    getFCP(onMetric);
    getLCP(onMetric);
    getTTFB(onMetric);
  } catch (error) {
    console.error('Failed to load web-vitals:', error);
  }
}

function onMetric({ name, value, id }: any) {
  const threshold = performanceConfig.reportingThreshold[name as keyof typeof performanceConfig.reportingThreshold];
  
  if (threshold && value > threshold) {
    console.warn(`Poor ${name} detected:`, {
      value: Math.round(value),
      threshold,
      id,
    });
  }
  
  reportPerformanceMetric(name, value);
>>>>>>> origin/main
}