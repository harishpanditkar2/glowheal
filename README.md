# Glowheal - Digital Wellness Platform

> **Professional healthcare aggregator connecting 500+ verified doctors with patients across India**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 🚀 Project Overview

Glowheal is a modern, high-performance healthcare platform built with Next.js 14 App Router, focusing on:

- ✅ **Performance**: Core Web Vitals compliance (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
- ✅ **SEO**: Healthcare-specific JSON-LD schema markup for rich results
- ✅ **Conversion**: Multiple lead capture mechanisms including WhatsApp integration
- ✅ **Accessibility**: WCAG 2.1 AA compliance
- ✅ **User Experience**: Bold gradient design system with premium feel

## 📋 Current Status

**Project Phase**: Foundation & Documentation Complete ✅  
**Overall Progress**: ~25% Complete  
**Next Phase**: Component Development & Page Implementation

### ✅ Completed

1. **Project Structure & Configuration**
   - ✅ Monorepo setup with workspace structure
   - ✅ Next.js 14 with App Router configured
   - ✅ TypeScript with strict mode
   - ✅ Tailwind CSS with custom theme (healthcare brand colors)
   - ✅ ESLint, Prettier, Husky pre-commit hooks
   - ✅ PostCSS configuration

2. **Documentation (GitHub Only - Never Deployed)**
   - ✅ `ARCHITECTURE.md` - System design, routing, Core Web Vitals strategy
   - ✅ `DESIGN_TOKENS.md` - Complete design system with colors, typography, components
   - ✅ `SEO_CHECKLIST.md` - Per-page SEO requirements, schema templates
   - ✅ `CONTENT_TODO.md` - Comprehensive asset and content tracking
   - ✅ `ONBOARDING.md` - Developer and AI agent onboarding guide
   - ✅ `CONTRIBUTING.md` - Code standards, commit conventions, accessibility

3. **Data Seeds**
   - ✅ `data/services.json` - 12 healthcare services with full metadata
   - ✅ `data/cities.json` - 3 initial cities (Mumbai, Pune, Hyderabad)
   - ✅ `data/doctors.sample.json` - 4 sample doctor profiles
   - ✅ `data/leads/` directory structure with gitignore

4. **Core Files**
   - ✅ Root layout with font loading and metadata
   - ✅ Utility functions (utils.ts)
   - ✅ Tailwind custom theme configuration
   - ✅ Global CSS with design system classes

### 🔨 In Progress

- 🟡 Core layout components (Header, Footer, Navigation)
- 🟡 WhatsApp sticky button component
- 🟡 Basic utility components

### 📝 TODO (Priority Order)

#### High Priority (Launch Blockers)

1. **Core Components** 🔴
   - [ ] Header with sticky navigation and mega menu
   - [ ] Footer with sitemap links and "Special Offer Landing" link
   - [ ] WhatsAppButton (sticky, bottom-right, click-to-chat)
   - [ ] Breadcrumbs with BreadcrumbList schema

2. **JSON-LD Schema Builders** 🔴
   - [ ] Organization & MedicalOrganization
   - [ ] Physician with AggregateRating
   - [ ] LocalBusiness for city pages
   - [ ] FAQPage for service pages
   - [ ] Review/AggregateRating
   - [ ] BreadcrumbList
   - [ ] Article for blog posts

3. **UI Component Library** 🔴
   - [ ] Button (primary, secondary variants)
   - [ ] Card (service, doctor, testimonial)
   - [ ] Input field with validation styles
   - [ ] FAQAccordion with aria-expanded
   - [ ] StatsCounter with animation
   - [ ] PricingTable (3-tier comparison)
   - [ ] TrustBadge
   - [ ] VideoHero with poster fallback

4. **Homepage** 🔴
   - [ ] Hero section with video support
   - [ ] Sticky stats bar (doctors, patients, specialties, satisfaction)
   - [ ] 12 services grid
   - [ ] 4-step "How It Works" timeline
   - [ ] 6 benefits section
   - [ ] Success stories carousel
   - [ ] Featured doctors slider
   - [ ] Pricing teaser
   - [ ] FAQ accordion (15 items)
   - [ ] Final CTA section

5. **Service Pages** 🔴
   - [ ] `/services` hub with filters
   - [ ] `/services/[slug]` dynamic template:
     - Hero with service-specific gradient
     - Problems/solutions section
     - 6-step consultation process
     - Before/after gallery (with disclaimers)
     - Featured doctors (links to profiles)
     - 3-tier pricing
     - 15-item FAQ
     - Final CTA

6. **Lead Form with Server Actions** 🔴
   - [ ] Zod validation schema
   - [ ] Server action to write JSON to `/data/leads`
   - [ ] Thank you state
   - [ ] WhatsApp integration option
   - [ ] Privacy policy checkbox

#### Medium Priority (Week 1-2)

7. **Doctor Pages** 🟡
   - [ ] `/doctors` directory with filters (specialty, city, language, gender, price, rating)
   - [ ] Sorting and pagination
   - [ ] `/doctors/[slug]` profile with Physician schema
   - [ ] Availability display
   - [ ] "Book Consultation" CTA

8. **City Pages** 🟡
   - [ ] `/cities` hub with interactive SVG map
   - [ ] `/cities/[city]/[service]` localized landing pages
   - [ ] LocalBusiness + MedicalOrganization schemas
   - [ ] NAP consistency

9. **Landing Page** 🟡
   - [ ] `/landing/glowheal-offer` high-conversion variant
   - [ ] Countdown timer component
   - [ ] Simplified pricing display
   - [ ] Exit-intent modal
   - [ ] Sticky bottom CTA bar

10. **Packages Page** 🟡
    - [ ] `/packages` with comparison table
    - [ ] ROI calculator (client-side interactive)
    - [ ] Payment options (UPI, cards, EMI)
    - [ ] Pricing FAQ

#### Lower Priority (Month 1-2)

11. **Blog** ⚪
    - [ ] `/blog` hub with category filters
    - [ ] `/blog/[slug]` with MDX support
    - [ ] Table of contents generation
    - [ ] Related articles component
    - [ ] Article schema

12. **Testimonials** ⚪
    - [ ] `/testimonials` with filters
    - [ ] Video testimonial modals
    - [ ] Before/after gallery
    - [ ] Review schema

13. **Supporting Pages** ⚪
    - [ ] `/about` - Mission, team, awards
    - [ ] `/join-as-doctor` - Earnings calculator, benefits
    - [ ] `/contact` - Map, WhatsApp CTA
    - [ ] `/legal/privacy` - Privacy policy
    - [ ] `/legal/terms` - Terms of service
    - [ ] `/legal/telemedicine-policy`

14. **SEO Infrastructure** ⚪
    - [ ] Dynamic sitemap generation (segmented)
    - [ ] Robots.txt (block /docs)
    - [ ] Canonical URL handling
    - [ ] OpenGraph image generation

15. **Performance Optimization** ⚪
    - [ ] Image optimization setup
    - [ ] Font preloading
    - [ ] Code splitting verification
    - [ ] Lazy loading implementation
    - [ ] CLS prevention (reserved spaces)

16. **CI/CD** ⚪
    - [ ] `.github/workflows/ci.yml` (lint, typecheck, build)
    - [ ] Husky pre-commit hooks activation
    - [ ] Lighthouse CI integration

17. **Analytics** ⚪
    - [ ] Google Analytics 4 setup
    - [ ] Core Web Vitals tracking
    - [ ] Custom events (lead submit, WhatsApp click)

---

## 🏗️ Tech Stack

### Core Framework
- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5.3** - Type safety

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Theme** - Healthcare-focused design tokens
- **Framer Motion** - Animations (respecting reduced motion)

### Forms & Validation
- **Zod** - Schema validation
- **Server Actions** - Form handling without API routes

### SEO & Analytics
- **JSON-LD** - Structured data for rich results
- **Google Analytics 4** - Analytics and CWV tracking

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static typing

---

## 🎨 Design System

### Brand Colors

- **Navy** `#1e3a8a` - Trust & professionalism
- **Purple** `#7c3aed` - Innovation & wellness
- **Hot Pink** `#ec4899` - Energy & action
- **Coral** `#fb923c` - Warmth & approachability
- **Yellow** `#fbbf24` - Optimism

### Gradients

- **Navy → Purple** - Hero sections
- **Pink → Coral** - CTA buttons
- **Purple → Pink** - Alternative sections

### Typography

- **Display** - Poppins (600, 700, 800) for headlines
- **Body** - Inter (400, 500, 600, 700) for text

See `docs/DESIGN_TOKENS.md` for complete design system documentation.

---

## 📂 Project Structure

```
glowheal/
├── apps/
│   └── web/                         # Next.js application
│       ├── src/
│       │   ├── app/                # App Router pages
│       │   │   ├── layout.tsx      # Root layout
│       │   │   ├── page.tsx        # Homepage
│       │   │   └── (routes)/       # Route groups
│       │   ├── components/
│       │   │   ├── layout/         # Header, Footer
│       │   │   ├── ui/             # Reusable UI components
│       │   │   ├── forms/          # Form components
│       │   │   ├── sections/       # Page sections
│       │   │   └── schema/         # JSON-LD schema components
│       │   ├── lib/
│       │   │   ├── utils.ts        # ✅ Utility functions
│       │   │   ├── schema-builders.ts
│       │   │   ├── lead-handler.ts
│       │   │   └── validators.ts
│       │   └── styles/
│       │       └── globals.css     # ✅ Global styles
│       ├── public/
│       │   ├── images/             # TODO: Add images
│       │   ├── videos/             # TODO: Add videos
│       │   └── fonts/              # TODO: Self-host fonts
│       ├── tailwind.config.ts      # ✅ Custom theme
│       ├── next.config.js          # ✅ Next.js config
│       └── package.json            # ✅ Dependencies
├── packages/                        # Shared packages (future)
│   ├── ui/
│   └── config/
├── data/                            # ✅ JSON seed data
│   ├── services.json               # ✅ 12 services
│   ├── cities.json                 # ✅ 3 cities
│   ├── doctors.sample.json         # ✅ 4 sample profiles
│   └── leads/                      # Lead submissions
├── docs/                            # ✅ Documentation (NOT deployed)
│   ├── ARCHITECTURE.md             # ✅ System design
│   ├── DESIGN_TOKENS.md            # ✅ Design system
│   ├── SEO_CHECKLIST.md            # ✅ SEO strategy
│   ├── CONTENT_TODO.md             # ✅ Asset tracking
│   ├── ONBOARDING.md               # ✅ Developer guide
│   └── CONTRIBUTING.md             # ✅ Code standards
├── .github/
│   └── workflows/
│       └── ci.yml                  # TODO: CI pipeline
├── .gitignore                      # ✅ Configured
├── package.json                    # ✅ Root workspace
└── README.md                       # ✅ This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x (LTS)
- npm 9.x or later
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd glowheal
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Navigate to web app**:
   ```bash
   cd apps/web
   ```

4. **Install app dependencies**:
   ```bash
   npm install
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

6. **Open browser**:
   ```
   http://localhost:3000
   ```

### Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run typecheck    # TypeScript type checking
npm run format       # Format with Prettier
```

---

## 📖 Documentation

All comprehensive documentation is located in the `/docs` folder:

1. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technical architecture, routing, Core Web Vitals strategy
2. **[DESIGN_TOKENS.md](./docs/DESIGN_TOKENS.md)** - Complete design system with colors, typography, components
3. **[SEO_CHECKLIST.md](./docs/SEO_CHECKLIST.md)** - Per-page SEO requirements, schema templates, validation
4. **[CONTENT_TODO.md](./docs/CONTENT_TODO.md)** - Comprehensive content and asset tracking
5. **[ONBOARDING.md](./docs/ONBOARDING.md)** - Developer and AI agent onboarding guide
6. **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Code standards, commit conventions, accessibility checklist

**⚠️ IMPORTANT**: The `/docs` folder is for GitHub only and must **NEVER** be deployed to production.

---

## 🎯 Core Web Vitals Targets

| Metric | Target | Priority |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Critical |
| **INP** (Interaction to Next Paint) | ≤ 200ms | Critical |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Critical |

**Performance Budget**: ≤160KB gzipped JavaScript per route

---

## 🔍 SEO Strategy

### Schema Markup Coverage

- ✅ Organization & MedicalOrganization (planned)
- ✅ Physician with AggregateRating (planned)
- ✅ LocalBusiness for city-service pages (planned)
- ✅ FAQPage with 15 items per service (planned)
- ✅ Review/AggregateRating (planned)
- ✅ BreadcrumbList (planned)
- ✅ Article for blog posts (planned)

### Validation Tools

- Google Rich Results Test
- Schema.org Validator
- Google Search Console

See `docs/SEO_CHECKLIST.md` for complete SEO strategy.

---

## ♿ Accessibility

**Target**: WCAG 2.1 AA Compliance

- Semantic HTML throughout
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ≥4.5:1 for text
- Focus indicators on all interactive elements
- Skip-to-content link
- Reduced motion support

See `docs/CONTRIBUTING.md` for accessibility checklist.

---

## 🤝 Contributing

We welcome contributions! Please read:

1. **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Code standards and conventions
2. **[ONBOARDING.md](./docs/ONBOARDING.md)** - Setup and development guide

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(services): add dermatology service page
fix(forms): resolve validation error
docs(seo): update schema examples
```

---

## 📊 Progress Tracking

**Last Updated**: October 30, 2025

| Category | Progress |
|----------|----------|
| **Documentation** | ✅ 100% Complete |
| **Configuration** | ✅ 100% Complete |
| **Data Seeds** | ✅ 80% Complete |
| **Core Components** | 🟡 10% Complete |
| **Pages** | 🔴 5% Complete |
| **SEO Infrastructure** | 🔴 0% Complete |
| **Testing** | 🔴 0% Complete |

**Overall Project Completion**: ~25%

---

## 📄 License

[TODO: Add license information]

---

## 👥 Team

**Project Type**: Professional Healthcare Platform  
**Target Market**: India  
**Services**: 12+ healthcare specialties  
**Doctors**: 500+ verified specialists

---

## 🔗 Important Links

- **Production URL**: https://glowheal.in (TODO: Set up)
- **Staging URL**: [TODO: Set up]
- **Documentation**: `/docs` folder (this repo)
- **Design System**: See `DESIGN_TOKENS.md`

---

## 📝 Notes for Future Contributors

### For AI Agents Continuing This Work

1. **Read ALL documentation files** in `/docs` before making changes
2. **Refer to `CONTENT_TODO.md`** for asset and content requirements
3. **Follow patterns** established in seed data files
4. **Add `[TODO: medical review]`** marker for all health-related content
5. **Validate schema markup** with Google's Rich Results Test
6. **Test Core Web Vitals** for every page you create
7. **Never deploy `/docs`** folder to production

### Critical Reminders

- ⚠️ All health claims require medical professional review
- ⚠️ Performance budget: ≤160KB JS per route
- ⚠️ Every page needs JSON-LD schema markup
- ⚠️ Maintain WCAG 2.1 AA accessibility
- ⚠️ Use design tokens from Tailwind config consistently

---

**Built with ❤️ for better healthcare access in India**
