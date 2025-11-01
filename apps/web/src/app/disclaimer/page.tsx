import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Glowheal',
  description: 'Medical disclaimer for Glowheal healthcare services',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-forest-700 mb-6">Medical Disclaimer</h1>
          <p className="text-gray-600 mb-8">Last updated: November 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Important Notice</h2>
              <p className="text-gray-700 mb-4">
                The information provided on this website and through Glowheal's services is for educational and informational 
                purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-gray-700">
                <strong>Always seek the advice of your physician or other qualified health provider</strong> with any questions 
                you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it 
                because of something you have read on this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Emergency Situations</h2>
              <p className="text-gray-700 mb-4">
                <strong>If you think you may have a medical emergency, call your doctor or emergency services immediately.</strong>
              </p>
              <p className="text-gray-700">
                Glowheal does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other 
                information that may be mentioned on this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Consultation Limitations</h2>
              <p className="text-gray-700 mb-4">
                Online consultations have limitations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cannot replace physical examinations for certain conditions</li>
                <li>May require in-person follow-up for accurate diagnosis</li>
                <li>Depend on the quality of your internet connection and device</li>
                <li>Cannot handle medical emergencies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Treatment Results</h2>
              <p className="text-gray-700">
                Individual results may vary. Treatment outcomes depend on many factors including your specific condition, 
                overall health, adherence to treatment plans, and individual response to therapy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">No Doctor-Patient Relationship</h2>
              <p className="text-gray-700">
                Use of this website and the information contained herein does not create a doctor-patient relationship. 
                A doctor-patient relationship is established only after a formal consultation and mutual agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Third-Party Information</h2>
              <p className="text-gray-700">
                Links to third-party websites are provided for convenience only. Glowheal does not endorse or control the 
                content of external sites and is not responsible for their accuracy or reliability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Changes to Disclaimer</h2>
              <p className="text-gray-700">
                We reserve the right to update this disclaimer at any time. Your continued use of our services constitutes 
                acceptance of any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-forest-700 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this disclaimer, please contact:
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
