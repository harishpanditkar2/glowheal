'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCatalogWithFallback, CatalogSpecialty, CatalogItem, CatalogPackage } from '@/lib/catalog';
import { useCity, getCityDisplayName } from '@/lib/city-context';
import { PriceCard } from '@/components/features/PriceCard';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Toast } from '@/components/ui/Toast';
import { PricingPersuasionBar } from '@/components/features/PricingPersuasionBar';
import { PricingComparisonTable } from '@/components/features/PricingComparisonTable';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';

export default function PricingPage() {
  const { city } = useCity();
  const [showFallbackToast, setShowFallbackToast] = useState(false);
  const [catalogData, setCatalogData] = useState<{
    catalog: any;
    didFallback: boolean;
    requestedCity: string;
  } | null>(null);

  useEffect(() => {
    const result = getCatalogWithFallback(city);
    setCatalogData(result);
    
    if (result.didFallback && result.requestedCity !== 'pune') {
      setShowFallbackToast(true);
    }
  }, [city]);

  if (!catalogData?.catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading pricing information...</p>
      </div>
    );
  }

  const catalog = catalogData.catalog;
  const cityDisplayName = getCityDisplayName(city);

  // Structured data schemas
  const organizationSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://glowheal.in' },
    { name: 'Pricing', url: 'https://glowheal.in/pricing' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist-50 to-white">
      <MultiSchemaRenderer schemas={[organizationSchema, breadcrumbSchema]} />
      
      {/* Fallback Toast */}
      {showFallbackToast && (
        <Toast
          message={`Showing Pune prices; ${cityDisplayName} pricing coming soon.`}
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
              <span className="text-gray-900 font-medium" aria-current="page">
                Pricing
              </span>
            </li>
          </ol>
        </div>
      </nav>
      {/* Hero */}
      <section className="section-spacing bg-gradient-forest-jade text-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            {/* City Pill */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {cityDisplayName} Fixed Prices
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fixed Prices for {cityDisplayName}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-mist-50">
              No ranges. No tiers. Just transparent, affordable healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                className="text-lg h-14"
                asChild
              >
                <Link href="/book">Start with Free Consultation</Link>
              </Button>
            </div>
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
              Why Choose Glowheal?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Compare our transparent, patient-first approach with typical healthcare platforms
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
                Your first consultation is always ₹0
              </p>
              <p className="text-gray-700">
                Meet with a Glowheal doctor to discuss your treatment plan—completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Services vs Packages */}
      <section className="section-spacing">
        <div className="container-width">
          <Tabs defaultValue="services" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList>
                <TabsTrigger value="services">
                  Individual Services
                </TabsTrigger>
                <TabsTrigger value="packages">
                  Package Bundles
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Services Tab */}
            <TabsContent value="services">
              {catalog.specialties.map((specialty: CatalogSpecialty) => (
                <div key={specialty.slug} className="mb-16 last:mb-0">
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
                      {specialty.title}
                    </h2>
                    <Link
                      href={`/pricing/${specialty.slug}`}
                      className="text-jade-600 hover:text-jade-800 font-medium underline"
                    >
                      View all {specialty.title.toLowerCase()} services →
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialty.items.map((item: CatalogItem) => {
                      // Determine if this is a "most booked" service
                      // Strategic selection: 1-2 per specialty to guide without overwhelming
                      const mostBookedCodes = [
                        'ACNE_PLAN_30',        // Dermatology: Entry-level, high volume
                        'PRP_HAIR_SINGLE',     // Hair Care: Popular procedure
                        'THERAPY_STD',         // Mental Health: Core therapy sessions
                        'METABOLIC_PANEL_DIET', // Nutrition: Comprehensive diagnostic
                        'WEIGHT_LOSS_90',      // Weight Management: Sustained program
                      ];
                      const showMostBooked = mostBookedCodes.includes(item.code);
                      
                      return (
                        <PriceCard
                          key={item.code}
                          item={item}
                          ctaText="Book Free Consultation"
                          href={`/book?service=${item.code}`}
                          showMostBooked={showMostBooked}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages">
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
                  Package Bundles
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Save money by bundling multiple services together. All packages include a free first consultation.
                </p>
              </div>

              {catalog.packages && catalog.packages.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {catalog.packages.map((pkg: CatalogPackage) => (
                    <PriceCard
                      key={pkg.code}
                      item={pkg}
                      ctaText="Book This Package"
                      href={`/book?service=${pkg.code}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-mist-50 rounded-xl">
                  <p className="text-gray-600">
                    Package bundles coming soon for your city.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Disclaimers */}
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

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-r from-forest-700 to-jade-700 text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-mist-50 max-w-2xl mx-auto">
            Book your free consultation today. No payment required until you're ready to proceed.
          </p>
          <Button
            variant="secondary"
            className="text-lg h-14"
            asChild
          >
            <Link href="/book">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
