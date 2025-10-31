# Glowheal Architecture Documentation

**Version:** 1.0.0  
**Last Updated:** October 30, 2025

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Routing & Navigation](#routing--navigation)
5. [Data Flow](#data-flow)
6. [Performance Strategy](#performance-strategy)
7. [Core Web Vitals Targets](#core-web-vitals-targets)
8. [Monitoring & Analytics](#monitoring--analytics)
9. [Security Considerations](#security-considerations)

---

## Overview

Glowheal is a Next.js 14-based healthcare aggregator platform connecting patients with 500+ verified doctors across 12+ medical specialties. The architecture prioritizes:

- **Performance**: Core Web Vitals compliance for all pages
- **SEO**: Healthcare-specific schema markup and rich results
- **Conversion**: Multiple lead capture mechanisms including WhatsApp
- **Accessibility**: WCAG 2.1 AA compliance
- **Scalability**: Modular component architecture

---

## Technology Stack

### Core Framework
- **Next.js 14.2+** (App Router)
- **React 18.3**
- **TypeScript 5.3**

### Styling
- **Tailwind CSS 3.4** with custom healthcare theme
- **Framer Motion** for animations (respecting `prefers-reduced-motion`)

### Forms & Validation
- **Zod** for schema validation
- **Server Actions** for form handling

### SEO & Analytics
- **next-seo** for metadata management
- **JSON-LD** structured data
- **Google Analytics 4** with CWV tracking

### Development Tools
- **ESLint** + **Prettier** for code quality
- **Husky** for pre-commit hooks
- **TypeScript** strict mode

---

## Project Structure

```
glowheal/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   │   ├── (routes)/
│       │   │   │   ├── page.tsx              # Homepage
│       │   │   │   ├── services/
│       │   │   │   ├── doctors/
│       │   │   │   ├── cities/
│       │   │   │   ├── packages/
│       │   │   │   ├── blog/
│       │   │   │   ├── testimonials/
│       │   │   │   ├── about/
│       │   │   │   ├── contact/
│       │   │   │   ├── join-as-doctor/
│       │   │   │   ├── landing/
│       │   │   │   └── legal/
│       │   │   ├── layout.tsx             # Root layout
│       │   │   ├── globals.css
│       │   │   └── api/                   # API routes
│       │   ├── components/
│       │   │   ├── layout/               # Header, Footer, Navigation
│       │   │   ├── ui/                   # Reusable UI components
│       │   │   ├── forms/                # Form components
│       │   │   ├── sections/             # Page sections
│       │   │   └── schema/               # JSON-LD schema components
│       │   ├── lib/
│       │   │   ├── utils.ts
│       │   │   ├── schema-builders.ts
│       │   │   ├── lead-handler.ts
│       │   │   └── seo-config.ts
│       │   └── styles/
│       │       └── globals.css
│       ├── public/
│       │   ├── images/
│       │   ├── videos/
│       │   └── fonts/
│       ├── next.config.js
│       ├── tailwind.config.ts
│       └── package.json
├── packages/
│   ├── ui/                     # Shared UI components
│   └── config/                 # Shared configuration
│       ├── design-tokens.ts
│       ├── seo-defaults.ts
│       └── schema-templates.ts
├── data/
│   ├── services.json           # 12 service definitions
│   ├── cities.json             # City data
│   ├── doctors.sample.json     # Sample doctor profiles
│   └── leads/                  # Lead submissions (gitignored)
├── docs/                       # Documentation (NOT deployed)
│   ├── ARCHITECTURE.md
│   ├── DESIGN_TOKENS.md
│   ├── SEO_CHECKLIST.md
│   ├── CONTENT_TODO.md
│   ├── ONBOARDING.md
│   └── CONTRIBUTING.md
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline (no deploy)
└── package.json                # Root workspace config
```

---

## Routing & Navigation

### App Router Structure

All routes use Next.js 14 App Router with server components by default.

#### Public Routes

| Route | Purpose | Schema Types | Performance Priority |
|-------|---------|--------------|---------------------|
| `/` | Homepage | Organization, MedicalOrganization | Critical - LCP target |
| `/services` | Services hub | BreadcrumbList | High |
| `/services/[slug]` | Individual service pages | MedicalOrganization, FAQPage, AggregateRating | High |
| `/doctors` | Doctor directory | MedicalOrganization, BreadcrumbList | Medium |
| `/doctors/[slug]` | Doctor profiles | Physician, AggregateRating | High |
| `/cities` | City hub | BreadcrumbList | Medium |
| `/cities/[city]/[service]` | Localized landing pages | LocalBusiness, MedicalOrganization | Critical - SEO |
| `/packages` | Pricing & packages | Product, Offer | Medium |
| `/blog` | Blog listing | BreadcrumbList | Low |
| `/blog/[slug]` | Blog posts | Article, FAQPage | Medium |
| `/testimonials` | Success stories | Review, AggregateRating | Medium |
| `/landing/glowheal-offer` | High-conversion landing | Organization, Offer | Critical - CRO |
| `/about` | About us | Organization | Low |
| `/join-as-doctor` | Doctor recruitment | JobPosting | Low |
| `/contact` | Contact page | Organization, LocalBusiness | Low |
| `/legal/*` | Legal pages | WebPage | Low |

#### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/leads` | POST | Lead form submission (server action) |
| `/api/sitemap.xml` | GET | Dynamic sitemap generation |
| `/api/robots.txt` | GET | Robots.txt with /docs exclusion |

---

## Data Flow

### 1. Static Data
- Services, cities, and sample doctors loaded from JSON files in `/data`
- Validated at build time
- Types generated for TypeScript safety

### 2. Lead Capture Flow

```
User fills form → Client validation (Zod) → Server Action → Validation → 
JSON write to /data/leads/lead-{timestamp}.json → Success response → 
Optional WhatsApp redirect
```

**Lead Data Structure:**
```typescript
{
  id: string;
  timestamp: ISO 8601 date;
  source: string; // page path
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
  privacyConsent: boolean;
}
```

### 3. WhatsApp Integration

**Click-to-Chat URL Format:**
```
https://api.whatsapp.com/send?phone=91XXXXXXXXXX&text=Hello%20Glowheal%2C%20I%20would%20like%20to%20book%20a%20consultation%20for%20{service}
```

- Pre-filled text customized per page context
- Opens native WhatsApp on mobile, web.whatsapp.com on desktop
- Deferred load to avoid blocking

---

## Performance Strategy

### Code Splitting
- Route-level automatic splitting by Next.js
- Dynamic imports for heavy components (carousels, modals)
- Lazy loading for below-fold content

### Image Optimization
- Next.js `<Image>` component with `priority` for above-fold images
- Responsive sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- AVIF > WebP > JPEG fallback chain
- Placeholder: `blur` with base64 data URIs

### Font Strategy
- **Inter** and **Poppins** self-hosted in `/public/fonts`
- Preload hero font: `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- `font-display: swap` to prevent FOIT

### JavaScript Budget
- **Target:** ≤160KB gzipped per route
- Server components for static content
- Client components only for interactivity
- Tree-shaking with ES modules

### CSS Strategy
- Critical CSS inlined in `<head>` for above-fold
- Tailwind JIT compilation
- PurgeCSS in production

---

## Core Web Vitals Targets

### Metrics & Thresholds

| Metric | Target | Measurement Point | Strategy |
|--------|--------|-------------------|----------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Hero image/video | Preload, optimize images, server components |
| **INP** (Interaction to Next Paint) | ≤ 200ms | Form interactions, clicks | Debounce, optimize JS, code splitting |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | All page elements | Reserved space, aspect ratios, skeleton loaders |

### Per-Page Targets

#### Critical Pages (Must Pass)
- `/` (Homepage): LCP ≤ 2.0s, INP ≤ 150ms, CLS ≤ 0.05
- `/services/[slug]`: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- `/landing/glowheal-offer`: LCP ≤ 2.0s, INP ≤ 150ms, CLS ≤ 0.05

#### High-Priority Pages
- `/doctors/[slug]`: LCP ≤ 2.5s
- `/cities/[city]/[service]`: LCP ≤ 2.5s

### CLS Prevention Strategies

1. **Images**: Always specify `width` and `height` attributes
2. **Fonts**: Use `font-display: swap` and preload critical fonts
3. **Ads/Banners**: Reserve fixed space with min-height
4. **Dynamic Content**: Skeleton loaders with exact dimensions
5. **Carousels**: Fixed height containers

---

## Monitoring & Analytics

### Google Analytics 4 Setup

**Tracking Events:**
```typescript
// Page views (automatic)
gtag('config', 'G-XXXXXXXXXX');

// Custom events
gtag('event', 'lead_form_submit', {
  service: 'dermatology',
  source: '/services/dermatology'
});

gtag('event', 'whatsapp_click', {
  location: 'sticky_button'
});

// Core Web Vitals
gtag('event', 'CWV', {
  metric_name: 'LCP',
  metric_value: 2150,
  page_path: '/'
});
```

### Performance Dashboard

**Monitor Weekly:**
- Field data from Chrome User Experience Report (CrUX)
- Lab data from Lighthouse CI
- Real User Monitoring (RUM) via GA4

**Alert Thresholds:**
- LCP > 3.0s: Critical
- INP > 300ms: Warning
- CLS > 0.15: Critical

### Error Tracking
- Console errors suppressed in production
- Critical errors logged to monitoring service (e.g., Sentry)
- Form validation errors tracked in GA4

---

## Security Considerations

### Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- CSP configured for inline styles (Tailwind)

### Forms
- Server-side validation with Zod
- Rate limiting on submission endpoint
- No PII in client-side logs
- HTTPS-only in production

### Data Privacy
- Privacy policy linked on all forms
- Consent checkbox required
- Email obfuscation in markup
- No third-party tracking without consent

---

## Deployment Exclusions

**CRITICAL:** The following must NEVER be deployed to production:

- `/docs/**` - Documentation stays in GitHub only
- `/data/leads/*.json` - Sensitive lead data (except .gitkeep)
- `.env.local` - Environment variables
- `node_modules/` - Dependencies

**Vercel Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "ignoreCommand": "echo 'No deploy for docs'",
  "headers": [
    {
      "source": "/docs/(.*)",
      "headers": [
        { "key": "X-Robots-Tag", "value": "noindex" }
      ]
    }
  ]
}
```

---

## Future Enhancements

### Planned Features
1. Server-side rendering for doctor availability
2. Real-time booking system integration
3. Multi-language support (Hindi, Marathi, Telugu)
4. Progressive Web App (PWA) capabilities
5. WhatsApp Business API integration

### Performance Optimization Roadmap
- [ ] Implement Speculation Rules API for instant navigation
- [ ] Add service worker for offline support
- [ ] Optimize third-party scripts with Partytown
- [ ] Implement partial hydration for interactive islands

---

## Maintenance

### Regular Tasks
- **Weekly**: Review GA4 dashboard, check CWV metrics
- **Monthly**: Update dependencies, run Lighthouse audits
- **Quarterly**: Content audit, schema validation, accessibility audit

### Version Control
- Main branch: production-ready code
- Develop branch: integration testing
- Feature branches: `feature/[name]`
- Hotfix branches: `hotfix/[issue]`

---

**Document Owner:** Development Team  
**Review Cycle:** Monthly  
**Next Review:** November 30, 2025
