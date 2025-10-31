import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Doctors Online | 500+ Verified Specialists - Glowheal',
  description: 'Browse 500+ verified doctors across 12 specialties. Filter by city, language, rating. Start with free consultation. View fixed pricing for Pune services.',
  openGraph: {
    title: 'Find Doctors Online | 500+ Verified Specialists - Glowheal',
    description: 'Browse 500+ verified doctors across 12 specialties. Start with free consultation.',
    url: 'https://glowheal.in/doctors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Doctors Online | 500+ Verified Specialists',
    description: 'Browse 500+ verified doctors across 12 specialties. Start with free consultation.',
  },
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
