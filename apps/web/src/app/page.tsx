import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildMedicalOrganizationSchema } from '@/lib/schema-builders';
import { ServiceCard } from '@/components/features/ServiceCard';
import { FAQAccordion, FAQItem } from '@/components/features/FAQAccordion';
import { Button } from '@/components/ui/Button';
import { HeroCTAButtons } from '@/components/features/HeroCTAButtons';
import { useFreeCta, getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';
import Link from 'next/link';
import services from '@/data/services.json';

// Homepage FAQ data
const homepageFAQs: FAQItem[] = [
  {
    question: '🆓 Is my first consultation free?',
    answer: 'Yes! Your first consultation with Dr. Chetna Bhaisare is completely free. This helps us understand your health concerns and create a personalized treatment plan.',
  },
  {
    question: '📱 How do I book a consultation?',
    answer: 'Simply click "Book Consultation" button, fill in your details, select your preferred date and time, and choose between online video consultation or in-clinic visit. You\'ll receive a confirmation on WhatsApp.',
  },
  {
    question: '👩‍⚕️ What are Dr. Chetna\'s qualifications?',
    answer: 'Dr. Chetna Bhaisare has 10+ years of clinical experience specializing in Dermatology and Ayurveda (BAMS). She combines modern dermatological treatments with traditional Ayurvedic principles for holistic healing.',
  },
  {
    question: '💰 What is the consultation fee?',
    answer: "Your first consultation is completely free (₹0). Follow-up consultations and treatment plans have transparent, fixed pricing. Visit our Pricing page for full details. No hidden charges, no surprise fees.",
  },
  {
    question: '🔄 Can I cancel or reschedule my appointment?',
    answer: 'Yes, you can cancel or reschedule at least 2 hours before the scheduled consultation. Contact us via WhatsApp or phone to make changes.',
  },
  {
    question: '📋 How do I receive my prescription?',
    answer: 'After your consultation, Dr. Chetna will send a digital prescription directly to your registered email. You can also access it anytime through your patient portal.',
  },
  {
    question: '🔒 Is my medical data secure?',
    answer: 'Absolutely. We use bank-level encryption and comply with all data protection regulations. Your medical information is completely confidential and never shared without your explicit consent.',
  },
];

export default function HomePage() {
  // Free consultation copy
  const { 
    heroHeadline, 
    heroSubcopy, 
    ctaText, 
    ctaHref, 
    proofText 
  } = useFreeCta();
  
  const whatsappPhone = '+918329563445';

  // Generate JSON-LD schemas for homepage
  const organizationSchema = buildOrganizationSchema();
  const medicalOrgSchema = buildMedicalOrganizationSchema([
    'Dermatology',
    'Hair Care',
    'Weight Management',
    'Mental Health',
    'Nutrition & Dietetics',
    'Women\'s Health',
    'Men\'s Health',
    'Sleep & Stress',
    'Gut Health',
    'Metabolic Health',
    'Preventive Labs',
    'IV Therapy',
  ]);

  return (
    <>
      {/* Inject JSON-LD Schemas */}
      <MultiSchemaRenderer schemas={[organizationSchema, medicalOrgSchema]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-forest-jade text-white py-16 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hero-home.jpg"
            alt="Healthcare consultation"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/60 to-jade-900/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              <span className="block mb-2">🌿 Expert Healthcare 👩‍⚕️</span>
              <span className="block">✨ FREE First Consultation ✨</span>
            </h1>
            
            {/* FREE Capsule - Teal green for brand consistency */}
            <div className="inline-flex items-center gap-2 bg-teal-400 text-white px-4 py-2 rounded-lg h-10 shadow-md hover:shadow-lg transition-shadow mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold whitespace-nowrap">₹0 first consultation — no hidden costs</span>
            </div>
            
            {/* Trust Chips - Single doctor practice */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/90 mb-6">
              <span className="flex items-center gap-1.5 h-8">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">10+ years experience</span>
              </span>
              <span className="text-white/60" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 h-8">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Transparent fixed prices</span>
              </span>
              <span className="text-white/60" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 h-8">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Dermatology + Ayurveda</span>
              </span>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white max-w-3xl mx-auto leading-relaxed">
              Consult with <span className="font-bold">Dr. Chetna Bhaisare</span> — Dermatology & Ayurveda Specialist<br className="hidden sm:block" />
              <span className="font-semibold">Get personalized care plans combining modern & traditional medicine 🌱</span>
            </p>
            
            {/* CTA Row with Analytics Tracking */}
            <HeroCTAButtons />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-forest-900">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">⭐ 4.9/5 Rating (5,000+ consultations)</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium">✅ BAMS Certified Specialist</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">🔒 100% Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-forest-700 font-semibold text-lg">
              🎉 No fees for your first consultation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex flex-col items-center mb-2">
                <span className="text-5xl mb-2">👩‍⚕️</span>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">10+</span>
              </div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="flex flex-col items-center mb-2">
                <span className="text-5xl mb-2">💚</span>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">5000+</span>
              </div>
              <div className="text-gray-600 font-medium">Happy Patients</div>
            </div>
            <div>
              <div className="flex flex-col items-center mb-2">
                <span className="text-5xl mb-2">🌿</span>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">10</span>
              </div>
              <div className="text-gray-600 font-medium">Conditions Treated</div>
            </div>
            <div>
              <div className="flex flex-col items-center mb-2">
                <span className="text-5xl mb-2">📍</span>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">Pune</span>
              </div>
              <div className="text-gray-600 font-medium">In-clinic & Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              🌸 Conditions We Treat 🌸
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From skin care to holistic wellness, get expert consultation combining dermatology & Ayurveda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              // Mark most booked services (limit to 5 for clarity)
              const mostBookedSlugs = ['dermatology', 'mental-health', 'nutrition-dietetics', 'hair-care', 'weight-management'];
              const showMostBooked = mostBookedSlugs.includes(service.slug);
              
              return (
                <ServiceCard
                  key={service.slug}
                  name={service.name}
                  slug={service.slug}
                  shortDescription={service.shortDescription}
                  icon={service.icon}
                  category={service.category as 'dermatology' | 'ayurveda'}
                />
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="primary" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              📋 How It Works 📋
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple 4-step process to get started with your personalized care plan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                title: '📞 Book Free Consultation',
                description: 'Schedule your first consultation with Dr. Chetna — completely free of charge',
                icon: '📱',
              },
              {
                step: '2',
                title: '🩺 Initial Assessment',
                description: 'Share your health concerns, medical history, and wellness goals',
                icon: '💬',
              },
              {
                step: '3',
                title: '💊 Personalized Plan',
                description: 'Get a tailored treatment plan combining dermatology & Ayurveda',
                icon: '📝',
              },
              {
                step: '4',
                title: '🌱 Ongoing Care',
                description: 'Follow-up consultations, prescriptions, and continuous support',
                icon: '✨',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <span className="text-6xl">{item.icon}</span>
                </div>
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold font-display text-forest-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 p-6 bg-teal-50 rounded-xl max-w-3xl mx-auto border-2 border-teal-200">
            <p className="text-forest-700 font-medium text-lg">
              🎉 Your first consultation is FREE — Start your wellness journey today! 🎉
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FAQAccordion
            faqs={homepageFAQs}
            title="❓ Frequently Asked Questions"
            description="Everything you need to know about consulting with Dr. Chetna Bhaisare"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 leading-relaxed">
            🌟 Ready to Start Your Healing Journey? 🌟
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Join 5,000+ happy patients. Your first consultation with Dr. Chetna is completely free. 💚
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaHref}>
              <Button variant="primary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                📅 Book Free Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-amber-500 text-white hover:bg-amber-600 border-0">
                💬 Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

