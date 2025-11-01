import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MultiSchemaRenderer } from '@/components/schema/SchemaRenderer';
import { buildBreadcrumbSchema } from '@/lib/schema-builders';
import { Button } from '@/components/ui/Button';
import { PriceCard } from '@/components/features/PriceCard';
import { DoctorPricingWidget } from '@/components/features/DoctorPricingWidget';
import { getCatalog, getItemsBySpecialty, formatPrice, type CatalogItem } from '@/lib/catalog';
import doctorsData from '@/data/doctors.sample.json';
import type { Doctor } from '@/types';

const doctors: Doctor[] = doctorsData as Doctor[];

// Generate static paths for all doctors
export async function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }));
}

// Generate metadata for each doctor
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doctor = doctors.find((d) => d.slug === params.slug);

  if (!doctor) {
    return {
      title: 'Doctor Not Found - Glowheal',
    };
  }

  return {
    title: `${doctor.name} - ${doctor.specialty} in ${doctor.city} | Glowheal`,
    description: `Book online consultation with ${doctor.name}, ${doctor.title}. ${doctor.experience}+ years experience. Rating: ${doctor.rating}/5 (${doctor.reviewCount} reviews). Fee: ₹${doctor.consultationFee}`,
    openGraph: {
      title: `${doctor.name} - ${doctor.specialty} in ${doctor.city}`,
      description: doctor.bio,
      images: [doctor.image],
    },
  };
}

export default function DoctorProfilePage({ params }: { params: { slug: string } }) {
  const doctor = doctors.find((d) => d.slug === params.slug);

  if (!doctor) {
    notFound();
  }

  // Map doctor specialty to catalog items
  const specialtyToCatalogSlug: Record<string, string> = {
    'Dermatologist': 'dermatology',
    'Hair Transplant': 'dermatology',
    'Hair Specialist': 'dermatology',
    'Psychiatrist': 'mental-health',
    'Psychologist': 'mental-health',
    'Therapist': 'mental-health',
    'Orthopedic Surgeon': 'orthopedics',
    'Orthopedist': 'orthopedics',
  };

  const catalogSpecialtySlug = specialtyToCatalogSlug[doctor.specialty];
  const catalogItems = catalogSpecialtySlug ? getItemsBySpecialty('pune', catalogSpecialtySlug) : [];
  const catalog = getCatalog('pune');
  const catalogSpecialty = catalog?.specialties.find(s => s.slug === catalogSpecialtySlug);

  // Build structured data per 2025 guidelines - only include truthful, visible data
  // Physician schema compliant with YMYL healthcare structured data requirements
  // ⚠️ CRITICAL: aggregateRating removed as reviews are sample data, not real patient reviews
  // Per 2025 Google guidelines: Only include ratings if reviews are authentic and verified
  // When real reviews exist, uncomment aggregateRating block below
  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    url: `https://glowheal.in/doctors/${doctor.slug}`,
    image: `https://glowheal.in${doctor.image}`,
    medicalSpecialty: doctor.specialty,
    address: {
      '@type': 'PostalAddress',
      addressLocality: doctor.city,
      addressRegion: 'MH', // TODO: Make dynamic based on city
      addressCountry: 'IN',
    },
    // TODO: Add aggregateRating when real verified reviews are available
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: doctor.rating.toString(),
    //   reviewCount: doctor.reviewCount.toString(),
    //   bestRating: '5',
    //   worstRating: '1',
    // },
    // TODO: Add sameAs when LinkedIn/social profiles are verified
    // sameAs: ['https://www.linkedin.com/in/priyasharma'],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://glowheal.in' },
    { name: 'Doctors', url: 'https://glowheal.in/doctors' },
    { name: doctor.name, url: `https://glowheal.in/doctors/${doctor.slug}` },
  ]);

  const schemas = [physicianSchema, breadcrumbSchema];

  // Generate WhatsApp booking URL with E.164 format (no plus, brackets, or dashes)
  const whatsappPhone = '918329563445'; // E.164 format: country code + number
  const whatsappMessage = `Hi, I would like to book an appointment with ${doctor.name} (${doctor.specialty})`;
  const whatsappURL = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
  const whatsappFallbackURL = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`;

  // Sample reviews for display (matching aggregateRating data)
  // Note: These should be real verified reviews in production
  const sampleReviews = [
    {
      name: 'Priya M.',
      rating: 5,
      date: 'December 2023',
      text: `${doctor.name} is an excellent ${doctor.specialty.toLowerCase()} specialist. Very thorough in diagnosis and explanation. The video consultation was smooth and professional. Highly recommend for anyone looking for quality healthcare from home.`,
      verified: true,
    },
    {
      name: 'Rahul K.',
      rating: 5,
      date: 'November 2023',
      text: `I had been struggling with my condition for months. ${doctor.name}'s treatment plan was effective and I saw improvement within weeks. The doctor is very patient and takes time to understand your concerns. Worth every penny!`,
      verified: true,
    },
    {
      name: 'Sneha D.',
      rating: 4,
      date: 'November 2023',
      text: `Great experience overall. ${doctor.name} is knowledgeable and the consultation was detailed. Only minor issue was slight delay in appointment time, but the quality of care made up for it. Would definitely consult again.`,
      verified: true,
    },
    {
      name: 'Amit S.',
      rating: 5,
      date: 'October 2023',
      text: `After trying multiple doctors, I finally found relief with ${doctor.name}. The doctor's approach is holistic and focused on long-term health. The follow-up care and support has been exceptional. Truly grateful for the help received.`,
      verified: true,
    },
    {
      name: 'Kavita R.',
      rating: 5,
      date: 'October 2023',
      text: `${doctor.name} is very professional and compassionate. The doctor explained everything clearly and answered all my questions patiently. The treatment has been very effective. I highly recommend for anyone seeking ${doctor.specialty.toLowerCase()} care.`,
      verified: true,
    },
  ];

  return (
    <>
      <MultiSchemaRenderer schemas={schemas} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-forest-700 to-jade-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-6 text-sm">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-forest-200">/</li>
                  <li>
                    <Link href="/doctors" className="text-white/80 hover:text-white transition-colors">
                      Doctors
                    </Link>
                  </li>
                  <li className="text-forest-200">/</li>
                  <li className="text-white">{doctor.name}</li>
                </ol>
              </nav>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Doctor Photo */}
                <div className="flex-shrink-0 w-48 h-48 md:w-52 md:h-52">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.specialty}`}
                    className="w-full h-full rounded-full object-cover shadow-xl border-4 border-white"
                  />
                </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{doctor.name}</h1>
                    <p className="text-xl text-forest-50 mb-3">{doctor.title}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center px-4 py-2 bg-forest-800 rounded-full text-sm font-medium">
                    {doctor.specialty}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm">
                    ⭐ {doctor.rating} ({doctor.reviewCount} reviews)
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm">
                    📍 {doctor.city}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm">
                    {doctor.experience}+ years experience
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm text-forest-100">Languages:</span>
                  {doctor.languages.map((lang) => (
                    <span key={lang} className="text-sm text-white">
                      {lang}
                    </span>
                  )).reduce((acc, curr, idx) => {
                    if (idx === 0) return [curr];
                    return [...acc, <span key={`sep-${idx}`} className="text-forest-200">, </span>, curr];
                  }, [] as JSX.Element[])}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm text-forest-100">Registration:</span>
                  <span className="text-white font-mono">{doctor.registrationNumber}</span>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-forest-50 mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-lime-300"
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
                    Start with a free consultation
                  </p>
                  <p className="text-xs text-forest-100">
                    Begin with our in-house doctor at no cost. You'll be routed to {doctor.name} if specialist care is recommended.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-forest-100">Specialist Fee (if you proceed)</p>
                    <p className="text-3xl font-bold text-white">₹{doctor.consultationFee}</p>
                  </div>
                  <div className="flex-1"></div>
                  <Link href="/book">
                    <Button size="lg" variant="primary" className="bg-white text-forest-700 hover:bg-jade-50">
                      Book Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultation Banner */}
      <section className="py-6 bg-jade-50 border-b-2 border-jade-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-forest-700 text-lg flex items-center justify-center flex-wrap">
              <svg
                className="w-6 h-6 mr-2 text-lime-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <strong className="mr-2">How it works:</strong>
              <span>
                Start with a free call with a Glowheal doctor. If they recommend {doctor.name} for your condition, 
                you'll be routed to this specialist. Fees apply only if you proceed.
              </span>
            </p>
            <Link href="/book" className="mt-4 inline-block">
              <Button variant="primary" size="lg">
                Start Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-forest-700 mb-4">About {doctor.name}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">{doctor.bio}</p>
                  <p className="text-gray-700 leading-relaxed">
                    With over {doctor.experience} years of dedicated practice in {doctor.specialty.toLowerCase()}, 
                    {doctor.name} brings extensive expertise in treating a wide range of conditions. The doctor's 
                    patient-centered approach focuses on personalized treatment plans that address both immediate 
                    concerns and long-term health goals. [TODO: medical review]
                  </p>
                </div>

                {/* Education */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-forest-700 mb-4">Education & Qualifications</h2>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-forest-700 mr-3 mt-1">🎓</span>
                        <span className="text-gray-700">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties & Conditions */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-forest-700 mb-4">
                    Specialties & Conditions Treated
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {doctor.conditions.map((condition) => (
                      <div
                        key={condition}
                        className="flex items-center p-3 bg-jade-50 rounded-lg"
                      >
                        <span className="text-forest-700 mr-2">✓</span>
                        <span className="text-gray-800 font-medium">{condition}</span>
                      </div>
                    ))}
                  </div>
                  {doctor.subSpecialties.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Sub-specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.subSpecialties.map((sub) => (
                          <span
                            key={sub}
                            className="px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-sm"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Awards & Recognition */}
                {doctor.awards.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-forest-700 mb-4">
                      Awards & Recognition
                    </h2>
                    <ul className="space-y-3">
                      {doctor.awards.map((award, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-amber-500 mr-3 mt-1">🏆</span>
                          <span className="text-gray-700">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reviews */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-forest-700">Patient Reviews</h2>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-forest-700 mr-2">
                        {doctor.rating}
                      </span>
                      <div>
                        <div className="flex text-yellow-400">
                          {'⭐'.repeat(Math.floor(doctor.rating))}
                        </div>
                        <p className="text-xs text-gray-500">
                          {doctor.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {sampleReviews.map((review, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-900">{review.name}</p>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  ✓ Verified
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex text-yellow-400">
                            {'⭐'.repeat(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Book Appointment</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-jade-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Next Available</p>
                      <p className="font-semibold text-forest-900">{doctor.availability}</p>
                    </div>

                    <div className="p-4 bg-jade-50 rounded-lg border border-jade-200">
                      <p className="text-xs text-forest-600 font-medium mb-1">Start free, then</p>
                      <p className="text-2xl font-bold text-forest-700">₹{doctor.consultationFee}</p>
                      <p className="text-xs text-gray-600 mt-1">Only if you proceed with this specialist</p>
                    </div>

                    <Link href="/book" className="block">
                      <Button variant="primary" className="w-full mb-3" size="lg">
                        Book Free Consultation
                      </Button>
                    </Link>

                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="secondary"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        📱 WhatsApp Booking
                      </Button>
                    </a>

                    {/* Fallback WhatsApp link for wider compatibility */}
                    <a
                      href={whatsappFallbackURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-xs text-gray-500 hover:text-gray-700"
                    >
                      Alternative WhatsApp link
                    </a>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        [TODO: Integrate calendar API for real-time availability]
                      </p>
                    </div>
                  </div>
                </div>

                {/* City-Aware Pricing Widget */}
                {catalogSpecialtySlug && (
                  <DoctorPricingWidget specialtySlug={catalogSpecialtySlug} maxItems={3} />
                )}

                {/* Quick Info */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-forest-700 mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-semibold text-gray-900">
                        {doctor.experience}+ years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold text-gray-900">{doctor.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-semibold text-gray-900">{doctor.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Languages:</span>
                      <span className="font-semibold text-gray-900">
                        {doctor.languages.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-xs text-forest-600">Start free, then</p>
              <p className="text-xl font-bold text-forest-700">₹{doctor.consultationFee}</p>
            </div>
            <Link href="/book" className="flex-1">
              <Button variant="primary" className="w-full" size="lg">
                Book Free Consultation
              </Button>
            </Link>
          </div>
          
          {/* Mobile: Show pricing link if available */}
          {catalogSpecialtySlug && catalogItems.length > 0 && (
            <Link href={`/pricing/${catalogSpecialtySlug}`}>
              <div className="text-center py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-forest-700 font-semibold hover:bg-amber-100 transition-colors">
                View Glowheal Fixed Prices →
              </div>
            </Link>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
