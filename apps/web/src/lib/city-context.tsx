'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type City = 'pune' | 'mumbai' | 'bengaluru';

interface CityContextType {
  city: City;
  setCity: (city: City) => void;
  isLoading: boolean;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const SUPPORTED_CITIES: City[] = ['pune', 'mumbai', 'bengaluru'];
export const DEFAULT_CITY: City = 'pune';
export const CITY_COOKIE_NAME = 'glowheal_city';

interface CityProviderProps {
  children: React.ReactNode;
  initialCity?: City; // For SSR hydration
}

export function CityProvider({ children, initialCity }: CityProviderProps) {
  const [city, setCityState] = useState<City>(initialCity || DEFAULT_CITY);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize city from cookie or auto-detect
  useEffect(() => {
    const initializeCity = () => {
      // If initialCity was provided from SSR, use it
      if (initialCity && SUPPORTED_CITIES.includes(initialCity)) {
        setCityState(initialCity);
        setIsLoading(false);
        return;
      }

      // Try to get city from cookie
      const savedCity = getCityFromCookie();
      if (savedCity && SUPPORTED_CITIES.includes(savedCity as City)) {
        setCityState(savedCity as City);
        setIsLoading(false);
        return;
      }

      // Default to Pune
      setCityState(DEFAULT_CITY);
      saveCityToCookie(DEFAULT_CITY);
      setIsLoading(false);
    };

    initializeCity();
  }, [initialCity]);

  const setCity = (newCity: City) => {
    if (SUPPORTED_CITIES.includes(newCity)) {
      setCityState(newCity);
      saveCityToCookie(newCity);

      // Announce city change for screen readers
      if (typeof window !== 'undefined') {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Location changed to ${getCityDisplayName(newCity)}`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);

        // Analytics
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'city_changed',
            city: newCity,
          });
        }
      }
    }
  };

  return (
    <CityContext.Provider value={{ city, setCity, isLoading }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}

// Helper functions
function getCityFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === CITY_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

function saveCityToCookie(city: City) {
  if (typeof document === 'undefined') return;
  
  // Set cookie for 1 year
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${CITY_COOKIE_NAME}=${encodeURIComponent(city)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getCityDisplayName(citySlug: string): string {
  const cityMap: Record<string, string> = {
    pune: 'Pune',
    mumbai: 'Mumbai',
    bengaluru: 'Bengaluru',
  };
  return cityMap[citySlug] || citySlug;
}

export function getCityStatus(citySlug: string): 'active' | 'coming-soon' {
  // Pune is active, others coming soon (based on catalog TODO markers)
  return citySlug === 'pune' ? 'active' : 'coming-soon';
}
