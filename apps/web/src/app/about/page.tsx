import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';

export const metadata: Metadata = {
  title: 'About Dr. Chetna Bhaisare | Dermatology & Ayurveda',
  description:
    'Dr. Chetna Bhaisare specializes in Dermatology and Ayurveda with 10+ years of experience. Integrative approach combining modern medicine with traditional healing.',
  keywords: 'Dr. Chetna Bhaisare, dermatologist pune, ayurvedic doctor, integrative medicine, skin specialist',
  openGraph: {
    title: 'About Dr. Chetna Bhaisare | Dermatology & Ayurveda',
    description: 'Integrative healthcare combining modern dermatology with traditional Ayurveda. 10+ years experience.',
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
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="container-width max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6 tracking-tight">
            Dr. Chetna Bhaisare
          </h1>
          <p className="text-2xl text-teal-600 font-semibold mb-4">
            Dermatology & Ayurveda Specialist
          </p>
          <p className="text-lg text-forest-700 mb-8 max-w-3xl mx-auto">
            Integrative healthcare approach combining modern dermatology with traditional Ayurvedic healing.<br/>
            Over 10 years of experience helping patients achieve optimal skin health and wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg">
                Book Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container-width max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-4 text-center">🎯 My Approach</h2>
            <p className="text-lg text-forest-700 text-center max-w-3xl mx-auto">
              I believe in treating the whole person, not just symptoms. By combining modern dermatological 
              treatments with time-tested Ayurvedic principles, I help patients achieve lasting results and 
              optimal well-being. 🌱
            </p>
          </div>

          {/* Doctor Profile */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 shadow-soft">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-teal-400 rounded-full flex items-center justify-center mb-6 shadow-md">
                    <span className="text-5xl font-bold text-white">CB</span>
                  </div>
                  <h3 className="text-3xl font-bold text-forest-900 mb-2">Dr. Chetna Bhaisare</h3>
                  <p className="text-teal-600 font-semibold text-xl mb-6">👩‍⚕️ Doctor</p>
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    With over 10 years of clinical experience, I specialize in integrative healthcare that bridges 
                    modern dermatology and traditional Ayurveda. My practice focuses on personalized treatment plans 
                    that address both immediate concerns and long-term wellness.
                  </p>
                  
                  <div className="w-full space-y-4 text-left">
                    <h4 className="text-xl font-semibold text-forest-900 mb-3">Specializations</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-forest-900">Dermatology</p>
                          <p className="text-sm text-gray-600">Acne, Eczema, Psoriasis, Hair Loss, Skin Aging</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-forest-900">Ayurveda</p>
                          <p className="text-sm text-gray-600">Panchakarma, Dosha Balancing, Rasayana</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-forest-900">Holistic Wellness</p>
                          <p className="text-sm text-gray-600">Stress Management, Lifestyle Guidance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-forest-900">Preventive Care</p>
                          <p className="text-sm text-gray-600">Skin Health, Anti-aging, Nutrition</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Me */}
          <div className="mb-16 bg-gradient-to-br from-amber-50 to-teal-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">Why Choose Integrative Care</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
              <p>
                Modern dermatology excels at treating symptoms quickly and effectively. Ayurveda offers deep wisdom 
                about root causes and long-term balance. Together, they create a comprehensive approach that addresses 
                both immediate concerns and underlying health patterns.
              </p>
              <p>
                <strong className="text-forest-900">My practice philosophy:</strong> Every patient is unique. I take 
                time to understand your medical history, lifestyle, and goals before recommending treatments. Whether 
                you're dealing with chronic skin conditions or seeking preventive care, you'll receive personalized 
                attention and evidence-based solutions.
              </p>
              <p>
                With consultations available both in-clinic and online, quality healthcare is accessible when you need 
                it. Your first consultation is always free—because good health starts with good conversation. 💬✨
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
