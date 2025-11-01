'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { CitySelector } from '@/components/ui/CitySelector';
import { generateWhatsAppURL, formatPhoneForWhatsApp } from '@/lib/utils';
import { useFreeCta, getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';
import { useCity, getCityDisplayName, getCityStatus } from '@/lib/city-context';
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
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const { ctaText, ctaHref, whatsappText } = useFreeCta();
  const { city, setCity: setCityContext } = useCity();
  const cityDisplayName = getCityDisplayName(city);
  const whatsappPhone = '+918329563445';

  const CITIES: { slug: 'pune' | 'mumbai' | 'bengaluru'; name: string }[] = [
    { slug: 'pune', name: 'Pune' },
    { slug: 'mumbai', name: 'Mumbai' },
    { slug: 'bengaluru', name: 'Bengaluru' },
  ];

  // Close city dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isCityDropdownOpen) {
        setIsCityDropdownOpen(false);
      }
    }
    
    if (isCityDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isCityDropdownOpen]);

  const handleCityChange = (newCity: 'pune' | 'mumbai' | 'bengaluru') => {
    setCityContext(newCity);
    setIsCityDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo-with-text.svg" 
              alt="Glowheal - Healthcare Platform" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Mobile Location Badge - Shows between logo and hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="relative" ref={cityDropdownRef}>
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-50 rounded-full border-2 border-lime-400 hover:border-lime-500 hover:bg-lime-100 hover:shadow-sm transition-all min-h-[48px]"
                aria-label={`Select city. Currently showing ${cityDisplayName} prices`}
                aria-haspopup="listbox"
                aria-expanded={isCityDropdownOpen}
                aria-controls="city-dropdown-menu"
              >
                <svg className="w-5 h-5 text-forest-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {/* Hide text label on md+ to avoid double city context, keep icon */}
                <span className="text-sm font-semibold text-forest-900 md:sr-only">{cityDisplayName}</span>
                <svg 
                  className={`w-3.5 h-3.5 text-forest-700 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* City Dropdown */}
              {isCityDropdownOpen && (
                <div 
                  id="city-dropdown-menu"
                  role="listbox"
                  aria-label="City selection menu"
                  className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  {CITIES.map((cityOption) => {
                    const status = getCityStatus(cityOption.slug);
                    const isSelected = city === cityOption.slug;
                    const isDisabled = status === 'coming-soon';
                    
                    return (
                      <button
                        key={cityOption.slug}
                        onClick={() => !isDisabled && handleCityChange(cityOption.slug)}
                        disabled={isDisabled}
                        className={`w-full text-left px-4 py-3 transition-colors flex items-center justify-between ${
                          isDisabled 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-jade-50 cursor-pointer'
                        } ${isSelected ? 'bg-jade-50' : ''}`}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={isDisabled}
                      >
                        <div className="flex items-center gap-3">
                          <svg className={`w-5 h-5 ${isDisabled ? 'text-gray-400' : 'text-forest-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <div className={`text-sm font-semibold ${isDisabled ? 'text-gray-500' : isSelected ? 'text-forest-900' : 'text-gray-900'}`}>
                              {cityOption.name}
                            </div>
                            {status === 'coming-soon' && (
                              <div className="text-xs text-amber-600 mt-0.5">
                                Coming Soon
                              </div>
                            )}
                          </div>
                        </div>
                        {isSelected && !isDisabled && (
                          <svg className="w-5 h-5 text-jade-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-forest-700 hover:text-jade-600"
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNav.map((item) =>
              item.label === 'Services' ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className={`text-forest-700 hover:text-lime-600 font-semibold text-base transition-colors py-2 ${isServicesOpen ? 'text-lime-600' : ''}`}>
                    {item.label}
                    <svg
                      className={`inline-block ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Horizontal Mega Menu with hover delay */}
                  {isServicesOpen && (
                    <div 
                      className="absolute left-0 top-full mt-2 w-[1100px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl p-8 border-2 border-lime-400"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      {/* Triangle indicator */}
                      <div className="absolute -top-2 left-12 w-4 h-4 bg-white border-l-2 border-t-2 border-lime-400 rotate-45"></div>
                      
                      <div className="grid grid-cols-4 gap-6">
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="flex items-start space-x-3 p-4 rounded-xl hover:bg-lime-50 hover:border-lime-300 border-2 border-transparent transition-all duration-200 group/item"
                          >
                            <div className="text-3xl group-hover/item:scale-110 transition-transform">{service.icon}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-forest-900 group-hover/item:text-lime-600 transition-colors">
                                {service.name}
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {service.tagline}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-2 text-lime-600 hover:text-lime-700 font-semibold text-base group/link"
                        >
                          View All Services
                          <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-forest-700 hover:text-lime-600 font-semibold text-base transition-colors py-2"
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
              <Button variant="primary" size="md">
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 bg-white">
            <nav className="space-y-1">
              {mainNav.map((item) => (
                item.label === 'Services' ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="w-full flex items-center justify-between text-forest-700 hover:bg-jade-50 hover:text-jade-700 font-medium py-3 px-4 rounded-lg text-base transition-colors"
                    >
                      <span>Services</span>
                      <svg 
                        className={`w-5 h-5 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isMobileServicesOpen && (
                      <div className="ml-4 mt-2 space-y-1 border-l-2 border-lime-400 pl-4">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-3 py-2 px-3 text-forest-700 hover:bg-jade-50 hover:text-jade-700 rounded-lg transition-colors"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileServicesOpen(false);
                            }}
                          >
                            <span className="text-2xl">{service.icon}</span>
                            <span className="text-sm font-medium">{service.name}</span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="flex items-center gap-2 py-2 px-3 mt-2 text-lime-600 hover:text-lime-700 font-semibold rounded-lg hover:bg-lime-50 transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                        >
                          <span className="text-sm">View All Services</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-forest-700 hover:bg-jade-50 hover:text-jade-700 font-medium py-3 px-4 rounded-lg text-base transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
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
                <Button variant="primary" size="lg" className="w-full text-base">
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
