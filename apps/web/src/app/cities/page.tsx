import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';

export const metadata: Metadata = {
  title: 'Healthcare Services Across India | Pune, Mumbai, Bengaluru - Glowheal',
  description:
    'Access quality healthcare services in Pune, Mumbai, and Bengaluru. Free first consultation with verified doctors. Fixed transparent pricing across all cities.',
  keywords: 'healthcare cities india, pune doctors, mumbai healthcare, bengaluru medical services, multi-city healthcare',
  openGraph: {
    title: 'Cities We Serve | Glowheal Healthcare',
    description: 'Quality healthcare across Pune, Mumbai, and Bengaluru with free first consultation.',
    type: 'website',
  },
};

export default function CitiesPage() {
  const cities = [
    {
      name: 'Pune',
      slug: 'pune',
      status: 'Active',
      description: 'Full catalog with fixed pricing across dermatology, mental health, and orthopedics.',
      services: ['Dermatology', 'Mental Health', 'Orthopedics'],
    },
    {
      name: 'Mumbai',
      slug: 'mumbai',
      status: 'Coming Soon',
      description: 'Expanding services to Mumbai. Currently showing Pune pricing until catalog finalized.',
      services: ['Dermatology', 'Mental Health', 'Orthopedics'],
    },
    {
      name: 'Bengaluru',
      slug: 'bengaluru',
      status: 'Coming Soon',
      description: 'Expanding services to Bengaluru. Currently showing Pune pricing until catalog finalized.',
      services: ['Dermatology', 'Mental Health', 'Orthopedics'],
    },
  ];

  const schemas = [
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', url: 'https://glowheal.in' },
      { name: 'Cities', url: 'https://glowheal.in/cities' },
    ]),
  ];

  return (
    <>
      <MultiSchemaRenderer schemas={schemas} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-50 to-jade-50 py-20">
        <div className="container-width max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6 tracking-tight">
            Healthcare Services Across India
          </h1>
          <p className="text-lg text-forest-700 mb-8 max-w-3xl mx-auto">
            Access quality healthcare with verified doctors in major cities. Start with a free first consultation,
            then see exact costs upfront—no hidden fees, no surprise charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">
                View Fixed Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16">
        <div className="container-width max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {cities.map((city) => (
              <div
                key={city.slug}
                className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 border-2 border-transparent hover:border-forest-200 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-forest-900">{city.name}</h2>
                  {city.status === 'Active' ? (
                    <span className="px-3 py-1 bg-jade-100 text-jade-700 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{city.description}</p>
                <div className="mb-6 flex-grow">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    Available Services
                  </h3>
                  <ul className="space-y-1">
                    {city.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/pricing?city=${city.slug}`}>
                  <Button variant="secondary" className="w-full">
                    View {city.name} Pricing
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest-50 py-20">
        <div className="container-width max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-forest-900 mb-4">
            Not Sure Which City to Choose?
          </h2>
          <p className="text-lg text-forest-700 mb-8">
            Book a free consultation and our team will help you find the right doctor in your city.
          </p>
          <Link href="/book">
            <Button variant="primary" size="lg">
              Book Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
