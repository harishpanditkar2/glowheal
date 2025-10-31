import { cookies } from 'next/headers';
import { City, CITY_COOKIE_NAME, DEFAULT_CITY, SUPPORTED_CITIES } from './city-context';

/**
 * Server-side utility to read city from cookie
 * Use in Server Components and generateMetadata
 */
export function getCityFromCookieServer(): City {
  try {
    const cookieStore = cookies();
    const cityCookie = cookieStore.get(CITY_COOKIE_NAME);
    
    if (cityCookie?.value && SUPPORTED_CITIES.includes(cityCookie.value as City)) {
      return cityCookie.value as City;
    }
  } catch (error) {
    console.warn('Failed to read city cookie:', error);
  }
  
  return DEFAULT_CITY;
}
