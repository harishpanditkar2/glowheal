'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';

// Lead form schema with validation
const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  concern: z.string().min(1, 'Please select a concern'),
  city: z.string().min(2, 'Please enter your city'),
  preferredTime: z.string().min(1, 'Please select preferred time'),
  whatsappConfirm: z.boolean(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const concerns = [
  'Skin issues (Acne, pigmentation)',
  'Hair fall or thinning',
  'Weight loss or PCOS',
  'Anxiety or stress',
  'Digestive issues',
  'Thyroid concerns',
  'Sleep problems',
  'General health checkup',
  'Other concern',
];

const timeSlots = [
  'Morning (9 AM - 12 PM)',
  'Afternoon (12 PM - 3 PM)',
  'Evening (3 PM - 6 PM)',
  'Night (6 PM - 9 PM)',
  'Any time today',
];

interface LeadFormCardProps {
  position?: 'hero' | 'mid' | 'footer';
  className?: string;
}

export function LeadFormCard({ position = 'hero', className = '' }: LeadFormCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      whatsappConfirm: true,
    },
  });

  const whatsappConfirm = watch('whatsappConfirm');

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      // Analytics event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'free_consult_form_submit',
          concern: data.concern,
          city: data.city,
          position: position,
          whatsapp_confirm: data.whatsappConfirm,
        });
      }

      // Server action to save lead
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: `free_consult_${position}`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitSuccess(true);

      // Redirect to success page with data
      const bookingId = `GLWH${Date.now().toString().slice(-8)}`;
      const params = new URLSearchParams({
        bookingId,
        name: data.name,
        concern: data.concern,
        whatsapp: data.whatsappConfirm.toString(),
      });
      
      window.location.href = `/book/success?${params.toString()}`;
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Something went wrong. Please try WhatsApp or call us at 8329563445');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className={`bg-white rounded-2xl shadow-2xl p-8 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-forest-700 mb-2">Request Received!</h3>
          <p className="text-gray-600">Redirecting to confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-6 lg:p-8 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-forest-700">Start Free Consultation</h3>
          <span className="bg-lime-100 text-lime-700 text-xs font-bold px-3 py-1 rounded-full">
            ₹0 - No Cost
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Talk to our doctor at no cost. Get routed to the right specialist afterward.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Error Summary - Accessible */}
        {Object.keys(errors).length > 0 && (
          <div
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-sm font-semibold text-red-700 mb-1">Please fix the following:</p>
            <ul className="text-xs text-red-600 space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>• {error.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="lead-name" className="block text-sm font-semibold text-forest-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-600 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-semibold text-forest-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            {...register('phone')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="10-digit mobile number"
            maxLength={10}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-600 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Concern */}
        <div>
          <label htmlFor="lead-concern" className="block text-sm font-semibold text-forest-700 mb-1">
            What's your concern? <span className="text-red-500">*</span>
          </label>
          <select
            id="lead-concern"
            {...register('concern')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent ${
              errors.concern ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.concern ? 'true' : 'false'}
            aria-describedby={errors.concern ? 'concern-error' : undefined}
          >
            <option value="">Select your concern</option>
            {concerns.map((concern) => (
              <option key={concern} value={concern}>
                {concern}
              </option>
            ))}
          </select>
          {errors.concern && (
            <p id="concern-error" className="text-xs text-red-600 mt-1">
              {errors.concern.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="lead-city" className="block text-sm font-semibold text-forest-700 mb-1">
            Your City <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-city"
            type="text"
            {...register('city')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g. Mumbai, Delhi, Bangalore"
            aria-invalid={errors.city ? 'true' : 'false'}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          {errors.city && (
            <p id="city-error" className="text-xs text-red-600 mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="lead-time" className="block text-sm font-semibold text-forest-700 mb-1">
            Preferred Time <span className="text-red-500">*</span>
          </label>
          <select
            id="lead-time"
            {...register('preferredTime')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent ${
              errors.preferredTime ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.preferredTime ? 'true' : 'false'}
            aria-describedby={errors.preferredTime ? 'time-error' : undefined}
          >
            <option value="">Select preferred time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p id="time-error" className="text-xs text-red-600 mt-1">
              {errors.preferredTime.message}
            </p>
          )}
        </div>

        {/* WhatsApp Confirm Toggle */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register('whatsappConfirm')}
              className="mt-1 h-5 w-5 text-green-600 focus:ring-2 focus:ring-forest-700 rounded"
              style={{ minWidth: '20px', minHeight: '20px' }}
            />
            <div className="ml-3">
              <div className="font-semibold text-forest-700 flex items-center text-sm">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get instant confirmation on WhatsApp
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Receive booking details and updates directly on WhatsApp
              </p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold"
          disabled={isSubmitting}
          style={{ minHeight: '48px' }}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Start Free Consultation (₹0)
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </Button>

        {/* Trust Micro-indicators */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-2">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            100% Private
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            No Hidden Fees
          </span>
        </div>
      </form>
    </div>
  );
}
