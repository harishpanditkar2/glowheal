# Phase 3: Accessibility & Performance QA Checklist

## 📋 Overview
This document provides a comprehensive QA checklist for Phase 3 production readiness. Complete manual testing using browser DevTools and automated tools.

---

## 🎯 Testing Scope

### Pages to Test:
1. `/` - Homepage
2. `/pricing` - Pricing overview
3. `/pricing/dermatology` - Specialty pricing page
4. `/services/dermatology` - Service category page
5. `/doctors` - Doctor listing
6. `/doctors/dr-priya-sharma` - Doctor profile
7. `/book` - Booking form

---

## ♿ Accessibility Testing

### Tools Required:
- **axe DevTools** (Chrome/Firefox extension)
- **WAVE** (WebAIM extension)
- **Lighthouse** (Chrome DevTools)
- **Keyboard Navigation** (Tab, Enter, Space, Arrow keys)
- **Screen Reader** (NVDA on Windows, VoiceOver on Mac)

### Test Checklist:

#### A1. Color Contrast (WCAG AA)
- [ ] All text has ≥4.5:1 contrast ratio (body text)
- [ ] All large text has ≥3:1 contrast ratio (18px+ or 14px+ bold)
- [ ] Interactive elements (buttons, links) have ≥3:1 contrast with background
- [ ] Focus indicators have ≥3:1 contrast

**Expected Results:**
- ✅ Forest-700 (#1a3a2e) on white: ~12:1 ratio
- ✅ Jade-600 (#1a9c6e) on white: ~4.8:1 ratio
- ✅ Lime-600 (#84cc16) on forest-700: ~7.3:1 ratio

#### A2. Keyboard Navigation
- [ ] All interactive elements reachable via Tab key
- [ ] Focus order follows visual flow (top-to-bottom, left-to-right)
- [ ] No keyboard traps (can Tab out of all widgets)
- [ ] Modal dialogs trap focus (Escape closes)
- [ ] Dropdown menus accessible via Arrow keys
- [ ] Skip links present (Skip to main content)

**Critical Pages:**
- `/book` - Test form navigation, service selector modal
- `/doctors` - Test filter sidebar, doctor cards
- `/pricing` - Test PriceCard expandable details

#### A3. Touch Targets (Mobile)
- [ ] All buttons/links ≥48x48px (iOS Human Interface Guidelines)
- [ ] Adequate spacing between interactive elements (≥8px gap)
- [ ] No overlapping touch targets

**Review Components:**
- PriceCard CTA buttons
- DoctorCard pricing badges
- Booking form inputs
- Header navigation links

#### A4. Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Landmarks used correctly (header, nav, main, aside, footer)
- [ ] Lists marked up as `<ul>` or `<ol>`
- [ ] Form labels associated with inputs (for/id or aria-labelledby)
- [ ] Buttons use `<button>`, links use `<a>`

#### A5. ARIA (Only Where Needed)
- [ ] ARIA live regions for dynamic content (booking success, filters)
- [ ] ARIA labels on icon-only buttons
- [ ] ARIA expanded/collapsed states on disclosures
- [ ] ARIA describedby for form field hints
- [ ] No redundant ARIA (don't duplicate native semantics)

**Check These:**
- Provisional services display (role="status", aria-live="polite")
- Doctor filters results count (aria-live)
- PriceCard details/summary elements (native disclosure, no ARIA needed)

#### A6. Images & Media
- [ ] All `<img>` have alt text (descriptive or empty for decorative)
- [ ] SVG icons have aria-hidden="true" or aria-label
- [ ] No text in images (or alt provides full text)
- [ ] Loading="lazy" on below-the-fold images

---

## ⚡ Performance Testing

### Tool: Lighthouse (Chrome DevTools)
**Target Scores:** ≥90 for Performance, Accessibility, Best Practices, SEO

### Test Checklist:

#### P1. Core Web Vitals
- [ ] **LCP (Largest Contentful Paint):** ≤2.5s
  - Measures: Hero section image/text
  - Fix: Preload hero images, optimize fonts
  
- [ ] **FID (First Input Delay):** ≤100ms
  - Measures: Button click responsiveness
  - Fix: Minimize JavaScript, defer non-critical scripts
  
- [ ] **CLS (Cumulative Layout Shift):** ≤0.1
  - Measures: Visual stability during load
  - Fix: Reserved height for images, fixed dimensions on cards

#### P2. Font Loading
- [ ] Font files preloaded in `<head>`
- [ ] `font-display: swap` in CSS
- [ ] FOUT (Flash of Unstyled Text) acceptable (≤100ms)
- [ ] System font fallback during load (Arial, Helvetica)

**Check:** `apps/web/src/app/globals.css` for font-face declarations

#### P3. Image Optimization
- [ ] Images served in next-gen formats (WebP, AVIF)
- [ ] Responsive images with srcset or Next.js <Image>
- [ ] Lazy loading on below-the-fold images
- [ ] No oversized images (no 4K images for 300px display)

#### P4. JavaScript Bundle Size
- [ ] No duplicate dependencies
- [ ] Tree-shaking enabled (Next.js default)
- [ ] Code splitting per route
- [ ] No console.log in production builds

**Check:** Run `npm run build` and review `.next/analyze` or `npm run analyze` if configured

#### P5. Network Waterfall
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] Third-party scripts deferred (Google Analytics, HubSpot)
- [ ] No render-blocking resources

---

## 🧪 Manual Testing Protocol

### Test 1: Keyboard-Only Navigation
1. Disable mouse/touchpad
2. Navigate entire site using only:
   - **Tab** (forward)
   - **Shift+Tab** (backward)
   - **Enter** (activate links/buttons)
   - **Space** (toggle checkboxes, activate buttons)
   - **Escape** (close modals)
   - **Arrow keys** (radio groups, dropdowns)
3. Verify focus visible at all times
4. Verify logical tab order

### Test 2: Screen Reader Testing
**Windows (NVDA):**
1. Download NVDA (free, open-source)
2. Navigate site with NVDA + Chrome
3. Verify all text read correctly
4. Verify form labels announced
5. Verify button purposes clear

**Mac (VoiceOver):**
1. Enable VoiceOver (Cmd+F5)
2. Navigate with VoiceOver + Safari
3. Verify rotor can access headings, links, forms

### Test 3: Mobile Responsiveness
**Devices to Test:**
- iPhone SE (375px width) - Small screen
- iPhone 14 Pro (390px width) - Common iOS
- Samsung Galaxy S22 (360px width) - Common Android
- iPad (768px width) - Tablet breakpoint

**Checks:**
- [ ] Text readable without zoom
- [ ] No horizontal scroll
- [ ] Touch targets ≥48x48px
- [ ] Modals don't exceed viewport
- [ ] Forms usable without keyboard covering inputs

### Test 4: Lighthouse Audit
1. Open Chrome DevTools → Lighthouse tab
2. Select "Mobile" device, "Navigation" mode
3. Run audit for each critical page
4. Address all red flags (score <50)
5. Improve amber warnings (score 50-89)

**Expected Results:**
```
Homepage (/):
- Performance: 90-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

Booking Page (/book):
- Performance: 85-95 (form interactivity acceptable)
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 90-100
```

---

## 🐛 Common Issues & Fixes

### Issue: Low Contrast on Badges
**Problem:** Text on colored backgrounds (amber, lime) may fail WCAG AA
**Fix:** Use darker text (forest-700) or increase background opacity

### Issue: Modal Keyboard Trap
**Problem:** Tab can escape modal dialog
**Fix:** Implement focus trap with `focus-trap-react` or native `inert` attribute on background

### Issue: CLS from Images
**Problem:** Images load without reserved height, causing layout shift
**Fix:** Add explicit width/height or aspect-ratio CSS

### Issue: Large JavaScript Bundle
**Problem:** First load > 300KB
**Fix:** Code split with dynamic imports, remove unused dependencies

### Issue: Missing Alt Text
**Problem:** Decorative images have descriptive alt (or vice versa)
**Fix:** Decorative SVGs get `aria-hidden="true"`, informative images get descriptive alt

---

## ✅ Sign-Off Criteria

### Accessibility:
- [ ] ✅ No critical errors in axe DevTools
- [ ] ✅ Lighthouse Accessibility score ≥90 on all tested pages
- [ ] ✅ Keyboard navigation functional across entire site
- [ ] ✅ Screen reader testing completed (at least NVDA or VoiceOver)
- [ ] ✅ All touch targets ≥44x44px (preferably 48x48px)

### Performance:
- [ ] ✅ Lighthouse Performance score ≥90 on homepage
- [ ] ✅ Lighthouse Performance score ≥85 on booking page
- [ ] ✅ LCP ≤2.5s on mobile 4G
- [ ] ✅ CLS ≤0.1 on all pages
- [ ] ✅ Font loading optimized (font-display: swap)
- [ ] ✅ Images lazy-loaded and optimized

---

## 📊 Test Results Template

```markdown
## Test Run: [Date]
**Tester:** [Name]
**Browser:** Chrome 120 / Firefox 121 / Safari 17

### Accessibility Results:
| Page | axe Errors | Lighthouse A11y | Keyboard Nav | Screen Reader |
|------|------------|-----------------|--------------|---------------|
| /    | 0          | 98              | ✅           | ✅            |
| /pricing | 0      | 97              | ✅           | ✅            |
| /book | 1 (fixed) | 95              | ✅           | ⚠️ Label missing |

### Performance Results:
| Page | LCP | FID | CLS | Performance Score |
|------|-----|-----|-----|-------------------|
| /    | 1.8s | 50ms | 0.05 | 94 |
| /pricing | 2.1s | 60ms | 0.08 | 91 |
| /book | 2.4s | 80ms | 0.03 | 88 |

### Issues Found:
1. **[FIXED]** /book - Missing aria-label on service selector button
2. **[FIXED]** /doctors - Badge text contrast 3.2:1 (below 4.5:1 threshold)
3. **[OPEN]** /pricing - CLS from PriceCard images (0.12, above 0.1 threshold)

### Recommendations:
- Add explicit height to PriceCard to prevent CLS
- Consider preloading first 3 doctor images on /doctors
- Add skip link to bypass header navigation
```

---

## 🔗 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Extension](https://wave.webaim.org/extension/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA Screen Reader](https://www.nvaccess.org/download/)

---

**Last Updated:** [Auto-generated timestamp]
**Phase:** 3 (Production Polish)
**Status:** Ready for Manual Testing
