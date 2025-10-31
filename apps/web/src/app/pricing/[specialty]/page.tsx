'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getCatalogWithFallback, getItemsBySpecialty, CatalogItem } from '@/lib/catalog';
import { useCity, getCityDisplayName } from '@/lib/city-context';
import { PriceCard } from '@/components/features/PriceCard';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { PricingPersuasionBar } from '@/components/features/PricingPersuasionBar';
import { PricingComparisonTable } from '@/components/features/PricingComparisonTable';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';

type Props = {
  params: { specialty: string };
};

export default function SpecialtyPricingPage({ params }: Props) {
  const { city } = useCity();
  const [showFallbackToast, setShowFallbackToast] = useState(false);
  const [catalogData, setCatalogData] = useState<{
    catalog: any;
    items: CatalogItem[];
    specialty: any;
    didFallback: boolean;
  } | null>(null);

  useEffect(() => {
    const result = getCatalogWithFallback(city);
    const items = getItemsBySpecialty(city, params.specialty);
    const specialty = result.catalog?.specialties.find((s: any) => s.slug === params.specialty);
    
    setCatalogData({
      catalog: result.catalog,
      items,
      specialty,
      didFallback: result.didFallback,
    });
    
    if (result.didFallback && result.requestedCity !== 'pune') {
      setShowFallbackToast(true);
    }
  }, [city, params.specialty]);

  if (!catalogData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const { catalog, items, specialty, didFallback } = catalogData;
  const cityDisplayName = getCityDisplayName(city);

  if (!specialty || items.length === 0) {
    notFound();
  }

  // Structured data schemas
  const organizationSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://glowheal.in' },
    { name: 'Pricing', url: 'https://glowheal.in/pricing' },
    { name: specialty.title, url: `https://glowheal.in/pricing/${params.specialty}` },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist-50 to-white">
      <MultiSchemaRenderer schemas={[organizationSchema, breadcrumbSchema]} />

      {/* Fallback Toast */}
      {showFallbackToast && (
        <Toast
          message={`No fixed prices yet in ${cityDisplayName}. Showing Pune as reference.`}
          onClose={() => setShowFallbackToast(false)}
        />
      )}

      {/* Breadcrumb UI */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200 py-3">
        <div className="container-width">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-forest-700 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/pricing" className="hover:text-forest-700 transition-colors">
                Pricing
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <span className="text-gray-900 font-medium" aria-current="page">
                {specialty.title}
              </span>
            </li>
          </ol>
        </div>
      </nav>
      {/* Hero */}
      <section className="section-spacing bg-gradient-forest-jade text-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <Link
                href="/pricing"
                className="text-mist-100 hover:text-white underline text-sm"
              >
                ← Back to all pricing
              </Link>
            </div>
            
            {/* City Pill */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {cityDisplayName}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {specialty.title} Prices in {cityDisplayName}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-mist-50">
              Fixed, transparent pricing. Start with a free consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <PricingPersuasionBar />

      {/* Pricing Comparison */}
      <section className="py-12 bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-forest-900 text-center mb-3">
              Why Glowheal for {specialty.title}?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Transparent pricing and patient-first care that sets us apart
            </p>
            <PricingComparisonTable />
          </div>
        </div>
      </section>

      {/* Free Consultation Banner */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container-width">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-forest-900">
                Your first {specialty.title.toLowerCase()} consultation is ₹0
              </p>
              <p className="text-gray-700">
                Discuss your concerns with a Glowheal specialist—no payment required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing">
        <div className="container-width">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
              Available Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All services include a free initial consultation. Payment only required after you consent to treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: CatalogItem) => (
              <PriceCard
                key={item.code}
                item={item}
                ctaText="Book Free Consultation"
                href={`/book?service=${item.code}&specialty=${params.specialty}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      {catalog && (
        <section className="py-12 bg-gray-50">
          <div className="container-width max-w-4xl">
            <h3 className="text-xl font-semibold text-forest-900 mb-6 text-center">
              Important Information
            </h3>
            <ul className="space-y-3">
              {catalog.disclaimers.map((disclaimer: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{disclaimer}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-r from-forest-700 to-jade-700 text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your {specialty.title} Journey?
          </h2>
          <p className="text-xl mb-8 text-mist-50 max-w-2xl mx-auto">
            Book your free consultation today. Get expert advice before committing to any treatment.
          </p>
          <Button
            variant="secondary"
            className="text-lg h-14"
            asChild
          >
            <Link href={`/book?specialty=${params.specialty}`}>Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
