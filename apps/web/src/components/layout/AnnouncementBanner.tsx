'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFreeCta } from '@/hooks/useFreeCta';

/**
 * AnnouncementBanner - Sitewide dismissible banner for free consultation
 * 
 * Features:
 * - Dismissible with localStorage persistence
 * - No CLS (Cumulative Layout Shift) - reserved space
 * - WCAG AAA contrast (Forest on Amber)
 * - Keyboard accessible
 * - ≥48px touch targets
 * 
 * @example
 * <AnnouncementBanner />
 */
export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { bannerText, ctaHref } = useFreeCta();

  useEffect(() => {
    setIsClient(true);
    // Check if user has dismissed the banner
    const isDismissed = localStorage.getItem('glowheal_banner_dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('glowheal_banner_dismissed', 'true');
  };

  // Don't render during SSR to avoid hydration mismatch
  if (!isClient) {
    // Reserve space to prevent CLS
    return <div className="h-11 bg-lime-400" aria-hidden="true" />;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="relative bg-lime-400 text-forest-900 py-2 px-4 shadow-md"
      role="banner"
      aria-label="Site announcement"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <p className="font-semibold text-sm md:text-base">
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {bannerText}
              </span>
            </p>
          </div>

          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-forest-700 text-white rounded-lg font-semibold hover:bg-forest-800 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-900 focus:ring-offset-2 focus:ring-offset-lime-400 text-sm whitespace-nowrap"
            aria-label="Book your free consultation now"
          >
            Book Now
          </Link>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-2 hover:bg-lime-500 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700 focus:ring-offset-2 focus:ring-offset-lime-400"
            aria-label="Dismiss announcement"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
