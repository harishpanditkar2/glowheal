import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Limited Time Offer: ₹499 Doctor Consultation | Save 50% - Glowheal',
  description: 'Expert dermatology consultation for just ₹499 (normally ₹999). Limited slots available. See visible improvement in 30 days - Money back guarantee*. Individual results may vary.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LandingOfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
