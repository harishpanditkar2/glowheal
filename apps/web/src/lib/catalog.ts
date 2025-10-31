/**
 * Fixed-price catalog types for Glowheal (Multi-city model)
 * All prices are fixed per city; no ranges or tiers
 */

// Supported cities list
export const SUPPORTED_CITIES = ['pune', 'mumbai', 'bengaluru'] as const;
export type SupportedCity = typeof SUPPORTED_CITIES[number];

// Default city for site-wide catalog
export const DEFAULT_CITY: SupportedCity = 'pune';

export interface CatalogItem {
  code: string;
  name: string;
  price: number;
  unit: 'session' | 'visit' | 'plan' | 'package';
  includes: string[];
  excludes: string[];
}

export interface CatalogPackage extends CatalogItem {
  bundledItems: string[]; // Array of catalog item codes included in this package
  standaloneTotal: number; // Total cost if purchased separately
  savings: number; // Amount saved by buying as package
}

export interface CatalogSpecialty {
  slug: string;
  title: string;
  items: CatalogItem[];
}

export interface CatalogCity {
  city: string;
  citySlug: string;
  currency: 'INR';
  teleconsult: {
    first_consult: number;
    note: string;
  };
  specialties: CatalogSpecialty[];
  packages?: CatalogPackage[]; // Optional packages section
  disclaimers: string[];
}

export interface CatalogAddon {
  code: string;
  name: string;
  price: number;
  description: string;
}

/**
 * Lead with provisional catalog item selections
 */
export interface LeadWithItems {
  name: string;
  phone: string;
  concern: string;
  city: string;
  source: string;
  items?: string[]; // Array of catalog item codes
  timestamp: string;
}

/**
 * Validate and normalize city slug
 */
function validateCitySlug(citySlug: string): SupportedCity {
  const normalized = citySlug.toLowerCase();
  if (SUPPORTED_CITIES.includes(normalized as SupportedCity)) {
    return normalized as SupportedCity;
  }
  console.warn(`City "${citySlug}" not supported, falling back to ${DEFAULT_CITY}`);
  return DEFAULT_CITY;
}

/**
 * Check if catalog data is ready for use (not placeholder)
 */
function isCatalogReady(catalog: CatalogCity): boolean {
  // Check if any item has TODO markers or zero prices
  for (const specialty of catalog.specialties) {
    for (const item of specialty.items) {
      if (item.code.startsWith('TODO_') || 
          item.name.includes('[TODO') || 
          item.price === 0) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Helper to get catalog for a city with fallback
 * Returns both catalog and whether fallback occurred
 */
export function getCatalogWithFallback(citySlug: string): { 
  catalog: CatalogCity | null; 
  didFallback: boolean;
  requestedCity: string;
} {
  try {
    const validatedCity = validateCitySlug(citySlug);
    const requestedCity = citySlug.toLowerCase();
    let didFallback = false;
    
    if (validatedCity === 'pune') {
      const puneCatalog = require('../data/catalog/pune.json');
      return { 
        catalog: puneCatalog as CatalogCity, 
        didFallback: false,
        requestedCity
      };
    } else if (validatedCity === 'mumbai') {
      const mumbaiCatalog = require('../data/catalog/mumbai.json');
      const catalog = mumbaiCatalog as CatalogCity;
      // If Mumbai catalog is not ready, fall back to Pune
      if (!isCatalogReady(catalog)) {
        console.warn('Mumbai catalog not ready, falling back to Pune');
        const puneCatalog = require('../data/catalog/pune.json');
        return { 
          catalog: puneCatalog as CatalogCity, 
          didFallback: true,
          requestedCity
        };
      }
      return { catalog, didFallback: false, requestedCity };
    } else if (validatedCity === 'bengaluru') {
      const bengaluruCatalog = require('../data/catalog/bengaluru.json');
      const catalog = bengaluruCatalog as CatalogCity;
      // If Bengaluru catalog is not ready, fall back to Pune
      if (!isCatalogReady(catalog)) {
        console.warn('Bengaluru catalog not ready, falling back to Pune');
        const puneCatalog = require('../data/catalog/pune.json');
        return { 
          catalog: puneCatalog as CatalogCity, 
          didFallback: true,
          requestedCity
        };
      }
      return { catalog, didFallback: false, requestedCity };
    }
    
    return { catalog: null, didFallback: false, requestedCity };
  } catch (error) {
    console.error(`Failed to load catalog for ${citySlug}:`, error);
    // Fall back to Pune on error
    if (citySlug !== DEFAULT_CITY) {
      console.warn(`Falling back to ${DEFAULT_CITY} catalog`);
      const puneCatalog = require('../data/catalog/pune.json');
      return { 
        catalog: puneCatalog as CatalogCity, 
        didFallback: true,
        requestedCity: citySlug.toLowerCase()
      };
    }
    return { catalog: null, didFallback: false, requestedCity: citySlug.toLowerCase() };
  }
}

/**
 * Helper to get catalog for a city with fallback (legacy - for backward compatibility)
 */
export function getCatalog(citySlug: string): CatalogCity | null {
  const { catalog } = getCatalogWithFallback(citySlug);
  return catalog;
}

/**
 * Helper to get item by code
 */
export function getCatalogItem(citySlug: string, code: string): CatalogItem | null {
  const catalog = getCatalog(citySlug);
  if (!catalog) return null;

  for (const specialty of catalog.specialties) {
    const item = specialty.items.find((i) => i.code === code);
    if (item) return item;
  }
  return null;
}

/**
 * Helper to get items by specialty slug
 */
export function getItemsBySpecialty(
  citySlug: string,
  specialtySlug: string
): CatalogItem[] {
  const catalog = getCatalog(citySlug);
  if (!catalog) return [];

  const specialty = catalog.specialties.find((s) => s.slug === specialtySlug);
  return specialty?.items || [];
}

/**
 * Format price in INR
 */
export function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return `₹${price.toLocaleString('en-IN')}`;
}
