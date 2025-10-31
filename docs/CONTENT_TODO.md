# Content & Asset TODO

**Version:** 1.0.0  
**Last Updated:** October 30, 2025  
**Status**: 🔴 In Progress

## Table of Contents

1. [Visual Assets Required](#visual-assets-required)
2. [Copy & Content Requirements](#copy--content-requirements)
3. [Doctor Profiles](#doctor-profiles)
4. [Video Content](#video-content)
5. [Testimonials & Reviews](#testimonials--reviews)
6. [Legal & Compliance](#legal--compliance)

---

## Visual Assets Required

### Hero Images & Videos

#### Homepage Hero
- **Format**: MP4/WebM video (preferred) or high-res image
- **Dimensions**: 1920×1080px minimum
- **Subject**: Diverse patients + doctors in consultation
- **Mood**: Professional, warm, trustworthy
- **Duration** (if video): 10-15 seconds looping
- **File**: `/public/videos/hero-homepage.mp4`
- **Poster**: `/public/images/hero-homepage-poster.jpg`
- **Status**: 🔴 TODO

#### Service Page Heroes (12 total)

| Service | Filename | Subject | Status |
|---------|----------|---------|--------|
| Dermatology | `/images/services/dermatology-hero.jpg` | Glowing skin close-up, dermatologist with patient | 🔴 TODO |
| Hair Care | `/images/services/hair-care-hero.jpg` | Healthy hair, trichologist consultation | 🔴 TODO |
| Weight Management | `/images/services/weight-hero.jpg` | Fitness journey, healthy eating | 🔴 TODO |
| Mental Health | `/images/services/mental-health-hero.jpg` | Calm environment, therapy session | 🔴 TODO |
| Nutrition | `/images/services/nutrition-hero.jpg` | Colorful healthy food, meal planning | 🔴 TODO |
| Women's Health | `/images/services/womens-health-hero.jpg` | Female doctor + patient, supportive | 🔴 TODO |
| Men's Health | `/images/services/mens-health-hero.jpg` | Male doctor + patient, confidential | 🔴 TODO |
| Sleep & Stress | `/images/services/sleep-hero.jpg` | Peaceful sleeping, relaxation | 🔴 TODO |
| Gut Health | `/images/services/gut-health-hero.jpg` | Digestive health, nutrition | 🔴 TODO |
| Metabolic Health | `/images/services/metabolic-hero.jpg` | Blood sugar monitoring, healthy lifestyle | 🔴 TODO |
| Preventive Labs | `/images/services/labs-hero.jpg` | Lab testing, health checkup | 🔴 TODO |
| IV Therapy | `/images/services/iv-therapy-hero.jpg` | IV infusion, wellness center | 🔴 TODO |

### Background Images

#### Section Backgrounds
- **Purpose**: Behind service cards, testimonial sections, CTA blocks
- **Dimensions**: 1920×1080px
- **Style**: Soft gradients or abstract medical imagery
- **Files needed**: 8-10 variations
- **Directory**: `/public/images/backgrounds/`
- **Status**: 🔴 TODO

---

### Doctor Photos

#### Requirements
- **Format**: JPG, WebP
- **Dimensions**: 600×600px (square, centered face)
- **Background**: Professional (clinic or neutral)
- **Expression**: Friendly, approachable, confident
- **Attire**: White coat or professional attire
- **Consent**: Signed image release form
- **Count**: 24 sample profiles (expand to 500+)
- **Directory**: `/public/images/doctors/`
- **Status**: 🔴 TODO

#### Sample Filenames
```
/images/doctors/dr-priya-sharma.jpg
/images/doctors/dr-rajesh-kumar.jpg
/images/doctors/dr-anjali-desai.jpg
/images/doctors/dr-vikram-patel.jpg
... (20 more)
```

---

### Before/After Images

#### Gallery Requirements
- **Format**: JPG, WebP
- **Dimensions**: 800×600px (landscape)
- **Pairs**: 30+ before/after pairs across services
- **Watermark**: Glowheal logo (subtle)
- **Consent**: Written patient consent + disclaimer
- **Disclaimer**: "Results may vary. Individual results depend on various factors."
- **Directory**: `/public/images/before-after/`
- **Status**: 🔴 TODO

#### Consent Form Required
- [ ] Patient name, signature, date
- [ ] Permission to use images for marketing
- [ ] Understanding that results vary
- [ ] Right to revoke consent

#### Categories Needed
- Dermatology: Acne treatment (10 pairs)
- Hair Care: Hair regrowth (5 pairs)
- Weight Management: Weight loss journeys (8 pairs)
- Skin: Pigmentation removal (5 pairs)
- Other: Various conditions (2 pairs)

---

### Trust Badges & Icons

#### Required Icons/Badges
- **Format**: SVG (preferred) or PNG with transparency
- **Size**: 200×200px for logos, various for icons

| Asset | Purpose | Status |
|-------|---------|--------|
| Verified Doctor Badge | Doctor profiles | 🔴 TODO |
| Secure Payment Icon | Checkout/pricing | 🔴 TODO |
| 24/7 Support Icon | Footer, contact | 🔴 TODO |
| HIPAA Compliant Badge | Privacy sections | 🔴 TODO |
| ISO Certification | About page | 🔴 TODO |
| Award Badges | Homepage, about | 🔴 TODO |
| Payment Method Logos | Pricing (UPI, Visa, Mastercard, etc.) | 🔴 TODO |

**Directory**: `/public/images/badges/`

---

### Social Media Assets

#### Logo Variations
- **Primary**: Color logo (PNG, SVG)
- **White**: For dark backgrounds
- **Icon Only**: Square favicon versions
- **Sizes**: 16×16, 32×32, 192×192, 512×512

| File | Dimensions | Purpose | Status |
|------|------------|---------|--------|
| `/public/logo.svg` | Vector | Primary branding | 🔴 TODO |
| `/public/logo.png` | 512×512px | OpenGraph, schema | 🔴 TODO |
| `/public/favicon.ico` | 32×32px | Browser tab | 🔴 TODO |
| `/public/apple-touch-icon.png` | 180×180px | iOS home screen | 🔴 TODO |

#### OpenGraph Images (OG)
- **Dimensions**: 1200×630px
- **Format**: JPG or PNG
- **Purpose**: Social media shares
- **Required for**: Homepage, each service page, landing page
- **Directory**: `/public/images/og/`
- **Status**: 🔴 TODO

---

## Copy & Content Requirements

### Homepage

#### Hero Section
```
H1: [TODO: medical review]
Subheadline: [TODO: medical review]
Primary CTA: "Book Free Consultation"
Secondary CTA: "Browse Specialists"
```
**Status**: 🟡 Draft ready, needs medical review

#### Sticky Stats Bar
- **Doctors**: 500+ (verify actual count)
- **Patients Served**: 50,000+ (verify actual count)
- **Specialties**: 12
- **Satisfaction Rate**: 4.8/5.0 (verify with data)
**Status**: 🔴 TODO - Verify numbers

#### Services Grid
- **Copy**: One-sentence tagline per service
- **Status**: 🟢 Complete (from services.json)

#### How It Works (4 Steps)
```
Step 1: Choose Your Specialist
[TODO: Write engaging copy, 50-80 words]

Step 2: Book Your Slot
[TODO: Write engaging copy, 50-80 words]

Step 3: Video Consultation
[TODO: Write engaging copy, 50-80 words]

Step 4: Get Treatment Plan
[TODO: Write engaging copy, 50-80 words]
```
**Status**: 🔴 TODO

#### Benefits Section (6 Benefits)
```
1. 500+ Verified Doctors
[TODO: Description, 30-50 words]

2. Video Consultation in Minutes
[TODO: Description, 30-50 words]

3. Affordable Pricing
[TODO: Description, 30-50 words]

4. E-Prescriptions & Reports
[TODO: Description, 30-50 words]

5. Confidential & Secure
[TODO: Description, 30-50 words]

6. 24/7 Support
[TODO: Description, 30-50 words]
```
**Status**: 🔴 TODO

#### FAQs (15 items)
- [TODO: Write 15 common questions with answers]
- Each answer: 50-100 words
- **Status**: 🔴 TODO

---

### Service Pages (12 total)

#### Per Service Requirements

**Dermatology** (`/services/dermatology`)
- [ ] Hero headline + subheadline (medical review required)
- [ ] Problems section: 5-6 common skin problems (80-100 words each)
- [ ] Solutions section: How Glowheal helps (150 words)
- [ ] 6-step process: Consultation to treatment (50 words each step)
- [ ] Conditions list: Already in services.json ✅
- [ ] Pricing tiers: 3 options with feature lists
- [ ] FAQ: 15 dermatology-specific questions
- [ ] Success metrics: Patient satisfaction, average improvement time [TODO: verify data]
- **Status**: 🔴 TODO (copy writing + medical review)

**Repeat for remaining 11 services:**
- [ ] Hair Care
- [ ] Weight Management
- [ ] Mental Health
- [ ] Nutrition
- [ ] Women's Health
- [ ] Men's Health
- [ ] Sleep & Stress
- [ ] Gut Health
- [ ] Metabolic Health
- [ ] Preventive Labs
- [ ] IV Therapy

---

### City Pages (3 initial + expansions)

#### Mumbai (`/cities/mumbai`)
- [ ] H1: "Healthcare Services in Mumbai"
- [ ] Intro paragraph: 100-150 words (local keywords)
- [ ] Stats: Doctors in Mumbai, patients served (verify data)
- [ ] Testimonials: 5 Mumbai-specific patient stories [TODO]
- [ ] Partner clinics: List 10-15 partner clinics with addresses [TODO]
- [ ] NAP: Consistent across site
- **Status**: 🔴 TODO

#### Pune (`/cities/pune`)
- [ ] Similar to Mumbai
- **Status**: 🔴 TODO

#### Hyderabad (`/cities/hyderabad`)
- [ ] Similar to Mumbai
- **Status**: 🔴 TODO

---

### Landing Page (`/landing/glowheal-offer`)

#### Copy Requirements
- [ ] **Headline**: Urgent, benefit-driven (e.g., "Limited: 50% Off First Consultation")
- [ ] **Subheadline**: 1-2 sentences, clear value proposition
- [ ] **Benefits List**: 5-6 bullet points
- [ ] **Social Proof**: "10,000+ patients trust Glowheal"
- [ ] **Countdown Timer**: JavaScript component (7-day offer)
- [ ] **Pricing**: Simplified 1-2 tier display
- [ ] **CTA**: "Book Now for ₹249" (vs regular ₹499)
- [ ] **Exit-Intent Modal Copy**: "Wait! Don't miss this offer..."
- **Status**: 🔴 TODO

---

### About Page

#### Sections Required
```
1. Mission Statement (100 words) [TODO: medical review]
2. Company Story Timeline (5-7 milestones) [TODO: gather history]
3. Leadership Team (3-5 people with bios, 80-100 words each) [TODO]
4. Awards & Recognition (List with dates) [TODO: verify]
5. Why Doctors Choose Glowheal (6 benefits for doctors) [TODO]
```
**Status**: 🔴 TODO

---

### Blog Posts

#### Initial Blog Topics (12 posts to launch)

1. **"10 Signs You Need a Dermatologist"**
   - Length: 1,500 words
   - FAQ: 5 questions
   - Internal links: /services/dermatology, doctor profiles
   - Status: 🔴 TODO

2. **"Managing PCOS: Diet & Lifestyle Tips"**
   - Length: 1,800 words
   - FAQ: 6 questions
   - Internal links: /services/womens-health, /services/nutrition
   - Status: 🔴 TODO

3. **"Understanding Diabetes: A Complete Guide"**
   - Length: 2,000 words
   - FAQ: 8 questions
   - Internal links: /services/metabolic-health
   - Status: 🔴 TODO

4. **"Mental Health in the Workplace"**
   - Length: 1,400 words
   - FAQ: 5 questions
   - Internal links: /services/mental-health
   - Status: 🔴 TODO

5. **"Hair Fall Causes and Natural Remedies"**
   - Length: 1,600 words
   - FAQ: 6 questions
   - Internal links: /services/hair-care, /services/nutrition
   - Status: 🔴 TODO

6-12: [TODO: Define topics for remaining posts]

---

## Doctor Profiles

### Data Collection (per doctor)

#### Required Information
- [ ] Full name
- [ ] Primary specialty
- [ ] Sub-specialties (2-3)
- [ ] Years of experience
- [ ] Education (MBBS, MD, etc.) with institutions
- [ ] Medical registration number (verify)
- [ ] Languages spoken
- [ ] City/location
- [ ] Gender
- [ ] Consultation fee
- [ ] Available days/times
- [ ] Bio (100-150 words) - must be medically reviewed
- [ ] Conditions treated (5-10)
- [ ] Awards/recognition (if any)
- [ ] Professional photo (600×600px)
- [ ] Contract/agreement signed

**Current Status**: 
- Sample profiles: 4/24 ✅
- Full profiles needed: 500+
- **Status**: 🔴 TODO (scaling)

---

## Video Content

### Testimonial Videos

#### Requirements
- **Format**: MP4 (H.264), 1080p
- **Length**: 30-90 seconds per testimonial
- **Subject**: Patient (face visible or blurred based on preference)
- **Content**: Experience, condition, outcome
- **Consent**: Written video release form
- **Subtitles**: English (burned-in or SRT file)
- **Count Needed**: 20-30 videos across services
- **Directory**: `/public/videos/testimonials/`
- **Status**: 🔴 TODO

#### Categories
- Dermatology: 8 videos
- Mental Health: 5 videos
- Weight Management: 5 videos
- Women's Health: 4 videos
- Other services: 8 videos

### Doctor Introduction Videos (Optional Enhancement)

- **Format**: MP4, 1080p
- **Length**: 20-30 seconds
- **Content**: Doctor introduces themselves, specialty, approach
- **Count**: 20-50 doctors
- **Status**: 🟡 Future enhancement

---

## Testimonials & Reviews

### Written Testimonials

#### Collection Method
- Post-consultation email (7 days after)
- Review form: Name, Service, Rating, Comments
- Consent checkbox for publishing
- Optional: Photo upload

#### Required Fields
```json
{
  "patientName": "First name only (privacy)",
  "service": "Dermatology",
  "rating": 5,
  "comment": "100-200 words",
  "beforeAfter": "optional photo pair",
  "consent": true,
  "verificationStatus": "verified|pending"
}
```

**Target**: 100 testimonials at launch  
**Status**: 🔴 TODO (0/100)

### Video Testimonials
- See [Video Content](#video-content) section
- **Status**: 🔴 TODO (0/30)

---

## Legal & Compliance

### Legal Pages Content

#### Privacy Policy (`/legal/privacy`)
- [ ] **Length**: 1,500-2,000 words
- [ ] **Sections**: Data collection, usage, sharing, security, cookies, rights
- [ ] **Compliance**: GDPR, Indian IT Act 2000
- [ ] **Last updated**: Include date
- [ ] **FAQ schema**: 5 common privacy questions
- **Status**: 🔴 TODO - Requires legal review

#### Terms of Service (`/legal/terms`)
- [ ] **Length**: 1,200-1,800 words
- [ ] **Sections**: Service description, user responsibilities, payment terms, refunds, liability
- [ ] **Governing law**: Indian jurisdiction
- **Status**: 🔴 TODO - Requires legal review

#### Telemedicine Policy (`/legal/telemedicine-policy`)
- [ ] **Length**: 800-1,200 words
- [ ] **Sections**: Scope of services, limitations, emergency procedures, prescription policy
- [ ] **Compliance**: Telemedicine Practice Guidelines (India)
- **Status**: 🔴 TODO - Requires legal + medical review

#### Refund & Cancellation Policy
- [ ] **Length**: 400-600 words
- [ ] **Cancellation**: Before consultation, timeframe
- [ ] **Refund**: Process, timeline
- **Status**: 🔴 TODO - Requires legal review

---

## Localization (Future Phase)

### Language Support

#### Hindi Translation
- All major pages (home, services, about)
- **Status**: 🟡 Future (Phase 2)

#### Marathi Translation
- For Maharashtra region (Mumbai, Pune)
- **Status**: 🟡 Future (Phase 2)

#### Telugu Translation
- For Telangana/Andhra Pradesh (Hyderabad)
- **Status**: 🟡 Future (Phase 2)

---

## Asset Delivery Specifications

### Images
- **Format**: JPG (photos), PNG (graphics with transparency), WebP (modern browsers)
- **Compression**: 80-85% quality (balance file size + quality)
- **Naming**: Lowercase, hyphens, descriptive (`hero-dermatology-consultation.jpg`)
- **Alt Text**: Provide in separate CSV or JSON file

### Videos
- **Codec**: H.264 (MP4)
- **Resolution**: 1920×1080 (1080p) or 1280×720 (720p)
- **Frame Rate**: 24-30 fps
- **Bitrate**: 5-8 Mbps
- **Audio**: AAC, 128 kbps (if applicable)
- **Captions**: SRT file provided separately

### File Delivery
- **Method**: Google Drive, Dropbox, or WeTransfer
- **Structure**: Maintain folder structure as outlined above
- **Metadata**: Include spreadsheet with filenames, alt text, copyright info

---

## Priority Levels

### 🔴 Critical (Launch Blockers)
- Homepage hero image/video
- 12 service page hero images
- 24 doctor profile photos
- Homepage copy (medical reviewed)
- Legal pages (privacy, terms)

### 🟡 High Priority (Week 1-2 post-launch)
- Before/after gallery (30 pairs)
- Blog posts (first 5)
- Testimonial videos (first 10)
- Trust badges & icons
- Service page detailed copy

### 🟢 Medium Priority (Month 1-2)
- Remaining blog posts
- Additional doctor profiles (500+)
- City-specific content
- Additional testimonials

### ⚪ Low Priority (Future enhancements)
- Doctor intro videos
- Language translations
- Advanced calculators (BMI, health risk)

---

## Review & Approval Workflow

### Content Review Process
1. **Draft**: Writer creates initial copy
2. **Medical Review**: Licensed doctor reviews for accuracy and compliance
3. **Legal Review**: (for legal pages, disclaimers)
4. **SEO Review**: Keyword optimization, meta tags
5. **Final Approval**: Project lead approves
6. **Publication**: Deploy to site

### Asset Review Process
1. **Collection**: Source from photographers/videographers/designers
2. **Consent Verification**: Ensure all releases signed
3. **Quality Check**: Resolution, clarity, brand alignment
4. **Optimization**: Compress, format, naming
5. **Approval**: Project lead approves
6. **Upload**: Add to repository

---

## Tracking & Progress

### Weekly Content Meetings
- Review completed items
- Prioritize blockers
- Assign new tasks
- Medical review queue

### Metrics to Track
- Content completion: X/Total (%)
- Medical reviews pending: Count
- Assets delivered: X/Total (%)
- Legal reviews pending: Count

---

**Document Owner:** Content Team  
**Review Cycle:** Weekly  
**Next Review:** November 6, 2025

---

## Quick Status Overview

| Category | Total Items | Completed | In Progress | TODO | % Complete |
|----------|-------------|-----------|-------------|------|------------|
| Visual Assets | 80 | 0 | 5 | 75 | 0% |
| Copy (Pages) | 25 | 2 | 3 | 20 | 8% |
| Doctor Profiles | 500 | 4 | 20 | 476 | 1% |
| Videos | 30 | 0 | 0 | 30 | 0% |
| Testimonials | 100 | 0 | 0 | 100 | 0% |
| Blog Posts | 12 | 0 | 1 | 11 | 0% |
| Legal Pages | 4 | 0 | 0 | 4 | 0% |

**Overall Progress**: 🔴 2% Complete
