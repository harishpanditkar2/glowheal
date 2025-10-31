/**
 * JSON-LD Schema Builders for Healthcare SEO
 * All schemas follow schema.org healthcare markup best practices
 * Validate with Google Rich Results Test: https://search.google.com/test/rich-results
 */

import type {
  Organization,
  MedicalOrganization,
  Physician,
  LocalBusiness,
  FAQPage,
  BreadcrumbList,
  AggregateRating,
  Review,
  Article,
  WithContext,
} from 'schema-dts';

/**
 * Base organization schema - use on all pages
 */
export function buildOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Glowheal',
    url: 'https://glowheal.in',
    logo: 'https://glowheal.in/logo.png',
    description: 'Digital wellness platform connecting patients with 500+ verified doctors across India. Video consultations for all healthcare specialties.',
    telephone: '+91-XXXXXXXXXX', // TODO: Add actual phone
    email: 'support@glowheal.in',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/glowheal',
      'https://www.instagram.com/glowheal',
      'https://www.linkedin.com/company/glowheal',
      'https://twitter.com/glowheal',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX', // TODO: Add actual phone
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

/**
 * Medical organization schema - use on homepage and service pages
 */
export function buildMedicalOrganizationSchema(
  specialties?: string[]
): WithContext<MedicalOrganization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Glowheal',
    url: 'https://glowheal.in',
    logo: 'https://glowheal.in/logo.png',
    description: 'Comprehensive telemedicine platform offering expert consultations across 12+ medical specialties.',
    telephone: '+91-XXXXXXXXXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    ...(specialties && specialties.length > 0 && {
      medicalSpecialty: specialties as any, // schema-dts typing issue: accepts string[] at runtime
    }),
  };
}

/**
 * Physician schema - use on doctor profile pages
 */
export function buildPhysicianSchema(doctor: {
  name: string;
  slug: string;
  title: string;
  specialty: string;
  image: string;
  bio?: string;
  education?: string[];
  rating?: number;
  reviewCount?: number;
  memberOf?: string;
}): WithContext<Physician> {
  // Build schema as any to bypass strict typing for extended properties
  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'Physician' as const,
    name: doctor.name,
    image: `https://glowheal.in${doctor.image}`,
    description: doctor.bio,
    url: `https://glowheal.in/doctors/${doctor.slug}`,
    medicalSpecialty: doctor.specialty,
    worksFor: {
      '@type': 'MedicalOrganization' as const,
      name: 'Glowheal',
      url: 'https://glowheal.in',
    },
    // Add optional properties
    ...(doctor.education && doctor.education.length > 0 && {
      alumniOf: doctor.education.map((edu) => ({
        '@type': 'EducationalOrganization' as const,
        name: edu,
      })),
    }),
    ...(doctor.rating && doctor.reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating' as const,
        ratingValue: doctor.rating.toString(),
        reviewCount: doctor.reviewCount.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    }),
    ...(doctor.memberOf && {
      memberOf: {
        '@type': 'ProfessionalService' as const,
        name: doctor.memberOf,
      },
    }),
  };

  return schema as WithContext<Physician>;
}

/**
 * LocalBusiness schema - use on city-service pages for local SEO
 */
export function buildLocalBusinessSchema(data: {
  city: string;
  service: string;
  address?: {
    locality: string;
    region: string;
    country: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  reviewCount?: number;
}): WithContext<LocalBusiness> {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Glowheal - ${data.service} Services in ${data.city}`,
    url: `https://glowheal.in/cities/${data.city.toLowerCase()}/${data.service.toLowerCase().replace(/\s+/g, '-')}`,
    description: `Expert ${data.service} consultations in ${data.city}. Connect with verified specialists online.`,
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹499-₹4999',
  };

  // Add address if provided
  if (data.address) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: data.address.locality,
      addressRegion: data.address.region,
      addressCountry: data.address.country,
    };
  }

  // Add geo coordinates if provided
  if (data.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude.toString(),
      longitude: data.geo.longitude.toString(),
    };
  }

  // Add area served
  schema.areaServed = {
    '@type': 'City',
    name: data.city,
  };

  // Add aggregate rating if available
  if (data.rating && data.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.rating.toString(),
      reviewCount: data.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema as WithContext<LocalBusiness>;
}

/**
 * FAQPage schema - use on service pages and FAQ sections
 */
export function buildFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema - use on all inner pages
 */
export function buildBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://glowheal.in${crumb.url}`,
    })),
  };
}

/**
 * AggregateRating schema - use for overall ratings
 */
export function buildAggregateRatingSchema(data: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}): AggregateRating {
  return {
    '@type': 'AggregateRating',
    ratingValue: data.ratingValue,
    reviewCount: data.reviewCount,
    bestRating: data.bestRating || 5,
    worstRating: data.worstRating || 1,
  } as any;
}

/**
 * Review schema - use for individual reviews
 */
export function buildReviewSchema(review: {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
}): Review {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Article schema - use for blog posts
 */
export function buildArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `https://glowheal.in${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Glowheal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://glowheal.in/logo.png',
      },
    },
    url: `https://glowheal.in${article.url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://glowheal.in${article.url}`,
    },
  };
}

/**
 * Helper to serialize schema to JSON-LD script tag
 */
export function serializeSchema(schema: any): string {
  return JSON.stringify(schema, null, 0);
}
