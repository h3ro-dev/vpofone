'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export function ConsultationForm({ onSuccess }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    team_size: '',
    biggest_challenge: '',
    preferred_time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">We'll be in touch within 24 hours to schedule your strategy session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Work Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Your Role *
        </label>
        <input
          type="text"
          id="role"
          name="role"
          required
          placeholder="e.g. VP of Operations"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="team_size" className="block text-sm font-medium text-gray-700 mb-1">
          Current Team Size
        </label>
        <select
          id="team_size"
          name="team_size"
          value={formData.team_size}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors"
        >
          <option value="">Select team size</option>
          <option value="0">Just me</option>
          <option value="1-3">1-3 people</option>
          <option value="4-10">4-10 people</option>
          <option value="11+">11+ people</option>
        </select>
      </div>

      <div>
        <label htmlFor="biggest_challenge" className="block text-sm font-medium text-gray-700 mb-1">
          What's your biggest challenge right now?
        </label>
        <textarea
          id="biggest_challenge"
          name="biggest_challenge"
          rows={3}
          value={formData.biggest_challenge}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors resize-none"
          placeholder="Tell us what's keeping you up at night..."
        />
      </div>

      <div>
        <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Meeting Time
        </label>
        <select
          id="preferred_time"
          name="preferred_time"
          value={formData.preferred_time}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4169E1] focus:border-[#4169E1] outline-none transition-colors"
        >
          <option value="">Select preferred time</option>
          <option value="morning">Morning (9am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 5pm)</option>
          <option value="evening">Evening (5pm - 7pm)</option>
        </select>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Book Your Strategy Session
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to receive communications from VP of One. 
        We respect your privacy and will never share your information.
      </p>
    </form>
  );
}