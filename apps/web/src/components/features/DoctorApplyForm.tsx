'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const SPECIALTIES = [
  'Dermatology',
  'Hair Care',
  'Weight Management',
  'Mental Health',
  'Nutrition & Dietetics',
  'Women\'s Health',
  'Men\'s Health',
  'Sleep & Stress Management',
  'Gut Health',
  'Metabolic Health',
  'Preventive Care',
  'IV Therapy',
  'Orthopedics'
];

const CITIES = ['Pune', 'Mumbai', 'Bengaluru'];

const doctorApplySchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  clinicName: z.string().min(2, 'Clinic/Hospital name is required'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  registrationNo: z.string().min(3, 'Registration number is required'),
  yearsExperience: z.coerce.number().min(0, 'Years of experience is required').max(70, 'Invalid experience'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(10, 'Complete address is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  email: z.string().email('Enter valid email address'),
  slotAvailability: z.string().min(10, 'Please describe your availability'),
  panGst: z.string().optional(),
  clinicServices: z.array(z.string()),
  message: z.string().optional(),
});

type DoctorApplyFormData = z.infer<typeof doctorApplySchema>;

export function DoctorApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DoctorApplyFormData>({
    resolver: zodResolver(doctorApplySchema),
    defaultValues: {
      city: 'Pune',
      specialties: [],
      clinicServices: [],
    },
  });

  const selectedSpecialties = watch('specialties') || [];
  const selectedServices = watch('clinicServices') || [];

  const onSubmit = async (data: DoctorApplyFormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    // Analytics
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'partner_apply_submit',
        specialties: data.specialties.join(','),
        city: data.city,
      });
    }

    try {
      const response = await fetch('/api/partners/doctors/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Application failed');
      }

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-jade-50 border-2 border-jade-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-jade-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-forest-900 mb-3">Application Received!</h3>
        <p className="text-gray-700 mb-6">
          Thank you for your interest in joining Glowheal. Our partnerships team will review your application and reach out within 2-3 business days.
        </p>
        <div className="bg-white rounded-xl p-6 mb-6 text-left">
          <h4 className="font-semibold text-forest-900 mb-3">Next Steps:</h4>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-jade-600">1.</span>
              <span>We'll verify your registration and credentials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-jade-600">2.</span>
              <span>Schedule a brief onboarding call to discuss fee structure and patient flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-jade-600">3.</span>
              <span>Complete KYC (PAN/GST, bank details)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-jade-600">4.</span>
              <span>Sync your available slots with our booking system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-jade-600">5.</span>
              <span>Go live and start receiving qualified patients</span>
            </li>
          </ol>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Typical onboarding time: <strong>3-5 business days</strong>
        </p>
        <Button variant="secondary" href="/doctors">
          Meet Our Current Doctors
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
      {submitError && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700" role="alert">
          {submitError}
        </div>
      )}

      {/* Personal Info */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-forest-900 mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              placeholder="9876543210"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="registrationNo" className="block text-sm font-medium text-gray-700 mb-1">
              Medical Registration No. <span className="text-red-500">*</span>
            </label>
            <input
              {...register('registrationNo')}
              type="text"
              id="registrationNo"
              placeholder="MCI/NMC/State Council No."
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                errors.registrationNo ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              aria-invalid={errors.registrationNo ? 'true' : 'false'}
              aria-describedby={errors.registrationNo ? 'registrationNo-error' : undefined}
            />
            {errors.registrationNo && (
              <p id="registrationNo-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.registrationNo.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-forest-900 mb-4">Professional Details</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">
                Clinic/Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('clinicName')}
                type="text"
                id="clinicName"
                className={cn(
                  'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                  errors.clinicName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                aria-invalid={errors.clinicName ? 'true' : 'false'}
                aria-describedby={errors.clinicName ? 'clinicName-error' : undefined}
              />
              {errors.clinicName && (
                <p id="clinicName-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.clinicName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                {...register('yearsExperience')}
                type="number"
                id="yearsExperience"
                min="0"
                max="70"
                className={cn(
                  'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                  errors.yearsExperience ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                aria-invalid={errors.yearsExperience ? 'true' : 'false'}
                aria-describedby={errors.yearsExperience ? 'yearsExperience-error' : undefined}
              />
              {errors.yearsExperience && (
                <p id="yearsExperience-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.yearsExperience.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialties <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SPECIALTIES.map((specialty) => (
                <label key={specialty} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    {...register('specialties')}
                    type="checkbox"
                    value={specialty}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-forest-600 focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-forest-700">
                    {specialty}
                  </span>
                </label>
              ))}
            </div>
            {errors.specialties && (
              <p className="text-sm text-red-600 mt-2" role="alert">
                {errors.specialties.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-forest-900 mb-4">Practice Location</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select
                {...register('city')}
                id="city"
                className={cn(
                  'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors',
                  errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                aria-invalid={errors.city ? 'true' : 'false'}
                aria-describedby={errors.city ? 'city-error' : undefined}
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p id="city-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="panGst" className="block text-sm font-medium text-gray-700 mb-1">
                PAN/GST Number <span className="text-gray-500">(Optional now)</span>
              </label>
              <input
                {...register('panGst')}
                type="text"
                id="panGst"
                placeholder="Can provide during onboarding"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Complete Clinic Address <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('address')}
              id="address"
              rows={3}
              placeholder="Building, Street, Landmark, Area, Pincode"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors resize-none',
                errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <p id="address-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-forest-900 mb-4">Availability & Services</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="slotAvailability" className="block text-sm font-medium text-gray-700 mb-1">
              Available Days/Times <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('slotAvailability')}
              id="slotAvailability"
              rows={3}
              placeholder="E.g., Mon-Fri 10am-6pm, Sat 10am-2pm"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors resize-none',
                errors.slotAvailability ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              aria-invalid={errors.slotAvailability ? 'true' : 'false'}
              aria-describedby={errors.slotAvailability ? 'slotAvailability-error' : undefined}
            />
            {errors.slotAvailability && (
              <p id="slotAvailability-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.slotAvailability.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services Available at Your Clinic
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['In-person consultation', 'Video consultation', 'Lab facility', 'Procedure room', 'Pharmacy on-site', 'Home visits'].map(
                (service) => (
                  <label key={service} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      {...register('clinicServices')}
                      type="checkbox"
                      value={service}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-forest-600 focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-forest-700">
                      {service}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              {...register('message')}
              id="message"
              rows={3}
              placeholder="Any specific requirements, questions, or areas of expertise you'd like to highlight"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Document Upload Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          <strong>📄 Document Verification:</strong> We'll request registration proof and other documents during the onboarding call. No need to upload now.
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>

      {/* Privacy */}
      <p className="text-xs text-gray-600 text-center">
        By submitting, you agree to our partner terms. We'll contact you via email/phone to proceed with onboarding.
      </p>
    </form>
  );
}
