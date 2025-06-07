'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeGA, trackPageView, trackPerformance, trackUserBehavior } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    initializeGA();
    trackPerformance();
    trackUserBehavior.sessionStart();
    
    // Track scroll depth
    const removeScrollTracking = trackUserBehavior.trackScrollDepth();
    
    // Track session end on unmount
    return () => {
      trackUserBehavior.sessionEnd();
      removeScrollTracking();
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    const url = pathname + searchParams.toString();
    trackPageView(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}