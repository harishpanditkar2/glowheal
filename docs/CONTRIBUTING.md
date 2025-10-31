# Contributing Guidelines

**Version:** 1.0.0  
**Last Updated:** October 30, 2025

Thank you for contributing to Glowheal! This document outlines our code standards, commit conventions, and development practices.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Code Standards](#code-standards)
4. [Commit Conventions](#commit-conventions)
5. [Pull Request Process](#pull-request-process)
6. [Component Guidelines](#component-guidelines)
7. [Accessibility Checklist](#accessibility-checklist)
8. [Testing Requirements](#testing-requirements)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, education, socioeconomic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive Behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable Behavior:**
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Before You Begin

1. **Read Documentation**:
   - `ONBOARDING.md` - Setup and project overview
   - `ARCHITECTURE.md` - Technical architecture
   - `DESIGN_TOKENS.md` - Design system
   - `SEO_CHECKLIST.md` - SEO requirements

2. **Setup Development Environment**:
   ```powershell
   git clone <repo-url>
   cd glowheal
   npm install
   cd apps/web
   npm install
   npm run dev
   ```

3. **Create an Issue or Pick an Existing One**:
   - Check GitHub Issues for tasks
   - Comment on issue to claim it
   - Discuss approach if unclear

---

## Code Standards

### TypeScript

#### Strict Mode

We enforce TypeScript strict mode. All code must compile without errors.

```typescript
// ✅ Good: Explicit types
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
}

function getDoctorById(id: string): Doctor | null {
  // implementation
}

// ❌ Bad: Implicit any
function getDoctorById(id) {
  // implementation
}
```

#### Type Safety Rules

1. **No `any` type**: Use `unknown` if type is truly unknown
2. **Define interfaces**: For all data structures
3. **Use generics**: For reusable functions
4. **Prefer `interface` over `type`**: For object shapes
5. **Export types**: If used in multiple files

```typescript
// ✅ Good
interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  onClick: () => void;
}

// ❌ Bad
type ServiceCardProps = any;
```

---

### React & Next.js

#### Component Structure

```typescript
// ✅ Good: Server Component (default)
// apps/web/src/components/sections/ServicesGrid.tsx

import { ServiceCard } from '@/components/ui/ServiceCard';
import services from '@/data/services.json';

export function ServicesGrid() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-display-md gradient-text text-center mb-12">
          Our Healthcare Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

```typescript
// ✅ Good: Client Component (when needed)
// apps/web/src/components/forms/LeadForm.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema } from '@/lib/validators';

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (data) => {
    // form logic
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* fields */}</form>;
}
```

#### Rules

1. **Server Components by Default**: Only use `'use client'` when necessary (forms, interactivity)
2. **Named Exports**: Use named exports for components (not default)
3. **File Naming**: PascalCase for components, kebab-case for utilities
4. **Co-location**: Keep related files together
5. **Prop Interfaces**: Define interface for component props

---

### CSS & Tailwind

#### Utility-First Approach

```tsx
// ✅ Good: Tailwind utilities
<div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-6">
  <h3 className="text-2xl font-semibold text-navy-800 mb-4">Title</h3>
  <p className="text-gray-600 leading-relaxed">Description</p>
</div>

// ❌ Bad: Inline styles
<div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>Title</h3>
</div>
```

#### Design Token Usage

Always use design tokens from `tailwind.config.ts`:

```tsx
// ✅ Good: Using tokens
<button className="btn-primary">
  Book Consultation
</button>

<h1 className="text-display-lg gradient-text">
  Healthcare Made Simple
</h1>

// ❌ Bad: Arbitrary values
<button className="px-[23px] py-[11px] bg-[#ec4899] rounded-[8px]">
  Book Consultation
</button>
```

#### Responsive Design

Mobile-first approach:

```tsx
// ✅ Good: Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* content */}
</div>

// ❌ Bad: Desktop-first
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
  {/* content */}
</div>
```

---

### File Organization

#### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ServiceCard.tsx` |
| Utilities | camelCase | `schemaBuilders.ts` |
| Pages | lowercase | `page.tsx` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Hooks | camelCase with `use` prefix | `useLeadForm.ts` |

#### Import Order

```typescript
// 1. External libraries
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { z } from 'zod';

// 2. Internal absolute imports (@/...)
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

// 3. Relative imports
import { ServiceCard } from './ServiceCard';
import styles from './styles.module.css';

// 4. Assets
import heroImage from '@/public/images/hero.jpg';
```

---

## Commit Conventions

### Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(services): add dermatology service page` |
| `fix` | Bug fix | `fix(forms): resolve validation error on phone field` |
| `docs` | Documentation | `docs(seo): update schema markup examples` |
| `style` | Code style (formatting, missing semi-colons) | `style(ui): format button components with prettier` |
| `refactor` | Code refactor | `refactor(schema): extract reusable schema builder` |
| `test` | Adding tests | `test(forms): add unit tests for lead form validation` |
| `chore` | Maintenance tasks | `chore(deps): update next.js to 14.2.1` |
| `perf` | Performance improvements | `perf(images): optimize hero image loading` |

### Scope

Optional, specifies the area:
- `services` - Service pages
- `doctors` - Doctor directory/profiles
- `forms` - Form components
- `ui` - UI components
- `schema` - JSON-LD schema
- `seo` - SEO-related
- `a11y` - Accessibility

### Examples

```bash
# Good commits
git commit -m "feat(services): add mental health service page with schema"
git commit -m "fix(forms): resolve WhatsApp button click handler"
git commit -m "docs(architecture): update routing table with new pages"
git commit -m "perf(images): lazy load below-fold images"
git commit -m "refactor(ui): extract stats counter into reusable component"

# Bad commits
git commit -m "updates"
git commit -m "fix bug"
git commit -m "WIP"
```

### Commit Message Body

For complex changes, add a body:

```
feat(schema): add physician schema component

- Create reusable PhysicianSchema component
- Add aggregate rating support
- Include education and credentials fields
- Validate with Rich Results Test

Closes #42
```

---

## Pull Request Process

### Before Creating PR

- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm run typecheck` (no errors)
- [ ] Run `npm run build` (successful build)
- [ ] Test in browser (no console errors)
- [ ] Check Core Web Vitals in DevTools
- [ ] Update documentation if needed
- [ ] Add tests if applicable

### PR Title

Use conventional commit format:

```
feat(doctors): add doctor profile page template
fix(seo): correct canonical URL generation
docs(readme): update installation instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes:
1. Step 1
2. Step 2

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
- [ ] Checked accessibility
- [ ] Validated schema markup (if applicable)

## Related Issues
Closes #[issue number]
```

### Review Process

1. **Automated Checks**: CI must pass (lint, typecheck, build)
2. **Code Review**: At least one approval required
3. **Testing**: Reviewer tests functionality
4. **Approval**: Reviewer approves PR
5. **Merge**: Squash and merge into `develop` or `main`

---

## Component Guidelines

### Component Anatomy

```typescript
// Import statements
import React from 'react';
import { cn } from '@/lib/utils';

// Type definitions
interface ComponentProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

// Component implementation
export function Component({ 
  title, 
  description, 
  className, 
  children 
}: ComponentProps) {
  return (
    <div className={cn('base-classes', className)}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
```

### Component Checklist

- [ ] **TypeScript interface** for props
- [ ] **Semantic HTML** (correct tags)
- [ ] **Accessibility** attributes (aria-*, role)
- [ ] **Responsive** design (mobile-first)
- [ ] **Performance** (lazy load if below fold)
- [ ] **Reusable** (configurable via props)
- [ ] **Documented** (JSDoc if complex)

### Reusable vs. Page-Specific

**Reusable Component** (`components/ui/`):
```typescript
// ✅ Good: Generic, reusable
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  // implementation
}
```

**Page-Specific Component** (`components/sections/`):
```typescript
// ✅ Good: Specific to homepage
export function HomepageHero() {
  return (
    <section className="relative min-h-screen">
      {/* Hero content specific to homepage */}
    </section>
  );
}
```

---

## Accessibility Checklist

### Semantic HTML

```tsx
// ✅ Good: Semantic elements
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
  </article>
</main>

<footer>
  <address>Contact information</address>
</footer>

// ❌ Bad: Divs for everything
<div className="header">
  <div className="nav">
    <div className="link">Services</div>
  </div>
</div>
```

### ARIA Attributes

```tsx
// ✅ Good: Proper ARIA usage
<button 
  aria-label="Close modal" 
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <XIcon aria-hidden="true" />
</button>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-current="page">Services</li>
  </ol>
</nav>

// ❌ Bad: Missing ARIA
<button onClick={handleClose}>
  <XIcon />
</button>
```

### Focus Management

```tsx
// ✅ Good: Visible focus styles
<button className="focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:outline-none">
  Click Me
</button>

// Skip to main content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Logical tab order (top to bottom, left to right)
- `Enter` and `Space` trigger button actions
- `Escape` closes modals/dropdowns
- Arrow keys navigate menus/carousels

### Alt Text

```tsx
// ✅ Good: Descriptive alt text
<Image 
  src="/images/doctor-consultation.jpg" 
  alt="Doctor having video consultation with patient on laptop" 
  width={800} 
  height={600}
/>

// Decorative images
<Image 
  src="/images/background-pattern.svg" 
  alt="" 
  aria-hidden="true"
/>

// ❌ Bad: Generic or missing alt
<img src="/doctor.jpg" alt="doctor" />
<img src="/hero.jpg" />
```

### Color Contrast

Minimum contrast ratios (WCAG AA):
- Normal text: 4.5:1
- Large text (18px+ or 14px+ bold): 3:1
- UI components: 3:1

Test with browser DevTools or online tools.

### Accessibility Testing

- [ ] **Automated**: Run axe DevTools on every page
- [ ] **Keyboard**: Tab through entire page
- [ ] **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] **Zoom**: Test at 200% zoom
- [ ] **Color Blindness**: Use Chrome DevTools to simulate

---

## Testing Requirements

### Unit Tests (Future Enhancement)

While not required at launch, consider adding:

```typescript
// Example: Testing schema builder
import { buildPhysicianSchema } from '@/lib/schema-builders';

describe('buildPhysicianSchema', () => {
  it('should generate valid Physician schema', () => {
    const doctor = {
      name: 'Dr. Test',
      specialty: 'Dermatology',
      // ...
    };
    
    const schema = buildPhysicianSchema(doctor);
    
    expect(schema['@type']).toBe('Physician');
    expect(schema.name).toBe('Dr. Test');
  });
});
```

### Manual Testing Checklist

For every PR:

- [ ] **Functionality**: Feature works as intended
- [ ] **Responsive**: Test mobile, tablet, desktop
- [ ] **Browsers**: Test Chrome, Firefox, Safari, Edge
- [ ] **Accessibility**: Keyboard, screen reader, contrast
- [ ] **Performance**: Check Lighthouse scores
- [ ] **SEO**: Validate schema, meta tags, canonical
- [ ] **Links**: All internal links work
- [ ] **Forms**: Validation, submission, error handling

### Performance Testing

```bash
# Lighthouse CI (add to package.json)
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json
```

**Target Scores:**
- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

---

## Code Review Guidelines

### For Authors

- Keep PRs focused (one feature/fix per PR)
- Write clear description with context
- Add screenshots for UI changes
- Respond to feedback professionally
- Mark resolved comments

### For Reviewers

- Review within 24-48 hours
- Be constructive and specific
- Focus on logic, not style (linter handles that)
- Test the changes locally
- Approve when satisfied

### Review Checklist

- [ ] Code follows project conventions
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met
- [ ] Documentation updated
- [ ] Tests added/passing
- [ ] No console errors or warnings

---

## Healthcare-Specific Guidelines

### Medical Content

All health-related content must:

1. **Include `[TODO: medical review]` marker** if not yet reviewed
2. **Be reviewed by licensed professional** before production
3. **Include disclaimers** ("Results may vary", "Consult a doctor")
4. **Link to authoritative sources** (medical journals, WHO, etc.)
5. **Avoid definitive claims** ("cure", "guaranteed results")

### Patient Privacy

- Never commit real patient data
- Use placeholder names (First Name + Initial)
- Require consent for testimonials/photos
- Obfuscate emails in markup

### Regulatory Compliance

- Terms of Service (legal review required)
- Privacy Policy (GDPR, IT Act 2000)
- Telemedicine guidelines (India)
- Medical device regulations (if applicable)

---

## Questions?

- **Documentation**: Check `/docs` folder first
- **GitHub Issues**: Search for similar questions
- **Pull Request**: Ask in PR comments
- **Email**: [team-email@glowheal.in] (placeholder)

---

**Document Owner:** Development Team  
**Review Cycle:** Quarterly  
**Next Review:** December 30, 2025

---

**Thank you for contributing to Glowheal!** 🙏
