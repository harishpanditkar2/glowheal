
# Create a comprehensive analysis data structure for Glowheal.in website optimization

analysis_data = {
    "color_scheme_recommendations": {
        "current_issue": "Forest green color scheme - need to validate conversion performance",
        "research_findings": {
            "best_colors_healthcare": [
                "Blue (#4169E1) - Trust, cleanliness, competence - Most common and highest trust",
                "Teal/Aqua - Combination of blue and green - Modern, calming, professional",
                "Soft Green (#90EE90) - Health, balance, renewal, wellness",
                "White/Light Gray - Clean, medical, professional backgrounds",
                "Accent colors: Soft orange/coral for CTAs - Warmth without urgency"
            ],
            "colors_to_avoid": [
                "Red - Creates urgency/danger (only for emergency services)",
                "Neon/Lime Green - Too intense, unprofessional",
                "Dark/Heavy colors - Can feel depressing"
            ],
            "optimal_combinations": [
                "Primary: Royal Blue (#4169E1) + White background - Professional, trustworthy",
                "Alternative: Teal (#20B2AA) + Beige (#F5F5DC) - Modern, calming",
                "Medical Spa: Soft Green (#8FBC8F) + White + Gray accents",
                "CTAs: Contrast ratio minimum 4.5:1 for WCAG compliance"
            ]
        },
        "recommendations": [
            "Test Blue primary color (#4169E1) vs current forest green",
            "Use white (#FFFFFF) background for maximum clarity",
            "CTA buttons: Orange (#FF8C42) or Blue (#0066CC) with white text",
            "Maintain consistent color palette across all pages",
            "Ensure WCAG 2.1 AA contrast ratio (4.5:1 minimum)"
        ]
    },
    
    "pricing_strategy": {
        "market_research_india": {
            "general_physician_consultation": "₹180-400 (average ₹200-250)",
            "specialist_consultation": "₹400-800",
            "diagnostic_tests_avg": "₹350-400 per test",
            "online_consultation_market": "Growing at 72% CAGR, ₹800M+ by 2024",
            "full_body_checkup": "₹1,999-3,499",
            "free_consultation_trend": "First consultation free is major conversion driver"
        },
        "competitive_pricing_recommendations": {
            "free_first_consultation": "₹0 (Loss leader - critical for acquisition)",
            "general_consultation": "₹199-299 (competitive with online platforms)",
            "specialist_consultation": "₹399-599",
            "video_consultation": "₹249-399 (15-20% discount vs in-person)",
            "health_packages": {
                "basic_checkup": "₹999-1,499",
                "comprehensive": "₹2,499-3,499",
                "premium": "₹4,999-6,999"
            },
            "pricing_display_strategy": [
                "Show strikethrough original price + discounted price",
                "Display 'Starting from ₹199' for services",
                "Highlight FREE first consultation prominently",
                "Show package savings (Save ₹500)",
                "Add 'Limited time offer' badges where genuine"
            ]
        },
        "conversion_optimization": [
            "Transparent pricing - builds trust (70% of patients expect it)",
            "Value-based pricing - emphasize outcomes and quality",
            "Bundle services into packages for perceived savings",
            "Show price comparisons with competitors (if favorable)",
            "Add 'Most Popular' badges on mid-tier options"
        ]
    },
    
    "design_improvements": {
        "hero_section": [
            "Clear H1 headline: 'Expert Healthcare at Your Fingertips'",
            "Subheadline emphasizing FREE first consultation",
            "Primary CTA: 'Book Free Consultation' (above the fold)",
            "Secondary CTA: 'Call Now' with click-to-dial number",
            "Trust indicators: Doctor photos, credentials, patient count",
            "Hero image/video: Real doctors, happy patients, clean facility"
        ],
        "navigation": [
            "Sticky header with phone number in top-right (click-to-dial on mobile)",
            "Simplified menu: Services | Doctors | Pricing | About | Contact",
            "Prominent 'Book Appointment' button in header",
            "Search functionality for finding doctors/services",
            "Breadcrumb navigation on inner pages"
        ],
        "cta_buttons": {
            "design_specs": [
                "Minimum size: 48x48px (7mm) for mobile touch",
                "High contrast: Use orange/blue on white background",
                "Rounded corners: 4-8px border radius",
                "Hover effects: Color change + subtle shadow",
                "Loading states: Disable on click with spinner"
            ],
            "placement_strategy": [
                "Above the fold (within first 600px)",
                "After every major section",
                "Sticky footer CTA on mobile",
                "Multiple CTAs per page with primary/secondary hierarchy",
                "F-pattern placement (top-left performs 22% better)"
            ],
            "button_copy": [
                "Primary: 'Book Free Consultation Now'",
                "Secondary: 'Talk to a Doctor Today'",
                "Avoid: 'Click Here', 'Submit', 'Learn More'",
                "Use action verbs: Book, Schedule, Call, Get, Start"
            ]
        },
        "forms": [
            "Keep to 3-5 fields maximum",
            "Single column layout",
            "Clear labels + placeholders",
            "Real-time validation",
            "Radio buttons instead of dropdowns",
            "Progress indicator for multi-step",
            "SSL badge near submit button",
            "Mobile-optimized input fields"
        ]
    },
    
    "conversion_rate_optimization": {
        "trust_signals": [
            "SSL certificate badge (HTTPS padlock)",
            "Doctor credentials + certifications",
            "Hospital affiliations/partnerships",
            "Patient reviews + ratings (display 4.5+ stars)",
            "Video testimonials (95% retention vs 12% text)",
            "Number of patients served",
            "Awards/accreditations",
            "Media mentions/press coverage",
            "Professional membership badges (IMA, etc.)"
        ],
        "social_proof": [
            "Display review count: '500+ Happy Patients'",
            "Star ratings prominently on homepage",
            "Patient testimonials with photos + names",
            "Before/after cases (where applicable)",
            "Doctor profiles with qualifications",
            "Real-time notifications: 'Raj just booked in Mumbai'"
        ],
        "urgency_tactics": [
            "Limited appointment slots: 'Only 3 slots left today'",
            "Time-based offers: 'Free consultation ends in 2 days'",
            "Seasonal promotions: 'Winter health checkup - 30% off'",
            "First-time patient discounts",
            "Waitlist for popular doctors"
        ],
        "conversion_benchmarks": {
            "healthcare_average": "3.2% conversion rate",
            "good_performance": "5-10% conversion rate",
            "excellent": "10%+ conversion rate",
            "medical_landing_pages": "7.4% average (median 3.8%)"
        }
    },
    
    "technical_optimization": {
        "page_speed": {
            "target_metrics": [
                "Largest Contentful Paint (LCP): < 2.5 seconds",
                "First Input Delay (FID): < 100ms",
                "Cumulative Layout Shift (CLS): < 0.1",
                "Time to Interactive (TTI): < 3.8 seconds",
                "First Contentful Paint: < 1.8 seconds"
            ],
            "optimization_techniques": [
                "Compress images (WebP format, lazy loading)",
                "Minimize HTTP requests",
                "Enable browser caching",
                "Use CDN for static assets",
                "Minify CSS, JavaScript, HTML",
                "Defer non-critical JavaScript",
                "Optimize server response time",
                "Implement code splitting"
            ]
        },
        "mobile_optimization": [
            "60%+ traffic from mobile - CRITICAL",
            "Responsive design across all breakpoints",
            "Touch-friendly buttons (minimum 48x48px)",
            "Simplified mobile navigation (hamburger menu)",
            "Click-to-call phone numbers",
            "Mobile-optimized forms (larger input fields)",
            "Fast mobile page load (< 2 seconds)",
            "Avoid mobile pop-ups (Google penalty)"
        ],
        "accessibility_wcag": [
            "WCAG 2.1 AA compliance MANDATORY (HHS requirement May 2026)",
            "Alt text for all images",
            "Keyboard navigation support",
            "Screen reader compatibility",
            "Color contrast ratio 4.5:1 minimum",
            "Proper heading hierarchy (H1, H2, H3)",
            "Form labels clearly associated",
            "Focus indicators visible",
            "No flashing content",
            "Captions for videos"
        ],
        "security": [
            "SSL certificate (HTTPS)",
            "HIPAA compliance for patient data",
            "Secure payment gateway (Razorpay with PCI DSS)",
            "Privacy policy clearly displayed",
            "Cookie consent banner (GDPR/India compliance)",
            "Regular security audits",
            "Data encryption at rest and in transit",
            "Secure login/patient portal"
        ]
    },
    
    "content_optimization": {
        "homepage": [
            "Clear value proposition in headline",
            "FREE first consultation prominently displayed",
            "Services overview with icons",
            "Featured doctors section",
            "Patient testimonials (3-5 visible)",
            "Why choose us section (3-4 key benefits)",
            "Process explanation (How it works in 3 steps)",
            "FAQ section (address common objections)",
            "Footer with contact info, social media, important links"
        ],
        "service_pages": [
            "Service-specific landing pages for each specialty",
            "Clear pricing (or 'Starting from' price)",
            "Doctor profiles for that service",
            "Treatment process timeline",
            "FAQs specific to service",
            "Related services links",
            "Book appointment CTA on every page"
        ],
        "doctor_pages": [
            "Professional headshots",
            "Qualifications + certifications",
            "Years of experience",
            "Specializations",
            "Patient reviews for specific doctor",
            "Available time slots/book button",
            "Personal statement/bio"
        ],
        "copy_guidelines": [
            "Patient-centric language (avoid jargon)",
            "Benefit-focused (not feature-focused)",
            "Short paragraphs (2-3 sentences)",
            "Scannable with subheadings",
            "Active voice",
            "Clear, concise, conversational tone",
            "Address patient pain points",
            "Build trust through transparency"
        ]
    },
    
    "booking_flow_optimization": {
        "appointment_form_best_practices": [
            "Progressive disclosure (show fields as needed)",
            "Auto-fill for returning patients",
            "Calendar widget for date selection",
            "Time slot availability shown in real-time",
            "Doctor selection with photos",
            "Reason for visit dropdown",
            "Insurance details optional",
            "Confirmation page with details",
            "Email + SMS confirmation",
            "Add to calendar option"
        ],
        "reduce_friction": [
            "Guest booking option (no registration required)",
            "Social login (Google, Facebook)",
            "Save progress (for multi-step forms)",
            "Clear error messages",
            "Inline validation",
            "Mobile-optimized date/time pickers",
            "WhatsApp booking option",
            "Phone booking prominent"
        ],
        "post_booking": [
            "Confirmation email with details",
            "SMS reminder 24 hours before",
            "Easy reschedule/cancel option",
            "Pre-appointment instructions",
            "Patient portal access",
            "Review request after visit"
        ]
    }
}

# Calculate comprehensive recommendations count
total_recommendations = sum([
    len(analysis_data["color_scheme_recommendations"]["recommendations"]),
    len(analysis_data["pricing_strategy"]["conversion_optimization"]),
    len(analysis_data["design_improvements"]["hero_section"]),
    len(analysis_data["conversion_rate_optimization"]["trust_signals"]),
    len(analysis_data["technical_optimization"]["page_speed"]["target_metrics"]),
    len(analysis_data["content_optimization"]["homepage"])
])

print(f"Comprehensive Website Analysis Generated")
print(f"Total Actionable Recommendations: {total_recommendations}+")
print(f"\nKey Focus Areas:")
print(f"1. Color Scheme: Blue-based palette recommended")
print(f"2. Pricing: FREE first consultation + competitive pricing")
print(f"3. Conversion: Trust signals + optimized CTAs")
print(f"4. Technical: Page speed < 2.5s + WCAG compliance")
print(f"5. Mobile: 60%+ traffic - critical optimization")
