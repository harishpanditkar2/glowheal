'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<'email' | 'whatsapp' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const formData = watch();

  const onSubmitEmail = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMethod('email');

    try {
      // TODO: Implement email API endpoint
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Email submission error:', error);
      alert('Failed to send email. Please try WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitWhatsApp = () => {
    const data = formData;
    if (!data.name || !data.phone || !data.subject || !data.message) {
      alert('Please fill all required fields before sending via WhatsApp');
      return;
    }

    setSubmitMethod('whatsapp');
    
    const whatsappMessage = `🌿 *Glowheal Contact Form*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email || 'Not provided'}
📱 *Phone:* ${data.phone}
📋 *Subject:* ${data.subject}

💬 *Message:*
${data.message}`;

    const whatsappUrl = `https://wa.me/918329563445?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setSubmitSuccess(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-700 to-jade-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Contact Us
            </h1>
            <p className="text-xl mb-2 text-white/90">
              Have questions? We're here to help.
            </p>
            <p className="text-white/80">
              Send us a message via email or WhatsApp and we'll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-center border-2 border-transparent hover:border-jade-500 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-forest-100 to-jade-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-forest-900 mb-2 text-lg">Phone</h3>
              <a href="tel:+918329563445" className="text-jade-600 hover:text-jade-700 font-semibold text-lg">
                +91 832 956 3445
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center border-2 border-transparent hover:border-jade-500 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-forest-100 to-jade-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-forest-900 mb-2 text-lg">Email</h3>
              <a href="mailto:hello@glowheal.com" className="text-jade-600 hover:text-jade-700 font-semibold">
                hello@glowheal.com
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center border-2 border-transparent hover:border-jade-500 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-bold text-forest-900 mb-2 text-lg">WhatsApp</h3>
              <a href="https://wa.me/918329563445" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-semibold">
                Chat with us
              </a>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-gradient-to-br from-green-50 to-jade-50 border-2 border-green-500 rounded-2xl p-6 mb-8 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 text-xl mb-2 font-display">
                    {submitMethod === 'email' ? 'Message Sent!' : 'WhatsApp Opened!'}
                  </h3>
                  <p className="text-green-800 text-lg">
                    {submitMethod === 'email' 
                      ? "We've received your message and will respond within 24 hours."
                      : "Your message is ready to send on WhatsApp. We'll respond as soon as possible!"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-forest-900 mb-6">Send us a message</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  {...register('name')}
                  error={errors.name?.message}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  {...register('phone')}
                  error={errors.phone?.message}
                  required
                />

                <Select
                  label="Subject"
                  options={[
                    { value: '', label: 'Select a subject...' },
                    { value: 'General Inquiry', label: 'General Inquiry' },
                    { value: 'Booking Question', label: 'Booking Question' },
                    { value: 'Service Information', label: 'Service Information' },
                    { value: 'Pricing Question', label: 'Pricing Question' },
                    { value: 'Technical Issue', label: 'Technical Issue' },
                    { value: 'Doctor Partnership', label: 'Doctor Partnership' },
                    { value: 'Feedback', label: 'Feedback' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  {...register('subject')}
                  error={errors.subject?.message}
                  required
                />
              </div>

              <Textarea
                label="Your Message"
                placeholder="Tell us how we can help you..."
                rows={6}
                {...register('message')}
                error={errors.message?.message}
                required
              />

              {/* Submission Options */}
              <div className="border-t-2 border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Choose how you'd like to send your message:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Email Submission */}
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmitEmail)}
                    disabled={isSubmitting && submitMethod === 'email'}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {isSubmitting && submitMethod === 'email' ? 'Sending...' : 'Send via Email'}
                    </span>
                  </button>

                  {/* WhatsApp Submission */}
                  <button
                    type="button"
                    onClick={onSubmitWhatsApp}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Both methods deliver your message to our team. WhatsApp is faster for urgent queries.
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-forest-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-forest-900 mb-4">Need immediate assistance?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-forest-700 mb-2">📞 Call us directly</h4>
                <p className="text-gray-600 mb-3">
                  For urgent medical queries or booking assistance, call us at:
                </p>
                <a href="tel:+918329563445" className="inline-flex items-center gap-2 text-lime-600 hover:text-lime-700 font-semibold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 832 956 3445
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-forest-700 mb-2">🩺 Book free consultation</h4>
                <p className="text-gray-600 mb-3">
                  Skip the queue - book your first consultation at no cost:
                </p>
                <a href="/book" className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                  Book Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
