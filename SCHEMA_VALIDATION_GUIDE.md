# 🔍 SCHEMA VALIDATION & RICH RESULTS TESTING GUIDE
**Glowheal Healthcare Platform - 2025 Compliance**

---

## 📋 OVERVIEW

This guide provides exact URLs and expected JSON-LD output for validating all structured data schemas in Google's Rich Results Test.

**Validation Tool:** https://search.google.com/test/rich-results

**Total Schemas to Test:** 6 types across 7 routes

---

## 1️⃣ HOMEPAGE - Organization + MedicalOrganization

### Test URL
```
http://localhost:3000/
Production: https://glowheal.in/
```

### Expected Schemas (2)

#### Schema 1: Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Glowheal",
  "url": "https://glowheal.in",
  "logo": "https://glowheal.in/logo.png",
  "description": "Digital wellness platform connecting patients with 500+ verified doctors across India. Video consultations for all healthcare specialties.",
  "telephone": "+91-XXXXXXXXXX",
  "email": "support@glowheal.in",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/glowheal",
    "https://www.instagram.com/glowheal",
    "https://www.linkedin.com/company/glowheal",
    "https://twitter.com/glowheal"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
}
```

#### Schema 2: MedicalOrganization
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal",
  "url": "https://glowheal.in",
  "logo": "https://glowheal.in/logo.png",
  "description": "Comprehensive telemedicine platform offering expert consultations across 12+ medical specialties.",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "medicalSpecialty": [
    "Dermatology",
    "Hair Care",
    "Weight Management",
    "Mental Health",
    "Nutrition & Dietetics",
    "Women's Health",
    "Men's Health",
    "Sleep & Stress",
    "Gut Health",
    "Metabolic Health",
    "Preventive Labs",
    "IV Therapy"
  ]
}
```

### Validation Steps
1. Navigate to http://localhost:3000/
2. View page source (Ctrl+U)
3. Search for `<script type="application/ld+json">`
4. Copy JSON-LD content
5. Paste into Rich Results Test
6. Verify "Valid" status for both schemas

**Expected Result:** ✅ Valid - Organization schema eligible for Knowledge Graph  
**Expected Result:** ✅ Valid - MedicalOrganization schema recognized

---

## 2️⃣ SERVICE PAGE - MedicalOrganization + FAQPage + BreadcrumbList

### Test URL
```
http://localhost:3000/services/dermatology
Production: https://glowheal.in/services/dermatology
```

### Expected Schemas (3)

#### Schema 1: MedicalOrganization
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Glowheal Dermatology Services",
  "url": "https://glowheal.in/services/dermatology",
  "medicalSpecialty": ["Dermatology"],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
}
```

#### Schema 2: FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What conditions can Dermatology treat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our dermatologists treat acne, eczema, psoriasis, pigmentation issues, hair loss, skin infections, and provide anti-aging consultations."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a Dermatology consultation cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consultation fees for Dermatology start from ₹499. Treatment costs vary based on the condition and typically range ₹500-₹5000."
      }
    },
    {
      "@type": "Question",
      "name": "Are the doctors verified and licensed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all doctors on Glowheal are verified with valid medical licenses and registrations. We conduct thorough background checks to ensure you receive care from qualified professionals."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a prescription after the consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, your doctor will send a digital prescription directly to your email after the consultation. You can also download it from your Glowheal dashboard."
      }
    }
  ]
}
```

⚠️ **IMPORTANT FAQ COMPLIANCE NOTE:**
- FAQPage markup included as FAQs are visible on page and match JSON-LD verbatim
- **However:** Google restricts FAQ rich results for health content to authoritative sites
- **Action Required:** Monitor Search Console for "FAQ (unparsable structure)" warnings
- **Fallback Plan:** If no rich results after 30 days, remove FAQPage schema but keep visible FAQs for UX
- **Code Reference:** `apps/web/src/app/services/[slug]/page.tsx:71-78`

#### Schema 3: BreadcrumbList
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

### Validation Steps
1. Navigate to http://localhost:3000/services/dermatology
2. Verify visible FAQ section matches schema questions/answers EXACTLY
3. View page source, find 3 `<script type="application/ld+json">` blocks
4. Test each schema separately in Rich Results Test
5. Verify breadcrumb UI renders correctly

**Expected Result:** ✅ Valid - MedicalOrganization recognized  
**Expected Result:** ⚠️ Valid markup, but FAQ rich results may not show (health content restriction)  
**Expected Result:** ✅ Valid - Breadcrumbs eligible for search results

---

## 3️⃣ DOCTOR PROFILE - Physician + BreadcrumbList (NO RATING)

### Test URL
```
http://localhost:3000/doctors/dr-priya-sharma
Production: https://glowheal.in/doctors/dr-priya-sharma
```

### Expected Schemas (2)

#### Schema 1: Physician (WITHOUT aggregateRating)
```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Priya Sharma",
  "url": "https://glowheal.in/doctors/dr-priya-sharma",
  "image": "https://glowheal.in/images/doctors/dr-priya-sharma.jpg",
  "medicalSpecialty": "Dermatology",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "MH",
    "addressCountry": "IN"
  }
}
```

🔴 **CRITICAL 2025 YMYL COMPLIANCE:**
- **aggregateRating INTENTIONALLY OMITTED**
- **Reason:** Reviews are sample data, not real patient reviews
- **Per 2025 Google Guidelines:** Only include ratings if reviews are authentic and verified
- **Risk if included:** Rich result suppression for fake YMYL healthcare reviews
- **Code Reference:** `apps/web/src/app/doctors/[slug]/page.tsx:51-78` (commented out)

**When to Add aggregateRating:**
```json
// Uncomment when real reviews exist:
// "aggregateRating": {
//   "@type": "AggregateRating",
//   "ratingValue": "4.8",
//   "reviewCount": "524",
//   "bestRating": "5",
//   "worstRating": "1"
// }
```

#### Schema 2: BreadcrumbList
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
      "name": "Doctors",
      "item": "https://glowheal.in/doctors"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Dr. Priya Sharma",
      "item": "https://glowheal.in/doctors/dr-priya-sharma"
    }
  ]
}
```

### Validation Steps
1. Navigate to http://localhost:3000/doctors/dr-priya-sharma
2. View page source
3. Verify Physician schema does NOT include aggregateRating
4. Test both schemas in Rich Results Test
5. Confirm "Valid" status

**Expected Result:** ✅ Valid - Physician schema eligible for Knowledge Panel  
**Expected Result:** ✅ Valid - No YMYL violations detected  
**Expected Result:** ✅ Valid - Breadcrumbs eligible

---

## 4️⃣ DOCTORS LISTING - Organization + BreadcrumbList

### Test URL
```
http://localhost:3000/doctors
Production: https://glowheal.in/doctors
```

### Expected Schemas (2)

#### Schema 1: Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Glowheal",
  "url": "https://glowheal.in",
  "logo": "https://glowheal.in/logo.png",
  "description": "Digital wellness platform connecting patients with 500+ verified doctors across India. Video consultations for all healthcare specialties.",
  "telephone": "+91-XXXXXXXXXX",
  "email": "support@glowheal.in",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/glowheal",
    "https://www.instagram.com/glowheal",
    "https://www.linkedin.com/company/glowheal",
    "https://twitter.com/glowheal"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
}
```

#### Schema 2: BreadcrumbList
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
      "name": "Find Doctors",
      "item": "https://glowheal.in/doctors"
    }
  ]
}
```

**Expected Result:** ✅ Valid for both schemas

---

## 5️⃣ SERVICES LISTING - Organization + BreadcrumbList

### Test URL
```
http://localhost:3000/services
Production: https://glowheal.in/services
```

### Expected Schemas (2)

#### Schema 1: Organization
(Same as homepage Organization schema)

#### Schema 2: BreadcrumbList
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
    }
  ]
}
```

**Expected Result:** ✅ Valid for both schemas

---

## 🧪 RICH RESULTS TEST - COMPLETE VALIDATION PROCEDURE

### Step 1: Test All Service Pages (12 total)
```
Services to test:
1. /services/dermatology
2. /services/hair-care
3. /services/weight-management
4. /services/mental-health
5. /services/nutrition
6. /services/womens-health
7. /services/mens-health
8. /services/sleep-stress
9. /services/gut-health
10. /services/metabolic-health
11. /services/preventive-labs
12. /services/iv-therapy
```

**For Each Service:**
- Validate MedicalOrganization schema
- Validate FAQPage schema (⚠️ note eligibility warnings)
- Validate BreadcrumbList schema
- Verify FAQ text matches schema EXACTLY

---

### Step 2: Test All Doctor Profiles (4 total)
```
Doctors to test:
1. /doctors/dr-priya-sharma
2. /doctors/dr-rajesh-kumar
3. /doctors/dr-anjali-desai
4. /doctors/dr-vikram-patel
```

**For Each Doctor:**
- Validate Physician schema (verify NO aggregateRating)
- Validate BreadcrumbList schema
- Confirm "Valid" status with no YMYL warnings

---

### Step 3: Document Results
Create table in `SEO_CHECKLIST.md`:

```markdown
## Rich Results Test - Validation Log

### October 30, 2025

| URL | Schema Type | Status | Notes |
|-----|-------------|--------|-------|
| / | Organization | ✅ Valid | Eligible for Knowledge Graph |
| / | MedicalOrganization | ✅ Valid | Specialties recognized |
| /services/dermatology | MedicalOrganization | ✅ Valid | Service-specific |
| /services/dermatology | FAQPage | ⚠️ Valid | Eligibility TBD (health content) |
| /services/dermatology | BreadcrumbList | ✅ Valid | Breadcrumbs eligible |
| /doctors/dr-priya-sharma | Physician | ✅ Valid | No YMYL violations |
| /doctors/dr-priya-sharma | BreadcrumbList | ✅ Valid | Doctor breadcrumbs OK |
```

---

## 📊 VALIDATION CHECKLIST

### Pre-Validation Requirements
- [ ] Dev server running: `npm run dev`
- [ ] All pages accessible at http://localhost:3000
- [ ] No console errors on any page
- [ ] FAQ sections visible on service pages
- [ ] FAQ text matches schema EXACTLY (word-for-word)

### Validation Process
- [ ] Test homepage schemas (Organization + MedicalOrganization)
- [ ] Test 12 service pages (MedicalOrganization + FAQPage + BreadcrumbList)
- [ ] Test 4 doctor profiles (Physician WITHOUT rating + BreadcrumbList)
- [ ] Test doctors listing (Organization + BreadcrumbList)
- [ ] Test services listing (Organization + BreadcrumbList)
- [ ] Document all results in SEO_CHECKLIST.md
- [ ] Note any warnings or errors
- [ ] Create action items for fixes

### Post-Validation Actions
- [ ] If FAQ warnings appear: Monitor Search Console for 30 days
- [ ] If no FAQ rich results: Remove FAQPage schema but keep visible FAQs
- [ ] If YMYL warnings: Verify no fake ratings in schemas
- [ ] Submit sitemap to Search Console after production deployment
- [ ] Monitor Rich Results report in Search Console (weekly for 4 weeks)

---

## 🔍 SEARCH CONSOLE MONITORING (POST-LAUNCH)

### Week 1 After Launch
1. Submit sitemap: https://glowheal.in/sitemap.xml
2. Check "Rich results" report
3. Monitor for "FAQ (unparsable structure)" warnings
4. Verify Organization schema in "Performance" report

### Week 2-4 After Launch
1. Monitor FAQ rich result impressions (may be zero for health content)
2. Check for any schema markup warnings
3. Verify breadcrumbs appearing in search results
4. Monitor physician profile rich results

### If FAQ Rich Results Don't Show (After 30 Days)
**Action:** Remove FAQPage schema from services pages

**Code Change (services/[slug]/page.tsx):**
```typescript
// Before (lines 102-104):
const faqSchema = buildFAQPageSchema(faqs);
return (
  <>
    <MultiSchemaRenderer schemas={[medicalOrgSchema, breadcrumbs, faqSchema]} />

// After:
// FAQPage schema removed per Search Console guidance (no rich results for health content)
return (
  <>
    <MultiSchemaRenderer schemas={[medicalOrgSchema, breadcrumbs]} />
    {/* Keep visible FAQs for UX even without schema */}
```

**Note:** Keep visible FAQ sections for user experience even if schema removed

---

## ✅ EXPECTED OUTCOMES

### Immediate (Upon Validation)
- ✅ All schemas pass "Valid" status in Rich Results Test
- ⚠️ FAQ schemas may show "Valid" but no rich result preview (expected for health content)
- ✅ No YMYL warnings on doctor profiles (thanks to removed fake ratings)
- ✅ Breadcrumbs show preview in Rich Results Test

### Post-Launch (4-6 Weeks)
- ✅ Organization Knowledge Panel in branded search
- ✅ Breadcrumbs in search results for inner pages
- ✅ Physician profiles eligible for Knowledge Panel (if high authority)
- ⚠️ FAQ rich results likely won't show (Google restricts health content)

### Long-Term (3-6 Months)
- Add real patient reviews with verified aggregateRating
- Monitor for doctor profile rich results (star ratings, reviews)
- Build domain authority for FAQ eligibility
- Expand schema coverage (Article for blog posts, Video for consultations)

---

## 🆘 TROUBLESHOOTING

### "Unparsable structured data" Error
**Cause:** JSON syntax error in schema  
**Fix:** Validate JSON at https://jsonlint.com/ before deployment

### "Missing required field" Warning
**Cause:** Schema missing required properties  
**Fix:** Check schema.org documentation for required fields

### FAQ Rich Results Not Showing
**Cause:** Google restricts FAQ for health content to authoritative sites  
**Fix:** Expected behavior, monitor for 30 days then remove schema if needed

### Physician Schema Not Recognized
**Cause:** Check if aggregateRating included without real reviews  
**Fix:** Remove fake ratings (already done in codebase)

---

## 📚 REFERENCE LINKS

- **Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Documentation:** https://schema.org/
- **Physician Schema:** https://schema.org/Physician
- **FAQPage Schema:** https://schema.org/FAQPage
- **MedicalOrganization Schema:** https://schema.org/MedicalOrganization
- **Google Search Central:** https://developers.google.com/search/docs/appearance/structured-data
- **FAQ Guidelines:** https://developers.google.com/search/docs/appearance/structured-data/faqpage
- **Healthcare Markup Best Practices:** https://healthcaresuccess.com/blog/seo/schema-markup-healthcare.html

---

**End of Schema Validation Guide** | Next: Execute validations and document results
