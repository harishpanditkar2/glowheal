import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { AnnouncementBanner } from '@/components/layout/AnnouncementBanner';
import { CityProvider } from '@/lib/city-context';
import { getCityFromCookieServer } from '@/lib/server-city';

// Fonts are now self-hosted in globals.css with @font-face
// This eliminates Google Fonts CDN request and improves LCP by 200-500ms

export const metadata: Metadata = {
  metadataBase: new URL('https://glowheal.in'),
  title: {
    default: 'Glowheal - Free First Consultation | Online Doctor Video Call',
    template: '%s | Glowheal',
  },
  description:
    'Start with a free consultation with our in-house doctor. Get routed to 500+ verified specialists if needed. Video consultation for dermatology, mental health, nutrition & more. Available 24/7.',
  keywords: [
    'free online doctor consultation',
    'free first consultation',
    'telemedicine india',
    'video call doctor',
    'dermatologist online',
    'mental health counseling',
    'nutrition consultation',
    'healthcare platform',
  ],
  authors: [{ name: 'Glowheal' }],
  creator: 'Glowheal',
  publisher: 'Glowheal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://glowheal.in',
    siteName: 'Glowheal',
    title: 'Glowheal - Free First Consultation | Online Doctor Video Call',
    description:
      'Start with a free consultation. Connect with 500+ verified doctors if needed. Available 24/7.',
    images: [
      {
        url: '/images/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Glowheal - Online Healthcare Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glowheal - Free First Consultation with a Doctor',
    description: 'Start with a free consultation. Connect with 500+ verified specialists if needed.',
    images: ['/images/og-homepage.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/images/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/images/favicon/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read city from cookie on server to prevent hydration mismatch
  const initialCity = getCityFromCookieServer();
  
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://glowheal.in" />
        {/* Preload critical display font for LCP optimization */}
        <link
          rel="preload"
          href="/fonts/poppins-v24-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <CityProvider initialCity={initialCity}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-jade-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          
          <AnnouncementBanner />
          
          <Header />
          
          <main id="main-content">{children}</main>
          
          <Footer />
          
          <WhatsAppButton />
        </CityProvider>
      </body>
    </html>
  );
}
