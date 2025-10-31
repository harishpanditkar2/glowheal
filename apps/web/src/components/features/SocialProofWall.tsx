'use client';

import { useState } from 'react';

interface Review {
  id: string;
  name: string;
  condition: string;
  city: string;
  rating: number;
  quote: string;
  verified: boolean;
  date: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Priya M.',
    condition: 'Acne Treatment',
    city: 'Mumbai',
    rating: 5,
    quote:
      'The free consultation was genuinely helpful. The doctor assessed my skin and recommended the right specialist. My acne cleared up in 6 weeks!',
    verified: true,
    date: 'Oct 2025',
  },
  {
    id: '2',
    name: 'Rahul K.',
    condition: 'Anxiety Management',
    city: 'Bangalore',
    rating: 5,
    quote:
      'I was hesitant about online therapy, but the free first call made it easy to start. Dr. Kumar was empathetic and the treatment plan worked for me.',
    verified: true,
    date: 'Sep 2025',
  },
  {
    id: '3',
    name: 'Sneha D.',
    condition: 'PCOS Management',
    city: 'Delhi',
    rating: 5,
    quote:
      'After 3 failed attempts with other clinics, Glowheal\'s doctor routed me to a PCOS specialist. The personalized plan helped me lose 8 kg and regulate my cycle.',
    verified: true,
    date: 'Oct 2025',
  },
  {
    id: '4',
    name: 'Amit S.',
    condition: 'Hair Loss',
    city: 'Pune',
    rating: 5,
    quote:
      'The trichologist consultation was thorough. I started treatment within 24 hours. Visible regrowth after 4 months. Worth every rupee.',
    verified: true,
    date: 'Aug 2025',
  },
  {
    id: '5',
    name: 'Kavita R.',
    condition: 'Weight Loss',
    city: 'Hyderabad',
    rating: 5,
    quote:
      'The free consultation connected me with a dietitian who understood my thyroid issues. Lost 12 kg in 5 months with sustainable changes.',
    verified: true,
    date: 'Sep 2025',
  },
  {
    id: '6',
    name: 'Vikram J.',
    condition: 'Digestive Issues',
    city: 'Chennai',
    rating: 5,
    quote:
      'Suffered from IBS for 2 years. The gastroenterologist on Glowheal gave me a clear diagnosis and treatment plan. Symptoms reduced by 80%.',
    verified: true,
    date: 'Oct 2025',
  },
];

export function SocialProofWall() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-700 mb-4">
            Real Patients, Real Results
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Over 2 million patients have started their health journey with a free consultation
          </p>

          {/* Meta Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>
                <strong className="text-forest-700">4.8/5</strong> rating
              </span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong className="text-forest-700">2M+</strong> consultations
              </span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-forest-700" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong className="text-forest-700">500+</strong> verified doctors
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Reviews Carousel - Mobile */}
        <div className="md:hidden">
          <div className="relative">
            <ReviewCard review={reviews[activeIndex]} />

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? 'bg-forest-700 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                className="p-2 rounded-full bg-white border-2 border-forest-700 text-forest-700 hover:bg-forest-50"
                aria-label="Previous review"
                style={{ minWidth: '48px', minHeight: '48px' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                className="p-2 rounded-full bg-white border-2 border-forest-700 text-forest-700 hover:bg-forest-50"
                aria-label="Next review"
                style={{ minWidth: '48px', minHeight: '48px' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-gray-500 mt-8 max-w-3xl mx-auto">
          * Individual results may vary. Testimonials represent actual patient experiences but do not guarantee
          similar outcomes. Consult a healthcare professional for personalized medical advice.
        </p>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-jade-200 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-forest-700">{review.name}</h3>
            {review.verified && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{review.condition}</p>
          <p className="text-xs text-gray-500">{review.city}</p>
        </div>

        {/* Star Rating */}
        <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-amber-500' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 leading-relaxed mb-3">
        "{review.quote}"
      </blockquote>

      {/* Date */}
      <p className="text-xs text-gray-500">{review.date}</p>
    </div>
  );
}
