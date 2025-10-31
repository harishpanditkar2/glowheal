import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';

export const metadata: Metadata = {
  title: 'Healthcare Insights & Wellness Tips | Glowheal Blog',
  description:
    'Expert healthcare advice, wellness tips, and medical insights from verified doctors. Learn about dermatology, mental health, orthopedics, and more.',
  keywords: 'healthcare blog, wellness tips, medical advice, dermatology tips, mental health resources, orthopedic care',
  openGraph: {
    title: 'Glowheal Blog | Healthcare Insights',
    description: 'Expert healthcare advice and wellness tips from verified doctors.',
    type: 'website',
  },
};

export default function BlogPage() {
  const schemas = [
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', url: 'https://glowheal.in' },
      { name: 'Blog', url: 'https://glowheal.in/blog' },
    ]),
  ];

  return (
    <>
      <MultiSchemaRenderer schemas={schemas} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-50 to-jade-50 py-16">
        <div className="container-width max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6 tracking-tight">
            Healthcare Insights & Wellness Tips
          </h1>
          <p className="text-lg text-forest-700 mb-8 max-w-3xl mx-auto">
            Expert advice from verified doctors on dermatology, mental health, orthopedics, and holistic wellness.
            Evidence-based insights to help you make informed healthcare decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="free" size="lg">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="container-width max-w-4xl">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-forest-900 mb-4">
              Healthcare Blog Coming Soon
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              We're preparing expert articles on skin health, mental wellness, joint care, and preventive healthcare.
              In the meantime, book a free consultation to get personalized advice from our verified doctors.
            </p>
            <div className="space-y-4">
              <p className="text-base text-gray-600">
                Topics we'll cover: Acne management, stress and anxiety, arthritis prevention, nutrition for healthy
                skin, exercise for joint health, and holistic wellness strategies.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link href="/book">
                <Button variant="free" size="lg">
                  Book Free Consultation Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Link
              href="/services"
              className="p-6 bg-forest-50 rounded-xl hover:bg-forest-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-forest-900 mb-2">Our Services</h3>
              <p className="text-sm text-forest-700">
                Explore dermatology, mental health, and orthopedic services.
              </p>
            </Link>
            <Link
              href="/pricing"
              className="p-6 bg-jade-50 rounded-xl hover:bg-jade-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-forest-900 mb-2">Fixed Pricing</h3>
              <p className="text-sm text-forest-700">
                View transparent pricing for all services—no hidden fees.
              </p>
            </Link>
            <Link
              href="/doctors"
              className="p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-forest-900 mb-2">Our Doctors</h3>
              <p className="text-sm text-forest-700">
                Meet our team of verified healthcare professionals.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
