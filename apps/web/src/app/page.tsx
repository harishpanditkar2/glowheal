import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildMedicalOrganizationSchema } from '@/lib/schema-builders';
import { ServiceCard } from '@/components/features/ServiceCard';
import { FAQAccordion, FAQItem } from '@/components/features/FAQAccordion';
import { Button } from '@/components/ui/Button';
import { useFreeCta, getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';
import Link from 'next/link';
import services from '@/data/services.json';

// Homepage FAQ data
const homepageFAQs: FAQItem[] = [
  {
    question: 'Is my first consultation free?',
    answer: 'Yes. Your first consultation with our in-house doctor is free. You\'ll be routed to a specialist if needed.',
  },
  {
    question: 'How do I book an online consultation?',
    answer: 'Simply browse our services or doctors, select your preferred specialist, choose a convenient time slot, and complete the booking. You can pay online securely via UPI, cards, or net banking.',
  },
  {
    question: 'Are the doctors verified and licensed?',
    answer: 'Yes, all doctors on Glowheal are verified with valid medical licenses and registrations. We conduct thorough background checks to ensure you receive care from qualified healthcare professionals.',
  },
  {
    question: 'What is the consultation fee?',
    answer: "Your first consultation with our in-house doctor is completely free (₹0). If specialist care is recommended, you'll see transparent fixed pricing for services in Pune. Visit our Pricing page for full details. No hidden charges, no surprise fees.",
  },
  {
    question: 'Can I get a refund if I cancel my appointment?',
    answer: 'Yes, we offer full refunds if you cancel at least 2 hours before the scheduled consultation. Please refer to our refund policy for complete details.',
  },
  {
    question: 'How do I receive my prescription after consultation?',
    answer: 'After your video consultation, the doctor will send a digital prescription directly to your registered email and it will also be available in your Glowheal dashboard.',
  },
  {
    question: 'Is my medical data secure and confidential?',
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
      <section className="relative bg-gradient-forest-jade text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Free First Consultation.<br />
              Fixed Prices. Right Care.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-jade-100 max-w-3xl mx-auto">
              Talk to our in-house doctor at no cost; get a personalized plan and city-specific fixed prices—no surprise fees.
            </p>
            
            {/* CTA Row with City Selector */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href={ctaHref}>
                <Button variant="free" size="lg">
                  {ctaText}
                </Button>
              </Link>
              <Link href="/join-doctor">
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Join as Doctor
                </Button>
              </Link>
            </div>
            
            {/* Microproof Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-jade-100 mt-4 md:mt-5">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>500+ doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>2M+ patients</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>12+ specialties</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Pune first</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.8/5 Rating (50,000+ reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Verified Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>100% Secure & Private</span>
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
              No fees for your first call
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-forest-700 mb-2 flex items-center justify-center gap-2">
                <span className="text-lime-500 text-2xl">✓</span>500+
              </div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-forest-700 mb-2 flex items-center justify-center gap-2">
                <span className="text-lime-500 text-2xl">✓</span>2M+
              </div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-forest-700 mb-2 flex items-center justify-center gap-2">
                <span className="text-lime-500 text-2xl">✓</span>12+
              </div>
              <div className="text-gray-600">Specialties</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-forest-700 mb-2 flex items-center justify-center gap-2">
                <span className="text-lime-500 text-2xl">✓</span>50+
              </div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              Our Healthcare Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From skin care to mental wellness, get expert consultation for all your health needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              // Mark most booked services
              const mostBookedSlugs = ['mental-health', 'dermatology', 'nutrition-dietetics'];
              const showMostBooked = mostBookedSlugs.includes(service.slug);
              
              return (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  slug={service.slug}
                  tagline={service.tagline}
                  icon={service.icon}
                  priceRange={service.priceRange}
                  consultationFee={service.consultationFee}
                  showMostBooked={showMostBooked}
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
              How Glowheal Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with a free consultation and get routed to the right specialist
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                title: 'Free Call with Glowheal Doctor',
                description: 'Talk to our in-house doctor at no cost about your health concern',
                icon: '�',
              },
              {
                step: '2',
                title: 'Personalized Plan',
                description: 'Get a tailored care plan based on your needs and medical history',
                icon: '�',
              },
              {
                step: '3',
                title: 'Specialist Match',
                description: 'Routed to the right specialist from 500+ verified doctors if needed',
                icon: '�‍⚕️',
              },
              {
                step: '4',
                title: 'Ongoing Care',
                description: 'Video consultation, prescription, follow-up, and medication delivery',
                icon: '💊',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="w-12 h-12 bg-jade-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold font-display text-forest-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 p-6 bg-jade-50 rounded-xl max-w-3xl mx-auto">
            <p className="text-forest-700 font-medium">
              {proofText}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FAQAccordion
            faqs={homepageFAQs}
            title="Frequently Asked Questions"
            description="Everything you need to know about online consultations on Glowheal"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-forest-jade text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-jade-100">
            Join 2 million+ Indians who trust Glowheal. Your first consultation is completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaHref}>
              <Button variant="free" size="lg">
                {ctaText}
              </Button>
            </Link>
            <Link href="/doctors">
              <Button variant="secondary" size="lg" className="bg-white text-forest-700 hover:bg-mist-50">
                Browse Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
