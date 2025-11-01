import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';

export const metadata: Metadata = {
  title: 'About Glowheal | Transparent Healthcare Platform',
  description:
    'Glowheal connects patients with verified doctors across India. Fixed transparent pricing, free first consultation, and quality healthcare you can trust.',
  keywords: 'about glowheal, healthcare platform, verified doctors, transparent pricing, telemedicine india',
  openGraph: {
    title: 'About Glowheal | Quality Healthcare Platform',
    description: 'Connecting patients with verified doctors. Fixed pricing, free first consultation.',
    type: 'website',
  },
};

export default function AboutPage() {
  const schemas = [
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', url: 'https://glowheal.in' },
      { name: 'About', url: 'https://glowheal.in/about' },
    ]),
  ];

  return (
    <>
      <MultiSchemaRenderer schemas={schemas} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-50 to-jade-50 py-20">
        <div className="container-width max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6 tracking-tight">
            Healthcare Made Simple, Transparent, and Accessible
          </h1>
          <p className="text-lg text-forest-700 mb-8 max-w-3xl mx-auto">
            Glowheal is a digital healthcare platform connecting patients with verified doctors across India.
            We believe in transparent pricing, quality care, and making healthcare accessible to everyone.
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

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container-width max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-forest-700 text-center max-w-3xl mx-auto">
              To make quality healthcare accessible and affordable by connecting patients with verified doctors,
              providing transparent pricing, and ensuring a seamless consultation experience from the first free call
              to ongoing specialist care.
            </p>
          </div>

          {/* Founders Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">Our Leadership</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Founder */}
              <div className="bg-gradient-to-br from-forest-50 to-jade-50 rounded-2xl p-8 shadow-soft hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mb-4 shadow-md">
                    <span className="text-3xl font-bold text-forest-900">HP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-forest-900 mb-2">Harish Panditkar</h3>
                  <p className="text-lime-600 font-semibold mb-4">Founder & CEO</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Harish brings extensive experience in building high-performance API-driven platforms and scalable web applications. 
                    He leads Glowheal's business strategy, technology architecture, go-to-market execution, and platform development.
                  </p>
                  <div className="space-y-2 text-sm text-forest-700">
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Business & Technology Strategy
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Platform Architecture & Development
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Go-To-Market & Performance Marketing
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Automation & Growth Engineering
                    </p>
                  </div>
                </div>
              </div>

              {/* Co-Founder */}
              <div className="bg-gradient-to-br from-jade-50 to-forest-50 rounded-2xl p-8 shadow-soft hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-jade-400 rounded-full flex items-center justify-center mb-4 shadow-md">
                    <span className="text-3xl font-bold text-forest-900">CB</span>
                  </div>
                  <h3 className="text-2xl font-bold text-forest-900 mb-2">Dr. Chetna Bhaisare</h3>
                  <p className="text-jade-600 font-semibold mb-4">Co-Founder & CMO</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Dr. Chetna brings credible clinical expertise as Chief Medical Officer (CMO) at Glowheal. 
                    She leads patient consultations, clinical operations, wellness programs, and strategic partnerships with healthcare providers across India.
                  </p>
                  <div className="space-y-2 text-sm text-forest-700">
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Clinical Operations & Consultations
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Wellness Programs & Patient Care
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Healthcare Partnerships & Network
                    </p>
                    <p className="flex items-center gap-2 justify-center">
                      <svg className="w-4 h-4 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Marketing & Operational Continuity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why We Started Section */}
          <div className="mb-16 bg-gradient-to-br from-amber-50 to-lime-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">Why We Started Glowheal</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
              <p>
                Healthcare in India is broken. Patients face unclear pricing, hidden fees, and confusing referrals to specialists 
                they don't need. We experienced this firsthand—watching friends and family struggle to find trustworthy care at 
                transparent prices.
              </p>
              <p>
                Glowheal was born from a simple idea: <strong className="text-forest-900">what if healthcare was as transparent 
                as ordering a product online?</strong> You see the price upfront, you talk to a doctor for free first, and you only 
                pay when you're ready to proceed.
              </p>
              <p>
                We combine Harish's technical expertise in building scalable platforms with Dr. Chetna's clinical experience 
                to create a healthcare platform that actually works for patients—no surprises, no confusion, just honest care.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-jade-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-2">Verified Doctors</h3>
              <p className="text-gray-700">
                All doctors are verified professionals with proven experience in dermatology, mental health, and
                orthopedics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-2">Fixed Transparent Pricing</h3>
              <p className="text-gray-700">
                See exact costs upfront—no hidden fees, no surprise charges. What you see is what you pay.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-2">Free First Consultation</h3>
              <p className="text-gray-700">
                Start with a free call to our in-house doctor. Get routed to specialists only if needed.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">How Glowheal Works</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-forest-900 mb-1">
                    Book Your Free First Consultation
                  </h3>
                  <p className="text-gray-700">
                    Fill out a simple form and schedule your free consultation with our in-house doctor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-forest-900 mb-1">Get Expert Assessment</h3>
                  <p className="text-gray-700">
                    Our doctor assesses your concern and recommends the right specialist if needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-forest-900 mb-1">View Transparent Pricing</h3>
                  <p className="text-gray-700">
                    See exact costs for treatments before committing. No hidden fees, no surprises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-forest-900 mb-1">Start Your Treatment</h3>
                  <p className="text-gray-700">
                    Once you consent, proceed with treatment. Payment only after you're ready to start.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest-50 py-20">
        <div className="container-width max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-forest-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-forest-700 mb-8">
            Book your free first consultation today and experience healthcare the way it should be—transparent,
            accessible, and focused on you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/doctors">
              <Button variant="secondary" size="lg">
                Meet Our Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
