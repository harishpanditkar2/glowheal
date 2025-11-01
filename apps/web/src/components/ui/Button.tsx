import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary' | 'phone';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
  href?: string; // Optional href for link-styled buttons
}

/**
 * Button component with conversion-optimized color palette
 * 
 * Variants:
 * - primary: Orange CTA (#FF8C42) - Maximum conversion (Research: +30-40% CTR)
 * - secondary: Forest outline with hover fill - Supporting actions
 * - outline: Forest border - Low-emphasis actions
 * - tertiary: Royal blue text link - Inline navigation
 * - phone: WhatsApp green - Phone/contact actions
 * 
 * All buttons meet ≥48px touch target requirement (WCAG 2.1 AA)
 * 
 * @example
 * <Button variant="primary" size="lg">Book Free Consultation</Button>
 * <Button variant="secondary">Learn More</Button>
 * <Button variant="phone" href="tel:+918329563445">Call Now</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      // Variants
      {
        // Primary: Forest green for physician brand + high visibility
        'bg-forest-700 text-white shadow-md hover:bg-forest-800 hover:shadow-lg transform hover:-translate-y-0.5 font-bold':
          variant === 'primary',
        // Secondary: Jade/forest outline with proper hover
        'border-2 border-forest-600 text-forest-700 bg-white hover:bg-forest-700 hover:text-white hover:border-forest-800':
          variant === 'secondary',
        // Outline: Forest border for low-emphasis actions
        'border-2 border-forest-600 text-forest-700 bg-white hover:bg-forest-50':
          variant === 'outline',
        // Tertiary: Forest text link
        'text-forest-600 hover:text-forest-700 hover:underline underline-offset-2': 
          variant === 'tertiary',
        // Phone: WhatsApp green for contact actions
        'bg-[#25D366] text-white shadow-md hover:bg-[#1EA952] hover:shadow-lg':
          variant === 'phone',
      },
      // Sizes (ensure ≥48px tap targets for WCAG 2.1 AA)
      {
        'px-4 py-2.5 text-sm min-h-[48px]': size === 'sm',
        'px-5 py-3 text-base min-h-[48px] md:px-6': size === 'md',
        'px-6 py-4 text-lg min-h-[52px] md:px-8': size === 'lg',
      },
      className
    );

    // If href is provided, render as Link
    if (href) {
      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      );
    }

    // Otherwise, render as button
    return (
      <button
        ref={ref}
        className={baseStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
