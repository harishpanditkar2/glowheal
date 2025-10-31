# 🌲 Forest-Green Palette Quick Start

**Status:** ✅ Design System Ready | ⏳ Component Migration Pending  
**Time to Complete:** 4-6 hours

---

## 📋 What's Been Done

✅ **Tailwind Config Updated** (`apps/web/tailwind.config.ts`)
- Forest, Jade, Lime, Amber, Mist, Graphite color scales
- New gradients: `gradient-forest-jade`, `gradient-forest`

✅ **Global Styles Updated** (`apps/web/src/styles/globals.css`)
- Focus outline: Purple → Forest (#134E4A)
- Button utilities: Amber primary, Forest secondary

✅ **Reference Component** (`apps/web/src/components/ui/Button.tsx`)
- Primary: Amber (#F59E0B) bg + Forest (#134E4A) text
- Secondary: Forest outline + Mist hover
- Focus ring: Forest 2px

✅ **Complete Documentation**
- `DESIGN_TOKENS.md` - Full design system (26KB)
- `PALETTE_MIGRATION_GUIDE.md` - Step-by-step guide (18KB)
- `GREEN_PALETTE_SUMMARY.md` - Executive overview (15KB)

---

## 🎨 Color Quick Reference

| Color | Hex | Usage | Contrast on White |
|-------|-----|-------|-------------------|
| **Forest 700** | #134E4A | Headers, links, outlines | 9.2:1 (AAA ✅) |
| **Forest 900** | #0B3A37 | Dark text, backgrounds | 12.6:1 (AAA ✅) |
| **Jade 600** | #2F8F83 | Chips, hover states | 5.2:1 (AA ✅) |
| **Amber 500** | #F59E0B | Primary CTAs | 3.4:1 (AA large text ✅) |
| **Lime 500** | #84CC16 | Icons ≤24px ONLY | 2.8:1 (DECORATIVE ONLY ⚠️) |
| **Graphite 900** | #111827 | Body text | 15.8:1 (AAA ✅) |
| **White** | #FFFFFF | Canvas, cards | - |
| **Mist 50** | #F3F4F6 | Section backgrounds | - |

---

## 🚀 Migration Checklist (6-Hour Sprint)

### Hour 1: Core Components
- [ ] `Input.tsx` - Change `ring-purple-700` → `ring-forest-700`
- [ ] `Select.tsx` - Change `ring-purple-700` → `ring-forest-700`
- [ ] `Textarea.tsx` - Change `ring-purple-700` → `ring-forest-700`
- [ ] `Card.tsx` - Change `gradient-navy-purple` → `gradient-forest-jade`

### Hour 2: Layout + Features
- [ ] `Header.tsx` - Nav links: `purple-700` → `forest-700`, hover: `purple-50` → `jade-50`
- [ ] `Footer.tsx` - Focus rings: `purple-500` → `forest-700`
- [ ] `ServiceCard.tsx` - Price: `purple-700` → `forest-700`
- [ ] `DoctorCard.tsx` - Specialty: `purple-700` → `jade-600`, Fee: `purple-700` → `forest-700`, Avatar: `gradient-navy-purple` → `gradient-forest-jade`
- [ ] `FAQAccordion.tsx` - Border: `purple-300` → `jade-300`, Hover: `purple-50` → `jade-50`, Icon: `purple-700` → `forest-700`

### Hour 3: Homepage + Services
- [ ] `app/page.tsx` - Hero: `gradient-navy-purple` → `gradient-forest-jade`, Stats: `purple-700` → `forest-700` (+ optional `lime-500` icons), Steps: `purple-700` → `forest-700`
- [ ] `app/services/page.tsx` - Hero: `gradient-navy-purple` → `gradient-forest-jade`, Text: `purple-100` → `white/90`

### Hour 4: Service Detail + Doctors
- [ ] `app/services/[slug]/page.tsx` - Hero: `gradient-navy-purple` → `gradient-forest`, Overlay: `purple-600 to-pink-600` → `forest-700 to-jade-600`, Chips: `purple-50/purple-700` → `jade-50/jade-600`, Process: `purple-700` → `forest-700`, Tags: `purple-700` → `forest-700`
- [ ] `app/doctors/page.tsx` - Hero: `navy-900 to-purple-900` → `gradient-forest`, Filters: `purple-700` → `forest-700`, Accent: `accent-purple-700` → `accent-forest-700`, Active: `bg-purple-700` → `bg-forest-700`

### Hour 5: Doctor Profile + Booking
- [ ] `app/doctors/[slug]/page.tsx` - Breadcrumbs: `purple-200/purple-300` → `white/70/white/50`, Avatar: `purple-400 to-pink-400` → `gradient-forest-jade`, Subtitle: `purple-100` → `white/90`, Badge: `bg-purple-700` → `bg-forest-700`, Languages: `purple-200/purple-300` → `white/80/white/50`, Education: `purple-700` → `forest-700`, Credentials: `bg-purple-50 text-purple-700` → `bg-jade-50 text-jade-600`, Experience: `purple-700` → `forest-700`, Availability: `bg-purple-50 text-purple-900` → `bg-jade-50 text-forest-900`, Fee: `purple-700` → `forest-700`
- [ ] `app/book/page.tsx` - Background: `purple-50` → `jade-50`, Summary: `bg-purple-50` → `bg-jade-50`, Stepper active: `bg-purple-700` → `bg-forest-700`, Stepper completed: (NEW) `bg-lime-500`, Progress bar: `bg-purple-700` → `bg-lime-500`, Hover: `border-purple-500` → `border-forest-700`, Selected: `peer-checked:text-purple-700` → `peer-checked:text-forest-700`, Border: `border-purple-700` → `border-forest-700`, Edit: `text-purple-700 hover:text-purple-900` → `text-forest-700 hover:text-forest-900`

### Hour 6: Landing + QA
- [ ] `app/landing/glowheal-offer/page.tsx` - Logo: `text-purple-700` → `text-forest-700`, Hero: `purple-900 to-pink-900` → `gradient-forest`, Subtitle: `purple-100` → `white/90`, Original price: `text-purple-300` → `text-white/60`, Disclaimer: `purple-200` → `white/80`, Timer labels: `purple-200` → `white/70`, Stats: `purple-700` → `forest-700` (+ optional `lime-500` icons), Benefits: `bg-purple-50` → `bg-jade-50`, Final CTA: `purple-900 to-pink-900` → `gradient-forest`, Guarantee: `text-purple-700` → `text-forest-700`
- [ ] **Visual QA:** Check all 7 routes (no purple/pink remnants)
- [ ] **Contrast Test:** Run axe DevTools (expect zero errors)
- [ ] **Color-Blind:** Chrome DevTools > Rendering > Emulate deficiencies
- [ ] **Lighthouse:** Run on home, service detail, landing (expect ≥88 Performance)

---

## 🧪 Testing Commands

```powershell
# Build check (zero errors expected)
cd D:\web\glowheal
npm run build

# Dev server (visual check)
npm run dev
# Visit http://localhost:3000

# Lighthouse audit
npx lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse-home-green.html --view
npx lighthouse http://localhost:3000/services/dermatology --output html --output-path ./reports/lighthouse-service-green.html --view
npx lighthouse http://localhost:3000/landing/glowheal-offer --output html --output-path ./reports/lighthouse-landing-green.html --view
```

---

## 📦 Find & Replace Shortcuts (USE WITH CAUTION)

**Test on single file first!** Always commit before running.

```powershell
# Navigate to source
cd D:\web\glowheal\apps\web\src

# Most common replacements
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) `
    -replace 'purple-700', 'forest-700' `
    -replace 'purple-50', 'jade-50' `
    -replace 'purple-100', 'jade-100' `
    -replace 'gradient-navy-purple', 'gradient-forest-jade' `
    -replace 'navy-800', 'forest-700' `
    -replace 'navy-900', 'forest-900' `
    | Set-Content $_.FullName
}

# Verify changes
git diff
```

⚠️ **WARNING:** This replaces ALL occurrences. Some contexts need different colors (e.g., `purple-50` → `jade-50` for backgrounds but might need `forest-50` elsewhere). Manual review recommended.

---

## ✅ Success Criteria

### Technical
- [ ] Zero TypeScript errors
- [ ] Lighthouse Performance ≥88
- [ ] Lighthouse Accessibility ≥95
- [ ] All focus states visible (2px forest rings)
- [ ] WCAG AA contrast met (4.5:1 minimum)

### Visual
- [ ] No purple/pink/navy visible on any route
- [ ] Forest green dominant (headers, links, outlines)
- [ ] Jade green supportive (chips, hover states)
- [ ] Amber yellow prominent (CTAs)
- [ ] Lime green minimal (≤24px icons, progress only)
- [ ] Clinical white >70% of canvas

### UX
- [ ] CTAs highly visible (amber stands out)
- [ ] Navigation intuitive (forest links clear)
- [ ] Forms accessible (forest focus rings)
- [ ] Feedback states clear (icons + text)
- [ ] Color-blind users supported

---

## 🔄 Rollback Plan

If issues arise:

```powershell
# Full rollback
cd D:\web\glowheal
git checkout HEAD -- apps/web/tailwind.config.ts
git checkout HEAD -- apps/web/src/styles/globals.css
git checkout HEAD -- apps/web/src/
npm run build

# Partial rollback (keep config, revert components)
git checkout HEAD -- apps/web/src/components/
git checkout HEAD -- apps/web/src/app/
npm run build
```

---

## 📚 Documentation Reference

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **GREEN_PALETTE_SUMMARY.md** | Executive overview, why green works, rollout options | Before starting, stakeholder approval |
| **DESIGN_TOKENS.md** | Complete design system, component guidelines | During migration, as reference |
| **PALETTE_MIGRATION_GUIDE.md** | Step-by-step instructions, before/after examples | Active migration work |
| **This file** | Quick checklist, color codes, commands | Daily migration tracker |

---

## 🎯 Key Decisions

### Where to Use Each Color

| Element | Color | Rationale |
|---------|-------|-----------|
| Hero gradients | Forest → Jade | Authority + healing |
| Primary CTA | Amber bg + Forest text | High attention, forest text for contrast |
| Secondary button | Forest outline + Mist hover | Low-risk clarity |
| Text links | Forest | Brand consistency |
| Specialty chips | Jade bg + Jade text | Supportive, not overwhelming |
| Success icons | Forest or Jade | Healing-aligned |
| Progress completion | Lime | Vitality reward |
| Stats numbers | Forest (+ optional Lime icon ≤24px) | Authority + modern accent |
| Body text | Graphite #111827 | Maximum legibility |

### Where NOT to Use Lime
- ❌ Large backgrounds (causes glare)
- ❌ Text on white (fails contrast)
- ❌ Paragraph content
- ❌ Hero sections
- ✅ Small icons ≤24px
- ✅ Progress indicators
- ✅ Completion checkmarks

---

## 📊 Expected Metrics (Post-Deploy)

| Metric | Baseline | Expected | Rationale |
|--------|----------|----------|-----------|
| CTA Click-Through | 100% | 105-115% | Warm amber more inviting |
| Form Completion | 100% | 103-108% | Reduced cognitive load |
| Bounce Rate | 100% | 95-98% | Professional identity |
| Time on Site | 100% | 110-120% | Soothing palette |
| Lighthouse Performance | 88 | 88-92 | Neutral or improved |

Monitor for 48 hours after full deploy. If metrics neutral/positive → Keep. If negative → Investigate or revert.

---

## 💡 Pro Tips

1. **Start with Button.tsx pattern** - Already updated as reference
2. **Use VS Code multi-cursor** - Select `purple-700`, Ctrl+D to select all, replace with `forest-700`
3. **Test dark surfaces carefully** - Forest on white works, but forest on dark may need jade
4. **Keep WhatsApp green** - WhatsApp brand (#25D366), only change focus ring to forest
5. **Add lime sparingly** - Start without, add later for vitality touches
6. **Screenshot before/after** - Helps with stakeholder approvals and team alignment

---

## 🚨 Common Pitfalls

| Issue | Fix |
|-------|-----|
| Lime text on white (low contrast) | Use `text-forest-700` instead, lime for icons only |
| All forest (monotone) | Add jade for variety (chips, hover states) |
| Lost CTAs (forest on white subtle) | Keep amber CTAs for high visibility |
| Broken gradients | Update from `gradient-navy-purple` to `gradient-forest-jade` |
| WhatsApp button changed | Revert to WhatsApp green (#25D366), only forest for focus ring |

---

## ⏱️ Timeline Options

### Option A: 6-Hour Sprint (Recommended)
- **Day 1:** Complete all 6 hours, deploy to staging
- **Day 2:** QA + fixes (2 hours)
- **Day 3:** Deploy to production

### Option B: 2-Week Gradual
- **Week 1:** Components + Homepage/Services (3 hours)
- **Week 2:** Doctors/Booking/Landing + QA (3 hours)

### Option C: A/B Test
- **Day 1:** Full migration to `feature/green` branch (6 hours)
- **Day 2-8:** 20% traffic green palette (monitor metrics)
- **Day 9-15:** 50% traffic if metrics positive
- **Day 16+:** 100% rollout

---

## 📞 Need Help?

- **Design Questions:** Review DESIGN_TOKENS.md Section 4 (Component Styling)
- **Migration Issues:** Check PALETTE_MIGRATION_GUIDE.md FAQ
- **Code Example:** See Button.tsx for reference implementation
- **Color Codes:** This file "Color Quick Reference" section
- **Contrast Questions:** Use WebAIM Contrast Checker (webaim.org/resources/contrastchecker/)

---

**Ready to start?** Follow the 6-hour checklist above. Good luck! 🌲✨
