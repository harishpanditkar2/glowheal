import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for Glowheal
 * 
 * Allows:
 * - All public pages (/, /services, /doctors, /cities)
 * 
 * Disallows:
 * - API routes (/api)
 * - Landing pages (/landing - noindex pages for paid traffic)
 * - Admin areas (/admin)
 * - Documentation (/docs)
 * - Data directory (/data)
 * 
 * Sitemap location: https://glowheal.in/sitemap.xml
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/docs/',
          '/landing/', // Landing pages have robots: noindex
          '/data/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/landing/', '/admin/'],
      },
    ],
    sitemap: 'https://glowheal.in/sitemap.xml',
  };
}
