# 🔍 SCHEMA VALIDATION CHECKLIST - Rich Results Test

**Date:** October 30, 2025  
**Tool:** Google Rich Results Test  
**URL:** https://search.google.com/test/rich-results

---

## 📋 VALIDATION PROTOCOL

### How to Test:
1. Ensure dev server is running: `npm run dev`
2. Open https://search.google.com/test/rich-results
3. Enter full URL (e.g., http://localhost:3000)
   - OR view-source, copy JSON-LD, paste as "Code Snippet"
4. Click "Test URL" or "Test Code"
5. Check for "Valid" status and zero errors/warnings
6. Document results below

---

## ✅ ROUTE 1: Homepage (/)

**URL:** http://localhost:3000  
**Expected Schemas:** Organization + MedicalOrganization

### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Glowheal",
  "url": "https://glowheal.in",
  "logo": "https://glowheal.in/logo.png",
  "description": "India's leading online healthcare platform...",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-888-888-8888",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://facebook.com/glowheal",
    "https://instagram.com/glowheal",
    "https://twitter.com/glowheal"
  ]
}
```

**Validation Checklist:**
- [ ] Status: Valid / Warning / Error
- [ ] All required properties present (name, url)
- [ ] Logo URL resolves (⚠️ Currently placeholder path)
- [ ] Contact point correct
- [ ] Social media links present

**Notes:** _____________________

---

## ✅ ROUTE 2: Services Directory (/services)

**URL:** http://localhost:3000/services  
**Expected Schemas:** MedicalOrganization

### MedicalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal - Healthcare Services",
  "url": "https://glowheal.in/services",
  "description": "Comprehensive healthcare services...",
  "medicalSpecialty": [
    "Dermatology",
    "Mental Health",
    "Women's Health",
    ...
  ]
}
```

**Validation Checklist:**
- [ ] Status: Valid / Warning / Error
- [ ] MedicalOrganization type recognized
- [ ] Medical specialties array present
- [ ] All 12 specialties listed

**Notes:** _____________________

---

## ✅ ROUTE 3: Service Detail (/services/dermatology)

**URL:** http://localhost:3000/services/dermatology  
**Expected Schemas:** MedicalOrganization + FAQPage + BreadcrumbList

### MedicalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal Dermatology Services",
  "url": "https://glowheal.in/services/dermatology",
  "description": "Expert dermatology consultations...",
  "medicalSpecialty": "Dermatology",
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "Video Consultation"
    }
  ]
}
```

### FAQPage Schema ⚠️ CRITICAL
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What conditions do dermatologists treat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dermatologists treat acne, eczema, psoriasis..."
      }
    },
    ...
  ]
}
```

**FAQPage Validation Checklist:**
- [ ] FAQs visible on page (required for 2025 parity rules)
- [ ] JSON-LD questions match rendered Q&A exactly
- [ ] Conservative note present: "Rich results not guaranteed"
- [ ] All answers complete sentences
- [ ] No promotional language in FAQ

### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://glowheal.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://glowheal.in/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Dermatology",
      "item": "https://glowheal.in/services/dermatology"
    }
  ]
}
```

**Breadcrumb Validation Checklist:**
- [ ] Visible breadcrumb UI on page
- [ ] JSON-LD matches visible breadcrumbs
- [ ] Positions sequential (1, 2, 3...)
- [ ] URLs correct and absolute

**Notes:** _____________________

---

## ✅ ROUTE 4: Doctors Directory (/doctors)

**URL:** http://localhost:3000/doctors  
**Expected Schemas:** MedicalOrganization

### MedicalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal - Find Doctors Online",
  "url": "https://glowheal.in/doctors",
  "description": "Browse 500+ verified doctors...",
  "medicalSpecialty": [
    "Dermatology",
    "Mental Health",
    ...
  ]
}
```

**Validation Checklist:**
- [ ] Status: Valid / Warning / Error
- [ ] Specialty list present

**Notes:** _____________________

---

## ✅ ROUTE 5: Doctor Profile (/doctors/dr-priya-sharma)

**URL:** http://localhost:3000/doctors/dr-priya-sharma  
**Expected Schemas:** Physician + BreadcrumbList  
**CRITICAL:** NO AggregateRating (reviews are sample data, not real)

### Physician Schema 🚨 YMYL COMPLIANCE
```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Priya Sharma",
  "url": "https://glowheal.in/doctors/dr-priya-sharma",
  "image": "https://glowheal.in/images/doctors/placeholder.svg",
  "medicalSpecialty": "Dermatology",
  "description": "Board-certified dermatologist...",
  "memberOf": {
    "@type": "MedicalOrganization",
    "name": "Glowheal"
  },
  "knowsAbout": ["Acne Treatment", "Anti-Aging", "Laser Dermatology"],
  "educationalCredentialAwarded": [
    "MBBS - KEM Hospital, Mumbai",
    "MD Dermatology - AIIMS, Delhi"
  ]
  // ❌ NO aggregateRating property
  // ❌ NO review property
}
```

**CRITICAL Validation Checklist:**
- [ ] Status: Valid
- [ ] NO aggregateRating property present ✅
- [ ] NO review property present ✅
- [ ] Physician type recognized
- [ ] Medical specialty present
- [ ] Education credentials listed
- [ ] Image URL present (placeholder OK)

**BreadcrumbList:**
- [ ] Home > Doctors > Dr. Priya Sharma
- [ ] Positions: 1, 2, 3
- [ ] Visible breadcrumbs match JSON-LD

**Notes:** _____________________

---

## ✅ ROUTE 6: Booking Page (/book)

**URL:** http://localhost:3000/book  
**Expected Schemas:** MedicalOrganization

### MedicalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal - Book Consultation",
  "url": "https://glowheal.in/book",
  "description": "Book online consultation..."
}
```

**Validation Checklist:**
- [ ] Status: Valid / Warning / Error
- [ ] Basic properties present

**Notes:** _____________________

---

## ✅ ROUTE 7: Landing Page (/landing/glowheal-offer)

**URL:** http://localhost:3000/landing/glowheal-offer  
**Expected Schemas:** MedicalOrganization  
**robots:** noindex, nofollow (not intended for organic search)

### MedicalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal Special Offer",
  "url": "https://glowheal.in/landing/glowheal-offer",
  "description": "Limited time dermatology consultation offer..."
}
```

**Validation Checklist:**
- [ ] Status: Valid / Warning / Error
- [ ] Metadata includes robots: noindex, nofollow
- [ ] Not included in sitemap.xml

**Notes:** _____________________

---

## 📊 VALIDATION SUMMARY

### Results Overview:
- **Total Routes Tested:** ___ / 7
- **Valid Schemas:** ___ / 7
- **Warnings:** ___ (list below)
- **Errors:** ___ (list below)

### Critical Compliance Points:
- [ ] ✅ NO fake aggregateRating on doctor profiles
- [ ] ✅ FAQPage only where FAQs are visible
- [ ] ✅ FAQPage JSON-LD matches rendered Q&A exactly
- [ ] ✅ BreadcrumbList matches visible breadcrumbs
- [ ] ✅ All required schema properties present

### Warnings (if any):
1. _____________________
2. _____________________
3. _____________________

### Errors (if any):
1. _____________________
2. _____________________

---

## 🚨 COMMON ISSUES TO WATCH

### Issue 1: Logo/Image URLs
**Problem:** Logo or image paths don't resolve (404)  
**Impact:** Warning in Rich Results Test  
**Fix:** Use placeholder.svg for now, commission real assets  
**Blocker:** ⚠️ Not critical, document for Week 1

### Issue 2: FAQPage Parity
**Problem:** JSON-LD FAQs don't match visible FAQ section  
**Impact:** Schema invalid, rich results ineligible  
**Fix:** Ensure exact text match between markup and UI  
**Blocker:** 🔴 Critical, must fix before deploy

### Issue 3: AggregateRating Present
**Problem:** Doctor profiles have aggregateRating from sample data  
**Impact:** YMYL violation, fake reviews risk  
**Fix:** Remove all aggregateRating and review properties  
**Blocker:** 🔴 Critical, must fix before deploy  
**Status:** ✅ Already fixed (verified in previous session)

### Issue 4: Missing Required Properties
**Problem:** Schema missing @type, name, or url  
**Impact:** Schema invalid  
**Fix:** Add all required properties per schema.org spec  
**Blocker:** 🔴 Critical

---

## ✅ ADDITIONAL TESTS

### Test A: View Page Source
```powershell
# For each route, view source and verify JSON-LD:
1. Right-click page → "View Page Source"
2. Ctrl+F search for: <script type="application/ld+json">
3. Verify JSON-LD is present and valid JSON
4. Check for duplicate schemas (should be only 1-3 per page)
```

### Test B: Schema Markup Validator (Alternative)
```
# If Rich Results Test has issues, use:
1. Visit: https://validator.schema.org/
2. Paste view-source JSON-LD
3. Click "Validate"
4. Document any errors/warnings
```

### Test C: Mobile-Friendly Test
```
# Ensure schemas render correctly on mobile:
1. Visit: https://search.google.com/test/mobile-friendly
2. Enter page URL
3. Verify no mobile usability issues
4. Check that structured data is detected
```

---

## 📝 DOCUMENTATION TEMPLATE

**Copy this to SEO_CHECKLIST.md after testing:**

```markdown
## Schema Validation Results - Pre-Production
**Date:** October 30, 2025  
**Tested By:** [Your Name]  
**Tool:** Google Rich Results Test

### Route 1: Homepage (/)
- **Status:** ✅ Valid
- **Schemas:** Organization (Valid), MedicalOrganization (Valid)
- **Warnings:** Logo URL 404 (using placeholder)
- **Action:** Commission logo (Week 1)

### Route 2: Services Directory (/services)
- **Status:** ✅ Valid
- **Schemas:** MedicalOrganization (Valid)
- **Warnings:** None
- **Action:** None

### Route 3: Service Detail (/services/dermatology)
- **Status:** ✅ Valid / ⚠️ Warning / 🔴 Error
- **Schemas:** 
  - MedicalOrganization (Valid)
  - FAQPage (Valid) - Conservative note present
  - BreadcrumbList (Valid) - Matches visible UI
- **Warnings:** [List any]
- **Action:** [List fixes needed]

### Route 4: Doctors Directory (/doctors)
[Same format]

### Route 5: Doctor Profile (/doctors/dr-priya-sharma)
- **Status:** ✅ Valid
- **Schemas:** Physician (Valid - NO aggregateRating ✅)
- **Warnings:** Image URL using placeholder.svg
- **Action:** Commission doctor headshots (Week 1)
- **YMYL Compliance:** ✅ Passed (no fake reviews)

### Route 6: Booking Page (/book)
[Same format]

### Route 7: Landing Page (/landing/glowheal-offer)
[Same format]

### Overall Assessment:
- **Routes Validated:** 7/7
- **All Valid:** ✅ Yes / ⚠️ Warnings Only / 🔴 Has Errors
- **YMYL Compliance:** ✅ Passed
- **Deploy Gate:** ✅ Pass / ⚠️ Conditional Pass / 🔴 Fail

### Pre-Deploy Recommendation:
[Pass / Conditional Pass with notes / Fail with fixes required]
```

---

## 🚀 NEXT STEPS AFTER VALIDATION

### If All Schemas Valid ✅:
1. ✅ Mark schema validation complete
2. 📝 Document results in SEO_CHECKLIST.md
3. ➡️ Proceed to Lighthouse audits
4. 🚀 Green light for production deploy

### If Warnings Only ⚠️:
1. 📝 Document warnings (logo/image URLs, etc.)
2. ✅ Mark for Week 1 asset procurement
3. ➡️ Proceed to Lighthouse audits
4. 🚀 Conditional pass (launch with placeholders)

### If Errors Found 🔴:
1. 🛑 STOP deployment process
2. 📋 Create fix tickets for each error
3. 🔧 Fix schemas, re-test until valid
4. ✅ Re-run full validation
5. ❌ DO NOT proceed to production until errors resolved

---

**Created:** October 30, 2025  
**Status:** Ready for execution after font files downloaded  
**Estimated Time:** 30-45 minutes for all 7 routes

