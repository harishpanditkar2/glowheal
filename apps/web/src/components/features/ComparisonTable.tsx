export function ComparisonTable() {
  const features: Array<{
    feature: string;
    glowheal: boolean | 'partial';
    aggregator: boolean | 'partial';
    clinic: boolean | 'partial';
    description: string;
  }> = [
    {
      feature: 'Free First Consultation',
      glowheal: true,
      aggregator: false,
      clinic: false,
      description: 'Talk to our doctor at no cost before specialist routing',
    },
    {
      feature: 'Smart Specialist Routing',
      glowheal: true,
      aggregator: false,
      clinic: false,
      description: 'Doctor assesses and routes you to the right specialist',
    },
    {
      feature: 'WhatsApp Confirmation',
      glowheal: true,
      aggregator: 'partial',
      clinic: false,
      description: 'Instant booking confirmation and updates on WhatsApp',
    },
    {
      feature: 'Transparent Pricing',
      glowheal: true,
      aggregator: 'partial',
      clinic: true,
      description: 'Know exact fees upfront with no hidden costs',
    },
    {
      feature: '100% Private & Secure',
      glowheal: true,
      aggregator: true,
      clinic: true,
      description: 'HIPAA-compliant data protection and confidentiality',
    },
    {
      feature: '24/7 Availability',
      glowheal: true,
      aggregator: true,
      clinic: false,
      description: 'Book consultations anytime, same-day slots available',
    },
    {
      feature: 'No Travel Required',
      glowheal: true,
      aggregator: true,
      clinic: false,
      description: 'Video consultations from home comfort',
    },
    {
      feature: 'Follow-up Care',
      glowheal: true,
      aggregator: 'partial',
      clinic: true,
      description: 'Ongoing support and treatment monitoring',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-700 mb-4">
            Why Choose Glowheal?
          </h2>
          <p className="text-lg text-gray-600">
            Compare our comprehensive care model with traditional alternatives
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-bold text-forest-700 border-b-2 border-gray-200">
                  Feature
                </th>
                <th className="text-center p-4 font-bold text-white bg-gradient-to-br from-forest-700 to-jade-600 border-b-2 border-forest-800">
                  Glowheal
                </th>
                <th className="text-center p-4 font-semibold text-gray-700 border-b-2 border-gray-200">
                  Generic Aggregator
                </th>
                <th className="text-center p-4 font-semibold text-gray-700 border-b-2 border-gray-200">
                  Walk-in Clinic
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-jade-50 transition-colors`}
                >
                  {/* Feature Name */}
                  <td className="p-4 border-b border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{item.feature}</p>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </td>

                  {/* Glowheal */}
                  <td className="text-center p-4 border-b border-gray-200 bg-forest-50">
                    {renderCheckmark(item.glowheal, 'forest')}
                  </td>

                  {/* Aggregator */}
                  <td className="text-center p-4 border-b border-gray-200">
                    {renderCheckmark(item.aggregator, 'gray')}
                  </td>

                  {/* Clinic */}
                  <td className="text-center p-4 border-b border-gray-200">
                    {renderCheckmark(item.clinic, 'gray')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly Version */}
        <div className="md:hidden mt-8 space-y-4">
          {features.map((item, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-forest-700 mb-2">{item.feature}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-gray-700 mb-1">Glowheal</p>
                  {renderCheckmark(item.glowheal, 'forest')}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700 mb-1">Aggregator</p>
                  {renderCheckmark(item.aggregator, 'gray')}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700 mb-1">Clinic</p>
                  {renderCheckmark(item.clinic, 'gray')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-gray-500 mt-8 max-w-3xl mx-auto">
          * Comparison based on typical industry practices as of October 2025. Features may vary by provider.
          Generic aggregator refers to doctor discovery platforms without routing or free consultation models.
        </p>
      </div>
    </section>
  );
}

function renderCheckmark(value: boolean | 'partial', colorScheme: 'forest' | 'gray') {
  if (value === true) {
    return (
      <div
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
          colorScheme === 'forest' ? 'bg-forest-700' : 'bg-gray-400'
        }`}
        aria-label="Yes"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  } else if (value === 'partial') {
    return (
      <div
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500"
        aria-label="Partial"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200" aria-label="No">
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    );
  }
}
