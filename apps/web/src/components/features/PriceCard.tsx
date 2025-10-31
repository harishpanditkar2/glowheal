'use client';

import { CatalogItem, CatalogPackage, formatPrice } from '@/lib/catalog';
import { Button } from '@/components/ui/Button';

// Icon components
const CheckIcon = () => (
  <svg className="w-5 h-5 text-jade-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface PriceCardProps {
  item: CatalogItem | CatalogPackage;
  onSelect?: (code: string) => void;
  href?: string; // Link href for CTA button (server-safe)
  selected?: boolean;
  showCta?: boolean;
  ctaText?: string;
  ctaVariant?: 'primary' | 'secondary';
  showMostBooked?: boolean; // Show "Most Booked" badge
}

// Type guard to check if item is a package
function isPackage(item: CatalogItem | CatalogPackage): item is CatalogPackage {
  return 'bundledItems' in item && 'savings' in item;
}

/**
 * PriceCard displays a single catalog item with fixed price,
 * includes/excludes, and optional CTA
 * 
 * Accessibility:
 * - Minimum 16px body text, 20px+ price
 * - AA contrast with forest/jade tokens
 * - 44px+ CTAs with focus rings
 * - Screen reader friendly includes/excludes with icons
 */
export function PriceCard({
  item,
  onSelect,
  href,
  selected = false,
  showCta = true,
  ctaText = 'Start Free',
  ctaVariant = 'primary',
  showMostBooked = false,
}: PriceCardProps) {
  const isBundle = isPackage(item);
  
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-soft hover:shadow-soft-lg 
        transition-all duration-300 p-6 border-2
        h-full flex flex-col
        ${selected ? 'border-forest-600 bg-forest-50' : 'border-transparent'}
      `}
    >
      {/* Badges */}
      {(isBundle || showMostBooked) && (
        <div className="flex gap-2 mb-3">
          {isBundle && (
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
              Bundle
            </span>
          )}
          {showMostBooked && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-jade-100 text-jade-700 text-xs font-semibold rounded-full">
              <span aria-hidden="true">⭐</span>
              <span>Most Booked</span>
            </span>
          )}
        </div>
      )}
      
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-forest-900 mb-2">
          {item.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-forest-700">
            {formatPrice(item.price)}
          </span>
          <span className="text-base text-gray-600">
            / {item.unit}
          </span>
        </div>
        
        {/* Savings label for bundles */}
        {isBundle && (
          <p className="text-sm font-medium text-jade-600 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save ₹{item.savings.toLocaleString()} vs standalone
            <span className="text-xs text-gray-500">
              ({Math.round((item.savings / item.standaloneTotal) * 100)}% off)
            </span>
          </p>
        )}
      </div>

      {/* Includes */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          What's Included
        </h4>
        <ul className="space-y-2" role="list">
          {item.includes.slice(0, 3).map((include, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckIcon />
              <span>{include}</span>
            </li>
          ))}
        </ul>
        
        {/* Expandable details for additional includes */}
        {item.includes.length > 3 && (
          <details className="mt-2">
            <summary className="text-sm font-medium text-forest-700 cursor-pointer hover:text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-1 rounded px-2 py-1 -ml-2">
              + {item.includes.length - 3} more included {item.includes.length - 3 === 1 ? 'item' : 'items'}
            </summary>
            <ul className="space-y-2 mt-2 pl-1" role="list">
              {item.includes.slice(3).map((include, idx) => (
                <li key={idx + 3} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckIcon />
                  <span>{include}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {/* Excludes */}
      <div className="mb-6 flex-grow">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          Not Included (Billed Separately)
        </h4>
        
        {/* Collapsible excludes (compact by default) */}
        {item.excludes.length > 0 ? (
          <details className="group">
            <summary className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-1 rounded px-2 py-1 -ml-2 flex items-center gap-1">
              <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
              View {item.excludes.length} {item.excludes.length === 1 ? 'exclusion' : 'exclusions'}
            </summary>
            <ul className="space-y-2 mt-2 pl-1" role="list">
              {item.excludes.map((exclude, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <XIcon />
                  <span>{exclude}</span>
                </li>
              ))}
            </ul>
          </details>
        ) : (
          <p className="text-sm text-gray-500 italic">No exclusions</p>
        )}
      </div>

      {/* CTA */}
      {showCta && (
        <Button
          variant={ctaVariant}
          className="w-full h-12"
          href={href}
          onClick={href ? undefined : () => onSelect?.(item.code)}
          aria-label={`${ctaText} for ${item.name}`}
        >
          {ctaText}
        </Button>
      )}

      {/* Item Code (for internal reference) */}
      <p className="text-xs text-gray-400 text-center mt-3">
        Code: {item.code}
      </p>
    </div>
  );
}
