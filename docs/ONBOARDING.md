# Onboarding Guide for New Contributors

**Version:** 1.0.0  
**Last Updated:** October 30, 2025

Welcome to the Glowheal project! This guide will help you get up and running quickly, whether you're a developer, designer, content creator, or an AI agent continuing this work.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Development Setup](#development-setup)
4. [Code Structure](#code-structure)
5. [Development Workflow](#development-workflow)
6. [Key Technologies](#key-technologies)
7. [Testing & Quality](#testing--quality)
8. [Deployment](#deployment)
9. [Getting Help](#getting-help)

---

## Quick Start

### For AI Agents

If you're an AI agent continuing this project:

1. **Read these docs first** (in order):
   - `ARCHITECTURE.md` - System design and technical decisions
   - `DESIGN_TOKENS.md` - Brand guidelines and UI patterns
   - `SEO_CHECKLIST.md` - SEO requirements and schema templates
   - `CONTENT_TODO.md` - Outstanding content and asset needs

2. **Key context files**:
   - `data/services.json` - All 12 service definitions
   - `data/cities.json` - City data and local SEO info
   - `data/doctors.sample.json` - Doctor profile schema

3. **Development priorities**:
   - Refer to TODO list in project root (if present)
   - Check `CONTENT_TODO.md` for content gaps
   - Review open issues in GitHub (if repository is initialized)

4. **Critical constraints**:
   - Never deploy `/docs` folder to production
   - All health claims require `[TODO: medical review]` marker
   - Maintain Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
   - Every page needs JSON-LD schema markup

---

## Project Overview

### What is Glowheal?

Glowheal is a healthcare aggregator platform that connects patients with 500+ verified doctors across 12 specialties through video consultations. The project prioritizes:

- **Performance**: Meet Core Web Vitals for all pages
- **SEO**: Healthcare-specific schema markup for rich results
- **Conversion**: Multiple lead capture touchpoints including WhatsApp
- **Accessibility**: WCAG 2.1 AA compliance

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: Zod validation + Server Actions
- **Analytics**: Google Analytics 4

### Repository Structure

```
glowheal/
├── apps/web/              # Main Next.js app
├── packages/              # Shared packages (ui, config)
├── data/                  # JSON seed data
├── docs/                  # Documentation (this folder)
├── .github/workflows/     # CI/CD pipelines
└── package.json           # Root workspace config
```

---

## Development Setup

### Prerequisites

- **Node.js**: 18.x or 20.x (LTS versions)
- **npm**: 9.x or later (comes with Node.js)
- **Git**: For version control
- **VS Code** (recommended): With extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Installation Steps

1. **Clone the repository** (if not already done):
   ```powershell
   git clone <repository-url>
   cd glowheal
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Navigate to the web app**:
   ```powershell
   cd apps/web
   ```

4. **Install app dependencies**:
   ```powershell
   npm install
   ```

5. **Create environment file** (if needed):
   ```powershell
   cp .env.example .env.local
   ```
   Add any necessary environment variables (API keys, etc.)

6. **Run development server**:
   ```powershell
   npm run dev
   ```

7. **Open browser**:
   Navigate to `http://localhost:3000`

### Verify Installation

- Homepage loads without errors
- Tailwind styles are applied
- Hot reload works when you edit files
- TypeScript compilation has no errors

---

## Code Structure

### App Router Structure

```
apps/web/src/app/
├── layout.tsx                 # Root layout (header, footer)
├── page.tsx                   # Homepage
├── globals.css                # Global styles
├── (routes)/                  # Route groups
│   ├── services/
│   │   ├── page.tsx          # Services hub
│   │   └── [slug]/
│   │       └── page.tsx      # Individual service pages
│   ├── doctors/
│   │   ├── page.tsx          # Doctor directory
│   │   └── [slug]/page.tsx   # Doctor profiles
│   ├── cities/
│   ├── packages/
│   ├── blog/
│   ├── testimonials/
│   ├── about/
│   ├── contact/
│   ├── join-as-doctor/
│   ├── landing/
│   │   └── glowheal-offer/   # High-conversion landing page
│   └── legal/
└── api/                       # API routes (if needed)
```

### Component Structure

```
apps/web/src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── Breadcrumbs.tsx
├── ui/                        # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ...
├── forms/
│   ├── LeadForm.tsx
│   └── ContactForm.tsx
├── sections/                  # Page sections
│   ├── Hero.tsx
│   ├── VideoHero.tsx
│   ├── ServicesGrid.tsx
│   ├── StatsBar.tsx
│   └── ...
└── schema/                    # JSON-LD schema components
    ├── OrganizationSchema.tsx
    ├── PhysicianSchema.tsx
    └── FAQSchema.tsx
```

### Lib (Utilities)

```
apps/web/src/lib/
├── utils.ts                   # General utilities (cn, etc.)
├── schema-builders.ts         # JSON-LD schema generators
├── lead-handler.ts            # Lead form server actions
├── seo-config.ts              # SEO metadata helpers
└── validators.ts              # Zod schemas for forms
```

---

## Development Workflow

### Branch Strategy

- **main**: Production-ready code (protected)
- **develop**: Integration branch for features
- **feature/[name]**: New features or components
- **bugfix/[issue]**: Bug fixes
- **hotfix/[issue]**: Urgent production fixes

### Creating a Feature

1. **Create a new branch**:
   ```powershell
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write code following project conventions
   - Add/update tests
   - Update relevant documentation

3. **Test locally**:
   ```powershell
   npm run lint        # Check for lint errors
   npm run typecheck   # TypeScript compilation
   npm run build       # Production build test
   ```

4. **Commit your changes**:
   ```powershell
   git add .
   git commit -m "feat: add service page component"
   ```
   (Use conventional commit format: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`)

5. **Push and create PR**:
   ```powershell
   git push origin feature/your-feature-name
   ```
   Create a Pull Request on GitHub targeting `develop`

### Code Review Process

- **PR Template**: Fill out description, screenshots, testing steps
- **Reviewers**: At least one approval required
- **CI Checks**: Must pass linting, type checking, build
- **Documentation**: Update docs if needed

---

## Key Technologies

### Next.js 14 App Router

**Why App Router?**
- Server Components by default (better performance)
- Nested layouts
- Built-in loading/error states
- Server Actions for forms

**Key Concepts:**
- `page.tsx` = route page
- `layout.tsx` = shared layout
- `loading.tsx` = loading state
- `error.tsx` = error boundary
- Server Components: default, no `'use client'`
- Client Components: add `'use client'` at top

### Tailwind CSS

**Custom Configuration**: `tailwind.config.ts`
- Brand colors (navy, purple, pink, coral, yellow)
- Custom gradients
- Typography scale
- Animation keyframes

**Best Practices:**
- Use design tokens from `DESIGN_TOKENS.md`
- Apply utility classes directly (avoid @apply unless necessary)
- Use responsive prefixes: `md:`, `lg:`, etc.
- Maintain consistency with spacing scale

### TypeScript

**tsconfig.json** enforces:
- Strict mode
- No implicit any
- Path aliases: `@/components`, `@/lib`, etc.

**Type Safety:**
- Define interfaces for all data structures
- Use Zod for runtime validation
- Avoid `any` type (use `unknown` if needed)

### Zod (Form Validation)

Example:
```typescript
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  email: z.string().email('Invalid email address'),
  service: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
});

export type LeadFormData = z.infer<typeof leadSchema>;
```

---

## Testing & Quality

### Linting

```powershell
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix issues
```

### Type Checking

```powershell
npm run typecheck     # Check TypeScript errors
```

### Build Test

```powershell
npm run build         # Production build
```

### Accessibility Testing

- **Automated**: Run axe DevTools on major pages
- **Manual**: Keyboard navigation, screen reader testing
- **Checklist**: See `CONTRIBUTING.md` accessibility section

### Performance Testing

- **Lighthouse**: Target 90+ on Performance, SEO, Accessibility
- **Core Web Vitals**: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
- **Tools**: Google PageSpeed Insights, WebPageTest

### Schema Validation

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- Test every page with JSON-LD schema

---

## Deployment

### Build Process

```powershell
cd apps/web
npm run build
```

**Build Output**: `.next/` directory

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link GitHub repo to Vercel
2. **Configure**:
   - Framework: Next.js
   - Root Directory: `apps/web`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Environment Variables**: Add in Vercel dashboard
4. **Deploy**: Automatic on push to `main`

### Important: Docs Exclusion

**CRITICAL**: The `/docs` folder must NEVER be deployed to production.

**Vercel Configuration** (`vercel.json` in `apps/web/`):
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

**Next.js Config** (already configured in `next.config.js`):
```javascript
experimental: {
  outputFileTracingExcludes: {
    '*': ['./docs/**/*'],
  },
}
```

---

## Getting Help

### Documentation

1. **ARCHITECTURE.md**: Technical design, routing, performance
2. **DESIGN_TOKENS.md**: Branding, colors, typography, components
3. **SEO_CHECKLIST.md**: SEO requirements, schema templates
4. **CONTENT_TODO.md**: Content needs, assets, copy
5. **CONTRIBUTING.md**: Code standards, commit conventions

### External Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Schema.org**: https://schema.org/docs/schemas.html
- **Healthcare Schema**: See `SEO_CHECKLIST.md` references

### Common Issues

#### Build Errors

**Issue**: `Module not found: Can't resolve '@/components/...'`
- **Fix**: Check `tsconfig.json` paths configuration
- Ensure `import` path matches file location

**Issue**: Tailwind classes not working
- **Fix**: 
  - Restart dev server after `tailwind.config.ts` changes
  - Check `content` array includes your file paths

#### Type Errors

**Issue**: `Property 'X' does not exist on type 'Y'`
- **Fix**: Define proper TypeScript interface
- Check if data structure matches expected type

#### Performance Issues

**Issue**: LCP > 2.5s
- **Fix**: 
  - Use `priority` on above-fold images
  - Optimize image sizes
  - Preload critical fonts
  - Check for render-blocking JS

**Issue**: CLS > 0.1
- **Fix**:
  - Set explicit `width` and `height` on images
  - Use aspect-ratio for responsive images
  - Add skeleton loaders with fixed dimensions

---

## Development Checklist

### Before Starting a Task

- [ ] Read relevant documentation
- [ ] Check if similar component exists
- [ ] Review design tokens and patterns
- [ ] Create feature branch from `develop`

### During Development

- [ ] Write semantic HTML
- [ ] Apply Tailwind classes following design system
- [ ] Add TypeScript types/interfaces
- [ ] Include JSON-LD schema if page-level component
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Check accessibility (keyboard, screen reader)

### Before Committing

- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm run typecheck` (no errors)
- [ ] Test in browser (no console errors)
- [ ] Check Core Web Vitals in DevTools
- [ ] Review changes (no sensitive data, API keys)

### Before Creating PR

- [ ] Update documentation if needed
- [ ] Add/update tests (if applicable)
- [ ] Run production build (`npm run build`)
- [ ] Test built app (`npm run start`)
- [ ] Write clear PR description
- [ ] Link related issues

---

## Next Steps

After onboarding:

1. **Familiarize**: Browse codebase, run dev server, explore pages
2. **First Task**: Pick a small task (e.g., add a UI component)
3. **Review**: Read through other PRs to understand code review standards
4. **Ask Questions**: Don't hesitate to seek clarification

---

**Document Owner:** Development Team  
**Review Cycle:** Quarterly  
**Next Review:** December 30, 2025

---

**Welcome aboard! Let's build an amazing healthcare platform together.** 🚀
