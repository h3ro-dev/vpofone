import { Router, Request, Response } from 'express';

export const contactRouter = Router();

// General contact form submission
contactRouter.post('/inquiry', async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      title,
      message,
      inquiryType // 'general', 'partnership', 'support', 'demo'
    } = req.body;

    // Validate required fields
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Email and message are required'
      });
    }

    const inquiry = {
      id: `inq_${Date.now()}`,
      firstName,
      lastName,
      email,
      company,
      title,
      message,
      inquiryType: inquiryType || 'general',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // In production:
    // 1. Save to database
    // 2. Send notification to team
    // 3. Send auto-response to user
    // 4. Create ticket in support system

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. We\'ll respond within 24 hours.',
      data: { id: inquiry.id }
    });
  } catch (error) {
    console.error('Contact inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry'
    });
  }
});

// Newsletter signup
contactRouter.post('/newsletter', async (req: Request, res: Response) => {
  try {
    const { email, firstName, company, source = 'website' } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }

    const subscriber = {
      id: `sub_${Date.now()}`,
      email,
      firstName,
      company,
      source,
      status: 'active',
      subscribedAt: new Date().toISOString()
    };

    // In production:
    // 1. Check if already subscribed
    // 2. Add to email service (Mailchimp, SendGrid, etc.)
    // 3. Send welcome email
    // 4. Track conversion

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to VP of One insights',
      data: { id: subscriber.id }
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter'
    });
  }
});

// Unsubscribe from newsletter
contactRouter.post('/newsletter/unsubscribe', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // In production, verify token and update subscription status

    res.json({
      success: true,
      message: 'You have been unsubscribed from VP of One emails'
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe'
    });
  }
});

// Download resource (lead capture)
contactRouter.post('/resource-download', async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      company,
      title,
      resourceId,
      resourceName
    } = req.body;

    const download = {
      id: `dl_${Date.now()}`,
      email,
      firstName,
      lastName,
      company,
      title,
      resourceId,
      resourceName,
      downloadUrl: `https://vpofone.ai/resources/${resourceId}/download?token=${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      createdAt: new Date().toISOString()
    };

    // In production:
    // 1. Generate secure download link
    // 2. Send email with download link
    // 3. Add to CRM
    // 4. Start nurture sequence

    res.status(201).json({
      success: true,
      message: 'Check your email for the download link',
      data: {
        downloadUrl: download.downloadUrl,
        expiresAt: download.expiresAt
      }
    });
  } catch (error) {
    console.error('Resource download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process download request'
    });
  }
}); 