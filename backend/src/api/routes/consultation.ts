import { Router, Request, Response } from 'express';

export const consultationRouter = Router();

// Schedule a consultation
consultationRouter.post('/schedule', async (req: Request, res: Response) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      company, 
      title, 
      timezone, 
      preferredDate,
      preferredTime,
      currentChallenges,
      teamSize 
    } = req.body;

    // Here you would integrate with a scheduling service like Calendly, Cal.com, etc.
    // For now, we'll simulate a successful booking
    const consultation = {
      id: `cons_${Date.now()}`,
      firstName,
      lastName,
      email,
      company,
      title,
      scheduledFor: `${preferredDate} ${preferredTime}`,
      timezone,
      confirmationUrl: `https://vpofone.ai/consultation/confirm/${Date.now()}`,
      meetingLink: 'Will be sent via email 24 hours before the meeting',
      createdAt: new Date().toISOString()
    };

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Create calendar event
    // 4. Notify team

    res.status(201).json({
      success: true,
      message: 'Consultation scheduled successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Consultation scheduling error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule consultation',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

// Get available time slots
consultationRouter.get('/availability', async (req: Request, res: Response) => {
  try {
    const { date, timezone = 'UTC' } = req.query;

    // Mock available slots - in production, integrate with calendar service
    const slots = [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
      { time: '16:00', available: true }
    ];

    res.json({
      success: true,
      data: {
        date,
        timezone,
        slots
      }
    });
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check availability'
    });
  }
});

// Cancel consultation
consultationRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // In production, verify ownership and update database
    res.json({
      success: true,
      message: 'Consultation cancelled successfully',
      data: { id }
    });
  } catch (error) {
    console.error('Cancellation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel consultation'
    });
  }
}); 