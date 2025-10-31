# Glowheal Design System

**Version:** 1.0.0  
**Last Updated:** October 30, 2025

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Elevation & Shadows](#elevation--shadows)
6. [Border Radius](#border-radius)
7. [Motion & Animation](#motion--animation)
8. [Component Patterns](#component-patterns)
9. [Accessibility Guidelines](#accessibility-guidelines)

---

## Brand Identity

### Mission
Glowheal democratizes access to quality healthcare by connecting patients with verified specialists through a seamless digital platform.

### Visual Principles
1. **Trust**: Navy blue foundation conveys professionalism and reliability
2. **Energy**: Vibrant gradients (purple, pink, coral) communicate vitality and wellness
3. **Clarity**: Clean, spacious layouts with strong hierarchy
4. **Warmth**: Soft pastels and rounded corners create approachability

---

## Color Palette

### Primary Colors

#### Navy (Trust & Authority)
- **Purpose**: Headers, primary text, professional contexts
- **Values**:
  - `navy-DEFAULT`: `#1e3a8a`
  - `navy-50`: `#eff6ff`
  - `navy-100`: `#dbeafe`
  - `navy-800`: `#1e3a8a` (Primary)
  - `navy-900`: `#1e40af`
- **Contrast Ratio**: 
  - Navy-800 on white: 11.2:1 (AAA)
  - White on navy-800: 11.2:1 (AAA)

#### Purple (Innovation & Wellness)
- **Purpose**: Secondary actions, highlights, gradients
- **Values**:
  - `purple-DEFAULT`: `#7c3aed`
  - `purple-50`: `#faf5ff`
  - `purple-400`: `#c084fc`
  - `purple-700`: `#7c3aed` (Primary)
  - `purple-900`: `#581c87`
- **Contrast Ratio**: 
  - Purple-700 on white: 6.8:1 (AA)

#### Hot Pink (Energy & Action)
- **Purpose**: CTA buttons, urgency indicators, highlights
- **Values**:
  - `pink-DEFAULT`: `#ec4899`
  - `pink-50`: `#fdf2f8`
  - `pink-400`: `#f472b6`
  - `pink-500`: `#ec4899` (Primary)
  - `pink-700`: `#be185d`
- **Contrast Ratio**: 
  - Pink-500 on white: 4.6:1 (AA for large text)
  - White on pink-700: 7.2:1 (AAA)

#### Coral (Warmth & Approachability)
- **Purpose**: Accents, gradient endpoints, trust badges
- **Values**:
  - `coral-DEFAULT`: `#fb923c`
  - `coral-50`: `#fff7ed`
  - `coral-400`: `#fb923c` (Primary)
  - `coral-600`: `#ea580c`
- **Contrast Ratio**: 
  - Coral-600 on white: 5.2:1 (AA)

#### Yellow (Optimism & Highlights)
- **Purpose**: Success states, badges, highlights
- **Values**:
  - `yellow-DEFAULT`: `#fbbf24`
  - `yellow-50`: `#fefce8`
  - `yellow-500`: `#fbbf24` (Primary)
  - `yellow-700`: `#a16207`

### Semantic Colors

#### Success
- `green-500`: `#10b981` - Success messages, confirmations

#### Warning
- `yellow-500`: `#fbbf24` - Warnings, alerts

#### Error
- `red-600`: `#dc2626` - Errors, validation failures

#### Info
- `blue-500`: `#3b82f6` - Informational messages

### Neutrals

#### Grayscale
- `gray-50`: `#f9fafb` - Background
- `gray-100`: `#f3f4f6` - Subtle backgrounds
- `gray-200`: `#e5e7eb` - Borders
- `gray-400`: `#9ca3af` - Disabled text
- `gray-600`: `#4b5563` - Secondary text
- `gray-800`: `#1f2937` - Body text
- `gray-900`: `#111827` - Headings

---

## Gradients

### Hero Gradients

#### Navy → Purple
- **Usage**: Hero sections, major CTAs, premium features
- **CSS**: `background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);`
- **Tailwind**: `bg-gradient-navy-purple`

#### Pink → Coral
- **Usage**: CTA buttons, action-oriented elements, highlights
- **CSS**: `background: linear-gradient(135deg, #ec4899 0%, #fb923c 100%);`
- **Tailwind**: `bg-gradient-pink-coral`

#### Purple → Pink
- **Usage**: Alternative hero sections, secondary CTAs
- **CSS**: `background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);`
- **Tailwind**: `bg-gradient-purple-pink`

### Gradient Text

```css
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-navy-purple;
}

.gradient-text-pink {
  @apply bg-clip-text text-transparent bg-gradient-pink-coral;
}
```

---

## Typography

### Font Families

#### Sans-Serif (Body)
- **Font**: Inter
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Usage**: Body text, UI elements, forms
- **Loading**: Self-hosted, preload regular and semibold

#### Display (Headlines)
- **Font**: Poppins
- **Weights**: 600 (Semibold), 700 (Bold), 800 (Extra Bold)
- **Usage**: Page titles, section headings, hero text
- **Loading**: Self-hosted, preload bold

### Type Scale

#### Display Sizes (Poppins)

```typescript
{
  'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }], // 72px
  'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }], // 60px
  'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],    // 48px
  'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }], // 36px
}
```

#### Headings (Inter)

| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-5xl` | 3rem (48px) | 1.2 | 700 | H1 |
| `text-4xl` | 2.25rem (36px) | 1.3 | 700 | H2 |
| `text-3xl` | 1.875rem (30px) | 1.3 | 600 | H3 |
| `text-2xl` | 1.5rem (24px) | 1.4 | 600 | H4 |
| `text-xl` | 1.25rem (20px) | 1.5 | 600 | H5 |
| `text-lg` | 1.125rem (18px) | 1.5 | 500 | H6 |

#### Body Text

| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-base` | 1rem (16px) | 1.6 | 400 | Body text |
| `text-lg` | 1.125rem (18px) | 1.6 | 400 | Large body text |
| `text-sm` | 0.875rem (14px) | 1.5 | 400 | Small text, captions |
| `text-xs` | 0.75rem (12px) | 1.4 | 400 | Labels, meta info |

### Typography Best Practices

1. **Heading Hierarchy**: Always use semantic HTML (`<h1>` - `<h6>`)
2. **Line Length**: Optimal 60-80 characters per line
3. **Line Height**: Body text 1.6, headings 1.2-1.4
4. **Letter Spacing**: Negative for large headlines (-0.02em to -0.01em)
5. **Text Contrast**: Minimum 4.5:1 for body, 3:1 for large text (18px+)

---

## Spacing & Layout

### Spacing Scale (Tailwind)

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 0.25rem (4px) | Fine adjustments |
| `2` | 0.5rem (8px) | Tight spacing |
| `3` | 0.75rem (12px) | Icon padding |
| `4` | 1rem (16px) | Standard padding |
| `6` | 1.5rem (24px) | Card padding |
| `8` | 2rem (32px) | Section padding (mobile) |
| `12` | 3rem (48px) | Section spacing |
| `16` | 4rem (64px) | Section padding (tablet) |
| `24` | 6rem (96px) | Section padding (desktop) |
| `32` | 8rem (128px) | Large section spacing |

### Container Widths

```css
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile | 100% | 1rem (16px) |
| Tablet (640px+) | 640px | 1.5rem (24px) |
| Desktop (1024px+) | 1024px | 2rem (32px) |
| Large (1280px+) | 1280px | 2rem (32px) |

### Grid System

- **Columns**: 12-column grid
- **Gap**: 1.5rem (24px) default
- **Responsive**: Stack on mobile, 2-3 cols on tablet, 3-4 cols on desktop

---

## Elevation & Shadows

### Shadow Tokens

#### Soft Shadow (Cards)
```css
box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 
            0 10px 20px -2px rgba(0, 0, 0, 0.04);
```
- **Usage**: Standard cards, hover states
- **Tailwind**: `shadow-soft`

#### Soft Large Shadow (Modals)
```css
box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1), 
            0 20px 30px -5px rgba(0, 0, 0, 0.05);
```
- **Usage**: Modals, popups, elevated cards
- **Tailwind**: `shadow-soft-lg`

#### Glow Shadow (CTAs)
```css
box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
```
- **Usage**: Primary CTAs, focus states
- **Tailwind**: `shadow-glow`

### Elevation Hierarchy

| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Flat elements | `shadow-none` |
| 1 | Cards, tiles | `shadow-soft` |
| 2 | Hover cards, dropdowns | `shadow-soft-lg` |
| 3 | Modals, sticky elements | `shadow-2xl` |
| 4 | Tooltips, overlays | `shadow-glow` |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 0.125rem (2px) | Badges, tags |
| `rounded` | 0.25rem (4px) | Buttons (small) |
| `rounded-md` | 0.375rem (6px) | Inputs, small cards |
| `rounded-lg` | 0.5rem (8px) | Buttons, medium cards |
| `rounded-xl` | 0.75rem (12px) | Large cards |
| `rounded-2xl` | 1rem (16px) | Hero cards, featured content |
| `rounded-3xl` | 1.5rem (24px) | Section containers |
| `rounded-full` | 9999px | Avatars, pills |

---

## Motion & Animation

### Timing Functions

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `duration-75` | 75ms | Micro-interactions (hover) |
| `duration-150` | 150ms | Quick transitions |
| `duration-300` | 300ms | Standard transitions |
| `duration-500` | 500ms | Slow transitions, fade-ins |
| `duration-700` | 700ms | Animated elements |

### Animation Presets

#### Fade In
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
```

#### Slide Up
```css
@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
```

#### Scale In
```css
@keyframes scaleIn {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
```

### Motion Guidelines

1. **Respect Reduced Motion**: Always check `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

2. **Hover States**: 300ms transition for buttons, cards
3. **Page Transitions**: Smooth scroll behavior
4. **Loading States**: Skeleton screens, not spinners

---

## Component Patterns

### Buttons

#### Primary CTA
```css
.btn-primary {
  @apply px-6 py-3 rounded-lg font-semibold text-white 
         bg-gradient-pink-coral hover:shadow-lg 
         transition-all duration-300 transform hover:-translate-y-0.5;
}
```
- **Usage**: Main actions (Book Now, Get Started)
- **States**: Hover (lift + shadow), Focus (glow), Disabled (opacity-50)

#### Secondary
```css
.btn-secondary {
  @apply px-6 py-3 rounded-lg font-semibold 
         text-navy-800 bg-white border-2 border-navy-800 
         hover:bg-navy-800 hover:text-white transition-all duration-300;
}
```
- **Usage**: Secondary actions (Learn More, View Details)

### Cards

#### Standard Card
```css
.card {
  @apply bg-white rounded-2xl shadow-soft hover:shadow-soft-lg 
         transition-shadow duration-300 p-6;
}
```
- **Variants**: Service cards, doctor cards, testimonial cards
- **Hover**: Lift effect with increased shadow

### Forms

#### Input Field
```css
.input-field {
  @apply w-full px-4 py-3 rounded-lg border-2 border-gray-200 
         focus:border-purple-700 focus:ring-2 focus:ring-purple-200 
         transition-colors duration-200;
}
```

---

## Accessibility Guidelines

### Color Contrast

| Text Size | Minimum Ratio | Level |
|-----------|---------------|-------|
| Small (<18px or <14px bold) | 4.5:1 | AA |
| Large (≥18px or ≥14px bold) | 3:1 | AA |
| Graphics & UI | 3:1 | AA |

### Focus States

- Always provide visible focus indicators
- Use `focus-visible` for keyboard-only focus
- Outline color: `#7c3aed` (Purple-700)
- Outline width: 2px
- Outline offset: 2px

### Touch Targets

- Minimum size: 44×44px
- Adequate spacing between interactive elements: 8px minimum

### Text Best Practices

- Line height: 1.5+ for body text
- Paragraph width: max 80 characters
- Text alignment: Left-aligned (avoid justified)
- Link underlines: Always for inline links

---

## Implementation Checklist

### Before Starting
- [ ] Install Inter and Poppins fonts
- [ ] Configure Tailwind with theme extensions
- [ ] Set up CSS custom properties for colors
- [ ] Test contrast ratios with tools

### During Development
- [ ] Use semantic HTML elements
- [ ] Apply consistent spacing scale
- [ ] Implement hover states for interactive elements
- [ ] Test with reduced motion settings
- [ ] Validate color contrast

### Before Launch
- [ ] Accessibility audit with axe DevTools
- [ ] Test keyboard navigation
- [ ] Verify focus states
- [ ] Test on multiple screen sizes
- [ ] Validate gradient rendering

---

**Document Owner:** Design Team  
**Review Cycle:** Quarterly  
**Next Review:** December 30, 2025
