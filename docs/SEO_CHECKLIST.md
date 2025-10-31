# SEO Checklist & Strategy

**Version:** 1.0.0  
**Last Updated:** October 30, 2025

## Table of Contents

1. [Per-Page SEO Requirements](#per-page-seo-requirements)
2. [Schema Markup Coverage](#schema-markup-coverage)
3. [Technical SEO](#technical-seo)
4. [Content SEO](#content-seo)
5. [Local SEO](#local-seo)
6. [Healthcare-Specific Guidelines](#healthcare-specific-guidelines)
7. [Validation & Testing](#validation--testing)
8. [Internal Linking Strategy](#internal-linking-strategy)

---

## Per-Page SEO Requirements

### Universal Requirements (All Pages)

- [ ] **Title Tag**: Unique, 50-60 characters, includes primary keyword
- [ ] **Meta Description**: Unique, 150-160 characters, compelling CTA
- [ ] **Canonical URL**: Self-referencing canonical tag
- [ ] **OpenGraph Tags**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] **Twitter Cards**: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] **Structured Data**: At least one schema type
- [ ] **H1 Tag**: Single H1, includes primary keyword
- [ ] **Image Alt Text**: Descriptive alt attributes on all images
- [ ] **Internal Links**: 3-5 contextual links to related pages
- [ ] **Mobile Responsive**: Passes mobile-friendly test
- [ ] **Page Speed**: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

### Homepage (`/`)

#### Meta Tags
```html
<title>Glowheal - Online Doctor Consultation | Video Call with Specialists</title>
<meta name="description" content="Connect with 500+ verified doctors online. Video consultation for dermatology, mental health, nutrition & more. Book appointment from ₹499. Available 24/7." />
<link rel="canonical" href="https://glowheal.in/" />
```

#### Schema Requirements
- [x] **Organization** (https://schema.org/Organization)
  - Name, URL, logo, contactPoint, sameAs (social links)
- [x] **MedicalOrganization** (https://schema.org/MedicalOrganization)
  - All Organization properties + medicalSpecialty
- [x] **WebSite** with SearchAction
- [ ] **AggregateRating** (optional, if reviews displayed)

#### SEO Checklist
- [ ] H1: "Online Doctor Consultation with Verified Specialists"
- [ ] Include service keywords naturally (dermatology, mental health, etc.)
- [ ] Trust signals: "500+ Doctors", "50,000+ Consultations"
- [ ] 3 internal links: to /services, /doctors, /about

---

### Service Hub (`/services`)

#### Meta Tags
```html
<title>Our Healthcare Services | 12 Specialties | Glowheal</title>
<meta name="description" content="Expert online consultations for dermatology, hair care, weight management, mental health, nutrition, women's health & more. Certified specialists. Book now." />
```

#### Schema Requirements
- [x] **MedicalOrganization**
- [x] **BreadcrumbList**
- [ ] **ItemList** (list of services)

#### SEO Checklist
- [ ] H1: "Comprehensive Healthcare Services"
- [ ] Filter keywords: "dermatology online", "mental health counseling"
- [ ] Link to all 12 service pages
- [ ] Trust badges visible

---

### Service Pages (`/services/[slug]`)

#### Meta Tags (Example: Dermatology)
```html
<title>Online Dermatologist Consultation | Skin Care Treatment | Glowheal</title>
<meta name="description" content="Connect with certified dermatologists online. Get treatment for acne, pigmentation, hair fall & more. Video consultation from ₹499. Book now!" />
```

#### Schema Requirements
- [x] **MedicalOrganization** with `medicalSpecialty`
- [x] **FAQPage** (15 FAQ items per service)
- [x] **BreadcrumbList**
- [ ] **AggregateRating** (if reviews available)
- [ ] **Offer** (for pricing tiers)

#### SEO Checklist
- [ ] H1: "[Service Name] - Expert Care for [Benefit]"
- [ ] Long-form content: 1,500+ words
- [ ] Conditions list with H3 subheadings
- [ ] Before/after section with "Results may vary" disclaimer
- [ ] 6-step process with visual timeline
- [ ] Featured doctors section (links to profiles)
- [ ] Pricing table with clear CTAs
- [ ] 15-item FAQ with accordion UI
- [ ] Internal links: related services, city pages, blog posts
- [ ] CTA buttons: 3-4 per page

---

### Doctor Directory (`/doctors`)

#### Meta Tags
```html
<title>Find Doctors Online | 500+ Specialists | Video Consultation | Glowheal</title>
<meta name="description" content="Browse 500+ verified doctors across 12 specialties. Filter by city, language, price, rating. Video consultation from ₹499. Book appointment now!" />
```

#### Schema Requirements
- [x] **MedicalOrganization**
- [x] **BreadcrumbList**
- [ ] **ItemList** (list of doctors, paginated)

#### SEO Checklist
- [ ] H1: "Find the Right Doctor for You"
- [ ] Filter UI: specialty, city, language, gender, availability, price, rating
- [ ] Sort options: rating, experience, price
- [ ] Results count: "Showing 24 of 500 doctors"
- [ ] Pagination with rel="next" and rel="prev"
- [ ] Link to individual profiles

---

### Doctor Profile (`/doctors/[slug]`)

#### Meta Tags (Example)
```html
<title>Dr. Priya Sharma - Dermatologist in Mumbai | Online Consultation | Glowheal</title>
<meta name="description" content="Book online video consultation with Dr. Priya Sharma, MD Dermatology. 12+ years experience. Treats acne, pigmentation, hair fall. Fee: ₹799. Available today." />
```

#### Schema Requirements
- [x] **Physician** (https://schema.org/Physician)
  - name, image, jobTitle, worksFor, medicalSpecialty, memberOf
- [x] **AggregateRating**
- [x] **BreadcrumbList**
- [ ] **Review** (individual reviews)

#### SEO Checklist
- [ ] H1: "Dr. [Name], [Specialty]"
- [ ] Credentials: education, registration number, experience
- [ ] Specialties and conditions treated
- [ ] Languages spoken
- [ ] Consultation fee and availability
- [ ] Patient reviews (if available)
- [ ] "Book Consultation" CTA above fold
- [ ] Related doctors: same specialty or city

---

### City Hub (`/cities`)

#### Meta Tags
```html
<title>Healthcare Services by City | Mumbai, Pune, Hyderabad | Glowheal</title>
<meta name="description" content="Access quality healthcare in Mumbai, Pune, Hyderabad & more. Connect with local specialists online. Video consultation from ₹499." />
```

#### Schema Requirements
- [x] **MedicalOrganization**
- [x] **BreadcrumbList**
- [ ] **ItemList** (list of cities)

#### SEO Checklist
- [ ] H1: "Healthcare Services Across India"
- [ ] Interactive SVG map of India
- [ ] City cards with stats (doctors, patients, specialties)
- [ ] Link to city-service combination pages
- [ ] Trust signals per city

---

### City-Service Pages (`/cities/[city]/[service]`)

#### Meta Tags (Example: Mumbai Dermatology)
```html
<title>Dermatologist in Mumbai Online | Skin Doctor Consultation | Glowheal</title>
<meta name="description" content="Book online consultation with top dermatologists in Mumbai. 50+ certified skin specialists. Treat acne, pigmentation & more. Fee from ₹499." />
```

#### Schema Requirements
- [x] **LocalBusiness** (https://schema.org/LocalBusiness)
  - address, geo, telephone, areaServed
- [x] **MedicalOrganization**
- [x] **BreadcrumbList**
- [ ] **AggregateRating**

#### SEO Checklist
- [ ] H1: "[Service] in [City] - Online Consultation"
- [ ] Local keywords: "dermatologist in mumbai", "skin doctor mumbai online"
- [ ] NAP consistency: Name, Address, Phone
- [ ] City-specific stats: doctors count, patients served
- [ ] Localized testimonials
- [ ] Partner clinics section (if applicable)
- [ ] Local trust signals
- [ ] Link to doctor profiles in that city

---

### Packages Page (`/packages`)

#### Meta Tags
```html
<title>Healthcare Packages & Pricing | Consultation Plans | Glowheal</title>
<meta name="description" content="Affordable healthcare packages starting from ₹499. Single consultation, monthly plans & annual memberships. Save up to 30%. Book now!" />
```

#### Schema Requirements
- [x] **Product** or **Service**
- [ ] **Offer**
- [x] **BreadcrumbList**

#### SEO Checklist
- [ ] H1: "Flexible Healthcare Packages for Every Need"
- [ ] Comparison table: 3 tiers
- [ ] ROI calculator (interactive)
- [ ] Payment options: UPI, cards, EMI
- [ ] Guarantee badge
- [ ] Pricing FAQ

---

### Blog Hub (`/blog`)

#### Meta Tags
```html
<title>Health & Wellness Blog | Expert Medical Advice | Glowheal</title>
<meta name="description" content="Read expert articles on skin care, mental health, nutrition, weight loss & more. Written by certified doctors. Stay informed about your health." />
```

#### Schema Requirements
- [x] **BreadcrumbList**
- [ ] **Blog** or **ItemList**

---

### Blog Post (`/blog/[slug]`)

#### Meta Tags (Example)
```html
<title>10 Natural Remedies for Acne | Dermatologist Tips | Glowheal Blog</title>
<meta name="description" content="Discover effective natural remedies for acne from certified dermatologists. Evidence-based tips for clear, healthy skin. Read more." />
```

#### Schema Requirements
- [x] **Article** (https://schema.org/Article)
  - headline, author, datePublished, dateModified, image
- [x] **BreadcrumbList**
- [ ] **FAQPage** (if FAQ section included)
- [ ] **Person** (author schema)

#### SEO Checklist
- [ ] H1: Article title
- [ ] Featured image with descriptive alt text
- [ ] Author card with credentials
- [ ] Table of contents (for long articles)
- [ ] FAQ block at end
- [ ] Related articles: 3-5 links
- [ ] CTA to related service
- [ ] Social share buttons

---

### Testimonials (`/testimonials`)

#### Meta Tags
```html
<title>Patient Success Stories & Reviews | Real Results | Glowheal</title>
<meta name="description" content="Read verified patient reviews and success stories. See real before/after results. 4.8/5 rating from 10,000+ patients. Book consultation now." />
```

#### Schema Requirements
- [x] **AggregateRating**
- [ ] **Review** (individual testimonials)
- [x] **BreadcrumbList**

#### SEO Checklist
- [ ] H1: "Real Stories, Real Results"
- [ ] Filter: service, video testimonials, before/after
- [ ] Aggregate stats: average rating, total reviews
- [ ] Video testimonial modals
- [ ] "Results may vary" disclaimer
- [ ] CTA: "Share Your Story"

---

### Landing Page (`/landing/glowheal-offer`)

#### Meta Tags
```html
<title>Special Offer: 50% Off First Consultation | Limited Time | Glowheal</title>
<meta name="description" content="Limited time offer! Get 50% off your first doctor consultation. Video call with specialists from ₹249. Valid for 7 days. Book now!" />
<meta name="robots" content="noindex, nofollow" /> <!-- If not for organic -->
```

#### Schema Requirements
- [x] **Offer**
- [x] **Organization**

#### SEO Checklist
- [ ] H1: Urgent, benefit-driven headline
- [ ] Countdown timer
- [ ] Bold benefits list
- [ ] Social proof: reviews, patient count
- [ ] Simplified pricing
- [ ] Minimal navigation (focused experience)
- [ ] Sticky bottom CTA bar
- [ ] Exit-intent modal

---

### About Page (`/about`)

#### Meta Tags
```html
<title>About Glowheal | Our Mission, Team & Values | Healthcare Platform</title>
<meta name="description" content="Learn about Glowheal's mission to democratize healthcare. Meet our team, read our story, and discover why doctors trust us. Join 500+ specialists." />
```

#### Schema Requirements
- [x] **Organization**
- [x] **BreadcrumbList**
- [ ] **Person** (for leadership team)

---

### Contact Page (`/contact`)

#### Meta Tags
```html
<title>Contact Us | Customer Support | Glowheal</title>
<meta name="description" content="Get in touch with Glowheal. Email, phone, WhatsApp support available. Response within 24 hours. We're here to help!" />
```

#### Schema Requirements
- [x] **Organization** with `contactPoint`
- [x] **LocalBusiness** (if physical address)

---

## Schema Markup Coverage

### Schema Priority Matrix

| Schema Type | Priority | Pages | Validation Tool |
|-------------|----------|-------|-----------------|
| **Organization** | Critical | All pages | Google Rich Results Test |
| **MedicalOrganization** | Critical | Service pages, city pages | Schema Markup Validator |
| **Physician** | Critical | Doctor profiles | Google Rich Results Test |
| **LocalBusiness** | High | City-service pages, contact | Google Rich Results Test |
| **FAQPage** | High | Service pages, blog posts | FAQ Rich Results Test |
| **AggregateRating** | High | Doctor profiles, testimonials | Review Snippet Tool |
| **BreadcrumbList** | High | All non-homepage pages | Breadcrumb Test |
| **Article** | High | Blog posts | Article Rich Results |
| **Review** | Medium | Testimonials, doctor profiles | Review Rich Results |
| **Offer** | Medium | Packages, landing page | Offer Test |
| **Product/Service** | Medium | Packages | Product Test |
| **WebSite** | Low | Homepage only | N/A |

---

### Schema Implementation Examples

#### Organization + MedicalOrganization (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "MedicalOrganization"],
  "name": "Glowheal",
  "url": "https://glowheal.in",
  "logo": "https://glowheal.in/logo.png",
  "description": "Digital wellness platform connecting patients with verified doctors",
  "telephone": "+91-XXXXXXXXXX",
  "email": "support@glowheal.in",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/glowheal",
    "https://www.instagram.com/glowheal",
    "https://www.linkedin.com/company/glowheal"
  ],
  "medicalSpecialty": [
    "Dermatology",
    "Psychiatry",
    "Gynecology",
    "Endocrinology",
    "Nutrition"
  ]
}
```

#### Physician (Doctor Profile)

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Priya Sharma",
  "image": "https://glowheal.in/images/doctors/dr-priya-sharma.jpg",
  "jobTitle": "Dermatologist",
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Glowheal"
  },
  "medicalSpecialty": "Dermatology",
  "memberOf": {
    "@type": "ProfessionalService",
    "name": "Indian Medical Association"
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "AIIMS Delhi"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "524"
  }
}
```

#### FAQPage (Service Page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What skin conditions can be treated online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our dermatologists can treat acne, pigmentation, eczema, psoriasis, hair fall, fungal infections, and provide anti-aging consultations online."
      }
    }
  ]
}
```

#### LocalBusiness (City-Service Page)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalOrganization"],
  "name": "Glowheal - Dermatology Services in Mumbai",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.0760",
    "longitude": "72.8777"
  },
  "areaServed": {
    "@type": "City",
    "name": "Mumbai"
  },
  "medicalSpecialty": "Dermatology",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "1250"
  }
}
```

---

## Technical SEO

### Sitemap Structure

#### Main Sitemap (`/sitemap.xml`)
```xml
<sitemapindex>
  <sitemap>
    <loc>https://glowheal.in/sitemap-pages.xml</loc>
    <lastmod>2025-10-30</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://glowheal.in/sitemap-services.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://glowheal.in/sitemap-doctors.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://glowheal.in/sitemap-cities.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://glowheal.in/sitemap-blog.xml</loc>
  </sitemap>
</sitemapindex>
```

#### Priority Guidelines
- Homepage: `1.0`
- Service pages: `0.9`
- Doctor profiles: `0.8`
- City-service pages: `0.8`
- Blog posts: `0.6`
- Legal pages: `0.3`

### Robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /data/leads/
Disallow: /docs/

Sitemap: https://glowheal.in/sitemap.xml
```

### Canonical Tags

- **Self-referencing**: Every page includes `<link rel="canonical" href="..." />`
- **Parameters**: Ignore tracking parameters (utm_*, fbclid, etc.)
- **Pagination**: Use `rel="next"` and `rel="prev"` on paginated pages

### URL Structure Best Practices

- **Lowercase**: All URLs lowercase
- **Hyphens**: Use hyphens, not underscores
- **Short**: Keep URLs concise (<80 characters)
- **Descriptive**: Include target keyword
- **No trailing slashes**: Consistent handling

---

## Content SEO

### Keyword Strategy

#### Primary Keywords (Homepage)
- online doctor consultation
- video call with doctor
- telemedicine india
- online healthcare platform

#### Service-Specific Keywords
- **Dermatology**: online dermatologist, skin doctor consultation, acne treatment online
- **Mental Health**: online therapy, psychiatrist consultation, counseling online
- **Weight Management**: online dietitian, weight loss doctor, nutrition consultation

#### Long-Tail Keywords (Blog)
- "how to treat acne naturally at home"
- "signs of vitamin D deficiency"
- "best diet for PCOS weight loss"

### Content Guidelines

#### Length Targets
- Homepage: 800-1,200 words
- Service pages: 1,500-2,500 words
- Doctor profiles: 300-500 words
- Blog posts: 1,200-2,000 words

#### Readability
- **Flesch Reading Ease**: 60-70 (8th-9th grade level)
- **Sentence length**: Average 15-20 words
- **Paragraph length**: 2-4 sentences
- **Subheadings**: Every 200-300 words

#### Healthcare Compliance
- **No medical claims**: Avoid definitive treatment promises
- **Disclaimers**: "Results may vary", "Consult a doctor before..."
- **Sources**: Link to authoritative medical sources
- **Professional review**: All content reviewed by licensed professionals

---

## Local SEO

### NAP Consistency

Ensure consistent Name, Address, Phone across:
- [ ] Website footer
- [ ] Contact page
- [ ] Google My Business
- [ ] Schema markup
- [ ] Directory listings

### City Pages Optimization

For each city-service combination:
- [ ] Unique content (not duplicated across cities)
- [ ] Local keywords in H1, title, meta
- [ ] City-specific stats and testimonials
- [ ] Embedded map (Google Maps)
- [ ] LocalBusiness schema with geo coordinates

---

## Healthcare-Specific Guidelines

### E-A-T Signals (Expertise, Authoritativeness, Trustworthiness)

#### Expertise
- [ ] Doctor credentials prominently displayed
- [ ] Medical registration numbers visible
- [ ] Education and experience highlighted
- [ ] Specializations clearly stated

#### Authoritativeness
- [ ] Author bylines on all medical content
- [ ] Link to authoritative medical sources (NIH, WHO, medical journals)
- [ ] Awards and recognition displayed
- [ ] Professional association memberships

#### Trustworthiness
- [ ] Privacy policy linked on all forms
- [ ] Secure connection (HTTPS)
- [ ] Contact information easily accessible
- [ ] Patient reviews with verification badges
- [ ] Clear refund/cancellation policy

### YMYL (Your Money Your Life) Compliance

- [ ] All health claims backed by evidence
- [ ] Disclaimers on treatment outcomes
- [ ] Clear pricing information
- [ ] Terms of service for consultations
- [ ] Data protection compliance statement

---

## Validation & Testing

### Pre-Launch Checklist

#### Schema Validation
- [ ] Google Rich Results Test: All critical pages
- [ ] Schema.org Validator: JSON-LD syntax check
- [ ] Google Search Console: Monitor rich results status

#### Technical SEO
- [ ] Google Mobile-Friendly Test: All page templates
- [ ] Google PageSpeed Insights: LCP, FID, CLS targets
- [ ] GTmetrix: Performance grades
- [ ] Screaming Frog: Crawl errors, broken links

#### On-Page SEO
- [ ] Ahrefs Site Audit: Technical issues
- [ ] Yoast SEO: Content optimization
- [ ] SEMrush: Keyword optimization

### Ongoing Monitoring

#### Weekly
- [ ] Google Search Console: Errors, manual actions
- [ ] Core Web Vitals: Field data review

#### Monthly
- [ ] Ranking tracker: Top 50 keywords
- [ ] Backlink profile: New links, toxic links
- [ ] Competitor analysis: Top 3 competitors

#### Quarterly
- [ ] Content audit: Update outdated content
- [ ] Schema audit: Validate all structured data
- [ ] Internal link audit: Fix broken links, add new links

---

## Internal Linking Strategy

### Anchor Text Guidelines
- **Branded**: "Glowheal", "our platform"
- **Exact match**: "online dermatologist consultation"
- **Partial match**: "consult a dermatologist online"
- **Generic**: "learn more", "read more" (avoid overuse)

### Link Flow Structure

```
Homepage (Authority: High)
├── /services (Hub)
│   ├── /services/dermatology
│   ├── /services/mental-health
│   └── ... (link to all 12 services)
├── /doctors (Hub)
│   └── /doctors/[slug] (link from service pages, blog posts)
├── /cities (Hub)
│   └── /cities/[city]/[service] (link from city hub, service pages)
└── /blog (Hub)
    └── /blog/[slug] (link to related services, doctors)
```

### Contextual Linking Rules

1. **Service to Service**: Link related services (e.g., Dermatology ↔ Hair Care)
2. **Service to Doctors**: Link 3-5 relevant doctor profiles from service pages
3. **Service to Blog**: Link to educational blog posts
4. **Blog to Service**: Every blog post links to 1-2 related services
5. **City to Doctors**: Link to doctors practicing in that city
6. **Doctor to Service**: Link doctor profiles back to specialty page

---

## Post-Launch Action Items

### Week 1
- [ ] Submit sitemaps to Google Search Console
- [ ] Submit sitemaps to Bing Webmaster Tools
- [ ] Set up Google Analytics 4 with custom events
- [ ] Configure Google Tag Manager

### Week 2-4
- [ ] Monitor indexing status in GSC
- [ ] Fix any crawl errors
- [ ] Submit rich results for manual review (if needed)
- [ ] Start building local citations

### Month 2-3
- [ ] Guest posting on healthcare blogs
- [ ] Doctor profile link building
- [ ] Local directory submissions (Justdial, Sulekha, etc.)
- [ ] Healthcare aggregator listings (Practo, Lybrate)

---

**Document Owner:** SEO Team  
**Review Cycle:** Monthly  
**Next Review:** November 30, 2025
