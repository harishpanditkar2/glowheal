import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Glowheal',
  description: 'Privacy policy for Glowheal - How we collect, use, and protect your personal and medical information',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-forest-700 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Book a consultation or create an account</li>
                <li>Communicate with us via phone, email, or WhatsApp</li>
                <li>Fill out forms or surveys</li>
                <li>Participate in consultations with Dr. Chetna Bhaisare</li>
              </ul>
              <p className="text-gray-700 mt-4">
                This may include: name, email address, phone number, date of birth, medical history, symptoms, and treatment preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our healthcare services</li>
                <li>Process and fulfill your consultation bookings</li>
                <li>Send you appointment reminders and follow-up care instructions</li>
                <li>Respond to your questions and provide customer support</li>
                <li>Comply with legal obligations and protect against fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">3. Data Security</h2>
              <p className="text-gray-700">
                We use industry-standard encryption and security measures to protect your personal and medical information. 
                Your data is stored securely and access is restricted to authorized personnel only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700">
                We do not sell, rent, or share your personal information with third parties except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements</li>
                <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">6. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="mt-4 text-gray-700">
                <p>Email: privacy@glowheal.com</p>
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
