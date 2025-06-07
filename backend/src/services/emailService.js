import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailService {
  constructor() {
    this.provider = process.env.EMAIL_PROVIDER || 'smtp';
    this.from = {
      email: process.env.EMAIL_FROM || 'noreply@vpofone.com',
      name: process.env.EMAIL_FROM_NAME || 'VPofOne'
    };

    if (this.provider === 'sendgrid') {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    } else {
      // Configure SMTP transporter
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }

    this.templates = new Map();
  }

  async loadTemplate(templateName) {
    if (this.templates.has(templateName)) {
      return this.templates.get(templateName);
    }

    try {
      const templatePath = path.join(__dirname, '..', 'templates', 'email', `${templateName}.hbs`);
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateContent);
      this.templates.set(templateName, compiledTemplate);
      return compiledTemplate;
    } catch (error) {
      logger.error(`Failed to load email template: ${templateName}`, error);
      throw new Error(`Email template not found: ${templateName}`);
    }
  }

  async sendMail(options) {
    try {
      const { to, subject, template, data, attachments } = options;
      
      // Load and compile template if provided
      let html = options.html;
      if (template && !html) {
        const compiledTemplate = await this.loadTemplate(template);
        html = compiledTemplate(data || {});
      }

      const mailOptions = {
        from: `${this.from.name} <${this.from.email}>`,
        to,
        subject,
        html,
        text: options.text || this.htmlToText(html),
        attachments
      };

      if (this.provider === 'sendgrid') {
        const msg = {
          to,
          from: this.from,
          subject,
          html,
          text: mailOptions.text,
          attachments: attachments?.map(att => ({
            content: att.content,
            filename: att.filename,
            type: att.contentType,
            disposition: att.disposition || 'attachment'
          }))
        };

        await sgMail.send(msg);
        logger.info(`Email sent via SendGrid to: ${to}`);
      } else {
        await this.transporter.sendMail(mailOptions);
        logger.info(`Email sent via SMTP to: ${to}`);
      }

      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw error;
    }
  }

  // Email sending methods for specific use cases
  async sendWelcomeEmail(user) {
    return this.sendMail({
      to: user.email,
      subject: 'Welcome to VPofOne!',
      template: 'welcome',
      data: {
        firstName: user.firstName,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}`
      }
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    return this.sendMail({
      to: user.email,
      subject: 'Reset Your VPofOne Password',
      template: 'password-reset',
      data: {
        firstName: user.firstName,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        expiresIn: '1 hour'
      }
    });
  }

  async sendEmailVerification(user) {
    return this.sendMail({
      to: user.email,
      subject: 'Verify Your Email Address',
      template: 'email-verification',
      data: {
        firstName: user.firstName,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}`
      }
    });
  }

  async sendInvitationEmail(invitation) {
    return this.sendMail({
      to: invitation.email,
      subject: `You're invited to join ${invitation.organizationName} on VPofOne`,
      template: 'invitation',
      data: {
        inviterName: invitation.inviterName,
        organizationName: invitation.organizationName,
        acceptUrl: `${process.env.FRONTEND_URL}/accept-invitation?token=${invitation.token}`,
        role: invitation.role
      }
    });
  }

  async sendTaskAssignmentEmail(task, assignee) {
    return this.sendMail({
      to: assignee.email,
      subject: `New Task Assigned: ${task.title}`,
      template: 'task-assignment',
      data: {
        firstName: assignee.firstName,
        taskTitle: task.title,
        taskDescription: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        projectName: task.project?.name,
        taskUrl: `${process.env.FRONTEND_URL}/tasks/${task.id}`
      }
    });
  }

  async sendWeeklyDigest(user, digestData) {
    return this.sendMail({
      to: user.email,
      subject: 'Your VPofOne Weekly Digest',
      template: 'weekly-digest',
      data: {
        firstName: user.firstName,
        ...digestData,
        dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`
      }
    });
  }

  // Utility method to convert HTML to plain text
  htmlToText(html) {
    return html
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Test email configuration
  async testConnection() {
    try {
      if (this.provider === 'smtp') {
        await this.transporter.verify();
      }
      logger.info('Email service connection verified');
      return true;
    } catch (error) {
      logger.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default new EmailService();