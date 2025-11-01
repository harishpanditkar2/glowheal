import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Pricing | Dr. Chetna Bhaisare - Transparent Healthcare Costs',
  description: 'Clear, upfront pricing for dermatology and Ayurveda consultations. First consultation FREE. No hidden charges.',
  keywords: 'dermatology pricing, ayurveda consultation cost, skin treatment prices pune',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
              💰 Transparent Pricing
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Clear, upfront costs. No hidden charges. Your first consultation is <span className="font-bold text-teal-600">FREE</span>! 🎉
            </p>
            
            <div className="inline-flex items-center gap-2 bg-teal-400 text-white px-6 py-3 rounded-lg shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">First Consultation: ₹0 (FREE)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Pricing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-forest-900 mb-12">
              📋 Consultation Fees
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Initial Consultation */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-4 border-teal-400">
                <div className="text-5xl mb-4">🆓</div>
                <h3 className="text-2xl font-bold text-forest-900 mb-2">Initial Consultation</h3>
                <div className="text-4xl font-bold text-teal-600 mb-4">FREE</div>
                <p className="text-gray-600 mb-6">
                  Complete health assessment, diagnosis, and treatment plan discussion
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>30-45 minute consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Detailed health history review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Personalized treatment plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Online or in-clinic</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button variant="primary" className="w-full">
                    📅 Book Free Consultation
                  </Button>
                </Link>
              </div>

              {/* Follow-up Online */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-2xl font-bold text-forest-900 mb-2">Follow-up (Online)</h3>
                <div className="text-4xl font-bold text-teal-600 mb-4">₹500</div>
                <p className="text-gray-600 mb-6">
                  Video consultation for ongoing treatment monitoring
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>15-20 minute consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Progress review & adjustments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Digital prescription</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Convenient from home</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button variant="secondary" className="w-full">
                    Schedule Follow-up
                  </Button>
                </Link>
              </div>

              {/* Follow-up In-Clinic */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold text-forest-900 mb-2">Follow-up (In-Clinic)</h3>
                <div className="text-4xl font-bold text-teal-600 mb-4">₹800</div>
                <p className="text-gray-600 mb-6">
                  In-person consultation at our Pune clinic
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>20-30 minute consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Physical examination included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Hands-on assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    <span>Ideal for complex cases</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button variant="secondary" className="w-full">
                    Book In-Clinic Visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Pricing Note */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-forest-900 mb-4">🌿 Treatment Pricing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Treatment costs vary based on your specific condition and chosen approach (modern dermatology, 
                Ayurveda, or integrative). During your <strong>FREE first consultation</strong>, Dr. Chetna will:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span>Assess your condition thoroughly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span>Recommend the best treatment approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span>Provide clear cost estimates before you commit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span>Discuss payment options and timelines</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold">
                💡 No surprises. No hidden charges. You decide if you want to proceed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-forest-900 mb-12">
              ✨ What's Always Included
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '📋', title: 'Digital Prescriptions', desc: 'Sent to your email immediately after consultation' },
                { icon: '💬', title: 'WhatsApp Support', desc: 'Quick questions answered between visits' },
                { icon: '📱', title: 'Appointment Reminders', desc: 'SMS & WhatsApp reminders for follow-ups' },
                { icon: '🔒', title: 'Secure Records', desc: 'All your health records safely stored' },
                { icon: '🌿', title: 'Lifestyle Guidance', desc: 'Diet, skincare & wellness recommendations' },
                { icon: '🔄', title: 'Flexible Rescheduling', desc: 'Free rescheduling up to 2 hours before' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-forest-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            🌟 Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your FREE consultation today. No payment required until you're ready to start treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                📅 Book Free Consultation
              </Button>
            </Link>
            <Link href="https://wa.me/918329563445?text=Hi, I have questions about pricing" target="_blank">
              <Button variant="secondary" size="lg" className="bg-amber-500 text-white hover:bg-amber-600 border-0">
                💬 Ask Questions on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
