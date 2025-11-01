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

  // Colorful icon mapping by specialty slug
  const iconMap: Record<string, JSX.Element> = {
    dermatology: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEF3C7" />
          <path d="M32 12C20.954 12 12 20.954 12 32s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20zm0 36c-8.822 0-16-7.178-16-16s7.178-16 16-16 16 7.178 16 16-7.178 16-16 16z" fill="#F59E0B" />
          <circle cx="24" cy="26" r="2" fill="#F59E0B" />
          <circle cx="40" cy="26" r="2" fill="#F59E0B" />
          <path d="M32 36c-3.314 0-6-2.686-6-6h2c0 2.206 1.794 4 4 4s4-1.794 4-4h2c0 3.314-2.686 6-6 6z" fill="#F59E0B" />
          <circle cx="32" cy="20" r="1.5" fill="#FBBF24" />
          <circle cx="20" cy="32" r="1.5" fill="#FBBF24" />
          <circle cx="44" cy="32" r="1.5" fill="#FBBF24" />
        </svg>
      </div>
    ),
    'hair-scalp': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#DBEAFE" />
          <path d="M32 14c-6 0-10 4-10 10 0 3 1 5 2 7-3 2-5 5-5 9 0 6 4 10 10 10h6c6 0 10-4 10-10 0-4-2-7-5-9 1-2 2-4 2-7 0-6-4-10-10-10z" fill="#3B82F6" />
          <path d="M28 18c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" fill="#60A5FA" />
          <path d="M24 24c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3z" fill="#60A5FA" />
          <path d="M34 24c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3z" fill="#60A5FA" />
        </svg>
      </div>
    ),
    'weight-loss': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#D1FAE5" />
          <path d="M32 12L28 24L20 28L28 32L32 44L36 32L44 28L36 24L32 12Z" fill="#10B981" />
          <circle cx="32" cy="32" r="8" fill="#34D399" />
          <path d="M24 28h16M28 24v8M36 24v8" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 38c2 2 4 3 6 3s4-1 6-3" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    'mental-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#E0E7FF" />
          <path d="M32 14c-8 0-14 6-14 14 0 4 2 8 5 10v8c0 2 2 4 4 4h10c2 0 4-2 4-4v-8c3-2 5-6 5-10 0-8-6-14-14-14z" fill="#6366F1" />
          <circle cx="28" cy="26" r="2" fill="#E0E7FF" />
          <circle cx="36" cy="26" r="2" fill="#E0E7FF" />
          <path d="M28 32c0-2 2-4 4-4s4 2 4 4" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 20c0-4 4-6 8-6s8 2 8 6" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    'nutrition-dietetics': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEE2E2" />
          <path d="M32 12c-8 0-14 6-14 14s6 14 14 14 14-6 14-14-6-14-14-14z" fill="#EF4444" />
          <path d="M28 16c-4 0-6 3-6 6s2 6 6 6 6-3 6-6-2-6-6-6z" fill="#F87171" />
          <path d="M32 40c0 8-4 12-4 12h8s-4-4-4-12z" fill="#16A34A" />
          <ellipse cx="32" cy="24" rx="3" ry="2" fill="#7C2D12" />
        </svg>
      </div>
    ),
    'womens-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FCE7F3" />
          <path d="M32 14c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10z" fill="#EC4899" />
          <circle cx="32" cy="24" r="8" fill="#F9A8D4" />
          <path d="M32 32v12M26 44h12" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="24" r="4" fill="#FCE7F3" />
        </svg>
      </div>
    ),
    'mens-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#DBEAFE" />
          <circle cx="28" cy="32" r="10" fill="#3B82F6" />
          <path d="M35 25L44 16M44 16h-6M44 16v6" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="32" r="6" fill="#93C5FD" />
        </svg>
      </div>
    ),
    'sleep-medicine': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#EDE9FE" />
          <path d="M38 14c-8 0-14 6-14 14s6 14 14 14c2 0 4-0.5 6-1-3 2-7 3-11 3-10 0-18-8-18-18s8-18 18-18c4 0 8 1 11 3-2-0.5-4-1-6-1z" fill="#8B5CF6" />
          <circle cx="20" cy="18" r="1.5" fill="#A78BFA" />
          <circle cx="26" cy="14" r="1.5" fill="#A78BFA" />
          <circle cx="32" cy="12" r="1.5" fill="#A78BFA" />
          <circle cx="48" cy="44" r="1.5" fill="#A78BFA" />
          <circle cx="52" cy="38" r="1.5" fill="#A78BFA" />
        </svg>
      </div>
    ),
    'gut-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEF3C7" />
          <path d="M28 14h8c4 0 8 4 8 8v4c0 2-1 4-3 5 2 1 3 3 3 5v4c0 4-4 8-8 8h-8c-4 0-8-4-8-8v-4c0-2 1-4 3-5-2-1-3-3-3-5v-4c0-4 4-8 8-8z" fill="#F59E0B" />
          <ellipse cx="32" cy="28" rx="6" ry="4" fill="#FCD34D" />
          <ellipse cx="32" cy="40" rx="6" ry="4" fill="#FCD34D" />
          <circle cx="28" cy="26" r="1.5" fill="#D97706" />
          <circle cx="36" cy="26" r="1.5" fill="#D97706" />
        </svg>
      </div>
    ),
    'metabolic-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#DCFCE7" />
          <path d="M32 14L38 26L50 28L38 30L32 42L26 30L14 28L26 26L32 14Z" fill="#22C55E" />
          <circle cx="32" cy="28" r="6" fill="#86EFAC" />
          <path d="M28 34c0 2 2 4 4 4s4-2 4-4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="26" r="1.5" fill="#16A34A" />
          <circle cx="36" cy="26" r="1.5" fill="#16A34A" />
        </svg>
      </div>
    ),
    labs: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#FEE2E2" />
          <path d="M26 12h12v16c0 6-4 10-10 10s-10-4-10-10c0-6 4-10 10-10h-2z" fill="#DC2626" />
          <rect x="26" y="12" width="12" height="4" fill="#EF4444" />
          <path d="M20 36c0-6 4-10 10-10v-8c-8 0-14 6-14 14 0 8 6 14 14 14 8 0 14-6 14-14h-10c0 2-2 4-4 4s-4-2-4-4z" fill="#F87171" />
          <circle cx="26" cy="30" r="2" fill="#FECACA" />
          <circle cx="34" cy="32" r="2" fill="#FECACA" />
          <circle cx="30" cy="36" r="2" fill="#FECACA" />
        </svg>
      </div>
    ),
    'iv-therapy': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#E0F2FE" />
          <path d="M28 14h8v8h-8z" fill="#0EA5E9" />
          <path d="M30 22h4v22h-4z" fill="#38BDF8" />
          <circle cx="32" cy="18" r="2" fill="#E0F2FE" />
          <path d="M20 30h24" stroke="#0EA5E9" strokeWidth="2" />
          <path d="M24 34c0 4 4 8 8 8s8-4 8-8" stroke="#0EA5E9" strokeWidth="2" fill="none" />
          <circle cx="32" cy="46" r="4" fill="#0EA5E9" opacity="0.3" />
        </svg>
      </div>
    ),
    orthopedics: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#F3E8FF" />
          <rect x="28" y="14" width="8" height="36" rx="2" fill="#A855F7" />
          <circle cx="32" cy="20" r="4" fill="#C084FC" />
          <circle cx="32" cy="32" r="4" fill="#C084FC" />
          <circle cx="32" cy="44" r="4" fill="#C084FC" />
          <path d="M20 26h24M20 38h24" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    default: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#F3F4F6" />
          <path d="M32 14L44 28L32 42L20 28L32 14Z" fill="#6B7280" />
          <circle cx="32" cy="28" r="6" fill="#9CA3AF" />
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
