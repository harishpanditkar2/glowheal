import { MetadataRoute } from 'next';
import services from '@/data/services.json';

/**
 * Dynamic sitemap generation for Dr. Chetna Bhaisare
 * Includes: Homepage, About, Conditions, Pricing, Contact, Book
 * Updates automatically when services data changes
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

    // About page
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // Individual condition pages (Dermatology + Ayurveda)
    ...services.map((service) => ({
      url: `${baseUrl}/conditions/${service.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Pricing page
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Book appointment page
    {
      url: `${baseUrl}/book`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Contact page
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Privacy & Terms
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
  ];
}
