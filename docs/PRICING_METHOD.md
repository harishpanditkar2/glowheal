# Glowheal Pricing Methodology

**Version:** 1.0  
**Effective Date:** October 31, 2025  
**City:** Pune (v1)

---

## Principles

### 1. Free-First Funnel
- **First consultation is always ₹0** with Glowheal's in-house doctor
- No hidden costs in the first consultation
- Free consultation applies to all specialties and conditions

### 2. Fixed Prices, No Tiers
- All specialist care and procedures sold at **Glowheal fixed prices**
- Partner doctors follow Glowheal pricing and inclusions
- No "Basic/Standard/Premium" plans
- No price ranges or "From ₹X" formatting
- Single transparent price per service/package

### 3. Clear Inclusions & Exclusions
- Every catalog item explicitly lists what's included
- Every catalog item explicitly lists what's excluded
- Add-ons (labs, implants, extended stays) are separate line items
- Add-ons require explicit consent and are billed separately

---

## Pune v1 Catalog

### Dermatology

| Code | Service | Price | Unit |
|------|---------|-------|------|
| `ACNE_PLAN_30` | Acne Care Plan (30 days) | ₹899 | plan |
| `PRP_HAIR_SINGLE` | PRP Hair (1 session) | ₹4,999 | session |
| `PRP_HAIR_4PK` | PRP Hair Package (4 sessions) | ₹17,999 | package |
| `HAIR_TX_1000` | Hair Transplant Up to 1000 grafts (FUE) | ₹49,999 | package |

**Market Context:**
- PRP Hair single session Pune market: ₹2,500–₹10,000 (typical)
- Glowheal fixed at ₹4,999 for affordability and competitiveness
- Hair transplant Pune 1000 grafts: ₹40,000–₹1,50,000 (typical)
- Glowheal fixed entry at ₹49,999 for up to 1000 grafts with clear add-on per-graft ladder

**References:**
- [VLCC PRP Pune](https://vlcc.com/blogs/prp-hair/prp-hair-treatment-pune-cost-benefits-results)
- [Hair Free Hair Grow PRP Pune](https://hairfreehairgrow.com/blog/prp-hair-treatment-cost-in-pune/)
- [ClearSkin PRP Pune](https://www.clearskin.in/treatments/prp-for-skin-treatment-in-pune/)
- [HairMD Transplant Pune](https://www.hairmdindia.com/blog/hair-transplant-cost-in-pune)
- [Ladensitae Transplant Pune](https://ladensitae.com/hair-transplant-cost-in-pune/)

---

### Mental Health

| Code | Service | Price | Unit |
|------|---------|-------|------|
| `THERAPY_STD` | Therapy Session (50–60 min) | ₹1,499 | session |
| `THERAPY_4PK` | Therapy 4-Session Pack | ₹5,299 | package |
| `PSY_FOLLOWUP` | Psychiatrist Follow-up | ₹1,299 | session |

**Market Context:**
- Therapy session Pune metro: ₹1,800–₹3,450 (typical)
- Glowheal fixed at ₹1,499 to be affordable and drive volume
- Psychiatrist follow-up metro: ₹1,000–₹3,450 (typical)
- Glowheal fixed at ₹1,299 to remain competitive while covering MD consult

**References:**
- [TherapyRoute India Costs 2025](https://www.therapyroute.com/article/how-much-does-therapy-cost-in-india-2025-by-therapyroute)
- [Mental Wellness Centre Psychiatrist Charges](https://www.mentalwellnesscentre.com/how-much-does-a-psychiatrist-charge-per-session-in-india/)

---

### Orthopedics

| Code | Service | Price | Unit |
|------|---------|-------|------|
| `ORTHO_FUP` | Ortho Specialist Follow-up | ₹899 | visit |
| `KNEE_ARTHRO_BASE` | Knee Arthroscopy (Base Package) | ₹1,49,999 | package |

**Market Context:**
- Ortho follow-up Pune: ₹700–₹1,500 (typical)
- Glowheal fixed at ₹899
- Knee arthroscopy packages Pune: ₹1,25,000–₹5,00,000 (range)
- Glowheal fixed base at ₹1,49,999 excluding implants and extended LOS

**References:**
- [Hexahealth Knee Arthroscopy Pune](https://www.hexahealth.com/treatment/knee-arthroscopy-cost-in-pune)

---

## Inclusions & Exclusions Policy

### What's Included (Standard)
- **Consultation fees** for listed specialist visits
- **Procedure fees** as specified in catalog item
- **Standard materials/kits** (e.g., PRP kit, local anesthesia)
- **Post-care guide** and first follow-up (where specified)
- **OT/Anesthesia charges** for surgical packages (where specified)

### What's Excluded (Standard)
- **Prescription medications** (patient purchases separately)
- **Diagnostic tests** (labs, X-rays, MRI) unless specified
- **Advanced technique upgrades** (e.g., robotic surgery, DHI for transplants)
- **Implants and hardware** (billed separately per add-on list)
- **Extended hospital stays** beyond specified days
- **ICU charges** (unless medically required and pre-approved)

### Add-On Consent Process
1. Free first consultation identifies treatment plan
2. Doctor presents catalog items + any required add-ons
3. Patient receives itemized quote with inclusions/exclusions
4. Patient provides explicit written consent
5. Add-ons billed separately after consent

---

## Governance

### Partner Doctor Agreement
- Partner doctors agree to follow Glowheal fixed prices for listed services in Pune
- Doctors may not charge patients above catalog price for listed items
- Add-ons must follow Glowheal add-on list pricing
- Deviations require Glowheal medical director approval

### Catalog Updates
- Catalog reviewed quarterly for market competitiveness
- Price changes require 30-day notice to partners
- New items added after clinical/financial review
- Item retirement requires 60-day sunset period

### Clinical Disclaimers
- Prices are for standard cases; complex cases may require add-ons
- Final treatment plan determined after free consultation
- Payment only required after consent, not at booking
- Refund policy per Glowheal terms of service

---

## Booking Flow Integration

### Step 1: Free Consultation (₹0)
- Patient books via /book with concern and city (Pune)
- Confirmation shows "Free first consultation confirmed"
- No payment required

### Step 2: Treatment Plan (After Free Consult)
- Doctor identifies condition during free consultation
- Doctor presents relevant catalog items from Pune catalog
- Patient can provisionally select items (optional)

### Step 3: Consent & Quote
- Patient receives itemized quote with:
  - Selected catalog items (fixed prices)
  - Required add-ons (if any)
  - Total estimated cost
  - Inclusions/exclusions for each item
- Patient provides written consent

### Step 4: Payment & Treatment
- Payment required only after consent
- Treatment proceeds per agreed plan
- Follow-ups as specified in catalog item

---

## Technical Implementation

### Data Structure
```json
{
  "city": "Pune",
  "citySlug": "pune",
  "currency": "INR",
  "teleconsult": { "first_consult": 0, "note": "..." },
  "specialties": [
    {
      "slug": "dermatology",
      "title": "Dermatology",
      "items": [
        {
          "code": "ACNE_PLAN_30",
          "name": "Acne Care Plan (30 days)",
          "price": 899,
          "unit": "plan",
          "includes": [...],
          "excludes": [...]
        }
      ]
    }
  ],
  "disclaimers": [...]
}
```

### Validation Rules
- All prices must be positive integers
- All codes must be unique across city catalog
- All items must have includes and excludes arrays
- All specialties must map to existing specialty slugs
- City slug must match filename (e.g., pune.json → citySlug: "pune")

### Display Guidelines
- Show fixed price with ₹ symbol and locale formatting
- Display "Free" for ₹0 items
- Never show ranges or "From ₹X"
- Always render includes/excludes with each price
- Use amber CTAs ("Start Free" / "Book Free Consultation")
- Add disclaimers at bottom of pricing pages

---

## SEO & Compliance

### Meta Tags
- Title: "Pune Fixed Prices | Free First Consultation | Glowheal"
- Description: "Transparent fixed prices for {specialty} in Pune. Free first consultation. No hidden costs."

### Clinical Disclaimers (Required on All Pricing Pages)
1. "Your first consultation is free with Glowheal's in-house doctor."
2. "Glowheal fixed prices apply to partner doctors for listed services in Pune."
3. "Add-ons (labs, implants, extended stay) are billed per Glowheal add-on list after consent."

### Schema Markup
- Use `MedicalBusiness` with `priceRange` showing city name only (not actual range)
- Do not add `AggregateRating` unless reviews are displayed on page
- Add `medicalSpecialty` per specialty page

---

## Accessibility Requirements

### Typography
- Minimum body text: 16px
- Headline price: ≥20px
- AA contrast ratio: 4.5:1 minimum

### Interactive Elements
- CTA buttons: 44–48px touch target
- Focus rings: 2px visible on all interactive elements
- Icons + text for includes/excludes (not icon-only)

### Performance
- Server-render pricing tables and cards
- Avoid heavy client-side logic
- Reuse forest/jade/amber design tokens

---

## Future Expansions

### Other Cities (Planned)
- Mumbai (Q1 2026)
- Bangalore (Q2 2026)
- Delhi NCR (Q3 2026)

### Other Specialties (Planned)
- Gynecology (Q1 2026)
- Pediatrics (Q2 2026)
- General Medicine (Q3 2026)

### Payment Integration (Planned)
- Online payment after consent (Q1 2026)
- EMI options for packages >₹10,000 (Q2 2026)
- Insurance claims support (Q3 2026)

---

**Document Version History:**
- v1.0 (Oct 31, 2025): Initial Pune catalog with Dermatology, Mental Health, Orthopedics
