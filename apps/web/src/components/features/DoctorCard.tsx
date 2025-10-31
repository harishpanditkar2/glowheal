import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/catalog';

interface DoctorCardProps {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  languages: string[];
  city: string;
  image: string;
  nextAvailable: string;
  glowealPrice?: {
    price: number;
    itemName: string;
    specialtySlug: string;
  };
}

/**
 * DoctorCard component displays doctor profile with photo, credentials, rating, and booking CTA
 * Used on homepage, doctors listing page, service pages, and city pages
 */
export function DoctorCard({
  name,
  slug,
  title,
  specialty,
  experience,
  rating,
  reviewCount,
  consultationFee,
  languages,
  city,
  image,
  nextAvailable,
  glowealPrice,
}: DoctorCardProps) {
  return (
    <Card variant="default" className="h-full flex flex-col relative">
      {/* Free First Consult Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-forest-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center">
          <svg
            className="w-3 h-3 mr-1 text-lime-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Starts with free consult
        </span>
      </div>

      <CardHeader className="pb-0">
        <div className="flex items-start space-x-4">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div
              className="w-20 h-20 rounded-full bg-gradient-forest-jade overflow-hidden"
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src={image}
                alt={`Dr. ${name}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <CardTitle as="h3" className="text-lg mb-1">
              {title} {name}
            </CardTitle>
            <p className="text-sm text-jade-600 font-medium mb-1">{specialty}</p>
            <p className="text-xs text-gray-600">{experience} years experience</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="font-semibold text-graphite-800">{rating}</span>
            <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Languages:</p>
          <p className="text-sm text-gray-700">{languages.join(', ')}</p>
        </div>

        {/* Location */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Location:</p>
          <p className="text-sm text-gray-700">{city}</p>
        </div>

        {/* Next Available */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Next Available:</p>
          <p className="text-sm font-medium text-green-600">{nextAvailable}</p>
        </div>

        {/* Consultation Fee */}
        <div className="p-3 bg-jade-50 rounded-lg border border-jade-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-forest-600 font-medium">Start free, then</p>
            <p className="text-xs text-gray-500">Specialist fee</p>
          </div>
          <p className="text-2xl font-bold text-forest-700">₹{consultationFee}</p>
          <p className="text-xs text-gray-600 mt-1">Only if you proceed with this specialist</p>
        </div>

        {/* NEW: Glowheal Fixed Pricing Tag */}
        {glowealPrice && (
          <Link 
            href={`/pricing/${glowealPrice.specialtySlug}`}
            className="block mt-3"
          >
            <div className="flex flex-wrap items-center gap-2 rounded-full bg-amber-50 border-2 border-amber-200 text-forest-700 px-4 py-2 text-sm font-semibold hover:bg-amber-100 transition-colors group">
              <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="flex-1 min-w-0">Glowheal price in {city}: {formatPrice(glowealPrice.price)}</span>
              <button
                type="button"
                className="relative flex-shrink-0"
                aria-label="Partner doctors follow Glowheal fixed prices for listed services"
                title="Partner doctors follow Glowheal fixed prices for listed services"
              >
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </Link>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/doctors/${slug}`} className="block w-full">
          <Button variant="primary" size="lg" className="w-full">
            Book Free Consultation
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
