'use client';

import { cn } from '@/lib/utils';

interface PricingPersuasionBarProps {
  className?: string;
}

/**
 * PricingPersuasionBar - Short trust-building block for pricing pages
 * Shows 4 key trust signals in a horizontal layout
 */
export function PricingPersuasionBar({ className }: PricingPersuasionBarProps) {
  const trustSignals = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Free first consult (₹0)',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: 'Fixed prices by city—no surprise fees',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: 'Quote before payment',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Transparent doctor payouts',
    },
  ];

  return (
    <div className={cn('py-6 bg-gradient-to-r from-amber-50 to-jade-50 border-y border-amber-200', className)}>
      <div className="container-width">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustSignals.map((signal, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm font-medium text-forest-800"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-forest-200 flex items-center justify-center text-forest-600">
                {signal.icon}
              </div>
              <span className="flex-1">{signal.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
