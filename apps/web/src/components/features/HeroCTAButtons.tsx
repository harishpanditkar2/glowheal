'use client';

import { Button } from '@/components/ui/Button';
import { useFreeCta } from '@/hooks/useFreeCta';
import Link from 'next/link';

export function HeroCTAButtons() {
  const { ctaText, ctaHref } = useFreeCta();

  const handlePrimaryCTAClick = () => {
    // Analytics: Track hero CTA click with color variants
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'hero_cta_click',
        cta_color: 'orange',
        brand_color: 'royal-blue',
        cta_text: ctaText,
        location: 'hero_section',
      });
    }
  };

  const handleSecondaryCTAClick = () => {
    // Analytics: Track doctor join CTA
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'doctor_join_cta_click',
        cta_color: 'forest-outline',
        location: 'hero_section',
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
      <Link href={ctaHref} onClick={handlePrimaryCTAClick}>
        <Button variant="primary" size="lg" className="w-full sm:w-auto text-base sm:text-lg bg-lime-400 text-forest-900 hover:bg-lime-300 shadow-xl hover:shadow-2xl">
          {ctaText}
        </Button>
      </Link>
    </div>
  );
}
