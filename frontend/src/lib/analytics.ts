/**
 * Analytics Tracking System for VP of One
 * Supports Google Analytics 4, custom events, and performance tracking
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Google Analytics configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export const initializeGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for VP of One
export const trackCustomEvents = {
  // CTA interactions
  consultationCTA: (location: string) => {
    trackEvent('click_consultation_cta', 'engagement', location);
  },
  
  // Feature exploration
  exploreFeature: (featureName: string) => {
    trackEvent('explore_feature', 'features', featureName);
  },
  
  // Form interactions
  startForm: (formName: string) => {
    trackEvent('form_start', 'forms', formName);
  },
  
  completeForm: (formName: string) => {
    trackEvent('form_complete', 'forms', formName);
  },
  
  // Content engagement
  readContent: (contentSection: string, timeSpent: number) => {
    trackEvent('content_read', 'engagement', contentSection, timeSpent);
  },
  
  // Navigation
  menuClick: (menuItem: string) => {
    trackEvent('menu_click', 'navigation', menuItem);
  },
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Track Core Web Vitals
  if ('web-vital' in window) {
    const sendToGoogleAnalytics = ({name, delta, id}: any) => {
      window.gtag!('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        non_interaction: true,
      });
    };
    
    // Import web-vitals dynamically
    import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
      getCLS(sendToGoogleAnalytics);
      getFID(sendToGoogleAnalytics);
      getFCP(sendToGoogleAnalytics);
      getLCP(sendToGoogleAnalytics);
      getTTFB(sendToGoogleAnalytics);
    });
  }
};

// User behavior tracking
export const trackUserBehavior = {
  // Session duration
  sessionStart: () => {
    const startTime = Date.now();
    sessionStorage.setItem('session_start', startTime.toString());
  },
  
  sessionEnd: () => {
    const startTime = sessionStorage.getItem('session_start');
    if (startTime) {
      const duration = Date.now() - parseInt(startTime);
      trackEvent('session_duration', 'engagement', 'time', Math.round(duration / 1000));
    }
  },
  
  // Scroll depth
  trackScrollDepth: () => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track milestones
        const milestones = [25, 50, 75, 90, 100];
        milestones.forEach(milestone => {
          if (maxScroll >= milestone && maxScroll - 5 < milestone) {
            trackEvent('scroll_depth', 'engagement', `${milestone}%`);
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  },
};

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'exception', {
    description: `${error.message} - ${error.stack}`,
    fatal: false,
    error: errorInfo,
  });
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'conversion', {
    send_to: `${GA_MEASUREMENT_ID}/${conversionType}`,
    value: value,
    currency: 'USD',
  });
};