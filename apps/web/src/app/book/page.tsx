'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import Link from 'next/link';
import servicesData from '@/data/services.json';

// TODO: This booking page needs complete rewrite for single-doctor model
// Temporary stub functions to make it compile

const getCityDisplayName = (city: string) => 'Pune';
const getCatalogItem = (city: string, code: string) => ({ name: code, price: 0, unit: 'session', code });
const getCatalog = (city: string) => ({ 
  specialties: [] as Array<{ 
    slug: string;
    title: string; 
    items: Array<{ 
      code: string; 
      name: string;
      price: number;
      unit: string;
      includes?: string[];
      excludes?: string[];
    }> 
  }> 
});
const formatPrice = (price: number) => `₹${price}`;
const citiesData = [{ slug: 'pune', name: 'Pune' }];
const useFreeCta = () => ({ ctaText: 'Book Free Consultation', proofText: 'Free first consultation' });
const getFreeConsultWhatsAppURL = (specialty?: string, city?: string) => 
  `https://wa.me/918329563445?text=${encodeURIComponent('Hi, I want to book a consultation')}`;

// Step 1: Contact Info Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  email: z.string().email('Enter valid email address').optional().or(z.literal('')),
});

// Step 2: Concern Schema (free consultation only for single doctor)
const concernSchema = z.object({
  specialty: z.string().min(1, 'Please select a specialty'),
  concern: z.string().max(500).optional().or(z.literal('')), // Made optional
});

// Step 3: Preference Schema (simplified for single city)
const preferenceSchema = z.object({
  preferredDate: z.string().min(1, 'Please select preferred date'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    errorMap: () => ({ message: 'Please select preferred time' }),
  }),
  visitType: z.enum(['online', 'in-clinic'], {
    errorMap: () => ({ message: 'Please select visit type' }),
  }),
  whatsappConfirm: z.boolean(),
});

// Combined schema
const bookingSchema = contactSchema.merge(concernSchema).merge(preferenceSchema);
type BookingFormData = z.infer<typeof bookingSchema>;

const STEPS = [
  { id: 1, title: 'Contact Info', description: 'Your details' },
  { id: 2, title: 'Your Concern', description: 'What brings you here' },
  { id: 3, title: 'Preferences', description: 'Visit type & timing' },
] as const;

function BookAppointmentPageContent() {
  const searchParams = useSearchParams();
  const serviceCode = searchParams.get('service');
  const specialtySlug = searchParams.get('specialty');
  // TODO: Remove city logic - single location
  // const { city: contextCity } = useCity();
  const contextCity = 'pune'; // Temporary hardcode
  
  // State for selected catalog items (provisional) - Default to free consultation
  const [selectedItems, setSelectedItems] = useState<string[]>(() => {
    // Always include free consultation by default
    if (serviceCode && serviceCode !== 'FREE_CONSULT') {
      return ['FREE_CONSULT', serviceCode];
    }
    return ['FREE_CONSULT'];
  });
  const [showServiceModal, setShowServiceModal] = useState(false);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [quoteUrl, setQuoteUrl] = useState<string>('');
  const { ctaText, proofText } = useFreeCta();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema) as any,
    mode: 'onChange',
    defaultValues: {
      whatsappConfirm: true, // Default WhatsApp confirm on
      visitType: 'online' as const, // Default to online consultation
      preferredDate: new Date().toISOString().split('T')[0], // Default to today
      preferredTime: (() => {
        // Default to current time period
        const hour = new Date().getHours();
        if (hour < 12) return 'morning' as const;
        if (hour < 17) return 'afternoon' as const;
        return 'evening' as const;
      })(),
    },
  });

  // Validate current step before proceeding
  const validateStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['name', 'phone', 'email'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['specialty', 'concern'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['visitType', 'preferredDate', 'preferredTime', 'whatsappConfirm'];
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      // Scroll to top for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Go to specific step
  const goToStep = async (step: number) => {
    if (step < currentStep) {
      // Allow going back without validation
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step > currentStep) {
      // Going forward requires validation
      let isValid = true;
      for (let i = currentStep; i < step; i++) {
        setCurrentStep(i);
        isValid = await validateStep();
        if (!isValid) break;
      }
      if (isValid) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Service selection handlers
  const addService = (code: string) => {
    if (!selectedItems.includes(code)) {
      setSelectedItems([...selectedItems, code]);
      
      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'pricing_item_added',
          page: 'book',
          code,
        });
      }
    }
  };

  const removeService = (code: string) => {
    setSelectedItems(selectedItems.filter(c => c !== code));
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'pricing_item_removed',
        page: 'book',
        code,
      });
    }
  };

  const openServiceModal = () => {
    setShowServiceModal(true);
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'pricing_select_initiated',
        page: 'book',
        specialty: specialtySlug || 'all',
        itemsCountBefore: selectedItems.length,
      });
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    console.log('Form submitted with data:', data);
    setIsSubmitting(true);

    try {
      // Generate booking ID
      const timestamp = new Date().toISOString();
      const id = `booking-${Date.now()}`;
      setBookingId(id);

      // Add 91 prefix to phone if not already present
      const phoneWithPrefix = data.phone.startsWith('91') ? data.phone : `91${data.phone}`;

      // Prepare lead data with selected catalog items
      const leadData = {
        id,
        timestamp,
        source: 'free_consult', // Single doctor - always free first consultation
        status: 'pending',
        contact: {
          name: data.name,
          phone: phoneWithPrefix, // E.164 format
          email: data.email || null,
        },
        concern: {
          specialty: data.specialty,
          description: data.concern || '',
        },
        preferences: {
          visitType: data.visitType, // 'online' or 'in-clinic'
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          whatsappConfirm: data.whatsappConfirm,
        },
        // NEW: Add selected catalog items (currently none - simplified form)
        items: selectedItems.map(code => {
          const item = getCatalogItem('pune', code);
          return item ? {
            code: item.code,
            price: item.price,
            city: 'Pune',
          } : null;
        }).filter(Boolean),
      };

      console.log('Submitting lead data:', leadData);

      // Save to API route (which writes to /data/leads/*.json)
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Booking API error:', errorData);
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      // Store submitted data for success page
      setSubmittedData(leadData);

      // Generate quote PDF if items selected
      if (selectedItems.length > 0) {
        try {
          const quoteResponse = await fetch('/api/quote/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              leadId: id,
              items: selectedItems,
              city: 'Pune', // Single location - always Pune
              contact: {
                name: data.name,
                phone: phoneWithPrefix,
                email: data.email || undefined,
              },
              concern: {
                specialty: data.specialty,
                description: data.concern || '',
              },
            }),
          });

          if (quoteResponse.ok) {
            const quoteData = await quoteResponse.json();
            setQuoteUrl(quoteData.downloadUrl);

            // Analytics: quote_create event
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
              (window as any).dataLayer.push({
                event: 'quote_create',
                leadId: id,
                itemsCount: selectedItems.length,
              });
            }
          }
        } catch (quoteError) {
          console.error('Quote generation failed (non-fatal):', quoteError);
          // Continue even if quote generation fails
        }
      }
      
      // Show success state
      setBookingSuccess(true);
      
      // Store in localStorage for recovery
      localStorage.removeItem('glowheal-booking-draft');
      
      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'free_consult_form_submit',
          selectedItems: selectedItems,
          itemsCount: selectedItems.length,
          city: 'pune', // Single location - always Pune
          specialty: data.specialty,
          visitType: data.visitType,
        });
      }
      
      // WhatsApp submission: Format message and open WhatsApp
      if (typeof window !== 'undefined') {
        const servicesText = selectedItems.length > 0
          ? selectedItems.map(code => {
              const item = getCatalogItem('pune', code);
              return item ? `- ${item.name} (${formatPrice(item.price)})` : '';
            }).filter(Boolean).join('\n')
          : 'No specific services selected';
        
        const whatsappMessage = `🌿 *Glowheal Booking Confirmation*

📋 *Booking ID:* ${id}
👤 *Name:* ${data.name}
📱 *Phone:* ${phoneWithPrefix}
📧 *Email:* ${data.email || 'Not provided'}

💚 *Consultation Type:* Free First Consultation (₹0)
🩺 *Specialty:* ${data.specialty}
📍 *Visit Type:* ${data.visitType === 'online' ? 'Online Video Consultation' : 'In-Clinic Visit (Pune)'}
📅 *Preferred Date:* ${data.preferredDate}
⏰ *Preferred Time:* ${data.preferredTime}

📝 *Concern:*
${data.concern || 'Not specified'}

🛒 *Selected Services (Provisional):*
${servicesText}

✅ I confirm booking and will wait for your call to schedule the consultation.`;

        const whatsappUrl = `https://wa.me/918329563445?text=${encodeURIComponent(whatsappMessage)}`;
        
        console.log('Opening WhatsApp with URL:', whatsappUrl);
        
        // Open WhatsApp immediately
        window.open(whatsappUrl, '_blank');
      }
      
    } catch (error) {
      console.error('Booking submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to submit booking: ${errorMessage}\n\nPlease check the browser console for details or contact us on WhatsApp.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save draft to localStorage on input change
  const saveDraft = () => {
    const values = getValues();
    localStorage.setItem('glowheal-booking-draft', JSON.stringify(values));
  };

  // Success view
  if (bookingSuccess) {
    const formData = getValues();
    const isFreeConsult = true; // Single doctor - always free first consultation
    
    // WhatsApp message with free consultation context and selected services
    const selectedServiceNames = selectedItems
      .map(code => getCatalogItem('pune', code)?.name)
      .filter(Boolean)
      .join(', ');
    
    // Truncate service names to safe length for WhatsApp URL (max ~100 chars for services)
    const truncatedServiceNames = selectedServiceNames.length > 100 
      ? selectedServiceNames.substring(0, 97) + '...'
      : selectedServiceNames;
    
    const whatsappMessage = isFreeConsult 
      ? `Hi, I want to book my free first consultation for ${formData.specialty}. My booking ID is ${bookingId}.${truncatedServiceNames ? ` I'm interested in: ${truncatedServiceNames}` : ''}`
      : `Hi, I just submitted booking ${bookingId}. My name is ${formData.name} and I need ${formData.specialty} consultation.${truncatedServiceNames ? ` Interested in: ${truncatedServiceNames}` : ''}`;
    
    const whatsappURL = getFreeConsultWhatsAppURL(formData.specialty);
    const whatsappFallback = `https://api.whatsapp.com/send?phone=918329563445&text=${encodeURIComponent(whatsappMessage)}`;

    return (
      <div className="min-h-screen bg-gradient-to-b from-forest-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-forest-700 mb-4">
                {isFreeConsult ? 'Free Consultation Confirmed!' : 'Booking Received!'}
              </h1>
              
              <p className="text-gray-700 mb-6">
                Thank you, {formData.name}! Your booking ID is <strong>{bookingId}</strong>.
                <br />
                {isFreeConsult && (
                  <>
                    <span className="text-forest-700 font-semibold">Your first call is free.</span> Our in-house doctor will call you to discuss your {formData.specialty.toLowerCase()} concern.
                    <br />
                  </>
                )}
                Our team will contact you within 30 minutes to confirm your appointment.
              </p>

              <div className="bg-jade-50 rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-forest-700 mb-3">Your Details:</h2>
                <div className="text-left space-y-2 text-sm">
                  <p><strong>Consultation Type:</strong> {isFreeConsult ? 'Free First Consultation (₹0)' : 'Specialist Consultation'}</p>
                  <p><strong>Specialty:</strong> {formData.specialty}</p>
                  <p><strong>Visit Type:</strong> {formData.visitType === 'online' ? 'Online Video Consultation' : 'In-Clinic Visit (Pune)'}</p>
                  <p><strong>Preferred Date:</strong> {formData.preferredDate}</p>
                  <p><strong>Preferred Time:</strong> {formData.preferredTime}</p>
                </div>
              </div>

              {/* NEW: Provisional Services Display */}
              {selectedItems.length > 0 && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-6 text-left">
                  <h2 className="font-semibold text-forest-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Provisional Services Selected
                  </h2>

                  {/* Multi-Specialty Warning */}
                  {(() => {
                    const specialties = new Set(
                      selectedItems
                        .map(code => getCatalogItem('pune', code))
                        .filter(Boolean)
                        .map(item => {
                          // Map item code to specialty
                          const catalog = getCatalog('pune');
                          if (!catalog) return null;
                          for (const specialty of catalog.specialties) {
                            if (specialty.items.some(i => i.code === item!.code)) {
                              return specialty.title;
                            }
                          }
                          return null;
                        })
                        .filter(Boolean)
                    );
                    
                    return specialties.size > 1 ? (
                      <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 mb-4 flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-orange-800 mb-1">
                            ⚠️ Multiple Specialties Selected
                          </p>
                          <p className="text-xs text-gray-700">
                            You've selected items from {specialties.size} different specialties ({Array.from(specialties).join(', ')}). 
                            No problem! Start with your free consultation and finalize services after discussing with our doctor.
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })()}

                  <div className="space-y-2 mb-4">
                    {selectedItems.map((code) => {
                      const item = getCatalogItem('pune', code);
                      return item ? (
                        <div key={code} className="flex justify-between items-center py-2 border-b border-amber-200 last:border-0">
                          <span className="text-forest-700 font-medium">{item.name}</span>
                          <span className="text-lg font-bold text-forest-700">{formatPrice(item.price)}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                    <p className="font-semibold text-forest-700 mb-2">Important:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Payment only required <strong>after</strong> your free consultation and consent to treatment.</li>
                      <li>Our doctor will discuss these services during your call and confirm they're right for you.</li>
                      <li>Add-ons (labs, imaging, implants) are billed per Glowheal add-on catalog.</li>
                      <li>All prices are fixed for Pune. No hidden charges.</li>
                    </ul>
                  </div>

                  {/* Quote Download Link */}
                  {quoteUrl && (
                    <div className="mt-4">
                      <a
                        href={quoteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-forest-300 hover:border-forest-500 text-forest-700 font-semibold py-3 px-5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700"
                        style={{ minHeight: '48px' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        📥 Download Your Quote (Printable PDF)
                      </a>
                      <p className="text-xs text-gray-600 mt-2">
                        View and print your detailed service quote. Valid for 30 days.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isFreeConsult && (
                <div className="bg-forest-50 border-l-4 border-forest-600 p-4 mb-6 text-left">
                  <p className="text-sm text-forest-700">
                    <strong>What happens next?</strong> Our in-house doctor will assess your concern at no cost. If specialist care is recommended, you'll be routed to the right expert.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {formData.whatsappConfirm && (
                  <>
                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Continue conversation on WhatsApp about your ${formData.specialty} consultation`}
                    >
                      <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        📱 Continue on WhatsApp
                      </Button>
                    </a>

                    <a
                      href={whatsappFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 hover:text-gray-900"
                    >
                      Alternative WhatsApp link
                    </a>
                  </>
                )}

                <Link href="/">
                  <Button variant="secondary" size="lg" className="w-full">
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step form view
  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero Banner for Free Consultation */}
          <div className="bg-gradient-to-r from-forest-700 to-jade-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Book Your Consultation</h1>
            <p className="text-forest-50 text-lg mb-3">{proofText}</p>
            <div className="flex items-center gap-2 text-sm text-forest-50">
              <span>Prefer to call?</span>
              <a 
                href="tel:+918329563445" 
                className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-forest-100 transition-colors underline underline-offset-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 832 956 3445
              </a>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-start justify-center gap-2 sm:gap-4">
              {STEPS.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <button
                      onClick={() => goToStep(step.id)}
                      disabled={step.id > currentStep && currentStep < STEPS.length}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all mb-2 ${
                        currentStep >= step.id
                          ? 'bg-lime-400 text-forest-900 shadow-md cursor-pointer hover:bg-lime-500'
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      } ${currentStep === step.id ? 'ring-4 ring-lime-200' : ''}`}
                    >
                      {step.id}
                    </button>
                    <div className="text-center">
                      <p className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${currentStep >= step.id ? 'text-forest-900' : 'text-gray-600'}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="flex items-center pt-5 flex-shrink-0">
                      <div
                        className={`w-8 sm:w-16 h-1 transition-colors ${
                          currentStep > step.id ? 'bg-lime-400' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} onChange={saveDraft}>
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b-2 border-forest-100 pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-forest-900 mb-2">📱 Contact Information</h2>
                    <p className="text-base text-gray-600">We'll use these details to confirm your appointment</p>
                  </div>

                  {/* NEW: Selected Services Card */}
                  {selectedItems.length > 0 && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          <h3 className="font-bold text-forest-700 text-lg">Selected Services (Provisional)</h3>
                        </div>
                        <button
                          type="button"
                          onClick={openServiceModal}
                          className="text-sm text-jade-600 hover:text-jade-700 font-semibold focus:outline-none focus:ring-2 focus:ring-forest-700 rounded px-2 py-1"
                          aria-label="Change selected services"
                        >
                          Change
                        </button>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {selectedItems.map((code) => {
                          const item = getCatalogItem('pune', code);
                          const isFreeConsult = code === 'FREE_CONSULT';
                          return item ? (
                            <div 
                              key={code} 
                              className={`flex items-start justify-between rounded-lg p-4 shadow-sm ${
                                isFreeConsult 
                                  ? 'bg-lime-100 border-2 border-lime-400' 
                                  : 'bg-white'
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className={`font-semibold ${isFreeConsult ? 'text-forest-900' : 'text-forest-700'}`}>
                                    {item.name}
                                  </p>
                                  {isFreeConsult && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-lime-400 text-forest-900">
                                      ✓ Selected
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm mt-1 ${isFreeConsult ? 'text-forest-700 font-medium' : 'text-gray-600'}`}>
                                  {formatPrice(item.price)} / {item.unit}
                                </p>
                              </div>
                              {!isFreeConsult && (
                                <button
                                  type="button"
                                  onClick={() => removeService(code)}
                                  className="ml-4 inline-flex items-center gap-1 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700"
                                  style={{ minHeight: '44px', minWidth: '44px' }}
                                  aria-label={`Remove ${item.name} from selection`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Remove
                                </button>
                              )}
                            </div>
                          ) : null;
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={openServiceModal}
                        className="w-full bg-white hover:bg-gray-50 border-2 border-dashed border-forest-300 hover:border-forest-500 text-forest-700 font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700"
                        style={{ minHeight: '48px' }}
                      >
                        + Add More Services
                      </button>

                      <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                        <strong className="text-forest-700">Note:</strong> These selections are provisional. Payment only required after your free consultation and doctor consent. Our doctor will discuss these during your call.
                      </p>
                    </div>
                  )}

                  {/* Show "Add Services" button if no items selected */}
                  {selectedItems.length === 0 && (
                    <div className="bg-forest-50 border-2 border-forest-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 mr-2 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <h3 className="font-semibold text-forest-700">Interested in specific services?</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Browse our fixed-price catalog and add services you'd like to discuss during your free consultation.
                      </p>
                      <button
                        type="button"
                        onClick={openServiceModal}
                        className="bg-lime-400 hover:bg-lime-500 text-forest-900 px-5 py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors"
                        style={{ minHeight: '48px' }}
                      >
                        Browse Fixed Prices
                      </button>
                    </div>
                  )}

                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />

                  <Input
                    label="Mobile Number"
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...register('phone')}
                    error={errors.phone?.message}
                    helperText="We'll send booking confirmation via SMS"
                    required
                  />

                  <Input
                    label="Email Address (Optional)"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                    helperText="For digital prescription and updates"
                  />
                </div>
              )}

              {/* Step 2: Concern */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b-2 border-forest-100 pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-forest-900 mb-2">💚 Your Concern</h2>
                    <p className="text-base text-gray-600">Help us understand your health concern</p>
                  </div>

                  {/* Free Consultation Info Banner */}
                  <div className="bg-jade-50 border-2 border-jade-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-jade-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-jade-900 mb-1">Free First Consultation</h3>
                        <p className="text-sm text-jade-700">
                          Your first consultation with Dr. Chetna Bhaisare is completely free. No hidden charges.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Select
                    label="Select Specialty"
                    options={[
                      { value: '', label: 'Choose a specialty...' },
                      ...servicesData.map(service => ({
                        value: service.name,
                        label: service.name,
                      })),
                    ]}
                    {...register('specialty')}
                    error={errors.specialty?.message}
                    required
                  />

                  <Textarea
                    label="Describe Your Concern (Optional)"
                    placeholder="Tell us about your symptoms, concerns, or what you'd like to discuss with the doctor"
                    rows={6}
                    {...register('concern')}
                    error={errors.concern?.message}
                    helperText="This is optional but helps us match you with the right doctor."
                  />
                </div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b-2 border-forest-100 pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-forest-900 mb-2">Your Preferences</h2>
                    <p className="text-base text-gray-600">When would you like your consultation?</p>
                  </div>

                  {/* Visit Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-700 mb-3">
                      Visit Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Online Consultation */}
                      <label
                        className="relative flex flex-col p-5 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-jade-500 transition-colors"
                      >
                        <input
                          type="radio"
                          value="online"
                          {...register('visitType')}
                          defaultChecked={true}
                          className="sr-only peer"
                        />
                        <div className="flex items-start gap-3 mb-2">
                          <svg className="w-6 h-6 text-jade-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-bold text-forest-700 text-base">Online Video Consultation</div>
                            <p className="text-sm text-gray-600 mt-1">
                              Consult from anywhere via video call
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 border-3 border-jade-600 rounded-xl opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </label>

                      {/* In-Clinic Visit */}
                      <label
                        className="relative flex flex-col p-5 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-jade-500 transition-colors"
                      >
                        <input
                          type="radio"
                          value="in-clinic"
                          {...register('visitType')}
                          className="sr-only peer"
                        />
                        <div className="flex items-start gap-3 mb-2">
                          <svg className="w-6 h-6 text-jade-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-bold text-forest-700 text-base">In-Clinic Visit (Pune)</div>
                            <p className="text-sm text-gray-600 mt-1">
                              Visit Dr. Chetna Bhaisare at the clinic in Pune
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 border-3 border-jade-600 rounded-xl opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </label>
                    </div>
                    {errors.visitType && (
                      <p className="mt-2 text-sm text-red-600" role="alert">
                        {errors.visitType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-forest-700 mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      label=""
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('preferredDate')}
                      error={errors.preferredDate?.message}
                      required
                      className="text-base font-medium text-forest-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-forest-700 mb-3">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'morning', label: 'Morning', time: '9 AM - 12 PM' },
                        { value: 'afternoon', label: 'Afternoon', time: '12 PM - 5 PM' },
                        { value: 'evening', label: 'Evening', time: '5 PM - 9 PM' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="relative flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-forest-500 hover:bg-forest-50 transition-all"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register('preferredTime')}
                            className="sr-only peer"
                          />
                          <div className="text-forest-700 font-bold mb-1 text-base peer-checked:text-lime-600">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600 peer-checked:text-forest-700 peer-checked:font-medium">{option.time}</div>
                          <div className="absolute inset-0 border-3 border-lime-500 bg-lime-50/30 rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </label>
                      ))}
                    </div>
                    {errors.preferredTime && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.preferredTime.message}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Instant Confirm Toggle */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('whatsappConfirm')}
                        className="mt-1 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-forest-700 focus:ring-offset-2"
                      />
                      <div className="ml-3">
                        <div className="font-semibold text-forest-700 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Get instant confirmation on WhatsApp
                        </div>
                        <p className="text-sm text-forest-600 mt-1">
                          Receive your booking details and updates directly on WhatsApp for faster communication.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                )}
                
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Next →
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                      onClick={() => {
                        console.log('Submit button clicked');
                        console.log('Form errors:', errors);
                        console.log('Current form values:', getValues());
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                    </Button>
                  </>
                )}
              </div>

              {/* Show validation errors if any */}
              {Object.keys(errors).length > 0 && currentStep === STEPS.length && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>
                        <strong>{field}:</strong> {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Booking Reassurance - Below Submit Button */}
              {currentStep === STEPS.length && (
                <p className="text-sm text-forest-600 text-center mt-3 flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No payment now—₹0 first consult</span>
                </p>
              )}

              {/* Progress Text */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Step {currentStep} of {STEPS.length}
              </p>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Need help?{' '}
              <a
                href="https://wa.me/918329563445?text=I%20need%20help%20with%20booking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-jade-600 hover:text-jade-800 font-medium"
              >
                Chat with us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Service Selection Modal */}
      {showServiceModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowServiceModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 id="service-modal-title" className="text-2xl font-bold text-forest-700">
                Select Services (Pune Fixed Prices)
              </h2>
              <button
                type="button"
                onClick={() => setShowServiceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700"
                style={{ minHeight: '44px', minWidth: '44px' }}
                aria-label="Close service selection modal"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Browse our transparent fixed-price services in Pune. Select items you'd like to discuss during your free consultation. Payment only required after consultation and consent.
              </p>

              {(() => {
                const catalog = getCatalog('pune');
                if (!catalog) {
                  return <p className="text-gray-500">Catalog unavailable</p>;
                }

                // Filter by specialty if provided
                const specialtiesToShow = specialtySlug
                  ? catalog.specialties.filter(s => s.slug === specialtySlug)
                  : catalog.specialties;

                return specialtiesToShow.map((specialty) => (
                  <div key={specialty.slug} className="mb-8 last:mb-0">
                    <h3 className="text-xl font-bold text-forest-700 mb-4 flex items-center">
                      {specialty.title}
                      <span className="ml-2 text-sm text-gray-500 font-normal">
                        ({specialty.items.length} services)
                      </span>
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {specialty.items.map((item) => {
                        const isSelected = selectedItems.includes(item.code);
                        
                        return (
                          <label
                            key={item.code}
                            className={`relative flex flex-col p-5 border-2 rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? 'border-forest-700 bg-forest-50'
                                : 'border-gray-200 hover:border-forest-300 bg-white'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  addService(item.code);
                                } else {
                                  removeService(item.code);
                                }
                              }}
                              className="sr-only peer"
                              aria-label={`${isSelected ? 'Deselect' : 'Select'} ${item.name}`}
                            />
                            
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-forest-700 text-base leading-tight">
                                  {item.name}
                                </h4>
                              </div>
                              <div className="ml-3 flex-shrink-0">
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-forest-700 border-forest-700'
                                    : 'bg-white border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-2xl font-extrabold text-forest-700">
                                {formatPrice(item.price)}
                              </span>
                              <span className="text-sm text-gray-600">/ {item.unit}</span>
                            </div>

                            {item.includes && item.includes.length > 0 && (
                              <div className="text-xs space-y-1">
                                <p className="font-semibold text-gray-700">Includes:</p>
                                <ul className="list-none space-y-0.5">
                                  {item.includes.slice(0, 3).map((inc, idx) => (
                                    <li key={idx} className="flex items-start text-gray-600">
                                      <svg className="w-3 h-3 mr-1 text-lime-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                      <span className="leading-tight">{inc}</span>
                                    </li>
                                  ))}
                                  {item.includes.length > 3 && (
                                    <li className="text-gray-500 ml-4">+{item.includes.length - 3} more</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}

              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong className="text-forest-700">Note:</strong> These are transparent fixed prices for Pune. Add-ons like labs, imaging, or implants are billed separately per our add-on catalog. All prices include GST.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 bg-forest-700 hover:bg-forest-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700 focus:ring-offset-2"
                  style={{ minHeight: '48px' }}
                >
                  Done ({selectedItems.length} selected)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Suspense wrapper for useSearchParams
export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookAppointmentPageContent />
    </Suspense>
  );
}
