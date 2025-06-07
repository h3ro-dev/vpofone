import { Router, Request, Response } from 'express';

export const analyticsRouter = Router();

// Track page view
analyticsRouter.post('/pageview', async (req: Request, res: Response) => {
  try {
    const { 
      page, 
      referrer, 
      userAgent,
      screenResolution,
      sessionId,
      timestamp = new Date().toISOString()
    } = req.body;

    // In production, send to analytics service (e.g., Mixpanel, Amplitude, custom DB)
    const pageview = {
      id: `pv_${Date.now()}`,
      page,
      referrer,
      userAgent,
      screenResolution,
      sessionId,
      ip: req.ip,
      timestamp
    };

    res.json({
      success: true,
      message: 'Pageview tracked',
      data: { id: pageview.id }
    });
  } catch (error) {
    console.error('Pageview tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track pageview'
    });
  }
});

// Track events (CTA clicks, form interactions, etc.)
analyticsRouter.post('/event', async (req: Request, res: Response) => {
  try {
    const {
      eventName,
      eventCategory,
      eventLabel,
      eventValue,
      sessionId,
      metadata = {}
    } = req.body;

    const event = {
      id: `evt_${Date.now()}`,
      eventName,
      eventCategory,
      eventLabel,
      eventValue,
      sessionId,
      metadata,
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Event tracked',
      data: { id: event.id }
    });
  } catch (error) {
    console.error('Event tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track event'
    });
  }
});

// Track conversion goals
analyticsRouter.post('/conversion', async (req: Request, res: Response) => {
  try {
    const {
      goalType, // 'consultation_scheduled', 'resource_downloaded', 'newsletter_signup'
      goalValue,
      sessionId,
      leadData = {}
    } = req.body;

    const conversion = {
      id: `conv_${Date.now()}`,
      goalType,
      goalValue,
      sessionId,
      leadData,
      timestamp: new Date().toISOString()
    };

    // In production:
    // 1. Store in database
    // 2. Trigger conversion pixel/webhook
    // 3. Update CRM
    // 4. Send to ad platforms

    res.json({
      success: true,
      message: 'Conversion tracked',
      data: { id: conversion.id }
    });
  } catch (error) {
    console.error('Conversion tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track conversion'
    });
  }
});

// Get analytics summary (for internal dashboard)
analyticsRouter.get('/summary', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    // Mock data - in production, query from analytics database
    const summary = {
      period: { startDate, endDate },
      metrics: {
        totalVisitors: 2543,
        uniqueVisitors: 1892,
        pageViews: 7234,
        avgSessionDuration: '5:23',
        bounceRate: '32.4%',
        conversions: {
          consultations: 47,
          downloads: 156,
          newsletterSignups: 234
        },
        topPages: [
          { page: '/', views: 2543 },
          { page: '/features', views: 1234 },
          { page: '/pricing', views: 987 }
        ],
        topReferrers: [
          { source: 'google', visits: 892 },
          { source: 'linkedin', visits: 456 },
          { source: 'direct', visits: 387 }
        ]
      }
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get analytics summary'
    });
  }
}); 