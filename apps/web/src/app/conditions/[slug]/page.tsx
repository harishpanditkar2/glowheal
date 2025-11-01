import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import services from '@/data/services.json';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) {
    return {
      title: 'Condition Not Found | Glowheal',
    };
  }

  return {
    title: `${service.name} Treatment | Dr. Chetna Bhaisare | Glowheal`,
    description: service.shortDescription || `Expert ${service.name} treatment by Dr. Chetna Bhaisare. Book your free consultation today.`,
  };
}

export default function ConditionPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-700 to-jade-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              {service.name} Treatment
            </h1>
            <p className="text-xl mb-8 text-white/90">
              {service.shortDescription}
            </p>
            <Link href="/book">
              <Button variant="primary" size="lg" className="bg-white text-forest-700 hover:bg-lime-50">
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-8">
              <h2 className="text-3xl font-bold text-forest-700 mb-6">About {service.name}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.shortDescription}
              </p>
              
              <div className="bg-jade-50 border-2 border-jade-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-forest-700 mb-4">Why Choose Dr. Chetna Bhaisare?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-lime-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>10+ years of experience in Dermatology and Ayurveda</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-lime-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Integrative approach combining modern dermatology with traditional Ayurvedic treatments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-lime-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Personalized treatment plans tailored to your specific needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-lime-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>5000+ happy patients treated successfully</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-forest-700 mb-4">Treatment Approach</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our treatment approach for {service.name} combines the best of modern dermatology with time-tested Ayurvedic principles. 
                We focus on addressing the root cause of your condition while providing immediate relief from symptoms.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-forest-700 mb-4">What to Expect</h3>
                <ol className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-forest-700 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong>Initial Consultation (FREE):</strong> Comprehensive assessment of your condition, medical history, and lifestyle factors
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-forest-700 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong>Personalized Treatment Plan:</strong> Customized combination of dermatological treatments and Ayurvedic therapies
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-forest-700 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong>Follow-up Care:</strong> Regular monitoring and adjustments to ensure optimal results
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-forest-700 to-jade-600 text-white rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Treatment?</h2>
              <p className="text-xl mb-8 text-white/90">
                Your first consultation with Dr. Chetna Bhaisare is completely FREE
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button variant="primary" size="lg" className="bg-white text-forest-700 hover:bg-lime-50">
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="secondary" size="lg" className="bg-lime-500 text-white hover:bg-lime-600 border-0">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Conditions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-forest-700 mb-8 text-center">Other Conditions We Treat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter((s) => s.slug !== params.slug && s.category === service.category)
                .slice(0, 6)
                .map((relatedService) => (
                  <Link
                    key={relatedService.slug}
                    href={`/conditions/${relatedService.slug}`}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-jade-500 hover:bg-jade-50 transition-all"
                  >
                    <h3 className="font-semibold text-forest-700 mb-2">{relatedService.name}</h3>
                    <p className="text-sm text-gray-600">{relatedService.shortDescription}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
