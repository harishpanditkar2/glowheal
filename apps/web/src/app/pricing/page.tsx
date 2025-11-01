import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import * as Icons from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | Dr. Chetna Bhaisare - Transparent Healthcare Costs',
  description: 'Clear, upfront pricing for dermatology and Ayurveda consultations. First consultation FREE. No hidden charges.',
  keywords: 'dermatology pricing, ayurveda consultation cost, skin treatment prices pune',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 to-jade-50">
      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Clear, upfront costs. No hidden charges. Your first consultation is <span className="font-bold text-jade-600">FREE</span>!
            </p>
            
            <div className="inline-flex items-center gap-2 bg-jade-600 text-white px-6 py-3 rounded-lg shadow-md">
              <Icons.CheckCircle className="w-5 h-5" />
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
              Consultation Fees
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Initial Consultation */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-4 border-jade-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-forest-100 to-jade-100 rounded-full flex items-center justify-center">
                  <Icons.Stethoscope className="w-8 h-8 text-forest-700" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 mb-2">Initial Consultation</h3>
                <div className="text-4xl font-bold text-jade-600 mb-4">FREE</div>
                <p className="text-gray-600 mb-6">
                  Complete health assessment, diagnosis, and treatment plan discussion
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>30-45 minute consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Detailed health history review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Personalized treatment plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Online or in-clinic</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button variant="primary" className="w-full">
                    Book Free Consultation
                  </Button>
                </Link>
              </div>

              {/* Follow-up Online */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-forest-100 to-jade-100 rounded-full flex items-center justify-center">
                  <Icons.Video className="w-8 h-8 text-forest-700" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 mb-2">Follow-up (Online)</h3>
                <div className="text-4xl font-bold text-jade-600 mb-4">₹500</div>
                <p className="text-gray-600 mb-6">
                  Video consultation for ongoing treatment monitoring
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>15-20 minute consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Progress review & adjustments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Digital prescription</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
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
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-forest-100 to-jade-100 rounded-full flex items-center justify-center">
                  <Icons.Hospital className="w-8 h-8 text-forest-700" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 mb-2">Follow-up (In-Clinic)</h3>
                <div className="text-4xl font-bold text-jade-600 mb-4">₹800</div>
                <p className="text-gray-600 mb-6">
                  In-person consultation at our Pune clinic
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>20-30 minute consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Physical examination included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
                    <span>Hands-on assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0" />
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
            <div className="bg-jade-50 border-2 border-jade-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icons.IndianRupee className="w-8 h-8 text-forest-700" />
                <h3 className="text-2xl font-bold text-forest-900">Treatment Pricing</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Treatment costs vary based on your specific condition and chosen approach (modern dermatology, 
                Ayurveda, or integrative). During your <strong>FREE first consultation</strong>, Dr. Chetna will:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0 mt-0.5" />
                  <span>Assess your condition thoroughly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0 mt-0.5" />
                  <span>Recommend the best treatment approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0 mt-0.5" />
                  <span>Provide clear cost estimates before you commit</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-jade-600 flex-shrink-0 mt-0.5" />
                  <span>Discuss payment options and timelines</span>
                </li>
              </ul>
              <div className="flex items-center gap-2 text-forest-700 font-semibold">
                <Icons.Shield className="w-5 h-5" />
                <span>No surprises. No hidden charges. You decide if you want to proceed.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-forest-900 mb-12">
              What's Always Included
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { Icon: Icons.FileText, title: 'Digital Prescriptions', desc: 'Sent to your email immediately after consultation' },
                { Icon: Icons.MessageCircle, title: 'WhatsApp Support', desc: 'Quick questions answered between visits' },
                { Icon: Icons.Bell, title: 'Appointment Reminders', desc: 'SMS & WhatsApp reminders for follow-ups' },
                { Icon: Icons.Lock, title: 'Secure Records', desc: 'All your health records safely stored' },
                { Icon: Icons.Heart, title: 'Lifestyle Guidance', desc: 'Diet, skincare & wellness recommendations' },
                { Icon: Icons.Calendar, title: 'Flexible Rescheduling', desc: 'Free rescheduling up to 2 hours before' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-forest-100 to-jade-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.Icon className="w-6 h-6 text-forest-700" />
                  </div>
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
      <section className="py-16 bg-gradient-to-br from-forest-700 to-jade-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your FREE consultation today. No payment required until you're ready to start treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="primary" size="lg" className="bg-white text-forest-700 hover:bg-lime-50">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="https://wa.me/918329563445?text=Hi, I have questions about pricing" target="_blank">
              <Button variant="secondary" size="lg" className="bg-lime-500 text-white hover:bg-lime-600 border-0">
                Ask Questions on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
