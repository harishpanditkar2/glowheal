import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import {
  buildMedicalOrganizationSchema,
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema-builders';
import { FAQAccordion, type FAQItem } from '@/components/features/FAQAccordion';
import { DoctorCard } from '@/components/features/DoctorCard';
import { Button } from '@/components/ui/Button';
import { PriceCard } from '@/components/features/PriceCard';
import { getItemsBySpecialty, getCatalog } from '@/lib/catalog';
import type { Service } from '@/types';
import servicesData from '@/data/services.json';
import doctorsData from '@/data/doctors.sample.json';

const services: Service[] = servicesData as Service[];

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `Free First Consultation | ${service.metaTitle}`,
    description: `Start with a free consultation. ${service.metaDescription}`,
    openGraph: {
      title: `Free First Consultation | ${service.metaTitle}`,
      description: `Start with a free consultation. ${service.metaDescription}`,
      url: `https://glowheal.in/services/${service.slug}`,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Map service slugs to catalog specialty slugs
  const specialtySlugMap: Record<string, string> = {
    'dermatology': 'dermatology',
    'hair-care': 'dermatology',
    'mental-health': 'mental-health',
    'psychiatry': 'mental-health',
    'orthopedics': 'orthopedics',
  };

  const catalogSpecialtySlug = specialtySlugMap[service.slug];
  const catalogItems = catalogSpecialtySlug ? getItemsBySpecialty('pune', catalogSpecialtySlug) : [];
  const catalog = getCatalog('pune');
  const catalogSpecialty = catalog?.specialties.find((s) => s.slug === catalogSpecialtySlug);

  // Get doctors for this specialty
  const relevantDoctors = doctorsData.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(service.name.toLowerCase().split(' ')[0])
  );

  // Generate JSON-LD schemas
  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://glowheal.in' },
    { name: 'Services', url: 'https://glowheal.in/services' },
    { name: service.name, url: `https://glowheal.in/services/${service.slug}` },
  ]);

  const medicalOrgSchema = buildMedicalOrganizationSchema([service.name]);

  // Service-specific FAQs
  // ⚠️ 2025 FAQ Rich Results Eligibility Note:
  // FAQPage schema is included as FAQs are visible and match JSON-LD text verbatim.
  // However, Google restricts FAQ rich results for health content to authoritative sites.
  // Monitor Search Console for "FAQ (unparsable structure)" warnings.
  // If no rich results appear after 30 days, remove FAQPage schema but keep visible FAQs for UX.
  const faqs: FAQItem[] = [
    {
      question: "Is my first consultation free?",
      answer: "Yes. Your first consultation with our in-house doctor is completely free. They'll assess your concern and recommend the right specialist if needed. Specialist consultation fees apply only if you proceed with specialist care."
    },
    {
      question: `What conditions can ${service.name} treat?`,
      answer: `${service.name} specialists on Glowheal can diagnose and treat: ${service.conditions.slice(0, 5).join(', ')}, and more. Book a consultation to discuss your specific concerns.`,
    },
    {
      question: `How does online ${service.name} consultation work?`,
      answer: 'Book an appointment with a verified specialist, join the video call at your scheduled time, discuss your symptoms and get a digital prescription immediately. Follow-ups are included.',
    },
    {
      question: `What is the consultation fee for ${service.name}?`,
      answer: catalogItems.length > 0 
        ? `Your first consultation with a Glowheal doctor is free (₹0). If you proceed with treatment, we offer fixed, transparent pricing in Pune. See our ${catalogSpecialty?.title || service.name} fixed prices above or visit /pricing for full details.`
        : `Your first call with a Glowheal doctor is free (₹0). If specialist care is recommended, you'll see transparent pricing options for ${service.name}. Visit our pricing page for full details on available services.`,
    },
    {
      question: 'Are the doctors verified and licensed?',
      answer: 'Yes, all doctors on Glowheal are verified with valid medical licenses and registrations. We conduct thorough background checks to ensure you receive care from qualified professionals.',
    },
    {
      question: 'Can I get a prescription after the consultation?',
      answer: 'Yes, your doctor will send a digital prescription directly to your email after the consultation. You can also download it from your Glowheal dashboard.',
    },
  ];

  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <>
      <MultiSchemaRenderer schemas={[medicalOrgSchema, breadcrumbs, faqSchema]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-700 via-jade-600 to-forest-800 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-jade-600 to-forest-800" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-7xl mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">{service.name}</h1>
            <p className="text-xl md:text-2xl text-jade-100 mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button variant="primary" size="lg">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/doctors">
                <Button variant="secondary" size="lg" className="bg-white hover:bg-gray-100 text-forest-700">
                  View {service.name} Specialists
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Start Free Banner */}
      <section className="py-6 bg-jade-50 border-b-2 border-jade-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-forest-700 text-lg flex items-center justify-center flex-wrap">
              <svg className="w-6 h-6 mr-2 text-lime-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <strong>Your first consultation is free with a Glowheal doctor.</strong>
              <span className="ml-1">Our in-house physician will assess your {service.name.toLowerCase()} concern and route you to a specialist if needed.</span>
            </p>
            <Link href="/book">
              <Button variant="primary" size="lg" className="mt-4">
                Start Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fixed Pricing in Pune */}
      {catalogItems.length > 0 && (
        <section className="py-16 bg-amber-50 border-y-2 border-amber-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
                  Fixed Pricing in Pune
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Transparent Glowheal prices for {catalogSpecialty?.title || service.name} services. 
                  No hidden costs.
                </p>
                <Link
                  href={`/pricing/${catalogSpecialtySlug}`}
                  className="text-jade-600 hover:text-jade-800 font-semibold underline"
                >
                  View all {catalogSpecialty?.title || service.name} pricing →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {catalogItems.map((item) => (
                  <PriceCard
                    key={item.code}
                    item={item}
                    ctaText="Book Free Consultation"
                    href={`/book?service=${item.code}&specialty=${catalogSpecialtySlug}`}
                  />
                ))}
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                <p className="text-sm text-gray-700">
                  <svg className="w-5 h-5 inline mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong>Note:</strong> Glowheal fixed prices apply at partner clinics in Pune. 
                  Add-ons (e.g., labs, implants) require consent after your free consultation and are billed separately per catalog.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conditions Treated */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              Conditions We Treat
            </h2>
            <p className="text-gray-600">
              Expert care for a wide range of {service.name.toLowerCase()} conditions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {service.conditions.map((condition, index) => (
              <div
                key={index}
                className="bg-jade-50 rounded-lg p-4 text-center hover:bg-jade-100 transition-colors"
              >
                <p className="text-forest-700 font-medium text-sm">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">Get expert {service.name.toLowerCase()} care in 6 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Choose Service',
                description: `Select ${service.name} from our specialties`,
                icon: '🔍',
              },
              {
                step: '2',
                title: 'Pick a Doctor',
                description: 'Browse verified specialists and their reviews',
                icon: '👨‍⚕️',
              },
              {
                step: '3',
                title: 'Book Time Slot',
                description: 'Choose a convenient time for your consultation',
                icon: '📅',
              },
              {
                step: '4',
                title: 'Video Consultation',
                description: 'Connect with your doctor via secure video call',
                icon: '💻',
              },
              {
                step: '5',
                title: 'Get Prescription',
                description: 'Receive digital prescription via email instantly',
                icon: '💊',
              },
              {
                step: '6',
                title: 'Follow-up Support',
                description: 'Free follow-up consultations for ongoing care',
                icon: '🔄',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-forest-700 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                    {item.step}
                  </div>
                  <div className="text-4xl">{item.icon}</div>
                </div>
                <h3 className="text-lg font-bold font-display text-forest-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder: Before/After Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-navy-800 mb-4">
              Real Results from Real Patients
            </h2>
            <p className="text-gray-600">See the transformation achieved with our expert care</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-12 text-center max-w-4xl mx-auto">
            <p className="text-gray-500 mb-4">
              [TODO: Add before/after image gallery for {service.name}]
            </p>
            <p className="text-xs text-gray-400 italic">
              * Results may vary from person to person. Individual results are not guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      {relevantDoctors.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-navy-800 mb-4">
                Meet Our {service.name} Specialists
              </h2>
              <p className="text-gray-600">Consult with experienced, verified doctors</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {relevantDoctors.slice(0, 4).map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/doctors">
                <Button variant="primary" size="lg">
                  View All Specialists
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-gray-600">No hidden costs. Pay only for what you need.</p>
          </div>

          {/* Pricing Explainer */}
          <div className="bg-jade-50 border-l-4 border-jade-600 p-6 mb-12 max-w-4xl mx-auto rounded-r-lg">
            <h3 className="font-bold text-forest-700 text-lg mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              How Pricing Works
            </h3>
            <p className="text-forest-600">
              Begin with a <strong>free call</strong> with our in-house doctor. If specialist care is 
              recommended, fees apply only if you proceed. All prices are transparent with no hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Single Consultation',
                price: service.consultationFee,
                features: [
                  '30-minute video consultation',
                  'Digital prescription',
                  'Treatment plan',
                  'Email support',
                ],
                recommended: false,
              },
              {
                name: 'Treatment Package',
                price: 2499,
                features: [
                  'Initial consultation',
                  'Follow-up sessions (2-4)',
                  'Treatment medications',
                  'Progress tracking',
                  'Priority support',
                ],
                recommended: true,
              },
              {
                name: 'Premium Care',
                price: 4999,
                features: [
                  'Comprehensive treatment',
                  'Unlimited follow-ups (3 months)',
                  'All medications included',
                  'Dedicated care manager',
                  '24/7 WhatsApp support',
                ],
                recommended: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 ${
                  plan.recommended
                    ? 'bg-gradient-to-br from-forest-700 to-jade-600 text-white shadow-xl scale-105'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <div className="text-center mb-4">
                    <span className="bg-white text-forest-700 px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3
                  className={`text-2xl font-bold font-display mb-2 ${
                    plan.recommended ? 'text-white' : 'text-forest-700'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.recommended ? 'text-white' : 'text-forest-900'}`}>
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-base ml-1 ${plan.recommended ? 'text-white/90' : 'text-gray-600'}`}>
                    / package
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mr-2 flex-shrink-0 ${
                          plan.recommended ? 'text-lime-300' : 'text-lime-600'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className={plan.recommended ? 'text-white' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/book">
                  <Button
                    variant={plan.recommended ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    Choose Plan
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FAQAccordion
            faqs={faqs}
            title="Frequently Asked Questions"
            description={`Everything you need to know about ${service.name.toLowerCase()} on Glowheal`}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-forest-700 to-jade-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Start Your {service.name} Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-forest-50">
            Start with a free consultation. Get personalized care from verified specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-forest-700 hover:bg-jade-50">
                Have Questions? Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
