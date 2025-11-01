import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { DoctorApplyForm } from '@/components/features/DoctorApplyForm';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';

export const metadata: Metadata = {
  title: 'Join as Doctor | Partner with Glowheal',
  description: 'Grow your practice with Glowheal. Get qualified patients, transparent payouts, and steady referrals across 13 specialties. Zero setup fee. Start in days.',
  openGraph: {
    title: 'Join as Doctor | Partner with Glowheal',
    description: 'Grow your practice with qualified patient leads and transparent fixed pricing.',
    type: 'website',
  },
};

export default function JoinDoctorPage() {
  // Track page view
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'partner_apply_view',
    });
  }

  const organizationSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://glowheal.in' },
    { name: 'Join as Doctor', url: 'https://glowheal.in/join-doctor' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist-50 to-white">
      <MultiSchemaRenderer schemas={[organizationSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="bg-gradient-forest-jade text-white py-20">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Grow Your Practice with Glowheal
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-jade-50">
              Get qualified patients. Keep higher profits. Zero setup fee.
            </p>
            <p className="text-lg mb-8 text-jade-100">
              Join 50+ verified doctors across Pune delivering quality care with transparent pricing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="#apply">
                Join Now (Free)
              </Button>
              <Button variant="secondary" size="lg" href="tel:+918329563445">
                📞 Talk to Partnerships
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-width">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-forest-900 mb-12">
            Why Partner with Glowheal?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 border-2 border-transparent hover:border-jade-200">
              <div className="w-14 h-14 bg-jade-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">
                Qualified Leads, Not Cold Clicks
              </h3>
              <p className="text-gray-700">
                Every patient routed through our free-first triage with in-house doctors. Reduces no-shows, improves case fit.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 border-2 border-transparent hover:border-amber-200">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">
                Fixed Patient Pricing, Transparent Payouts
              </h3>
              <p className="text-gray-700">
                No rate haggling. Patients see Glowheal fixed prices. You get predictable revenue per service.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 border-2 border-transparent hover:border-forest-200">
              <div className="w-14 h-14 bg-forest-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">
                Zero Setup Fee, Start in Days
              </h3>
              <p className="text-gray-700">
                We handle triage, quotes, WhatsApp coordination. You focus on clinical excellence. Onboard in 3-5 days.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 border-2 border-transparent hover:border-jade-200">
              <div className="w-14 h-14 bg-jade-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-jade-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">
                Steady Flow from 13 Specialties
              </h3>
              <p className="text-gray-700">
                Pune-first demand across dermatology, mental health, orthopedics, weight management, and 9 more specialties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Examples */}
      <section className="py-16 bg-gray-50">
        <div className="container-width max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-forest-900 mb-4">
            Transparent Revenue Examples
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            See how our fixed pricing translates to doctor payouts. Final fee schedule provided in partner agreement.
          </p>

          <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-forest-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">Glowheal Patient Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-forest-900">Illustrative Doctor Payout*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Therapy Session (50-60 min)</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹1,499</td>
                    <td className="px-6 py-4 text-jade-600 font-semibold">~₹1,199</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">PRP Hair (1 session)</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹4,999</td>
                    <td className="px-6 py-4 text-jade-600 font-semibold">~₹3,999</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Ortho Follow-up</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹899</td>
                    <td className="px-6 py-4 text-jade-600 font-semibold">~₹719</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Acne Care Plan (30 days)</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹899</td>
                    <td className="px-6 py-4 text-jade-600 font-semibold">~₹719</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">Diet Plan (30 days)</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹899</td>
                    <td className="px-6 py-4 text-jade-600 font-semibold">~₹719</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">IV Therapy (Vitamin Boost)</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">₹2,999</td>
                    <td className="px-6 py-4 text-jade-600 font-semibold">~₹2,399</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border-t border-amber-200 px-6 py-4">
              <p className="text-sm text-gray-700">
                <strong>*Illustrative payouts:</strong> Exact fee schedule varies by specialty, procedure complexity, and partner agreement terms. Payouts processed weekly. Add-ons (labs, implants) have separate schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container-width max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-forest-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 group">
              <summary className="text-lg font-semibold text-forest-900 cursor-pointer hover:text-jade-600 transition-colors list-none flex items-center justify-between">
                <span>How long does onboarding take?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4">
                Typically 3-5 business days. After application review, we schedule a brief call, verify credentials, complete KYC, sync your slots, and you're live.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 group">
              <summary className="text-lg font-semibold text-forest-900 cursor-pointer hover:text-jade-600 transition-colors list-none flex items-center justify-between">
                <span>When do I receive payouts?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4">
                Weekly payouts processed every Friday for consultations completed the previous week. Bank transfer via NEFT/IMPS. Requires valid PAN/GST and bank details during KYC.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 group">
              <summary className="text-lg font-semibold text-forest-900 cursor-pointer hover:text-jade-600 transition-colors list-none flex items-center justify-between">
                <span>What if a patient cancels?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4">
                Patients can cancel up to 6 hours before appointment. No-shows or late cancellations are tracked; persistent offenders are flagged. You won't be penalized for patient-side cancellations.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 group">
              <summary className="text-lg font-semibold text-forest-900 cursor-pointer hover:text-jade-600 transition-colors list-none flex items-center justify-between">
                <span>What documents do I need?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4">
                Medical registration (MCI/NMC/State Council), PAN card, GST certificate (if applicable), bank details (cancelled cheque/passbook), clinic address proof. Degree certificates helpful but optional.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 group">
              <summary className="text-lg font-semibold text-forest-900 cursor-pointer hover:text-jade-600 transition-colors list-none flex items-center justify-between">
                <span>How is patient privacy maintained?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4">
                All consultations and records follow DISHA (Digital Information Security in Healthcare Act) and IT Act guidelines. Patient consent required for data sharing. You own your clinical notes; Glowheal handles booking/payment data only.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 group">
              <summary className="text-lg font-semibold text-forest-900 cursor-pointer hover:text-jade-600 transition-colors list-none flex items-center justify-between">
                <span>Can I set my own prices?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-700 mt-4">
                Glowheal uses fixed patient-facing prices for transparency. Doctor payouts are based on a pre-agreed fee schedule that factors in specialty, complexity, and market rates. During onboarding, we'll discuss the schedule for your specialties.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-mist-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
              Ready to Join Glowheal?
            </h2>
            <p className="text-lg text-gray-700">
              Fill out the application below. Our partnerships team will review and reach out within 2-3 business days.
            </p>
          </div>
          <DoctorApplyForm />
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-forest-200 p-4 md:hidden z-40 shadow-lg">
        <Button variant="primary" size="lg" href="#apply" className="w-full">
          Join Now (Free)
        </Button>
      </div>
    </div>
  );
}
