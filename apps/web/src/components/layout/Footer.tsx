import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useFreeCta, getFreeConsultWhatsAppURL } from '@/hooks/useFreeCta';
import services from '@/data/services.json';

const footerSections = [
  {
    title: 'Services',
    links: services.slice(0, 6).map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: 'More Services',
    links: services.slice(6, 12).map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: 'For Patients',
    links: [
      { label: 'Free First Consultation', href: '/book' },
      { label: 'Pune Fixed Prices', href: '/pricing' },
      { label: 'Dermatology Pricing', href: '/pricing/dermatology' },
      { label: 'Mental Health Pricing', href: '/pricing/mental-health' },
      { label: 'Orthopedics Pricing', href: '/pricing/orthopedics' },
      { label: 'Find Doctors', href: '/doctors' },
      { label: 'Browse Services', href: '/services' },
      // Removed: Health Packages, Cities, Reviews, Blog - pages not yet created
    ],
  },
  {
    title: 'For Doctors',
    links: [
      { label: 'Find Doctors', href: '/doctors' },
      { label: 'View Services', href: '/services' },
      // Removed: Doctor signup/login/dashboard - auth not yet implemented
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Special Offers', href: '/landing/glowheal-offer' },
      { label: 'All Services', href: '/services' },
      // Removed: About, Contact, Careers, Press - pages not yet created
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Medical Disclaimer', href: '/disclaimer' },
      { label: 'Refund Policy', href: '/refunds' },
    ],
  },
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/glowheal',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/glowheal',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/glowheal',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/glowheal',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@glowheal',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { ctaHref, bannerText, proofText } = useFreeCta();
  const whatsappPhone = '+918329563445';

  return (
    <footer className="bg-forest-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Free Consultation CTA Banner */}
        <div className="bg-gradient-to-r from-jade-700 to-forest-700 rounded-2xl p-8 mb-12 text-center">
          <h3 className="font-bold font-display text-2xl md:text-3xl mb-3">
            Start with a Free Consultation
          </h3>
          <p className="text-mist-100 mb-6 max-w-2xl mx-auto">
            {proofText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaHref}>
              <Button variant="primary" size="lg" className="min-w-[200px]">
                Book Free Consultation
              </Button>
            </Link>
            <Link
              href={getFreeConsultWhatsAppURL(whatsappPhone)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" className="min-w-[200px] bg-white text-forest-700 hover:bg-mist-50">
                Chat on WhatsApp
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold font-display text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-mist-200 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-bold font-display text-xl mb-2">
              Subscribe to Health Updates
            </h3>
            <p className="text-gray-300 mb-4">
              Get expert health tips, special offers, and wellness advice delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-navy-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-lime-400 text-forest-900 rounded-lg font-semibold hover:bg-lime-500 hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex justify-center items-center space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <img 
                src="/images/logo-white.svg" 
                alt="Glowheal" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} Glowheal. All rights reserved.
            </p>
          </div>
        </div>

        {/* Medical Disclaimer - Enhanced for 2025 Compliance */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto text-center">
            <strong className="text-gray-300">Medical Disclaimer:</strong> The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions regarding a medical condition. Individual results may vary. No medical service is guaranteed to produce specific outcomes. Never disregard professional medical advice or delay seeking it because of something you have read on this website.
          </p>
        </div>
      </div>
    </footer>
  );
}
