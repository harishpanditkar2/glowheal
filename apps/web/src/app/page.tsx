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
      <section className="relative bg-gradient-forest-jade text-white py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Free First Consultation.<br />
              Fixed Prices. Right Care.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-jade-100 max-w-3xl mx-auto leading-relaxed">
              Talk to our in-house doctor at no cost; get a personalized plan and city-specific fixed prices—no surprise fees.
            </p>
            
            {/* CTA Row with City Selector */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href={ctaHref}>
                <Button variant="free" size="lg" className="w-full sm:w-auto text-base sm:text-lg">
                  {ctaText}
                </Button>
              </Link>
              <Link href="/join-doctor">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg">
                  Join as Doctor
                </Button>
              </Link>
            </div>
            
            {/* Microproof Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-jade-100 mt-4 md:mt-5 px-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">500+ doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">2M+ patients</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">12+ specialties</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Pune first</span>
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
              <div className="flex flex-col items-center mb-2">
                {/* Medical Cross Icon - Jade */}
                <svg className="w-10 h-10 mb-2 text-jade-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">500+</span>
              </div>
              <div className="text-gray-600 font-medium">Expert Doctors</div>
            </div>
            <div>
              <div className="flex flex-col items-center mb-2">
                {/* Heart Icon - Coral */}
                <svg className="w-10 h-10 mb-2 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">2M+</span>
              </div>
              <div className="text-gray-600 font-medium">Patients Served</div>
            </div>
            <div>
              <div className="flex flex-col items-center mb-2">
                {/* Grid Icon - Amber */}
                <svg className="w-10 h-10 mb-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">12+</span>
              </div>
              <div className="text-gray-600 font-medium">Specialties</div>
            </div>
            <div>
              <div className="flex flex-col items-center mb-2">
                {/* Location Pin Icon - Forest */}
                <svg className="w-10 h-10 mb-2 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-3xl md:text-4xl font-bold text-forest-700">50+</span>
              </div>
              <div className="text-gray-600 font-medium">Cities Covered</div>
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
                icon: (
                  <svg className="w-16 h-16 text-jade-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Personalized Plan',
                description: 'Get a tailored care plan based on your needs and medical history',
                icon: (
                  <svg className="w-16 h-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
              },
              {
                step: '3',
                title: 'Specialist Match',
                description: 'Routed to the right specialist from 500+ verified doctors if needed',
                icon: (
                  <svg className="w-16 h-16 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
              },
              {
                step: '4',
                title: 'Ongoing Care',
                description: 'Video consultation, prescription, follow-up, and medication delivery',
                icon: (
                  <svg className="w-16 h-16 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
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
