import { Router } from 'express';
import { consultationRouter } from './consultation';
import { analyticsRouter } from './analytics';
import { contactRouter } from './contact';

export const router = Router();

// Mount route handlers
router.use('/consultations', consultationRouter);
router.use('/analytics', analyticsRouter);
router.use('/contact', contactRouter);

// API root endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'VP of One API v1',
    endpoints: {
      consultations: '/api/v1/consultations',
      analytics: '/api/v1/analytics',
      contact: '/api/v1/contact',
      health: '/api/health'
    },
    documentation: 'https://vpofone.ai/api/docs'
  });
}); 