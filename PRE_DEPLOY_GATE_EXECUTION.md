# 🚀 PRE-DEPLOY GATE - EXECUTION GUIDE

**Date:** October 30, 2025  
**Status:** 🟡 In Progress  
**Target:** Production-ready in 1-2 hours

---

## ⚠️ CRITICAL: FONT FILES DOWNLOAD (Priority 1)

### Manual Download Required (Browser-based)

**Time Estimate:** 10-15 minutes  
**Impact:** -200 to -500ms LCP improvement

### Step-by-Step Instructions:

#### 1. Download Inter Font (3 files)
```
1. Open browser: https://gwfh.mranftl.com/fonts/inter
2. Configuration:
   - Charsets: Check "latin" ONLY (uncheck others)
   - Styles: Check "regular" (400), "600", "700"
   - Formats: Select "woff2" ONLY
   - Options: Check "Best Support" + font-display "swap"
3. Click "Download" button
4. Extract inter.zip → you'll get 3 files:
   - inter-v13-latin-regular.woff2
   - inter-v13-latin-600.woff2
   - inter-v13-latin-700.woff2
```

#### 2. Download Poppins Font (2 files)
```
1. Open browser: https://gwfh.mranftl.com/fonts/poppins
2. Configuration:
   - Charsets: Check "latin" ONLY
   - Styles: Check "600", "700"
   - Formats: Select "woff2" ONLY
   - Options: Check "Best Support" + font-display "swap"
3. Click "Download" button
4. Extract poppins.zip → you'll get 2 files:
   - poppins-v20-latin-600.woff2
   - poppins-v20-latin-700.woff2
```

#### 3. Place Files in Project
```powershell
# Files should be placed here:
D:\web\glowheal\apps\web\public\fonts\

# Final structure:
apps/web/public/fonts/
├── inter-v13-latin-regular.woff2
├── inter-v13-latin-600.woff2
├── inter-v13-latin-700.woff2
├── poppins-v20-latin-600.woff2
└── poppins-v20-latin-700.woff2
```

#### 4. Verification Commands
```powershell
# After placing files, restart dev server
cd D:\web\glowheal
npm run dev

# Open http://localhost:3000 in Chrome
# Open DevTools → Network tab → Filter: Font
# Expected: 5 requests showing /fonts/*.woff2 (Status 200)
# NOT expected: fonts.googleapis.com requests

# Check file sizes (should be):
# inter-regular: ~90-120KB
# inter-600: ~90-120KB
# inter-700: ~90-120KB
# poppins-600: ~60-80KB
# poppins-700: ~60-80KB
```

---

## 📋 COMPLETE PRE-DEPLOY CHECKLIST

### ✅ Task 1: Font Files (IN PROGRESS)
**Status:** ⚠️ Awaiting manual download  
**Config:** ✅ Complete (globals.css + layout.tsx + preload)  
**Files:** ❌ Not yet downloaded  
**Action:** Follow instructions above  
**Verification:** DevTools Network tab shows /fonts/*.woff2 (200 OK)

---

### Task 2: Image Optimization
**Status:** 🔍 Analysis needed  
**Target:** Convert <img> → next/image with width/height  
**Priority assets:** Hero images need priority attribute  
**CLS target:** ≤0.1

**Analysis Commands:**
```powershell
# Find all <img> tags
cd D:\web\glowheal\apps\web
grep -r "<img" src/ --include="*.tsx"

# Check for next/image usage
grep -r "next/image" src/ --include="*.tsx"
```

---

### Task 3: Core Web Vitals Measurement
**Status:** 📊 Ready to measure after fonts  
**Routes to test:**
1. Home: http://localhost:3000
2. Service: http://localhost:3000/services/dermatology
3. Landing: http://localhost:3000/landing/glowheal-offer

**Targets:**
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- JS per route ≤ 160KB gzipped

**Measurement Tools:**
```powershell
# Lighthouse (already installed globally)
npx lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse-home.html --view

# DevTools CWV
# 1. Open Chrome DevTools
# 2. Go to Performance Insights tab
# 3. Record page load
# 4. Check LCP/INP/CLS values
```

---

### Task 4: Schema Validation
**Status:** ✅ Schemas implemented, ready for validation  
**Tool:** Google Rich Results Test  
**URL:** https://search.google.com/test/rich-results

**Schemas to Validate:**

1. **Home (/)** - Organization + MedicalOrganization
2. **Services (/services)** - MedicalOrganization
3. **Service Detail (/services/dermatology)** - MedicalOrganization + FAQPage + BreadcrumbList
4. **Doctors (/doctors)** - MedicalOrganization
5. **Doctor Profile (/doctors/dr-priya-sharma)** - Physician (NO AggregateRating) + BreadcrumbList
6. **Booking (/book)** - MedicalOrganization
7. **Landing (/landing/glowheal-offer)** - MedicalOrganization (noindex)

**Validation Checklist:**
- [ ] Organization: Valid on homepage
- [ ] MedicalOrganization: Valid on all service pages
- [ ] Physician: Valid, NO aggregateRating present
- [ ] FAQPage: Only where FAQs visible, matches rendered Q/A
- [ ] BreadcrumbList: Valid on inner pages
- [ ] LocalBusiness: (If implemented for city-service pages)

---

### Task 5: WhatsApp Integration Check
**Status:** ✅ Previously verified, final confirmation needed

**Verification Points:**
```tsx
// Expected format in WhatsAppButton.tsx:
const phoneNumber = '918329563445'; // E.164 format
const message = encodeURIComponent('Hello! I want to...');
const primaryUrl = `https://wa.me/${phoneNumber}?text=${message}`;
const fallbackUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

// Accessibility:
aria-label="Chat on WhatsApp"
className="w-12 h-12" // 48px minimum touch target

// Reduced motion:
@media (prefers-reduced-motion: reduce) {
  transition: none;
}
```

**Check Points:**
- [ ] Phone number: 918329563445 (E.164, no +)
- [ ] URL encoding: Uses encodeURIComponent()
- [ ] Fallback: api.whatsapp.com link present
- [ ] Touch target: ≥48px × 48px
- [ ] ARIA: Label present
- [ ] Motion: Reduced-motion media query
- [ ] Credentials: No Business API tokens in code

---

### Task 6: SEO Plumbing
**Status:** ✅ Implemented, needs final verification

**Routes to Check (7 total):**
1. / (Home)
2. /services (Services directory)
3. /services/[slug] (Service detail - test with /services/dermatology)
4. /doctors (Doctors directory)
5. /doctors/[slug] (Doctor profile - test with /doctors/dr-priya-sharma)
6. /book (Booking page)
7. /landing/glowheal-offer (Landing page)

**Verification Checklist Per Route:**
```tsx
// Each route should have:
export const metadata: Metadata = {
  title: 'Unique Title | Glowheal', // ✓ Unique per route
  description: 'Unique description 120-155 chars', // ✓ Unique per route
  alternates: {
    canonical: 'https://glowheal.in/exact-path', // ✓ Correct path
  },
  openGraph: {
    title: '...', // ✓ Present
    description: '...', // ✓ Present
    url: 'https://glowheal.in/exact-path', // ✓ Matches canonical
    images: [...], // ✓ Present
  },
  twitter: {
    card: 'summary_large_image', // ✓ Present
    title: '...',
    description: '...',
  },
};
```

**Sitemap Check:**
```powershell
# Visit http://localhost:3000/sitemap.xml
# Should include:
# - All static pages (/, /services, /doctors, /book)
# - All service pages (/services/dermatology, etc.)
# - All doctor pages (/doctors/dr-priya-sharma, etc.)
# - All city pages (if implemented)
```

**Robots.txt Check:**
```powershell
# Visit http://localhost:3000/robots.txt
# Should disallow: /docs, /api, /_next
# Should allow: Everything else
# Should reference: Sitemap
```

**Breadcrumbs Check:**
```tsx
// Inner pages should have:
1. Visible breadcrumb UI (Home > Services > Dermatology)
2. BreadcrumbList JSON-LD matching visible breadcrumbs
3. Correct position numbers (1, 2, 3...)
4. Valid URLs for each item
```

---

### Task 7: Lighthouse Audits
**Status:** ⚠️ Run after font files downloaded

**Commands:**
```powershell
# Create reports directory
cd D:\web\glowheal
mkdir -p reports

# Run Lighthouse on 3 key routes
npx lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse-home.html --view

npx lighthouse http://localhost:3000/services/dermatology --output html --output-path ./reports/lighthouse-service.html --view

npx lighthouse http://localhost:3000/landing/glowheal-offer --output html --output-path ./reports/lighthouse-landing.html --view
```

**Target Scores:**
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: 100

**Key Metrics:**
- LCP: ≤2.5s (Green)
- INP: ≤200ms (Green)
- CLS: ≤0.1 (Green)
- FCP: ≤1.8s
- TTFB: ≤800ms

**Document Results:**
```markdown
# In BUILD_STATUS.md, add:

## Lighthouse Scores (Pre-Production)
Date: October 30, 2025

### Homepage (/)
- Performance: XX/100
- Accessibility: XX/100
- Best Practices: XX/100
- SEO: XX/100
- LCP: X.Xs
- INP: XXXms
- CLS: 0.0X

Top 3 Opportunities:
1. ...
2. ...
3. ...

### Service Detail (/services/dermatology)
[Same format]

### Landing Page (/landing/glowheal-offer)
[Same format]
```

---

### Task 8: Deploy Gate Summary
**Status:** 🔄 Generate after all checks complete

**Output Format:**
```markdown
# PRODUCTION DEPLOY GATE - FINAL SUMMARY

## ✅ Finalized Routes (7 total)
- / (Home)
- /services (Services directory)
- /services/[slug] (12 service detail pages)
- /doctors (Doctors directory)
- /doctors/[slug] (4 doctor profiles)
- /book (Booking page)
- /landing/glowheal-offer (Promotional landing)

## ✅ JSON-LD Examples

### Home (Organization)
[Paste actual JSON-LD from view-source]

### Service Detail (MedicalOrganization + FAQPage + BreadcrumbList)
[Paste actual JSON-LD from view-source]

### Doctor Profile (Physician without AggregateRating)
[Paste actual JSON-LD from view-source]

## ✅ Asset Files Required
- Fonts: 5 WOFF2 files (✅ Downloaded / ❌ Pending)
- Doctor Images: 4 photos (🔴 Using placeholders - commission needed)
- Hero Image: 1 file (🔴 Pending)
- Logo + Favicons: 7 files (🔴 Pending)

## ⚠️ Medical Review Tags
- Landing page claims with disclaimers (needs legal sign-off)
- Doctor bios marked [TODO: medical review] (needs MD review)

## 🚀 Production Readiness: XX/100
```

---

## 🎯 EXECUTION ORDER

### Phase 1: Font Files (30 minutes)
1. ⏰ Download 5 font files (10-15 mins)
2. ✅ Place in public/fonts/
3. 🔄 Restart dev server
4. ✓ Verify in DevTools Network

### Phase 2: Verification (45 minutes)
5. 🔍 Check image optimization needs
6. 📊 Run Lighthouse audits (3 routes)
7. ✅ Validate schemas in Rich Results Test
8. ✓ Verify WhatsApp integration
9. ✓ Check SEO metadata + sitemap

### Phase 3: Documentation (15 minutes)
10. 📝 Document Lighthouse scores
11. 📋 Create deploy gate summary
12. ✅ Update BUILD_STATUS.md

**Total Time:** ~90 minutes (1.5 hours)

---

## 🚨 BLOCKERS TO WATCH

### Critical (Must Fix Before Deploy):
- [ ] Font files downloaded → LCP impact
- [ ] Lighthouse Performance ≥90 → Core Web Vitals
- [ ] Schema validation passing → Rich results eligibility

### High Priority (Week 1):
- [ ] Doctor photo placeholders → Commission real photos
- [ ] Medical review tags → Get MD/legal sign-offs

### Medium Priority (Post-Launch):
- [ ] Hero image → Commission or license
- [ ] Logo + favicons → Design + generate

---

## ✅ SUCCESS CRITERIA

**Deploy Gate PASSES if:**
1. ✅ All 5 font files present, no external font requests
2. ✅ Lighthouse Performance ≥85 on all 3 routes (≥90 target)
3. ✅ All schemas validate in Rich Results Test
4. ✅ WhatsApp links work with E.164 + fallback
5. ✅ Unique metadata on all 7 route types
6. ✅ Sitemap includes all pages
7. ✅ LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on Home

**Deploy Gate CONDITIONAL if:**
- ⚠️ Using placeholder doctor images (acceptable with note)
- ⚠️ Medical review tags pending (acceptable with legal sign-off schedule)
- ⚠️ Performance 80-89 (acceptable, document optimization plan)

**Deploy Gate FAILS if:**
- 🔴 Font files missing (LCP regression)
- 🔴 Schema validation errors
- 🔴 Performance <80
- 🔴 WhatsApp integration broken

---

## 📞 NEXT ACTIONS

**Immediate (You - 10-15 mins):**
1. Open https://gwfh.mranftl.com/fonts/inter
2. Download Inter fonts (3 files)
3. Open https://gwfh.mranftl.com/fonts/poppins
4. Download Poppins fonts (2 files)
5. Copy all 5 files to D:\web\glowheal\apps\web\public\fonts\

**After Fonts (Agent - 60-75 mins):**
6. Restart dev server
7. Run Lighthouse audits
8. Validate schemas
9. Verify SEO metadata
10. Generate deploy gate summary

**Result:**
- Production-ready build with 95-97/100 score
- Clear documentation of any pending items
- Go/no-go recommendation for launch

---

**Created:** October 30, 2025  
**Updated:** Pending font file downloads  
**Next Review:** After font files placed

