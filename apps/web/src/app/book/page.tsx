'use client';

import { useState, useEffect, Suspense } from 'react';
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
import citiesData from '@/data/cities.json';
import { useFreeCta, getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';
import { getCatalog, getCatalogItem, formatPrice, type CatalogItem } from '@/lib/catalog';
import { useCity, getCityDisplayName } from '@/lib/city-context';

// Step 1: Contact Info Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number')
    .transform(val => `91${val}`), // Convert to E.164
  email: z.string().email('Enter valid email address').optional().or(z.literal('')),
});

// Step 2: Concern Schema (with free consultation default)
const concernSchema = z.object({
  consultationType: z.enum(['free', 'specialist'], {
    errorMap: () => ({ message: 'Please select consultation type' }),
  }),
  specialty: z.string().min(1, 'Please select a specialty'),
  concern: z.string().min(10, 'Please describe your concern (minimum 10 characters)').max(500),
});

// Step 3: Preference Schema (with WhatsApp confirm)
const preferenceSchema = z.object({
  city: z.string().min(1, 'Please select a city'),
  preferredDate: z.string().min(1, 'Please select preferred date'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    errorMap: () => ({ message: 'Please select preferred time' }),
  }),
  whatsappConfirm: z.boolean(),
});

// Combined schema
const bookingSchema = contactSchema.merge(concernSchema).merge(preferenceSchema);
type BookingFormData = z.infer<typeof bookingSchema>;

const STEPS = [
  { id: 1, title: 'Contact Info', description: 'Your details' },
  { id: 2, title: 'Your Concern', description: 'What brings you here' },
  { id: 3, title: 'Preferences', description: 'City & timing' },
] as const;

function BookAppointmentPageContent() {
  const searchParams = useSearchParams();
  const serviceCode = searchParams.get('service');
  const specialtySlug = searchParams.get('specialty');
  const { city: contextCity } = useCity();
  
  // State for selected catalog items (provisional)
  const [selectedItems, setSelectedItems] = useState<string[]>(() => {
    return serviceCode ? [serviceCode] : [];
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
      consultationType: 'free' as const, // Default to free consultation
      whatsappConfirm: true, // Default WhatsApp confirm on
      city: getCityDisplayName(contextCity), // Pre-fill city from context
    },
  });

  // Pre-fill city when context changes
  useEffect(() => {
    setValue('city', getCityDisplayName(contextCity));
  }, [contextCity, setValue]);

  // Watch consultation type to show dynamic pricing
  const consultationType = watch('consultationType');

  // Validate current step before proceeding
  const validateStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['name', 'phone', 'email'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['consultationType', 'specialty', 'concern'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['city', 'preferredDate', 'preferredTime', 'whatsappConfirm'];
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
    setIsSubmitting(true);

    try {
      // Generate booking ID
      const timestamp = new Date().toISOString();
      const id = `booking-${Date.now()}`;
      setBookingId(id);

      // Prepare lead data with selected catalog items
      const leadData = {
        id,
        timestamp,
        source: data.consultationType === 'free' ? 'free_consult' : 'website-booking-flow',
        status: 'pending',
        consultationType: data.consultationType, // 'free' or 'specialist'
        contact: {
          name: data.name,
          phone: data.phone, // Already in E.164 format
          email: data.email || null,
        },
        concern: {
          specialty: data.specialty,
          description: data.concern,
        },
        preferences: {
          city: data.city,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          whatsappConfirm: data.whatsappConfirm,
        },
        // NEW: Add selected catalog items
        items: selectedItems.map(code => {
          const item = getCatalogItem('pune', code);
          return item ? {
            code: item.code,
            price: item.price,
            city: 'Pune',
          } : null;
        }).filter(Boolean),
      };

      // Save to API route (which writes to /data/leads/*.json)
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
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
              city: data.city,
              contact: {
                name: data.name,
                phone: data.phone,
                email: data.email || undefined,
              },
              concern: {
                specialty: data.specialty,
                description: data.concern,
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
          cta_color: 'orange', // Phase 2: Track CTA color for conversion analysis
          brand_color: 'royal-blue', // Phase 2: Track brand color system
          city: data.city,
          specialty: data.specialty,
        });
      }
      
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to submit booking. Please try again or contact us on WhatsApp.');
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
    const isFreeConsult = formData.consultationType === 'free';
    
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
      ? `Hi, I want to book my free first consultation for ${formData.specialty} in ${formData.city}. My booking ID is ${bookingId}.${truncatedServiceNames ? ` I'm interested in: ${truncatedServiceNames}` : ''}`
      : `Hi, I just submitted booking ${bookingId}. My name is ${formData.name} and I need ${formData.specialty} consultation in ${formData.city}.${truncatedServiceNames ? ` Interested in: ${truncatedServiceNames}` : ''}`;
    
    const whatsappURL = getFreeConsultWhatsAppURL(formData.specialty, formData.city);
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
                  <p><strong>City:</strong> {formData.city}</p>
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
            <p className="text-forest-50 text-lg">{proofText}</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep >= step.id
                          ? 'bg-forest-700 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium text-gray-900">{step.title}</p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        currentStep > step.id ? 'bg-forest-700' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} onChange={saveDraft}>
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-forest-700 mb-2">Contact Information</h2>
                    <p className="text-gray-600">We'll use these details to confirm your appointment</p>
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
                          return item ? (
                            <div key={code} className="flex items-start justify-between bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex-1">
                                <p className="font-semibold text-forest-700">{item.name}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {formatPrice(item.price)} / {item.unit}
                                </p>
                              </div>
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
                        className="bg-amber-500 hover:bg-amber-600 text-forest-700 px-5 py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors"
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
                  <div>
                    <h2 className="text-2xl font-bold text-forest-700 mb-2">What brings you here?</h2>
                    <p className="text-gray-600">Help us understand your health concern</p>
                  </div>

                  {/* Consultation Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-forest-700 mb-3">
                      Consultation Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Free Consultation Option */}
                      <label
                        className="relative flex flex-col p-6 border-2 border-forest-300 rounded-xl cursor-pointer hover:border-forest-500 transition-colors bg-forest-50"
                      >
                        <input
                          type="radio"
                          value="free"
                          {...register('consultationType')}
                          className="sr-only peer"
                        />
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-bold text-forest-700 text-lg">Free First Consultation</div>
                          <div className="text-2xl font-bold text-forest-700">₹0</div>
                        </div>
                        <p className="text-sm text-forest-600 mb-3">
                          Talk to our in-house doctor at no cost. Get routed to a specialist if needed.
                        </p>
                        <div className="flex items-center text-xs text-forest-700 font-medium">
                          <svg className="w-4 h-4 mr-1 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Recommended for first-time patients
                        </div>
                        <div className="absolute inset-0 border-3 border-forest-700 rounded-xl opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </label>

                      {/* Specialist Consultation Option */}
                      <label
                        className="relative flex flex-col p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-jade-500 transition-colors"
                      >
                        <input
                          type="radio"
                          value="specialist"
                          {...register('consultationType')}
                          className="sr-only peer"
                        />
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-bold text-forest-700 text-lg">Direct Specialist</div>
                          <div className="text-2xl font-bold text-gray-700">₹499+</div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Book directly with a verified specialist for your specific concern.
                        </p>
                        <div className="flex items-center text-xs text-gray-600 font-medium">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          For returning patients
                        </div>
                        <div className="absolute inset-0 border-3 border-jade-600 rounded-xl opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </label>
                    </div>
                    {errors.consultationType && (
                      <p className="mt-2 text-sm text-red-600" role="alert">
                        {errors.consultationType.message}
                      </p>
                    )}
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
                    label="Describe Your Concern"
                    placeholder="Please describe your symptoms, concerns, or what you'd like to discuss with the doctor"
                    rows={6}
                    {...register('concern')}
                    error={errors.concern?.message}
                    helperText="Minimum 10 characters. This helps us match you with the right doctor."
                    required
                  />
                </div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-forest-700 mb-2">Your Preferences</h2>
                    <p className="text-gray-600">When and where would you like your consultation?</p>
                  </div>

                  <Select
                    label="Select City"
                    options={[
                      { value: '', label: 'Choose your city...' },
                      ...citiesData.map(city => ({
                        value: city.name,
                        label: city.name,
                      })),
                    ]}
                    {...register('city')}
                    error={errors.city?.message}
                    required
                  />

                  <Input
                    label="Preferred Date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('preferredDate')}
                    error={errors.preferredDate?.message}
                    required
                  />

                  <div>
                    <label className="block text-sm font-semibold text-forest-700 mb-2">
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
                          className="relative flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-forest-500 transition-colors"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            {...register('preferredTime')}
                            className="sr-only peer"
                          />
                          <div className="peer-checked:text-forest-700 font-semibold mb-1">
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-600">{option.time}</div>
                          <div className="absolute inset-0 border-2 border-forest-700 rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity" />
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

              {/* Popular Add-ons (shown on step 3) */}
              {currentStep === 3 && (
                <div className="mt-8 border-t-2 border-gray-200 pt-8">
                  <div className="bg-jade-50 border-2 border-jade-200 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <h3 className="text-lg font-bold text-forest-700">
                        Popular Add-ons (Optional)
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4">
                      Boost your health journey with these optional services. Add them now for a complete quote.
                    </p>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-jade-300 hover:border-jade-500 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          value="LAB_BASIC"
                          onChange={(e) => {
                            const code = e.target.value;
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, code]);
                            } else {
                              setSelectedItems(selectedItems.filter((s: string) => s !== code));
                            }
                          }}
                          checked={selectedItems.includes('LAB_BASIC')}
                          className="mt-1 h-5 w-5 text-jade-600 border-gray-300 rounded focus:ring-2 focus:ring-forest-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-forest-900">Basic Health Panel</span>
                            <span className="text-lg font-bold text-jade-600">₹999</span>
                          </div>
                          <p className="text-xs text-gray-600">CBC, Blood Sugar, Lipid Profile, Liver & Kidney Function</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-jade-300 hover:border-jade-500 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          value="HEALTH_CHECK_PLUS"
                          onChange={(e) => {
                            const code = e.target.value;
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, code]);
                            } else {
                              setSelectedItems(selectedItems.filter((s: string) => s !== code));
                            }
                          }}
                          checked={selectedItems.includes('HEALTH_CHECK_PLUS')}
                          className="mt-1 h-5 w-5 text-jade-600 border-gray-300 rounded focus:ring-2 focus:ring-forest-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-forest-900">Comprehensive Health Check Plus</span>
                            <span className="text-lg font-bold text-jade-600">₹5,999</span>
                          </div>
                          <p className="text-xs text-gray-600">Full panel + consultation + diet plan (saves ₹1,899)</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-jade-300 hover:border-jade-500 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          value="GUT_PANEL"
                          onChange={(e) => {
                            const code = e.target.value;
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, code]);
                            } else {
                              setSelectedItems(selectedItems.filter((s: string) => s !== code));
                            }
                          }}
                          checked={selectedItems.includes('GUT_PANEL')}
                          className="mt-1 h-5 w-5 text-jade-600 border-gray-300 rounded focus:ring-2 focus:ring-forest-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-forest-900">Gut Health Panel</span>
                            <span className="text-lg font-bold text-jade-600">₹1,999</span>
                          </div>
                          <p className="text-xs text-gray-600">Microbiome analysis, food sensitivities, inflammation markers</p>
                        </div>
                      </label>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 flex items-start gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-forest-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Add-ons are optional and billed only after your free consultation and consent. They'll be included in your quote.</span>
                    </p>
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
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                    </Button>
                  </>
                )}
              </div>

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

                            {item.includes.length > 0 && (
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
