'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import services from '@/data/services.json';
import * as Icons from 'lucide-react';

const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Conditions', href: '/conditions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [isMobileConditionsOpen, setIsMobileConditionsOpen] = useState(false);
  
  const whatsappPhone = '+918329563445';
  const whatsappUrl = `https://wa.me/${whatsappPhone.replace(/\+/g, '')}?text=${encodeURIComponent('Hi Dr. Chetna, I would like to book an appointment.')}`;

  // Group services by category
  const dermatologyServices = services.filter(s => s.category === 'dermatology');
  const ayurvedaServices = services.filter(s => s.category === 'ayurveda');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo-with-text.svg" 
              alt="Dr. Chetna Bhaisare - Dermatology & Ayurveda" 
              className="h-12 w-auto"
            />
          </Link>

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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNav.map((item) =>
              item.label === 'Conditions' ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setIsConditionsOpen(true)}
                  onMouseLeave={() => setIsConditionsOpen(false)}
                >
                  <button className={`text-forest-700 hover:text-jade-600 font-semibold text-base transition-colors py-2 ${isConditionsOpen ? 'text-jade-600' : ''}`}>
                    {item.label}
                    <svg
                      className={`inline-block ml-1 w-4 h-4 transition-transform ${isConditionsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Conditions Dropdown */}
                  {isConditionsOpen && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[95vw] max-w-[1400px] bg-white rounded-2xl shadow-2xl p-8 border-2 border-jade-400"
                      onMouseEnter={() => setIsConditionsOpen(true)}
                      onMouseLeave={() => setIsConditionsOpen(false)}
                    >
                      {/* Dermatology Section - Horizontal Grid */}
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-jade-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Icons.Stethoscope className="w-5 h-5" />
                          Dermatology
                        </h3>
                        <div className="grid grid-cols-5 gap-4">
                          {dermatologyServices.map((service) => {
                            const IconComponent = (Icons as any)[service.icon] || Icons.Stethoscope;
                            return (
                              <Link
                                key={service.slug}
                                href={`/conditions/${service.slug}`}
                                className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-jade-50 border border-transparent hover:border-jade-300 transition-all group"
                              >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-forest-100 to-jade-100 flex items-center justify-center flex-shrink-0 mb-2 group-hover:scale-110 transition-transform">
                                  <IconComponent className="w-6 h-6 text-forest-700" />
                                </div>
                                <div className="font-semibold text-forest-900 text-xs leading-tight">{service.name}</div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Ayurveda Section - Horizontal Grid */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-bold text-lime-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Icons.Leaf className="w-5 h-5" />
                          Ayurveda
                        </h3>
                        <div className="grid grid-cols-5 gap-4">
                          {ayurvedaServices.map((service) => {
                            const IconComponent = (Icons as any)[service.icon] || Icons.Stethoscope;
                            return (
                              <Link
                                key={service.slug}
                                href={`/conditions/${service.slug}`}
                                className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-lime-50 border border-transparent hover:border-lime-300 transition-all group"
                              >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-forest-100 to-lime-100 flex items-center justify-center flex-shrink-0 mb-2 group-hover:scale-110 transition-transform">
                                  <IconComponent className="w-6 h-6 text-forest-700" />
                                </div>
                                <div className="font-semibold text-forest-900 text-xs leading-tight">{service.name}</div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-forest-700 hover:text-jade-600 font-semibold text-base transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* WhatsApp Quick Contact */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-forest-700 hover:text-jade-600 font-medium transition-colors border-2 border-forest-300 rounded-full hover:border-jade-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Book Appointment - Primary CTA */}
            <Link href="/book">
              <Button variant="primary" size="md">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 bg-white max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="space-y-1">
              {mainNav.map((item) => (
                item.label === 'Conditions' ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setIsMobileConditionsOpen(!isMobileConditionsOpen)}
                      className="w-full flex items-center justify-between text-forest-700 hover:bg-jade-50 hover:text-jade-700 font-medium py-3 px-4 rounded-lg text-base transition-colors"
                    >
                      <span>Conditions</span>
                      <svg 
                        className={`w-5 h-5 transition-transform ${isMobileConditionsOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isMobileConditionsOpen && (
                      <div className="ml-4 mt-2 space-y-3">
                        {/* Dermatology Section */}
                        <div className="border-l-2 border-jade-400 pl-4">
                          <div className="text-xs font-bold text-jade-700 uppercase tracking-wide mb-2">Dermatology</div>
                          <div className="space-y-1">
                            {dermatologyServices.map((service) => {
                              const IconComponent = (Icons as any)[service.icon] || Icons.Stethoscope;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/conditions/${service.slug}`}
                                  className="flex items-center gap-3 py-2 px-3 text-forest-700 hover:bg-jade-50 hover:text-jade-700 rounded-lg transition-colors"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsMobileConditionsOpen(false);
                                  }}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest-100 to-jade-100 flex items-center justify-center flex-shrink-0">
                                    <IconComponent className="w-4 h-4 text-forest-700" />
                                  </div>
                                  <span className="text-sm font-medium">{service.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Ayurveda Section */}
                        <div className="border-l-2 border-lime-400 pl-4">
                          <div className="text-xs font-bold text-lime-700 uppercase tracking-wide mb-2">Ayurveda</div>
                          <div className="space-y-1">
                            {ayurvedaServices.map((service) => {
                              const IconComponent = (Icons as any)[service.icon] || Icons.Stethoscope;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/conditions/${service.slug}`}
                                  className="flex items-center gap-3 py-2 px-3 text-forest-700 hover:bg-lime-50 hover:text-lime-700 rounded-lg transition-colors"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsMobileConditionsOpen(false);
                                  }}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest-100 to-lime-100 flex items-center justify-center flex-shrink-0">
                                    <IconComponent className="w-4 h-4 text-forest-700" />
                                  </div>
                                  <span className="text-sm font-medium">{service.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
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
            </nav>
            
            {/* Mobile CTAs */}
            <div className="mt-6 px-4 space-y-3">
              {/* WhatsApp Button */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-forest-700 font-medium border-2 border-forest-300 rounded-lg hover:border-jade-500 hover:text-jade-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              
              {/* Book Appointment Button */}
              <Link href="/book" className="block">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
