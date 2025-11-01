'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ServiceCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  category: 'dermatology' | 'ayurveda';
}

/**
 * ServiceCard component displays a condition/treatment with icon, name, and description
 * Used for Dr. Chetna's Dermatology and Ayurveda services
 */
export function ServiceCard({
  name,
  slug,
  shortDescription,
  icon,
  category,
}: ServiceCardProps) {
  const categoryColor = category === 'dermatology' ? 'teal' : 'amber';
  
  return (
    <Link href={`/conditions/${slug}`}>
      <Card variant="hover-lift" className="h-full relative flex flex-col">
        <CardHeader>
          <div className="mb-3 text-5xl">
            {icon}
          </div>
          <CardTitle as="h3" className="text-forest-700">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{shortDescription}</p>
          <div className="space-y-3 mt-auto">
            <div className="text-sm">
              <p className="text-gray-500 text-xs mb-1">First Consultation</p>
              <p className="font-semibold text-forest-700">Free (₹0)</p>
            </div>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`w-full bg-white hover:bg-${categoryColor}-50 border-2 border-forest-300 text-forest-900 font-semibold hover:border-${categoryColor}-500`}
              >
                Learn More
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Book consultation with Dr. Chetna
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
