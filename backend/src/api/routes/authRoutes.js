import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import authService from '../../services/authService.js';
import { authenticate } from '../../middleware/authMiddleware.js';

const router = Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Register new user
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    body('organizationName').optional().trim()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await authService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Refresh token
router.post('/refresh',
  [
    body('refreshToken').notEmpty()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await authService.refreshAccessToken(req.body.refreshToken);
      
      res.json({
        success: true,
        message: 'Token refreshed',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Logout
router.post('/logout',
  authenticate,
  async (req, res) => {
    try {
      await authService.logout(req.userId);
      
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Verify email
router.post('/verify-email',
  [
    body('token').notEmpty()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      await authService.verifyEmail(req.body.token);
      
      res.json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Request password reset
router.post('/forgot-password',
  [
    body('email').isEmail().normalizeEmail()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      await authService.requestPasswordReset(req.body.email);
      
      res.json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Reset password
router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { token, password } = req.body;
      await authService.resetPassword(token, password);
      
      res.json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Change password
router.post('/change-password',
  authenticate,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(req.userId, currentPassword, newPassword);
      
      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Get current user
router.get('/me',
  authenticate,
  async (req, res) => {
    try {
      res.json({
        success: true,
        data: {
          user: req.user
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

export default router;