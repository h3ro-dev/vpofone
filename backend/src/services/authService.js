import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, Organization } from '../models/index.js';
import emailService from './emailService.js';
import logger from '../utils/logger.js';

class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET;
    this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  // Generate JWT access token
  generateAccessToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId
    };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    });
  }

  // Generate refresh token
  generateRefreshToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion || 0
    };

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn
    });
  }

  // Verify access token
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  // Verify refresh token
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshSecret);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Register new user
  async register(userData) {
    try {
      const { email, password, firstName, lastName, organizationName } = userData;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Generate email verification token
      const emailVerificationToken = crypto.randomBytes(32).toString('hex');

      // Create user
      const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        emailVerificationToken,
        role: 'executive' // First user is executive by default
      });

      // Create organization if provided
      if (organizationName) {
        const slug = this.generateSlug(organizationName);
        const organization = await Organization.create({
          name: organizationName,
          slug
        });

        // Associate user with organization
        await user.addOrganization(organization, {
          through: { role: 'admin', isOwner: true }
        });
      }

      // Send welcome email
      await emailService.sendWelcomeEmail(user);

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      // Save refresh token to user
      await user.update({ refreshToken });

      logger.info(`New user registered: ${email}`);

      return {
        user: user.toJSON(),
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(email, password) {
    try {
      // Find user with organizations
      const user = await User.findOne({
        where: { email },
        include: [{
          model: Organization,
          as: 'organizations',
          through: { attributes: ['role', 'isOwner'] }
        }]
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Update last login
      await user.update({ lastLogin: new Date() });

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      // Save refresh token
      await user.update({ refreshToken });

      logger.info(`User logged in: ${email}`);

      return {
        user: user.toJSON(),
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshAccessToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = this.verifyRefreshToken(refreshToken);

      // Find user
      const user = await User.findByPk(decoded.id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      // Generate new access token
      const accessToken = this.generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      logger.error('Token refresh error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(userId) {
    try {
      await User.update(
        { refreshToken: null },
        { where: { id: userId } }
      );

      logger.info(`User logged out: ${userId}`);
      return { success: true };
    } catch (error) {
      logger.error('Logout error:', error);
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const user = await User.findOne({
        where: { emailVerificationToken: token }
      });

      if (!user) {
        throw new Error('Invalid verification token');
      }

      await user.update({
        emailVerified: true,
        emailVerificationToken: null
      });

      logger.info(`Email verified for user: ${user.email}`);
      return { success: true };
    } catch (error) {
      logger.error('Email verification error:', error);
      throw error;
    }
  }

  // Request password reset
  async requestPasswordReset(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        // Don't reveal if user exists
        return { success: true };
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      await user.update({
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires
      });

      // Send reset email
      await emailService.sendPasswordResetEmail(user, resetToken);

      logger.info(`Password reset requested for: ${email}`);
      return { success: true };
    } catch (error) {
      logger.error('Password reset request error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const user = await User.findOne({
        where: {
          passwordResetToken: token,
          passwordResetExpires: { $gt: new Date() }
        }
      });

      if (!user) {
        throw new Error('Invalid or expired reset token');
      }

      await user.update({
        password: newPassword,
        passwordResetToken: null,
        passwordResetExpires: null
      });

      logger.info(`Password reset for user: ${user.email}`);
      return { success: true };
    } catch (error) {
      logger.error('Password reset error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValid = await user.validatePassword(currentPassword);
      if (!isValid) {
        throw new Error('Current password is incorrect');
      }

      await user.update({ password: newPassword });

      logger.info(`Password changed for user: ${user.email}`);
      return { success: true };
    } catch (error) {
      logger.error('Password change error:', error);
      throw error;
    }
  }

  // Utility function to generate slug
  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

export default new AuthService();