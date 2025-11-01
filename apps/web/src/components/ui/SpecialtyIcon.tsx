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

  // Modern, professional icon mapping by specialty slug
  const iconMap: Record<string, JSX.Element> = {
    dermatology: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="derma-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="derma-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#derma-bg)" />
          <circle cx="32" cy="32" r="20" stroke="url(#derma-main)" strokeWidth="2.5" fill="none" />
          <path d="M24 28c0-1 0.5-2 1.5-2.5c1-0.5 2-0.5 3 0s1.5 1.5 1.5 2.5" stroke="url(#derma-main)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M34 28c0-1 0.5-2 1.5-2.5c1-0.5 2-0.5 3 0s1.5 1.5 1.5 2.5" stroke="url(#derma-main)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="32" r="14" fill="#FEF3C7" opacity="0.4" />
          <path d="M26 36c0 0 2 4 6 4s6-4 6-4" stroke="url(#derma-main)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="24" r="2.5" fill="#FBBF24" opacity="0.6" />
          <circle cx="44" cy="24" r="2.5" fill="#FBBF24" opacity="0.6" />
          <circle cx="20" cy="40" r="2" fill="#FBBF24" opacity="0.5" />
          <circle cx="44" cy="40" r="2" fill="#FBBF24" opacity="0.5" />
        </svg>
      </div>
    ),
    'hair-scalp': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hair-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#BFDBFE" />
            </linearGradient>
            <linearGradient id="hair-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#hair-bg)" />
          <ellipse cx="32" cy="28" rx="12" ry="16" fill="url(#hair-main)" />
          <path d="M26 16c-2 0-4 2-4 6c0 4 2 8 4 10" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M32 14c-1 0-2 2-2 5c0 3 1 7 2 9" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M38 16c2 0 4 2 4 6c0 4-2 8-4 10" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="42" rx="10" ry="6" fill="url(#hair-main)" opacity="0.3" />
          <path d="M24 38c2 3 5 5 8 5s6-2 8-5" stroke="url(#hair-main)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    'weight-loss': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="weight-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D1FAE5" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>
            <linearGradient id="weight-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#weight-bg)" />
          <circle cx="32" cy="32" r="18" stroke="url(#weight-main)" strokeWidth="3" fill="none" strokeDasharray="4 4" />
          <rect x="18" y="28" width="8" height="8" rx="1" fill="url(#weight-main)" />
          <rect x="38" y="28" width="8" height="8" rx="1" fill="url(#weight-main)" />
          <rect x="30" y="28" width="4" height="8" fill="url(#weight-main)" />
          <path d="M22 22L22 14M22 18L26 18M22 18L18 18" stroke="url(#weight-main)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 42L42 50M42 46L46 46M42 46L38 46" stroke="url(#weight-main)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="3" fill="#34D399" />
        </svg>
      </div>
    ),
    'mental-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mental-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0E7FF" />
              <stop offset="100%" stopColor="#C7D2FE" />
            </linearGradient>
            <linearGradient id="mental-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#mental-bg)" />
          <path d="M20 30c0-8 5-14 12-14s12 6 12 14c0 4-2 7-4 9v7c0 2-1 4-3 4h-10c-2 0-3-2-3-4v-7c-2-2-4-5-4-9z" fill="url(#mental-main)" />
          <path d="M26 28c0 0 2-3 6-3s6 3 6 3" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="28" cy="32" r="1.5" fill="#E0E7FF" />
          <circle cx="36" cy="32" r="1.5" fill="#E0E7FF" />
          <path d="M28 38h8" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 20c-2-4-6-6-6-6M32 20c2-4 6-6 6-6" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="30" r="10" fill="url(#mental-main)" opacity="0.15" />
        </svg>
      </div>
    ),
    'nutrition-dietetics': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nutrition-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DCFCE7" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>
            <linearGradient id="nutrition-apple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#nutrition-bg)" />
          <ellipse cx="32" cy="34" rx="14" ry="16" fill="url(#nutrition-apple)" />
          <ellipse cx="32" cy="34" rx="11" ry="13" fill="#F87171" opacity="0.5" />
          <path d="M32 18c0 0-3-4-5-4s-3 2-3 4c0 2 2 4 4 4c1 0 2-1 3-2" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M32 18c-1 0-2 0-3-1c-1-1-1-2-1-3" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="26" cy="32" rx="2" ry="3" fill="#7C2D12" opacity="0.4" />
          <path d="M32 20c2-2 4-2 6-2" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="34" r="6" fill="url(#nutrition-apple)" opacity="0.2" />
        </svg>
      </div>
    ),
    'womens-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="womens-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="100%" stopColor="#FBCFE8" />
            </linearGradient>
            <linearGradient id="womens-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#womens-bg)" />
          <circle cx="32" cy="24" r="10" fill="url(#womens-main)" />
          <circle cx="32" cy="24" r="7" fill="#F9A8D4" opacity="0.5" />
          <rect x="30" y="32" width="4" height="12" rx="1" fill="url(#womens-main)" />
          <rect x="24" y="42" width="16" height="3" rx="1.5" fill="url(#womens-main)" />
          <circle cx="28" cy="22" r="1.5" fill="#FCE7F3" />
          <circle cx="36" cy="22" r="1.5" fill="#FCE7F3" />
          <path d="M28 26c0 0 2 2 4 2s4-2 4-2" stroke="#FCE7F3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="24" r="14" stroke="url(#womens-main)" strokeWidth="1.5" fill="none" opacity="0.3" />
        </svg>
      </div>
    ),
    'mens-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mens-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#BFDBFE" />
            </linearGradient>
            <linearGradient id="mens-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#mens-bg)" />
          <circle cx="28" cy="34" r="11" fill="url(#mens-main)" />
          <circle cx="28" cy="34" r="8" fill="#93C5FD" opacity="0.5" />
          <path d="M36 26L46 16M46 16h-7M46 16v7" stroke="url(#mens-main)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="46" cy="16" r="2" fill="url(#mens-main)" />
          <circle cx="28" cy="34" r="15" stroke="url(#mens-main)" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path d="M24 32c0-2 2-4 4-4s4 2 4 4" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    'sleep-medicine': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sleep-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EDE9FE" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
            <linearGradient id="sleep-moon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#sleep-bg)" />
          <path d="M38 18c-7 0-12 5-12 12s5 12 12 12c2 0 4-0.5 5-1c-3 2-6 3-10 3c-8 0-14-6-14-14s6-14 14-14c4 0 7 1 10 3c-1-0.5-3-1-5-1z" fill="url(#sleep-moon)" />
          <circle cx="20" cy="20" r="2" fill="#A78BFA" opacity="0.6" />
          <circle cx="26" cy="16" r="1.5" fill="#A78BFA" opacity="0.5" />
          <circle cx="32" cy="14" r="2" fill="#A78BFA" opacity="0.7" />
          <circle cx="46" cy="22" r="1.5" fill="#A78BFA" opacity="0.5" />
          <circle cx="50" cy="28" r="2" fill="#A78BFA" opacity="0.6" />
          <circle cx="48" cy="42" r="1.5" fill="#A78BFA" opacity="0.5" />
          <circle cx="18" cy="46" r="2" fill="#A78BFA" opacity="0.6" />
          <path d="M28 28c0-1 1-2 2-2s2 1 2 2M34 30c0-1 1-2 2-2s2 1 2 2" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    'gut-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gut-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="gut-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#gut-bg)" />
          <path d="M28 16h8c3 0 6 3 6 6v3c0 2-1 3-2 4c1 1 2 2 2 4v3c0 3-3 6-6 6h-8c-3 0-6-3-6-6v-3c0-2 1-3 2-4c-1-1-2-2-2-4v-3c0-3 3-6 6-6z" fill="url(#gut-main)" />
          <ellipse cx="32" cy="26" rx="7" ry="5" fill="#FCD34D" opacity="0.6" />
          <ellipse cx="32" cy="38" rx="7" ry="5" fill="#FCD34D" opacity="0.6" />
          <path d="M28 24c0-1 1-2 2-2s2 1 2 2M34 24c0-1 1-2 2-2s2 1 2 2" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M28 30c1 1 2 1 4 1s3 0 4-1" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="26" cy="32" r="1.5" fill="#FBBF24" opacity="0.5" />
          <circle cx="38" cy="32" r="1.5" fill="#FBBF24" opacity="0.5" />
        </svg>
      </div>
    ),
    'metabolic-health': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="metabolic-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DCFCE7" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>
            <linearGradient id="metabolic-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#metabolic-bg)" />
          <circle cx="32" cy="32" r="16" stroke="url(#metabolic-main)" strokeWidth="2.5" fill="none" />
          <path d="M32 16v6M32 42v6M16 32h6M42 32h6" stroke="url(#metabolic-main)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 22l4 4M38 38l4 4M42 22l-4 4M26 38l-4 4" stroke="url(#metabolic-main)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="32" cy="32" r="8" fill="url(#metabolic-main)" opacity="0.3" />
          <circle cx="32" cy="32" r="4" fill="url(#metabolic-main)" />
          <path d="M28 30c0 0 2-2 4-2s4 2 4 2" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    ),
    labs: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="labs-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEE2E2" />
              <stop offset="100%" stopColor="#FECACA" />
            </linearGradient>
            <linearGradient id="labs-flask" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#labs-bg)" />
          <path d="M26 14h12v12l8 14c2 3 0 6-3 6H21c-3 0-5-3-3-6l8-14V14z" fill="url(#labs-flask)" />
          <rect x="26" y="14" width="12" height="2" fill="#DC2626" />
          <path d="M26 26h12" stroke="#FECACA" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="34" r="2.5" fill="#FECACA" opacity="0.6" />
          <circle cx="36" cy="36" r="2" fill="#FECACA" opacity="0.5" />
          <circle cx="30" cy="39" r="1.5" fill="#FECACA" opacity="0.4" />
          <path d="M20 38c4 0 8-2 12-2s8 2 12 2" stroke="#F87171" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      </div>
    ),
    'iv-therapy': (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="iv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
            <linearGradient id="iv-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#iv-bg)" />
          <rect x="28" y="14" width="8" height="6" rx="2" fill="url(#iv-main)" />
          <rect x="30" y="20" width="4" height="18" rx="1" fill="url(#iv-main)" />
          <circle cx="32" cy="17" r="2" fill="#E0F2FE" />
          <path d="M20 28h24" stroke="url(#iv-main)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M24 32c0 4 4 8 8 8s8-4 8-8" stroke="url(#iv-main)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="44" r="5" fill="url(#iv-main)" opacity="0.2" />
          <circle cx="30" cy="34" r="1.5" fill="#38BDF8" />
          <circle cx="34" cy="34" r="1.5" fill="#38BDF8" />
          <circle cx="32" cy="36" r="1.5" fill="#38BDF8" />
        </svg>
      </div>
    ),
    orthopedics: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ortho-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E8FF" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>
            <linearGradient id="ortho-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#ortho-bg)" />
          <rect x="28" y="16" width="8" height="32" rx="3" fill="url(#ortho-main)" />
          <circle cx="32" cy="22" r="5" fill="#C084FC" />
          <circle cx="32" cy="32" r="5" fill="#C084FC" />
          <circle cx="32" cy="42" r="5" fill="#C084FC" />
          <circle cx="32" cy="22" r="3" fill="#E9D5FF" />
          <circle cx="32" cy="32" r="3" fill="#E9D5FF" />
          <circle cx="32" cy="42" r="3" fill="#E9D5FF" />
          <path d="M18 26h28M18 38h28" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    default: (
      <div className={cn(baseClasses, 'relative')}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="default-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3F4F6" />
              <stop offset="100%" stopColor="#E5E7EB" />
            </linearGradient>
            <linearGradient id="default-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#default-bg)" />
          <path d="M32 16L40 24L44 32L40 40L32 48L24 40L20 32L24 24L32 16Z" fill="url(#default-main)" />
          <circle cx="32" cy="32" r="8" fill="#9CA3AF" />
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
