'use client';

import { useState, useMemo } from 'react';
import { DoctorCard } from '@/components/features/DoctorCard';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builders';
import { Button } from '@/components/ui/Button';
import { getCatalogWithFallback, getCatalogItem } from '@/lib/catalog';
import { useCity, getCityDisplayName } from '@/lib/city-context';
import doctorsData from '@/data/doctors.sample.json';
import servicesData from '@/data/services.json';
import type { Doctor } from '@/types';

const doctors: Doctor[] = doctorsData as Doctor[];

// NOTE: Metadata cannot be exported from 'use client' components
// SEO metadata for /doctors route should be added to layout.tsx or opengraph-image.tsx
// For now, using default metadata from root layout.tsx

// Helper: Map doctor specialty to representative catalog item and specialty slug (city-aware)
function getRepresentativePricing(specialty: string, city: string): { price: number; itemName: string; specialtySlug: string } | null {
  const specialtyMap: Record<string, { itemCode: string; specialtySlug: string }> = {
    'Dermatologist': { itemCode: 'ACNE_PLAN_30', specialtySlug: 'dermatology' },
    'Hair Transplant': { itemCode: 'PRP_HAIR_SINGLE', specialtySlug: 'dermatology' },
    'Hair Specialist': { itemCode: 'PRP_HAIR_SINGLE', specialtySlug: 'dermatology' },
    'Psychiatrist': { itemCode: 'THERAPY_STD', specialtySlug: 'mental-health' },
    'Psychologist': { itemCode: 'THERAPY_STD', specialtySlug: 'mental-health' },
    'Therapist': { itemCode: 'THERAPY_STD', specialtySlug: 'mental-health' },
    'Orthopedic Surgeon': { itemCode: 'ORTHO_FUP', specialtySlug: 'orthopedics' },
    'Orthopedist': { itemCode: 'ORTHO_FUP', specialtySlug: 'orthopedics' },
  };

  const mapping = specialtyMap[specialty];
  if (!mapping) return null;

  const item = getCatalogItem(city, mapping.itemCode);
  if (!item) return null;

  return {
    price: item.price,
    itemName: item.name,
    specialtySlug: mapping.specialtySlug,
  };
}

export default function DoctorsPage() {
  const { city } = useCity();
  const cityDisplayName = getCityDisplayName(city);
  
  // Filter state with accessibility considerations
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [ratingFilter, setRatingFilter] = useState<boolean>(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('anytime');
  const [experienceRange, setExperienceRange] = useState<number>(30);
  const [freeConsultFilter, setFreeConsultFilter] = useState<boolean>(true); // Default ON

  // Extract unique values for filters
  const specialties = useMemo(() => {
    const unique = Array.from(new Set(doctors.map(d => d.specialty)));
    return unique.sort();
  }, []);

  const cities = useMemo(() => {
    const unique = Array.from(new Set(doctors.map(d => d.city)));
    return unique.sort();
  }, []);

  const languages = useMemo(() => {
    const allLanguages = doctors.flatMap(d => d.languages);
    return Array.from(new Set(allLanguages)).sort();
  }, []);

  // Toggle language filter
  const toggleLanguage = (language: string) => {
    setLanguageFilters(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  // Filter doctors based on all criteria
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Specialty filter
      if (specialtyFilter !== 'all' && doctor.specialty !== specialtyFilter) return false;

      // City filter
      if (cityFilter !== 'all' && doctor.city !== cityFilter) return false;

      // Language filter
      if (languageFilters.length > 0 && !languageFilters.some(lang => doctor.languages.includes(lang))) {
        return false;
      }

      // Gender filter
      if (genderFilter !== 'all' && doctor.gender !== genderFilter) return false;

      // Price filter
      if (doctor.consultationFee > priceRange) return false;

      // Rating filter
      if (ratingFilter && doctor.rating < 4.5) return false;

      // Experience filter
      if (doctor.experience > experienceRange) return false;

      // Availability filter
      if (availabilityFilter === 'today' && !doctor.availability.toLowerCase().includes('today')) return false;
      if (availabilityFilter === 'thisweek' && !doctor.availability.toLowerCase().includes('week')) return false;

      // Free consult filter (all doctors start with free consultation, this is for UX affordance)
      // In production, you might have a property like doctor.offersFreConsultation
      if (freeConsultFilter) {
        // All doctors offer free first consultation via Glowheal's routing model
        // This filter is always true but shows the affordance to users
      }

      return true;
    });
  }, [
    specialtyFilter,
    cityFilter,
    languageFilters,
    genderFilter,
    priceRange,
    ratingFilter,
    availabilityFilter,
    experienceRange,
    freeConsultFilter,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSpecialtyFilter('all');
    setCityFilter('all');
    setLanguageFilters([]);
    setGenderFilter('all');
    setPriceRange(5000);
    setRatingFilter(false);
    setAvailabilityFilter('anytime');
    setExperienceRange(30);
    setFreeConsultFilter(true); // Reset to default ON
  };

  // Structured data
  const schemas = [
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', url: 'https://glowheal.in' },
      { name: 'Find Doctors', url: 'https://glowheal.in/doctors' },
    ]),
  ];

  return (
    <>
      <MultiSchemaRenderer schemas={schemas} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-forest-700 to-jade-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Doctor
            </h1>
            <p className="text-xl text-forest-50">
              Start free, then connect with verified specialists in {cityDisplayName}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6 space-y-6 max-h-[75vh] md:max-h-none overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-forest-700">Filters</h2>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-jade-600 hover:text-jade-800 font-medium"
                  >
                    Reset All
                  </button>
                </div>

                {/* Free Consultation Filter Pill */}
                <div>
                  <button
                    onClick={() => setFreeConsultFilter(!freeConsultFilter)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      freeConsultFilter
                        ? 'bg-forest-700 border-forest-700 text-white shadow-md'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-forest-500'
                    }`}
                    style={{ minHeight: '48px' }} // Accessibility: ≥48px touch target
                    aria-label="Filter doctors with free first consultation available"
                    aria-pressed={freeConsultFilter}
                  >
                    <span className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-2 ${freeConsultFilter ? 'text-lime-300' : 'text-gray-400'}`}
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
                      <span className="font-semibold">Free first consult available</span>
                    </span>
                    {freeConsultFilter && (
                      <span className="text-xs bg-white text-forest-700 px-2 py-1 rounded-full font-bold">
                        {filteredDoctors.length}
                      </span>
                    )}
                  </button>
                  {freeConsultFilter && (
                    <p className="text-xs text-forest-600 mt-2 px-1">
                      All doctors offer a free consultation with a Glowheal physician first. You'll be routed to specialists if needed.
                    </p>
                  )}
                </div>

                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    <option value="all">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    City
                  </label>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    Languages
                  </label>
                  <div className="space-y-2">
                    {languages.map(language => (
                      <label key={language} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={languageFilters.includes(language)}
                          onChange={() => toggleLanguage(language)}
                          className="w-4 h-4 text-jade-600 border-gray-300 rounded focus:ring-forest-700"
                        />
                        <span className="text-sm text-gray-700">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    Gender
                  </label>
                  <div className="space-y-2">
                    {['all', 'Male', 'Female'].map(gender => (
                      <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={genderFilter === gender}
                          onChange={(e) => setGenderFilter(e.target.value)}
                          className="w-4 h-4 text-jade-600 border-gray-300 focus:ring-forest-700"
                        />
                        <span className="text-sm text-gray-700">
                          {gender === 'all' ? 'Any' : gender}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    Consultation Fee: Up to ₹{priceRange}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>₹5,000</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ratingFilter}
                      onChange={(e) => setRatingFilter(e.target.checked)}
                      className="w-4 h-4 text-jade-600 border-gray-300 rounded focus:ring-forest-700"
                    />
                    <span className="text-sm font-semibold text-forest-700">
                      4.5+ Stars Only
                    </span>
                  </label>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    Availability
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setAvailabilityFilter('today')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        availabilityFilter === 'today'
                          ? 'bg-jade-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setAvailabilityFilter('thisweek')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        availabilityFilter === 'thisweek'
                          ? 'bg-jade-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => setAvailabilityFilter('anytime')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        availabilityFilter === 'anytime'
                          ? 'bg-jade-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Anytime
                    </button>
                  </div>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-semibold text-forest-700 mb-2">
                    Experience: Up to {experienceRange} years
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={experienceRange}
                    onChange={(e) => setExperienceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 years</span>
                    <span>30 years</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Doctors Grid */}
            <main className="flex-1">
              {/* Results Count with City Context */}
              <div
                className="mb-6"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-lg font-semibold text-gray-900">
                    {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-jade-50 text-jade-700 text-xs font-semibold rounded-full border border-jade-200">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {cityDisplayName}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Showing verified healthcare professionals with fixed prices
                </p>
              </div>

              {/* Doctors Grid with reserved height for CLS prevention */}
              {filteredDoctors.length > 0 ? (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  style={{ minHeight: '600px' }} // CLS prevention - reserved layout space
                >
                  {filteredDoctors.map(doctor => {
                    const pricingTag = getRepresentativePricing(doctor.specialty, city);
                    return (
                      <DoctorCard 
                        key={doctor.id} 
                        {...doctor}
                        city={cityDisplayName}
                        glowealPrice={pricingTag ? {
                          price: pricingTag.price,
                          itemName: pricingTag.itemName,
                          specialtySlug: pricingTag.specialtySlug,
                        } : undefined}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-forest-700 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button onClick={resetFilters}>Reset All Filters</Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-forest-700 to-jade-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find the Right Doctor?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-forest-50">
            Start with a free consultation. Our in-house doctor will help you find the perfect specialist for your needs.
          </p>
          <Button
            size="lg"
            variant="primary"
            className="bg-white text-forest-700 hover:bg-jade-50"
          >
            Book Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
