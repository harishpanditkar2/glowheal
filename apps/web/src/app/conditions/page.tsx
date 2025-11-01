import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import servicesData from '@/../../data/services.json';

export const metadata: Metadata = {
  title: 'Conditions We Treat | Dr. Chetna Bhaisare - Dermatology & Ayurveda',
  description: 'Expert treatment for skin conditions, hair loss, aging, and wellness using integrative dermatology and Ayurveda.',
  keywords: 'dermatology pune, ayurveda skin treatment, acne treatment, hair loss, eczema, psoriasis, vitiligo',
};

export default function ConditionsPage() {
  const dermatologyServices = servicesData.filter(s => s.category === 'dermatology');
  const ayurvedaServices = servicesData.filter(s => s.category === 'ayurveda');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🌿 Conditions We Treat
            </h1>
            <p className="text-xl mb-8">
              Expert care combining modern dermatology with ancient Ayurvedic wisdom
            </p>
            <Link href="/book">
              <Button variant="primary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                📅 Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dermatology Conditions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🔬</div>
              <h2 className="text-3xl font-bold text-forest-900 mb-4">
                Dermatology
              </h2>
              <p className="text-gray-700 text-lg">
                Evidence-based skin treatments with modern medical science
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dermatologyServices.map((service) => (
                <Link key={service.slug} href={`/conditions/${service.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">
                        {service.slug === 'acne-treatment' && '🔴'}
                        {service.slug === 'eczema-psoriasis' && '🩹'}
                        {service.slug === 'hair-loss' && '💇‍♀️'}
                        {service.slug === 'skin-aging' && '✨'}
                        {service.slug === 'vitiligo' && '🌈'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-forest-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {service.shortDescription}
                        </p>
                        <span className="text-teal-600 text-sm font-semibold hover:underline">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ayurveda Conditions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="text-3xl font-bold text-forest-900 mb-4">
                Ayurveda Wellness
              </h2>
              <p className="text-gray-700 text-lg">
                Traditional healing practices for holistic health and balance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ayurvedaServices.map((service) => (
                <Link key={service.slug} href={`/conditions/${service.slug}`}>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full border-2 border-amber-200">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">
                        {service.slug === 'panchakarma' && '🧘‍♀️'}
                        {service.slug === 'dosha-consultation' && '⚖️'}
                        {service.slug === 'rasayana-therapy' && '🌺'}
                        {service.slug === 'ayurvedic-skin-care' && '🌸'}
                        {service.slug === 'stress-wellness' && '🕉️'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-forest-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {service.shortDescription}
                        </p>
                        <span className="text-amber-600 text-sm font-semibold hover:underline">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Integrative Care */}
      <section className="py-16 bg-gradient-to-br from-teal-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-forest-900 mb-12">
              💡 Why Choose Integrative Care?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="text-xl font-bold text-forest-900 mb-3">Modern Dermatology</h3>
                <p className="text-gray-700">
                  Evidence-based treatments using the latest medical science, diagnostic tools, and proven therapies for quick, effective results.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-xl font-bold text-forest-900 mb-3">Ancient Ayurveda</h3>
                <p className="text-gray-700">
                  5000+ years of wisdom addressing root causes, balancing body systems, and promoting long-term healing without harsh chemicals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-forest-900 mb-3">Personalized Treatment</h3>
                <p className="text-gray-700">
                  No cookie-cutter solutions. Every treatment plan is customized to your unique constitution, lifestyle, and health goals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-xl font-bold text-forest-900 mb-3">Fewer Side Effects</h3>
                <p className="text-gray-700">
                  By combining both approaches, we often achieve better results with lower doses of medications and gentler treatments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            🌟 Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your FREE consultation today and discover how integrative care can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                📅 Book Free Consultation
              </Button>
            </Link>
            <Link href="https://wa.me/918329563445?text=Hi, I want to learn about treatment options" target="_blank">
              <Button variant="secondary" size="lg" className="bg-amber-500 text-white hover:bg-amber-600 border-0">
                💬 Ask on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
