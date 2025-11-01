'use client';

import { useState, useRef, useEffect } from 'react';
import { useCity, getCityDisplayName, getCityStatus } from '@/lib/city-context';
import { cn } from '@/lib/utils';

type City = 'pune' | 'mumbai' | 'bengaluru';

const CITIES: { slug: City; name: string }[] = [
  { slug: 'pune', name: 'Pune' },
  { slug: 'mumbai', name: 'Mumbai' },
  { slug: 'bengaluru', name: 'Bengaluru' },
];

export function CitySelector() {
  const { city, setCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleCityChange = (newCity: City) => {
    setCity(newCity);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Prominent Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-full min-h-[48px]',
          'bg-lime-50',
          'border-2 border-lime-400',
          'hover:border-lime-500 hover:bg-lime-100 hover:shadow-md',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-forest-700 focus:ring-offset-2',
          isOpen && 'border-lime-500 shadow-md bg-lime-100'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select city for pricing"
      >
        <svg className="w-5 h-5 text-forest-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm font-semibold text-forest-900">
          {getCityDisplayName(city)}
        </span>
        <svg
          className={cn(
            'w-4 h-4 text-forest-700 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
          role="listbox"
          aria-label="City selection"
        >
          {CITIES.map((cityOption) => {
            const status = getCityStatus(cityOption.slug);
            const isSelected = city === cityOption.slug;
            const isComingSoon = status === 'coming-soon';

            return (
              <button
                key={cityOption.slug}
                onClick={() => !isComingSoon && handleCityChange(cityOption.slug)}
                disabled={isComingSoon}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                  isSelected && 'bg-forest-50',
                  !isComingSoon && 'hover:bg-gray-50 cursor-pointer',
                  isComingSoon && 'opacity-60 cursor-not-allowed'
                )}
                role="option"
                aria-selected={isSelected}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-forest-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-forest-900">{cityOption.name}</p>
                    {isComingSoon && (
                      <p className="text-xs text-amber-600">Coming Soon</p>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-jade-600"
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
                )}
              </button>
            );
          })}

          <div className="border-t border-gray-200 mt-2 pt-2 px-4">
            <p className="text-xs text-gray-600">
              Pricing and doctors shown for selected city. Defaults to Pune.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
