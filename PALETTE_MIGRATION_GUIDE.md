# Forest-Green Palette Migration Guide

**Migration Date:** October 30, 2025  
**Estimated Effort:** 4-6 hours (Config + Components + Pages + QA)  
**Breaking Changes:** Visual only (no functional breaks)

---

## Quick Color Mapping Reference

### Direct Replacements

| Old Color (Purple System) | New Color (Forest System) | Usage |
|--------------------------|--------------------------|--------|
| `purple-700` | `forest-700` | Primary brand, headers, links |
| `purple-900` | `forest-900` | Dark text, deep backgrounds |
| `purple-600` | `jade-600` | Secondary brand, chips |
| `purple-500` | `jade-500` | Hover states |
| `purple-50` | `jade-50` or `forest-50` | Light backgrounds |
| `purple-100` | `jade-100` | Card hover states |
| `navy-800` | `forest-700` | Text on white |
| `navy-900` | `forest-900` | Dark backgrounds |
| `pink-500` / `pink-600` | `amber-500` / `amber-600` | CTA buttons |
| `gradient-navy-purple` | `gradient-forest-jade` | Hero backgrounds |
| `gradient-pink-coral` | `amber-500` + `coral-500` | CTA gradients (or solid amber) |

### Semantic Updates

| Component | Old Style | New Style | Rationale |
|-----------|-----------|-----------|-----------|
| Primary CTA | `bg-gradient-pink-coral text-white` | `bg-amber-500 text-forest-700` | Warm conversion cue with forest text for contrast |
| Secondary Button | `border-navy-800 text-navy-800` | `border-forest-700 text-forest-700` | Forest brand consistency |
| Focus Ring | `ring-purple-700` | `ring-forest-700` | Brand-aligned focus states |
| Specialty Chips | `bg-purple-50 text-purple-700` | `bg-jade-50 text-jade-600` | Jade for supportive brand elements |
| Success Icons | `text-purple-700` | `text-forest-700` or `text-jade-600` | Healing-aligned success states |
| Vitality Badges | N/A | `bg-lime-50 text-forest-700` + `text-lime-500` icon | NEW: Lime for small vitality accents only |

---

## Find & Replace Commands (Use with Caution)

### PowerShell Mass Replacement (Test on Single File First!)

```powershell
# Navigate to project root
cd D:\web\glowheal\apps\web\src

# Replace purple-700 with forest-700 (most common)
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'purple-700', 'forest-700' | Set-Content $_.FullName
}

# Replace purple-50 with jade-50 (backgrounds)
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'purple-50', 'jade-50' | Set-Content $_.FullName
}

# Replace purple-100 with jade-100 (hover states)
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'purple-100', 'jade-100' | Set-Content $_.FullName
}

# Replace gradient-navy-purple with gradient-forest-jade
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'gradient-navy-purple', 'gradient-forest-jade' | Set-Content $_.FullName
}

# Replace navy-800 with forest-700 (text)
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'navy-800', 'forest-700' | Set-Content $_.FullName
}

# Replace navy-900 with forest-900 (dark backgrounds)
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'navy-900', 'forest-900' | Set-Content $_.FullName
}
```

**⚠️ WARNING:** Always commit changes before running mass replacements. Review diffs carefully.

---

## Manual Migration (Recommended Approach)

### Phase 1: Core Components (1 hour)

#### 1. Button.tsx
```tsx
// OLD
variant === 'primary' 
  ? 'bg-gradient-pink-coral text-white'
  : 'bg-white text-navy-800 border-2 border-navy-800 hover:bg-navy-800 hover:text-white'

// NEW
variant === 'primary'
  ? 'bg-amber-500 text-forest-700 hover:bg-amber-600 focus:ring-2 focus:ring-forest-700'
  : 'bg-white text-forest-700 border-2 border-forest-700 hover:bg-mist-50 focus:ring-2 focus:ring-forest-700'
```

#### 2. Input.tsx, Select.tsx, Textarea.tsx
```tsx
// OLD
'focus:ring-2 focus:ring-purple-700'

// NEW
'focus:ring-2 focus:ring-forest-700'
```

#### 3. Card.tsx
```tsx
// OLD
'bg-gradient-navy-purple text-white': variant === 'gradient'

// NEW
'bg-gradient-forest-jade text-white': variant === 'gradient'
```

### Phase 2: Layout Components (45 min)

#### 4. Header.tsx
```tsx
// OLD
className="text-navy-800 hover:text-purple-700"
className="hover:bg-purple-50"
className="text-purple-700 hover:text-purple-800"

// NEW
className="text-forest-700 hover:text-jade-600"
className="hover:bg-jade-50"
className="text-forest-700 hover:text-forest-900"
```

#### 5. Footer.tsx
```tsx
// OLD
className="focus:ring-2 focus:ring-purple-500"

// NEW
className="focus:ring-2 focus:ring-forest-700"
```

### Phase 3: Feature Components (1 hour)

#### 6. ServiceCard.tsx
```tsx
// OLD
<p className="font-semibold text-purple-700">₹{consultationFee}</p>

// NEW
<p className="font-semibold text-forest-700">₹{consultationFee}</p>
```

#### 7. DoctorCard.tsx
```tsx
// OLD
className="bg-gradient-navy-purple" // Avatar background
<p className="text-sm text-purple-700 font-medium">{specialty}</p>
<div className="bg-purple-50">
<p className="text-2xl font-bold text-purple-700">₹{consultationFee}</p>

// NEW
className="bg-gradient-forest-jade" // Avatar background
<p className="text-sm text-jade-600 font-medium">{specialty}</p>
<div className="bg-jade-50">
<p className="text-2xl font-bold text-forest-700">₹{consultationFee}</p>
```

#### 8. FAQAccordion.tsx
```tsx
// OLD
className="hover:border-purple-300"
className="hover:bg-purple-50"
className="text-purple-700"

// NEW
className="hover:border-jade-300"
className="hover:bg-jade-50"
className="text-forest-700"
```

### Phase 4: Page Components (2 hours)

#### 9. Homepage (app/page.tsx)
```tsx
// OLD - Hero Section
<section className="bg-gradient-navy-purple text-white">
  <p className="text-purple-100">

// NEW
<section className="bg-gradient-forest-jade text-white">
  <p className="text-white/90">

// OLD - Stats
<div className="text-purple-700">500+</div>

// NEW
<div className="text-forest-700">500+</div>
// OPTIONAL: Add lime vitality icon
<SparkleIcon className="w-6 h-6 text-lime-500" />
```

#### 10. Services Page (app/services/page.tsx)
```tsx
// OLD
<section className="bg-gradient-navy-purple">
<p className="text-purple-100">

// NEW
<section className="bg-gradient-forest-jade">
<p className="text-white/90">
```

#### 11. Service Detail (app/services/[slug]/page.tsx)
```tsx
// OLD
<section className="bg-gradient-navy-purple">
  <div className="bg-gradient-to-br from-purple-600 to-pink-600" />
  <p className="text-purple-100">
<div className="bg-purple-50 hover:bg-purple-100">

// NEW
<section className="bg-gradient-forest">
  <div className="bg-gradient-to-br from-forest-700 to-jade-600" />
  <p className="text-white/90">
<div className="bg-jade-50 hover:bg-jade-100">
```

#### 12. Doctors Directory (app/doctors/page.tsx)
```tsx
// OLD
<section className="bg-gradient-to-r from-navy-900 to-purple-900">
<p className="text-purple-100">
className="text-purple-700 hover:text-purple-900"
className="focus:ring-2 focus:ring-purple-700"
className="text-purple-700"
className="accent-purple-700"
className="bg-purple-700 text-white" // Active filter

// NEW
<section className="bg-gradient-forest">
<p className="text-white/90">
className="text-forest-700 hover:text-forest-900"
className="focus:ring-2 focus:ring-forest-700"
className="text-forest-700"
className="accent-forest-700"
className="bg-forest-700 text-white" // Active filter
```

#### 13. Doctor Profile (app/doctors/[slug]/page.tsx)
```tsx
// OLD
<section className="bg-gradient-to-r from-navy-900 to-purple-900">
className="text-purple-200 hover:text-white"
className="text-purple-300"
<div className="bg-gradient-to-br from-purple-400 to-pink-400">
<p className="text-purple-100">
<span className="bg-purple-700">
<span className="text-purple-200">
<span className="text-purple-700">
<div className="bg-purple-50">
<p className="text-purple-900">

// NEW
<section className="bg-gradient-forest">
className="text-white/70 hover:text-white"
className="text-white/50"
<div className="bg-gradient-forest-jade">
<p className="text-white/90">
<span className="bg-forest-700">
<span className="text-white/80">
<span className="text-forest-700">
<div className="bg-jade-50">
<p className="text-forest-900">
```

#### 14. Booking Page (app/book/page.tsx)
```tsx
// OLD
<div className="bg-gradient-to-b from-purple-50 to-white">
<div className="bg-purple-50">
className="bg-purple-700 text-white" // Active step
className="bg-purple-700" // Progress bar fill
className="hover:border-purple-500"
className="peer-checked:text-purple-700"
className="border-purple-700"
className="text-purple-700 hover:text-purple-900"

// NEW
<div className="bg-gradient-to-b from-jade-50 to-white">
<div className="bg-jade-50">
className="bg-forest-700 text-white" // Active step
className="bg-lime-500" // Progress bar fill (vitality)
className="hover:border-forest-700"
className="peer-checked:text-forest-700"
className="border-forest-700"
className="text-forest-700 hover:text-forest-900"
```

#### 15. Landing Page (app/landing/glowheal-offer/page.tsx)
```tsx
// OLD
<Link className="text-purple-700">
<section className="bg-gradient-to-r from-purple-900 to-pink-900">
<p className="text-purple-100">
<span className="text-purple-300">
<span className="text-purple-200">
<div className="text-purple-700">10,000+</div>
<div className="bg-purple-50">
<section className="bg-gradient-to-r from-purple-900 to-pink-900">

// NEW
<Link className="text-forest-700">
<section className="bg-gradient-forest">
<p className="text-white/90">
<span className="text-white/60">
<span className="text-white/80">
<div className="text-forest-700">10,000+</div>
// OPTIONAL: Add lime icon
<SparkleIcon className="w-5 h-5 text-lime-500" />
<div className="bg-jade-50">
<section className="bg-gradient-forest">
```

---

## Testing Checklist

### Visual QA (All Routes)
- [ ] Homepage hero gradient (forest → jade)
- [ ] All CTA buttons (amber bg, forest text)
- [ ] Secondary buttons (forest outline)
- [ ] Form focus states (forest ring)
- [ ] Doctor specialty chips (jade bg + text)
- [ ] Service cards hover (jade border)
- [ ] FAQ accordion (jade hover)
- [ ] Booking stepper (forest active, lime completed)
- [ ] Landing page stats (forest text, optional lime icons)

### Contrast Validation
```powershell
# Run axe DevTools on all routes
npm run dev
# Visit http://localhost:3000
# Open DevTools > Lighthouse > Accessibility
# Check for contrast failures
```

**Expected:** Zero contrast errors (all forest/jade/amber pairs exceed WCAG AA)

### Color-Blind Simulation
```
Chrome DevTools > More Tools > Rendering > Emulate vision deficiencies
Test: Protanopia, Deuteranopia, Tritanopia
```

**Expected:** All UI elements remain distinguishable with icon/text labels

### Lighthouse Performance
```powershell
npx lighthouse http://localhost:3000 --view
```

**Expected:** CLS unchanged (color changes don't affect layout)

---

## Rollback Plan

### If Issues Arise During Migration

1. **Revert Tailwind Config:**
```powershell
git checkout HEAD -- apps/web/tailwind.config.ts
```

2. **Revert Globals CSS:**
```powershell
git checkout HEAD -- apps/web/src/styles/globals.css
```

3. **Revert Component Changes:**
```powershell
git checkout HEAD -- apps/web/src/components/
git checkout HEAD -- apps/web/src/app/
```

4. **Rebuild:**
```powershell
npm run build
```

### Partial Rollback (Keep Config, Revert Components)

If Tailwind config is working but components have issues:

```powershell
# Keep config, revert only components
git checkout HEAD -- apps/web/src/components/
git checkout HEAD -- apps/web/src/app/
```

---

## Post-Migration Validation

### 1. Build Check
```powershell
cd D:\web\glowheal
npm run build
```

**Expected:** Zero errors, zero warnings (except harmless Tailwind @tailwind warnings)

### 2. Dev Server Visual Check
```powershell
npm run dev
# Visit all routes:
# - http://localhost:3000 (Homepage)
# - http://localhost:3000/services (Services)
# - http://localhost:3000/services/dermatology (Service Detail)
# - http://localhost:3000/doctors (Doctors)
# - http://localhost:3000/doctors/dr-priya-sharma (Doctor Profile)
# - http://localhost:3000/book (Booking)
# - http://localhost:3000/landing/glowheal-offer (Landing)
```

**Expected:** All pages render with forest/jade/amber palette, no purple/pink remnants

### 3. Lighthouse Audit (3 Routes Minimum)
```powershell
npx lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse-home-green.html --view
npx lighthouse http://localhost:3000/services/dermatology --output html --output-path ./reports/lighthouse-service-green.html --view
npx lighthouse http://localhost:3000/landing/glowheal-offer --output html --output-path ./reports/lighthouse-landing-green.html --view
```

**Expected Scores:**
- Performance: ≥88 (unchanged or improved)
- Accessibility: ≥98 (unchanged or improved)
- Best Practices: ≥92 (unchanged)
- SEO: 100 (unchanged)

### 4. A/B Testing (Optional, Post-Deploy)

If deploying to production with A/B testing:

```typescript
// Example: Vercel Edge Config or feature flag
const useGreenPalette = await edgeConfig.get('green_palette_rollout') ?? false;

// Apply class conditionally
<div className={useGreenPalette ? 'bg-forest-700' : 'bg-purple-700'}>
```

**Metrics to Track:**
- CTA click-through rate (expect +5-15% lift from warm amber CTAs)
- Form completion rate (expect neutral or +3-8% from reduced cognitive load)
- Bounce rate (expect -2-5% from professional forest identity)
- Time on site (expect +10-20% from soothing green palette)

---

## FAQ

### Q: Why not use find-replace for everything?
**A:** Component context matters. Some `purple-700` instances should become `forest-700` (text), others `jade-600` (chips), and a few `lime-500` (vitality icons). Manual review ensures correct semantic mapping.

### Q: Can I keep purple for certain elements?
**A:** Yes, but only if there's a strong brand reason (e.g., sub-brand, special campaign). For consistent healing identity, full migration is recommended.

### Q: What about dark mode?
**A:** Current codebase uses light mode. If implementing dark mode later, use:
- `dark:bg-forest-900` (page background)
- `dark:bg-forest-800` (card background)
- `dark:text-white` (primary text)
- `dark:text-mist-100` (secondary text)
- `dark:focus:ring-jade-500` (focus rings)

### Q: How do I handle lime overuse?
**A:** Lime is for micro-accents only (≤24px icons, progress indicators). If you find yourself using `bg-lime-500` on large panels, replace with `bg-jade-50` or `bg-forest-50`.

### Q: Should I update WhatsAppButton?
**A:** WhatsAppButton uses WhatsApp's brand green (#25D366), which is intentional. Keep that green; only update UI focus rings to forest:
```tsx
className="focus:ring-forest-700" // Change
style={{ backgroundColor: '#25D366' }} // Keep (WhatsApp brand)
```

---

## Timeline Estimate

| Phase | Tasks | Time | Dependencies |
|-------|-------|------|--------------|
| **Prep** | Read DESIGN_TOKENS.md, backup code | 15 min | - |
| **Config** | Update Tailwind + globals.css | 30 min | Prep |
| **Components** | Button, Input, Card, Header, Footer | 1 hr | Config |
| **Features** | ServiceCard, DoctorCard, FAQAccordion | 1 hr | Components |
| **Pages** | Homepage, Services, Doctors, Booking, Landing | 2 hr | Components |
| **QA** | Visual check, contrast, Lighthouse | 1 hr | Pages |
| **Documentation** | Update component stories, screenshots | 30 min | QA |
| **Total** | Full migration | **6 hours** | - |

**Fast-track option:** Focus on critical path (Homepage, Services, Doctors, Booking) = 3-4 hours

---

## Success Criteria

✅ **Technical:**
- Zero TypeScript errors
- Zero console warnings (except harmless Tailwind)
- Lighthouse Performance ≥88
- Lighthouse Accessibility ≥95
- All focus states visible (forest rings)
- All text meets WCAG AA contrast (4.5:1 minimum)

✅ **Visual:**
- No purple/pink/navy remnants visible on any page
- Forest green used for primary brand elements (headers, links, CTA outlines)
- Jade green used for secondary elements (chips, hover states)
- Amber yellow used for primary CTAs (Book Now, Get Started)
- Lime green used sparingly (≤24px icons, progress indicators)
- Clinical white dominates (hospital-grade cleanliness)

✅ **UX:**
- CTAs highly visible (amber stands out)
- Navigation intuitive (forest links clear)
- Forms accessible (forest focus rings 2px)
- Feedback states clear (forest success, amber warning)
- Color-blind users supported (icons + text labels)

---

## Next Steps After Migration

1. **Deploy to Staging:** Test on production-like environment
2. **Stakeholder Review:** Get final approval from design/marketing
3. **Update Brand Guidelines:** Document forest-green as official palette
4. **Monitor Analytics:** Track CTA performance, bounce rate, time on site
5. **Iterate:** Adjust lime usage, gradient intensity based on user feedback
6. **Expand to Mobile App:** Apply forest-green palette to future React Native app

---

**Document Prepared By:** Design System Team  
**Last Updated:** October 30, 2025  
**Next Review:** Post-migration QA (within 48 hours of deployment)
