import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary' | 'free';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
  href?: string; // Optional href for link-styled buttons
}

/**
 * Button component with forest-green healthcare palette
 * 
 * Variants:
 * - primary/free: Amber with white text (AA contrast)
 * - secondary: Forest solid with white text
 * - outline: Forest border with forest text
 * - tertiary: Text link style
 * 
 * @example
 * <Button variant="primary" size="lg">Book Consultation</Button>
 * <Button variant="outline">Learn More</Button>
 * <Button variant="primary" href="/book">Book Now</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      // Variants
      {
        // Primary/Free: Amber with white text for AA contrast
        'bg-amber-500 text-white shadow-md hover:bg-amber-600 hover:shadow-lg transform hover:-translate-y-0.5':
          variant === 'primary' || variant === 'free',
        // Secondary: Forest solid with white text
        'bg-forest-700 text-white shadow-md hover:bg-forest-800 hover:shadow-lg':
          variant === 'secondary',
        // Outline: Forest border for low-risk actions
        'border-2 border-forest-700 text-forest-700 bg-white hover:bg-mist-50':
          variant === 'outline',
        // Tertiary: Text link style
        'text-forest-700 hover:underline underline-offset-2': variant === 'tertiary',
      },
      // Sizes (ensure ≥48px tap targets)
      {
        'px-4 py-2.5 text-sm min-h-[44px]': size === 'sm',
        'px-6 py-3 text-base min-h-[48px]': size === 'md',
        'px-8 py-4 text-lg min-h-[52px]': size === 'lg',
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
