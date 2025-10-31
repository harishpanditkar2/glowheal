'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCity, getCityDisplayName } from '@/lib/city-context';
import { getCatalogWithFallback, getItemsBySpecialty, formatPrice, type CatalogItem } from '@/lib/catalog';
import { PriceCard } from './PriceCard';
import { Button } from '@/components/ui/Button';

interface DoctorPricingWidgetProps {
  specialtySlug: string;
  maxItems?: number;
}

/**
 * DoctorPricingWidget - City-aware pricing sidebar for doctor profiles
 * Shows 1-3 representative pricing items for the specialty
 * Desktop: sticky right rail, Mobile: compact inline section
 * When service is preselected via URL, shows service name in CTA for clarity
 */
export function DoctorPricingWidget({ specialtySlug, maxItems = 3 }: DoctorPricingWidgetProps) {
  const { city } = useCity();
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service');
  const cityDisplayName = getCityDisplayName(city);
  
  // Get catalog with fallback
  const { catalog, didFallback } = getCatalogWithFallback(city);
  const items = getItemsBySpecialty(city, specialtySlug).slice(0, maxItems);
  const specialty = catalog?.specialties.find((s: any) => s.slug === specialtySlug);

  if (!specialty || items.length === 0) {
    return null;
  }

  // Find preselected item name if service code is in URL
  const preselectedItem = preselectedService 
    ? items.find(item => item.code === preselectedService)
    : null;

  // Build CTA text with optional service name
  const ctaText = preselectedItem 
    ? `Book in ${cityDisplayName} — ${preselectedItem.name}`
    : `Book in ${cityDisplayName}`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-forest-700">Fixed Prices</h3>
        <span className="text-xs px-2 py-1 bg-jade-100 text-jade-700 rounded-full">
          {cityDisplayName}
        </span>
      </div>

      {didFallback && city !== 'pune' && (
        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
          Showing Pune reference prices. {cityDisplayName} coming soon.
        </p>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.code} className="p-3 bg-mist-50 rounded-lg border border-forest-100">
            <p className="font-semibold text-sm text-forest-900 mb-1">{item.name}</p>
            <p className="text-xl font-bold text-jade-600">
              {formatPrice(item.price)}
              <span className="text-xs font-normal text-gray-500 ml-1">/ {item.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <Link href={`/pricing/${specialtySlug}`} className="block">
        <Button variant="outline" size="md" className="w-full">
          See All {specialty.title} Prices →
        </Button>
      </Link>

      <Link href={`/book?service=${preselectedService || items[0]?.code}`} className="block">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          title={ctaText} // Tooltip for long service names
        >
          <span className="truncate block">
            {ctaText}
          </span>
        </Button>
      </Link>

      <p className="text-xs text-gray-500 text-center">
        Start with free consultation (₹0)
      </p>
    </div>
  );
}
