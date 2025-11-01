/**
 * useFreeCta - Standardized free consultation CTA copy and routing
 * 
 * Provides consistent "Free First Consultation" messaging across all components
 * Maintains hospital-grade tone: empathetic, calm, clinical trust
 * 
 * @example
 * const { ctaText, ctaHref, whatsappText } = useFreeCta();
 * <Button variant="primary" href={ctaHref}>{ctaText}</Button>
 */

export function useFreeCta() {
  return {
    // Primary CTA text
    ctaText: 'Book Free Consultation',
    
    // Short variant for mobile/compact spaces
    ctaTextShort: 'Book Free Consult',
    
    // Booking page route
    ctaHref: '/book',
    
    // WhatsApp prefill message
    whatsappText: 'Hi, I want to book my free first consultation with a Glowheal doctor.',
    
    // WhatsApp with concern
    getWhatsappTextWithConcern: (concern: string, city?: string) => {
      const cityPart = city ? ` in ${city}` : '';
      return `Hi, I want to book my free first consultation for ${concern}${cityPart}.`;
    },
    
    // Hero headline
    heroHeadline: 'Free First Consultation with a Doctor',
    
    // Hero subcopy
    heroSubcopy: 'Talk to our in-house doctor at no cost. Get routed to the right specialist afterward.',
    
    // Microcopy for proof sections
    proofText: 'Your first call is free. Specialist bookings only after your plan is confirmed.',
    
    // FAQ answer
    faqAnswer: 'Yes. Your first consultation with our in-house doctor is free. You\'ll be routed to a specialist if needed.',
    
    // Pricing explainer
    pricingExplainer: 'Begin with a free call; specialist fees apply only if you proceed.',
    
    // Banner text
    bannerText: 'Your first Glowheal consultation is free — book now',
    
    // Exit intent copy
    exitIntentText: 'Have questions? Your first call is free',
    
    // Confirmation text
    confirmationText: 'Your free consult is scheduled.',
    
    // Routing microcopy
    routingMicrocopy: 'You\'ll speak with our in-house doctor first. They\'ll route you to a specialist only if needed.',
  };
}

/**
 * Helper to format WhatsApp URL with free consultation message
 * @param phone Phone number in E.164 format (e.g., '+918329563445')
 * @param concern Optional health concern
 * @param city Optional city
 */
export function getFreeConsultWhatsAppURL(
  phone: string,
  concern?: string,
  city?: string
): string {
  // Direct text generation without using the Hook (Hook can't be called from regular functions)
  const whatsappText = 'Hi, I want to book my free first consultation with a Glowheal doctor.';
  const cityPart = city ? ` in ${city}` : '';
  const textWithConcern = `Hi, I want to book my free first consultation for ${concern}${cityPart}.`;
  
  const text = concern ? textWithConcern : whatsappText;
  
  // URL encode the text
  const encodedText = encodeURIComponent(text);
  
  // Try wa.me first (preferred), fallback to api.whatsapp.com
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedText}`;
}
