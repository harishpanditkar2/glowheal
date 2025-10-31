import { cn } from '@/lib/utils';

interface PricingComparisonTableProps {
  className?: string;
}

/**
 * PricingComparisonTable - Shows Glowheal advantages vs competitors
 * Designed for pricing pages to build trust before item selection
 */
export function PricingComparisonTable({ className }: PricingComparisonTableProps) {
  const comparisons = [
    {
      feature: 'First consultation',
      glowheal: '✓ Free (₹0)',
      aggregator: 'Varies',
      clinic: '₹500-1,000',
      glowealBest: true,
    },
    {
      feature: 'Pricing model',
      glowheal: '✓ Fixed by city',
      aggregator: 'Variable, opaque',
      clinic: 'Not disclosed upfront',
      glowealBest: true,
    },
    {
      feature: 'Quote before payment',
      glowheal: '✓ Yes, always',
      aggregator: 'Sometimes',
      clinic: 'Rarely',
      glowealBest: true,
    },
    {
      feature: 'Doctor transparency',
      glowheal: '✓ Fixed payouts',
      aggregator: 'Opaque commission',
      clinic: 'N/A',
      glowealBest: true,
    },
    {
      feature: 'WhatsApp confirmation',
      glowheal: '✓ Optional',
      aggregator: 'Email/SMS only',
      clinic: 'Phone/in-person',
      glowealBest: false,
    },
  ];

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-forest-700 to-jade-600 text-white">
            <th className="px-4 py-3.5 text-left text-sm md:text-base font-bold">Feature</th>
            <th className="px-4 py-3.5 text-center text-sm md:text-base font-bold">
              Glowheal
            </th>
            <th className="px-4 py-3.5 text-center text-sm md:text-base font-bold">
              Generic Aggregator
            </th>
            <th className="px-4 py-3.5 text-center text-sm md:text-base font-bold">
              Walk-in Clinic
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((row, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-200"
            >
              <td className="px-4 py-3 text-sm md:text-base font-medium text-gray-900">
                {row.feature}
              </td>
              <td
                className={cn(
                  'px-4 py-3 text-center text-sm md:text-base',
                  row.glowealBest
                    ? 'font-bold text-forest-700 bg-jade-100'
                    : 'font-semibold text-gray-700 bg-white'
                )}
              >
                {row.glowheal}
              </td>
              <td className="px-4 py-3 text-center text-sm md:text-base text-gray-600 bg-white">
                {row.aggregator}
              </td>
              <td className="px-4 py-3 text-center text-sm md:text-base text-gray-600 bg-white">
                {row.clinic}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Comparison based on market research as of October 2025. Your experience may vary.
      </p>
    </div>
  );
}
