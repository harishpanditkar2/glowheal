'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CitySelector } from '@/components/ui/CitySelector';
import { generateWhatsAppURL, formatPhoneForWhatsApp } from '@/lib/utils';
import { useFreeCta, getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';
import services from '@/data/services.json';

const mainNav = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Cities', href: '/cities' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { ctaText, ctaHref, whatsappText } = useFreeCta();
  const whatsappPhone = '+918329563445';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-forest-700 font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold font-display text-forest-700">
              Glowheal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {mainNav.map((item) =>
              item.label === 'Services' ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="text-forest-700 hover:text-jade-600 font-medium transition-colors">
                    {item.label}
                    <svg
                      className="inline-block ml-1 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Mega Menu */}
                  {isServicesOpen && (
                    <div className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-xl shadow-xl p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-jade-50 transition-colors"
                          >
                            <div className="text-2xl">{service.icon}</div>
                            <div>
                              <div className="font-semibold text-forest-700">
                                {service.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {service.tagline}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link
                          href="/services"
                          className="text-jade-600 hover:text-jade-700 font-medium text-sm"
                        >
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-forest-700 hover:text-jade-600 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Primary CTA - Book Free Consultation */}
            <Link href={ctaHref}>
              <Button variant="free" size="md">
                {ctaText}
              </Button>
            </Link>
            
            {/* City Selector - Prominent Pill */}
            <div className="px-1">
              <CitySelector />
            </div>
            
            {/* Join as Doctor - Outline Style */}
            <Link href="/join-doctor">
              <Button variant="outline" size="md">
                Join as Doctor
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-forest-700 hover:text-jade-600"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 bg-white">
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-forest-700 hover:bg-jade-50 hover:text-jade-700 font-medium py-3 px-4 rounded-lg text-base transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/join-doctor"
                className="block text-forest-700 hover:bg-jade-50 hover:text-jade-700 font-medium py-3 px-4 rounded-lg text-base transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Join as Doctor
              </Link>
            </nav>
            <div className="mt-6 px-4 space-y-3">
              <CitySelector />
              <Link href={ctaHref} className="block">
                <Button variant="free" size="lg" className="w-full text-base">
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
