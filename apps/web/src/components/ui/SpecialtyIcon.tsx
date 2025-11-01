import { cn } from '@/lib/utils';

interface SpecialtyIconProps {
  specialty: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * SpecialtyIcon - Colorful, distinctive SVG icons for each medical specialty
 * Each specialty has a unique color and relevant icon design
 * Size presets: sm=16px, md=20px (default), lg=24px
 */
export function SpecialtyIcon({ specialty, className, size = 'md' }: SpecialtyIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const baseClasses = cn(sizeClasses[size], 'flex-shrink-0', className);

  // Simple, modern, clean icon mapping by specialty slug
  const iconMap: Record<string, JSX.Element> = {
    dermatology: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEF3C7" />
          <circle cx="32" cy="32" r="20" fill="#F59E0B" />
          <circle cx="32" cy="32" r="16" fill="#FBBF24" opacity="0.5" />
          <path d="M24 28c2-2 4-3 8-3s6 1 8 3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="26" cy="30" r="2" fill="#FFFFFF" />
          <circle cx="38" cy="30" r="2" fill="#FFFFFF" />
          <path d="M26 38c2 2 4 3 6 3s4-1 6-3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    'hair-scalp': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#DBEAFE" />
          <path d="M20 32c0-8 5-16 12-16s12 8 12 16" fill="#3B82F6" />
          <path d="M26 20c0-3 2-6 6-6s6 3 6 6" fill="#60A5FA" />
          <path d="M24 26c0-2 1-4 4-4s4 2 4 4M32 26c0-2 1-4 4-4s4 2 4 4" fill="#60A5FA" />
          <ellipse cx="32" cy="38" rx="12" ry="8" fill="#3B82F6" opacity="0.4" />
        </svg>
      </div>
    ),
    'weight-loss': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#D1FAE5" />
          <circle cx="32" cy="32" r="18" stroke="#10B981" strokeWidth="3" fill="none" />
          <path d="M32 20v24M20 32h24" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="32" r="6" fill="#34D399" />
          <path d="M22 22l20 20M42 22l-20 20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </svg>
      </div>
    ),
    'mental-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#E0E7FF" />
          <path d="M20 28c0-7 5-12 12-12s12 5 12 12c0 4-2 7-4 9v7c0 1-1 2-2 2h-12c-1 0-2-1-2-2v-7c-2-2-4-5-4-9z" fill="#6366F1" />
          <circle cx="28" cy="28" r="2" fill="#E0E7FF" />
          <circle cx="36" cy="28" r="2" fill="#E0E7FF" />
          <path d="M28 34c1 1 2 2 4 2s3-1 4-2" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M26 22c0-3 3-6 6-6s6 3 6 6" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    'nutrition-dietetics': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEE2E2" />
          <circle cx="32" cy="30" r="14" fill="#EF4444" />
          <circle cx="32" cy="30" r="10" fill="#F87171" opacity="0.6" />
          <path d="M32 16c-2-3-4-4-4-4s-2 2-2 4c0 2 2 4 4 4c1 0 2-1 2-2" fill="#16A34A" />
          <path d="M32 18c1-1 2-2 4-2" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="28" cy="28" rx="1.5" ry="2" fill="#7C2D12" />
        </svg>
      </div>
    ),
    'womens-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FCE7F3" />
          <circle cx="32" cy="26" r="12" fill="#EC4899" />
          <circle cx="32" cy="26" r="8" fill="#F9A8D4" opacity="0.6" />
          <rect x="30" y="36" width="4" height="10" rx="1" fill="#EC4899" />
          <rect x="26" y="44" width="12" height="3" rx="1.5" fill="#EC4899" />
          <path d="M28 24c0-2 2-4 4-4s4 2 4 4" stroke="#FCE7F3" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    'mens-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#DBEAFE" />
          <circle cx="28" cy="34" r="12" fill="#3B82F6" />
          <circle cx="28" cy="34" r="8" fill="#93C5FD" opacity="0.5" />
          <path d="M36 26L44 18M44 18h-6M44 18v6" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="44" cy="18" r="2" fill="#3B82F6" />
        </svg>
      </div>
    ),
    'sleep-medicine': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#EDE9FE" />
          <path d="M36 20c-6 0-11 5-11 11s5 11 11 11c2 0 3-0.5 5-1-3 2-6 3-9 3-7 0-13-6-13-13s6-13 13-13c3 0 6 1 9 3-2-0.5-3-1-5-1z" fill="#8B5CF6" />
          <circle cx="20" cy="22" r="1.5" fill="#C4B5FD" />
          <circle cx="26" cy="18" r="1.5" fill="#C4B5FD" />
          <circle cx="32" cy="16" r="2" fill="#C4B5FD" />
          <circle cx="46" cy="26" r="1.5" fill="#C4B5FD" />
          <circle cx="48" cy="36" r="1.5" fill="#C4B5FD" />
          <circle cx="44" cy="44" r="1.5" fill="#C4B5FD" />
        </svg>
      </div>
    ),
    'gut-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEF3C7" />
          <path d="M28 18h8c3 0 5 2 5 5v4c0 2-1 3-2 3c1 0 2 1 2 3v4c0 3-2 5-5 5h-8c-3 0-5-2-5-5v-4c0-2 1-3 2-3c-1 0-2-1-2-3v-4c0-3 2-5 5-5z" fill="#F59E0B" />
          <ellipse cx="32" cy="26" rx="6" ry="4" fill="#FCD34D" opacity="0.7" />
          <ellipse cx="32" cy="38" rx="6" ry="4" fill="#FCD34D" opacity="0.7" />
          <circle cx="28" cy="32" r="1.5" fill="#FBBF24" />
          <circle cx="36" cy="32" r="1.5" fill="#FBBF24" />
        </svg>
      </div>
    ),
    'metabolic-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#DCFCE7" />
          <circle cx="32" cy="32" r="16" stroke="#22C55E" strokeWidth="2.5" fill="none" />
          <circle cx="32" cy="32" r="10" fill="#22C55E" opacity="0.3" />
          <circle cx="32" cy="32" r="5" fill="#22C55E" />
          <path d="M32 18v5M32 41v5M18 32h5M41 32h5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 22l3 3M39 39l3 3M42 22l-3 3M25 39l-3 3" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    labs: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEE2E2" />
          <path d="M26 16h12v10l7 12c1 2 0 4-2 4H21c-2 0-3-2-2-4l7-12V16z" fill="#DC2626" />
          <rect x="26" y="16" width="12" height="2" fill="#B91C1C" />
          <path d="M26 26h12" stroke="#FECACA" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="32" r="2" fill="#FEE2E2" opacity="0.8" />
          <circle cx="35" cy="34" r="1.5" fill="#FEE2E2" opacity="0.6" />
          <circle cx="30" cy="36" r="1.5" fill="#FEE2E2" opacity="0.6" />
        </svg>
      </div>
    ),
    'iv-therapy': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#E0F2FE" />
          <rect x="28" y="16" width="8" height="5" rx="2" fill="#0EA5E9" />
          <rect x="30" y="21" width="4" height="16" rx="1" fill="#0EA5E9" />
          <circle cx="32" cy="18" r="1.5" fill="#E0F2FE" />
          <path d="M22 30h20" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 34c0 3 3 6 6 6s6-3 6-6" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="44" r="4" fill="#38BDF8" opacity="0.4" />
          <circle cx="30" cy="36" r="1" fill="#38BDF8" />
          <circle cx="34" cy="36" r="1" fill="#38BDF8" />
        </svg>
      </div>
    ),
    orthopedics: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#F3E8FF" />
          <rect x="28" y="18" width="8" height="28" rx="2" fill="#A855F7" />
          <circle cx="32" cy="24" r="4" fill="#E9D5FF" />
          <circle cx="32" cy="32" r="4" fill="#E9D5FF" />
          <circle cx="32" cy="40" r="4" fill="#E9D5FF" />
          <path d="M20 28h24M20 36h24" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    default: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#F3F4F6" />
          <circle cx="32" cy="32" r="16" fill="#6B7280" />
          <circle cx="32" cy="32" r="10" fill="#9CA3AF" opacity="0.5" />
          <circle cx="32" cy="32" r="4" fill="#E5E7EB" />
        </svg>
      </div>
    ),
  };

  return iconMap[specialty] || iconMap.default;
}

/**
 * Helper to get specialty icon as a string identifier
 * Useful for mapping in non-component contexts
 */
export function getSpecialtyIconName(specialty: string): string {
  const nameMap: Record<string, string> = {
    dermatology: 'sparkles',
    'hair-scalp': 'scissors',
    'weight-loss': 'scale',
    'mental-health': 'brain',
    'nutrition-dietetics': 'apple',
    'womens-health': 'user-female',
    'mens-health': 'user-male',
    'sleep-medicine': 'moon',
    'gut-health': 'activity',
    'metabolic-health': 'activity',
    labs: 'flask',
    'iv-therapy': 'syringe',
    orthopedics: 'bone',
  };

  return nameMap[specialty] || 'document';
}
