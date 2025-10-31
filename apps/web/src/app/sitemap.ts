import { MetadataRoute } from 'next';
import services from '@/data/services.json';
import doctors from '@/data/doctors.sample.json';
import cities from '@/data/cities.json';

/**
 * Dynamic sitemap generation for Glowheal
 * Includes: Homepage, Services, Doctors, Cities
 * Updates automatically when data files change
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://glowheal.in';
  const currentDate = new Date();

  return [
    // Homepage - highest priority, daily updates
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Services listing page
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Individual service pages
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Doctors listing page
    {
      url: `${baseUrl}/doctors`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // Individual doctor profiles
    ...doctors.map((doctor) => ({
      url: `${baseUrl}/doctors/${doctor.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Booking flow
    {
      url: `${baseUrl}/book`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // City pages (when implemented)
    ...cities.map((city) => ({
      url: `${baseUrl}/cities/${city.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // Static pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // Note: /landing/ pages intentionally excluded (noindex)
  ];
}
