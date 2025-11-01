'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useCity, getCityDisplayName } from '@/lib/city-context';
import { SpecialtyIcon } from '@/components/ui/SpecialtyIcon';

interface ServiceCardProps {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  priceRange: string;
  consultationFee: number;
  showMostBooked?: boolean;
}

/**
 * ServiceCard component displays a service with icon, name, tagline, and pricing
 * Used on homepage, services page, and service category pages
 */
export function ServiceCard({
  name,
  slug,
  tagline,
  icon,
  priceRange,
  consultationFee,
  showMostBooked = false,
}: ServiceCardProps) {
  const { city } = useCity();
  const cityDisplayName = getCityDisplayName(city);
  
  return (
    <Link href={`/services/${slug}`}>
      <Card variant="hover-lift" className="h-full relative flex flex-col">
        {showMostBooked && (
          <div className="absolute top-4 right-4" aria-label="Most booked service">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-jade-100 text-jade-700 text-xs font-semibold rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Most Booked
            </span>
          </div>
        )}
        <CardHeader>
          <div className="mb-3 text-forest-600">
            <SpecialtyIcon specialty={slug} size="lg" />
          </div>
          <CardTitle as="h3" className="text-forest-700">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{tagline}</p>
          <div className="space-y-3 mt-auto">
            <div className="text-sm">
              <p className="text-gray-500 text-xs mb-1">First Consultation</p>
              <p className="font-semibold text-forest-700">Free (₹0)</p>
            </div>
            <div>
              <p className="text-royal-blue-600 font-semibold hover:text-royal-blue-700 text-sm transition-colors">
                View Care Packages →
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Start free—talk to a doctor
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
