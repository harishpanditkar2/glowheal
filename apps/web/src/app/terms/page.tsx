import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Glowheal',
  description: 'Terms and conditions for using Glowheal healthcare services',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-forest-700 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: November 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Glowheal's services, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">2. Services Provided</h2>
              <p className="text-gray-700">
                Glowheal provides dermatology and integrative healthcare consultations through Dr. Chetna Bhaisare. 
                Services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Free initial consultations</li>
                <li>Online video consultations</li>
                <li>In-clinic visits in Pune</li>
                <li>Treatment plans and follow-up care</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">3. Consultation Policy</h2>
              <p className="text-gray-700 mb-4">
                <strong>First Consultation:</strong> Your first consultation is completely free.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Cancellations:</strong> You may cancel or reschedule appointments at least 2 hours before the scheduled time.
              </p>
              <p className="text-gray-700">
                <strong>No-shows:</strong> Failure to attend without prior notice may result in fees for future consultations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">4. Medical Disclaimer</h2>
              <p className="text-gray-700">
                Our services are provided for informational and consultation purposes. They do not replace emergency medical care. 
                In case of medical emergencies, please call emergency services immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">5. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Keep your account credentials secure</li>
                <li>Follow prescribed treatment plans</li>
                <li>Respect scheduled appointment times</li>
                <li>Pay fees for services as agreed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700">
                Glowheal and Dr. Chetna Bhaisare are not liable for any indirect, incidental, or consequential damages 
                arising from use of our services, except where prohibited by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of our services after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">8. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 text-gray-700">
                <p>Email: support@glowheal.com</p>
                <p>Phone: +91 83295 63445</p>
                <p>Address: Pune, Maharashtra, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
