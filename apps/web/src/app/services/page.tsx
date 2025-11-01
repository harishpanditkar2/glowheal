import { Metadata } from 'next';
import Link from 'next/link';
import { ServiceCard } from '@/components/features/ServiceCard';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';
import { Button } from '@/components/ui/Button';
import { PriceCard } from '@/components/features/PriceCard';
import { getCatalog, CatalogSpecialty } from '@/lib/catalog';
import services from '@/data/services.json';

export const metadata: Metadata = {
  title: 'Free First Consultation | Healthcare Services - Glowheal',
  description: 'Start with a free consultation with our in-house doctor. Browse 12+ healthcare specialties including Dermatology, Hair Care, Mental Health, Women\'s Health. Get routed to specialists if needed.',
  openGraph: {
    title: 'Free First Consultation | Healthcare Services - Glowheal',
    description: 'Start with a free consultation. Browse 12+ healthcare specialties. Get routed to specialists if needed.',
    url: 'https://glowheal.in/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://glowheal.in' },
    { name: 'Services', url: 'https://glowheal.in/services' },
  ]);

  const organizationSchema = buildOrganizationSchema();
  const puneCatalog = getCatalog('pune');

  return (
    <>
      <MultiSchemaRenderer schemas={[organizationSchema, breadcrumbs]} />

      {/* Hero Section */}
      <section className="bg-gradient-forest-jade text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Healthcare Services for Every Need
            </h1>
            <p className="text-xl md:text-2xl text-jade-100 mb-8">
              Start with a free consultation, then connect with 500+ specialists if needed.
            </p>
            <Link href="/book">
              <Button variant="primary" size="lg">
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Start Free Band */}
      <section className="py-8 bg-forest-50 border-y-2 border-forest-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-forest-700 mb-2 flex items-center justify-center md:justify-start">
                <svg className="w-7 h-7 mr-3 text-lime-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your First Consultation is Free
              </h2>
              <p className="text-forest-600 text-lg">
                Talk to our in-house doctor at no cost. Specialist fees apply only if you proceed with specialist care.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/book">
                <Button variant="primary" size="lg" className="whitespace-nowrap">
                  Book Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pune Fixed Prices Panel */}
      {puneCatalog && (
        <section className="py-16 bg-amber-50 border-y-2 border-amber-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
                  Pune Fixed Prices
                </h2>
                <p className="text-xl text-gray-700 mb-2">
                  Transparent pricing. No hidden costs. Start with a free consultation.
                </p>
                <Link
                  href="/pricing"
                  className="text-jade-600 hover:text-jade-800 font-semibold underline"
                >
                  View all Pune pricing →
                </Link>
              </div>

              {/* Show sample items from each specialty */}
              {puneCatalog.specialties.map((specialty: CatalogSpecialty) => (
                <div key={specialty.slug} className="mb-12 last:mb-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-forest-900">
                      {specialty.title}
                    </h3>
                    <Link
                      href={`/pricing/${specialty.slug}`}
                      className="text-jade-600 hover:text-jade-800 font-medium underline text-sm"
                    >
                      See all {specialty.title.toLowerCase()} prices →
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialty.items.slice(0, 3).map((item) => (
                      <PriceCard
                        key={item.code}
                        item={item}
                        ctaText="Book Free Consultation"
                        href={`/book?service=${item.code}&specialty=${specialty.slug}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-white rounded-lg border border-amber-300">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Note:</strong> Glowheal fixed prices apply at partner clinics in Pune. 
                  Add-ons (labs, implants, extended stays) require consent after your free consultation.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                slug={service.slug}
                tagline={service.tagline}
                icon={service.icon}
                priceRange={service.priceRange}
                consultationFee={service.consultationFee}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Glowheal */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-forest-700 mb-4">
              Why Choose Glowheal for Your Health?
            </h2>
            <p className="text-gray-600">
              India's most trusted platform for quality healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🩺',
                title: 'Expert Doctors',
                description: '500+ verified medical professionals with 10+ years experience',
              },
              {
                icon: '💰',
                title: 'Free First Consultation',
                description: 'Your first call with our in-house doctor is free. Specialist fees (₹499+) apply only if you proceed.',
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description: 'End-to-end encrypted consultations. Your data is completely confidential',
              },
              {
                icon: '📱',
                title: 'Instant Access',
                description: 'Book and consult within minutes. Available 24/7 for urgent needs',
              },
              {
                icon: '💊',
                title: 'Digital Prescriptions',
                description: 'Get prescriptions instantly via email. Order medicines online',
              },
              {
                icon: '🔄',
                title: 'Follow-up Support',
                description: 'Free follow-up consultations. Track your health progress',
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold font-display text-forest-700 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-forest-700 to-jade-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-forest-50">
            Your first consultation is completely free. Book now and get expert medical guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/doctors">
              <Button variant="secondary" size="lg" className="bg-white hover:bg-gray-100 text-forest-700">
                Browse Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
