# 🎨 Asset Inventory & Requirements

**Project:** Glowheal Healthcare Platform  
**Date:** October 30, 2025  
**Status:** 🔴 40% Complete - Critical Assets Missing  

---

## 📊 Executive Summary

**Total Assets Required:** 537  
**Currently Available:** 0 (using placeholders)  
**Critical Priority:** 23 assets  
**High Priority:** 514 assets  

---

## 🔴 CRITICAL PRIORITY (Launch Blockers)

### 1. Doctor Headshots
**Status:** ❌ Missing (404 errors on page load)  
**Urgency:** 🔴 CRITICAL - Must have before launch

**Requirements:**
- **Quantity:** 4 minimum (scale to 500+)
- **Format:** JPG or WebP
- **Dimensions:** 400x400px (displayed at 200x200px for Retina)
- **Aspect Ratio:** 1:1 (circular crop applied via CSS)
- **File Size:** Max 50KB per image (optimized)
- **Naming Convention:** `{slug}.jpg` (e.g., `dr-priya-sharma.jpg`)

**Needed Files:**
```
apps/web/public/images/doctors/
├── dr-priya-sharma.jpg
├── dr-rajesh-kumar.jpg
├── dr-anjali-patel.jpg
└── dr-vikram-singh.jpg
```

**Photography Guidelines:**
- Professional medical attire (white coat preferred)
- Neutral or white background
- Well-lit, soft lighting
- Smiling, approachable expression
- High resolution (min 800x800, downscaled)
- Consistent styling across all photos
- Consent forms signed and on file

**Cost Estimate:**
- Professional photographer: ₹10,000-₹20,000 per session
- Stock photos: ₹500-₹2,000 per image (less authentic)
- DIY with good camera: ₹0 (time investment)

**Timeline:** 1-2 weeks

---

### 2. Homepage Hero Media
**Status:** ❌ Missing  
**Urgency:** 🔴 CRITICAL - Hero section empty

#### Option A: Video (Recommended)
```
apps/web/public/videos/
├── hero.mp4 (Primary - H.264, 1920x1080, 5MB max, 15-30s)
├── hero.webm (Fallback - VP9, 1920x1080, 5MB max)
└── hero-poster.jpg (Thumbnail while loading, 1920x1080)
```

**Video Content Ideas:**
- Doctor-patient video consultation (actors or with consent)
- Medical professionals in consultation rooms
- Happy patients reviewing results on mobile
- Montage of services (consultation, prescription, follow-up)

**Technical Requirements:**
- Resolution: 1920x1080 (Full HD)
- Frame rate: 30fps
- Codec: H.264 (MP4), VP9 (WebM)
- Duration: 15-30 seconds (shorter = better LCP)
- Looping: Yes
- Audio: Muted (background music optional)
- File size: Max 5MB (critical for LCP)

**Cost Estimate:**
- Professional production: ₹50,000-₹2,00,000
- Stock footage: ₹5,000-₹20,000
- DIY smartphone video: ₹0 (may lack polish)

#### Option B: Static Image (Faster LCP)
```
apps/web/public/images/
└── hero-homepage.jpg (1920x1080, WebP format, <200KB)
```

**Image Content Ideas:**
- Doctor consultation scene
- Happy patient on video call
- Modern telehealth interface mockup
- Diverse group of healthcare professionals

**Cost Estimate:**
- Custom photography: ₹15,000-₹50,000
- Stock image: ₹1,000-₹5,000
- Free stock (Unsplash/Pexels): ₹0 (limited rights)

**Recommendation:** Start with static image for faster LCP, add video post-launch

---

### 3. Brand Logo & Favicons
**Status:** ⚠️ Placeholder text used  
**Urgency:** 🟡 HIGH

```
apps/web/public/
├── logo.svg (Vector, scalable, full color)
├── logo-dark.svg (For dark backgrounds)
├── logo-white.svg (For colored backgrounds)
├── favicon.ico (Multi-size: 16x16, 32x32, 48x48)
├── icon-192.png (Android Chrome)
├── icon-512.png (Android Chrome)
├── apple-touch-icon.png (180x180, iOS)
└── og-image.jpg (1200x630, Social media sharing)
```

**Design Requirements:**
- Medical/healthcare visual theme
- "Glowheal" wordmark or symbol
- Legible at 16x16px (favicon size)
- Works in color, white, and black versions
- Professional, trustworthy aesthetic

**Cost Estimate:**
- Professional designer: ₹20,000-₹1,00,000
- Fiverr/freelancer: ₹5,000-₹20,000
- DIY with Canva: ₹0 (limited customization)

---

## 🟡 HIGH PRIORITY (Pre-Launch Recommended)

### 4. Service Hero Images (12 images)
**Status:** ❌ Missing  
**Urgency:** 🟡 HIGH - Services pages lack visual appeal

**Required Files:**
```
apps/web/public/images/services/
├── dermatology-hero.jpg (1200x600)
├── hair-care-hero.jpg (1200x600)
├── weight-management-hero.jpg (1200x600)
├── mental-health-hero.jpg (1200x600)
├── nutrition-hero.jpg (1200x600)
├── womens-health-hero.jpg (1200x600)
├── mens-health-hero.jpg (1200x600)
├── anti-aging-hero.jpg (1200x600)
├── acne-treatment-hero.jpg (1200x600)
├── sexual-wellness-hero.jpg (1200x600)
├── sleep-management-hero.jpg (1200x600)
└── gut-health-hero.jpg (1200x600)
```

**Image Guidelines:**
- Professional medical context
- No identifiable patients (or with consent)
- Relevant to specific service
- Positive, hopeful tone
- High resolution (2400x1200 source, downscaled)
- WebP format for web delivery
- File size: Max 100KB each (optimized)

**Content Ideas by Service:**

| Service | Image Concept |
|---------|--------------|
| Dermatology | Clear, glowing skin close-up |
| Hair Care | Healthy hair strands, scalp examination |
| Weight Management | Healthy meal prep, fitness activity |
| Mental Health | Peaceful meditation, therapy session |
| Nutrition | Fresh fruits, vegetables, meal planning |
| Women's Health | Doctor consultation, pregnancy wellness |
| Men's Health | Active lifestyle, fitness |
| Anti-Aging | Skincare products, youthful skin |
| Acne Treatment | Before/after (with consent) |
| Sexual Wellness | Couple counseling (professional) |
| Sleep Management | Peaceful bedroom, sleep tracking |
| Gut Health | Digestive health, probiotic foods |

**Cost Estimate:**
- Stock photos (12): ₹12,000-₹60,000
- Custom photography: ₹50,000-₹1,50,000
- Free stock + editing: ₹0-₹10,000

---

### 5. Before/After Treatment Galleries
**Status:** ❌ Missing  
**Urgency:** 🟡 HIGH - Critical for conversion on treatment pages

**Required Sets (11 services with visual outcomes):**

#### Dermatology (5 sets):
```
apps/web/public/images/before-after/dermatology/
├── acne-case-1-before.jpg (800x600)
├── acne-case-1-after.jpg (800x600)
├── pigmentation-case-1-before.jpg
├── pigmentation-case-1-after.jpg
├── wrinkles-case-1-before.jpg
├── wrinkles-case-1-after.jpg
├── scars-case-1-before.jpg
├── scars-case-1-after.jpg
├── melasma-case-1-before.jpg
└── melasma-case-1-after.jpg
```

#### Hair Care (3 sets):
```
apps/web/public/images/before-after/hair-care/
├── hair-loss-case-1-before.jpg
├── hair-loss-case-1-after.jpg
├── dandruff-case-1-before.jpg
├── dandruff-case-1-after.jpg
├── thinning-case-1-before.jpg
└── thinning-case-1-after.jpg
```

#### Weight Management (3 sets):
```
apps/web/public/images/before-after/weight-management/
├── weight-loss-case-1-before.jpg (Face blurred if requested)
├── weight-loss-case-1-after.jpg
└── [Additional sets...]
```

**⚠️ LEGAL REQUIREMENTS:**
- [ ] Written consent form signed
- [ ] HIPAA release authorization
- [ ] Photo usage rights (website, social, print)
- [ ] Right to revoke consent documented
- [ ] Compensation disclosed (if applicable)
- [ ] Anonymity preference respected

**Consent Form Fields:**
- Patient name, signature, date
- Specific use authorization
- Watermark consent
- Duration of use (perpetual or time-limited)
- Contact for revocation

**Technical Requirements:**
- Consistent lighting in before/after pairs
- Same angle, distance, framing
- Date stamps visible
- Treatment timeline specified
- Disclaimers visible: "Results may vary"
- Watermark: "Glowheal Patient - Used with Permission"

**Cost Estimate:**
- Existing patient photos (with consent): ₹0 (time to organize)
- Stock before/after (less authentic): ₹20,000-₹1,00,000
- Professional case study photography: ₹50,000-₹2,00,000

---

### 6. City Landmark Images (3 images)
**Status:** ❌ Missing  
**Urgency:** 🟢 MEDIUM - For future city pages

```
apps/web/public/images/cities/
├── mumbai-landmark.jpg (1200x600 - Gateway of India)
├── pune-landmark.jpg (1200x600 - Shaniwar Wada)
└── hyderabad-landmark.jpg (1200x600 - Charminar)
```

**Guidelines:**
- Iconic, recognizable landmarks
- Professional photography or high-quality stock
- WebP format
- Max 150KB per image

**Cost Estimate:**
- Stock photos: ₹3,000-₹15,000
- Free stock (Unsplash): ₹0
- Custom photography: ₹30,000-₹1,00,000

---

## 🟢 LOW PRIORITY (Post-Launch OK)

### 7. Social Media Assets
```
apps/web/public/images/social/
├── og-image.jpg (1200x630 - Facebook/LinkedIn)
├── twitter-card.jpg (1200x675 - Twitter)
├── instagram-post.jpg (1080x1080 - Square)
└── instagram-story.jpg (1080x1920 - Vertical)
```

### 8. Email Templates
```
apps/web/public/images/email/
├── email-header.jpg (600x200)
├── email-footer.jpg (600x100)
└── confirmation-icon.png (80x80)
```

### 9. UI Icons & Illustrations
```
apps/web/public/images/icons/
├── consultation-icon.svg
├── prescription-icon.svg
├── followup-icon.svg
├── secure-icon.svg
└── [50+ icons for features]
```

---

## 📋 Asset Production Workflow

### Phase 1: Critical Assets (Week 1-2)
1. **Day 1-3:** Commission professional photographer for doctor headshots
2. **Day 4-5:** Shoot or source homepage hero image/video
3. **Day 6-7:** Design logo and generate favicon set
4. **Day 8-10:** Optimize all images (WebP, compression, metadata)
5. **Day 11-14:** Upload to project, test all pages, verify no 404s

### Phase 2: Service Assets (Week 3-4)
1. **Day 15-18:** Source or commission 12 service hero images
2. **Day 19-21:** Gather patient consent for before/after galleries
3. **Day 22-25:** Organize and edit before/after photo sets
4. **Day 26-28:** Upload and integrate into service pages

### Phase 3: Supporting Assets (Week 5-6)
1. **Day 29-32:** City landmark images
2. **Day 33-35:** Social media assets
3. **Day 36-40:** Email templates and UI icons

---

## 💰 Budget Estimate

### Minimum Viable Assets (Launch Ready):
- Doctor headshots (4): ₹15,000
- Homepage hero image: ₹5,000 (stock)
- Logo & favicons: ₹20,000
- Service heroes (12): ₹30,000 (stock)
**Total:** ₹70,000

### Comprehensive Asset Package:
- Doctor headshots (500): ₹5,00,000
- Professional video production: ₹1,00,000
- Custom brand design: ₹1,00,000
- Service imagery: ₹1,50,000
- Before/after galleries: ₹2,00,000
- City pages: ₹50,000
- Social media: ₹30,000
**Total:** ₹11,30,000

---

## ✅ Quality Checklist

Before accepting any asset:
- [ ] Correct dimensions and aspect ratio
- [ ] Optimized file size (WebP, 80% quality)
- [ ] No copyright issues (owned or licensed)
- [ ] Consent forms if patients visible
- [ ] Consistent visual style
- [ ] Professional quality (in focus, well-lit)
- [ ] Accessible alt text written
- [ ] Metadata removed (EXIF data)
- [ ] Tested on Retina displays

---

## 🔄 Asset Management

### File Organization:
```
apps/web/public/
├── fonts/          (Self-hosted fonts)
├── images/
│   ├── doctors/    (Headshots)
│   ├── services/   (Hero images)
│   ├── before-after/ (Treatment results)
│   ├── cities/     (Landmarks)
│   ├── social/     (OG images)
│   └── icons/      (UI elements)
├── videos/         (Hero videos)
└── [root favicon files]
```

### Naming Conventions:
- **Kebab-case:** `service-name-hero.jpg`
- **Descriptive:** `dermatology-acne-before-case-1.jpg`
- **Versioned:** `logo-v2.svg` (if updating)

### Version Control:
- Store original high-res files outside repo (Dropbox/Google Drive)
- Only commit optimized web versions to Git
- Document in `ASSETS.md` with sources and licenses

---

## 📚 Recommended Stock Photo Sources

### Paid (High Quality):
- **Shutterstock:** https://www.shutterstock.com/ (₹3,000-₹5,000/image)
- **Getty Images:** https://www.gettyimages.com/ (₹5,000-₹20,000/image)
- **Adobe Stock:** https://stock.adobe.com/ (₹2,500-₹4,000/image)

### Affordable:
- **Envato Elements:** https://elements.envato.com/ (₹1,200/month unlimited)
- **Depositphotos:** https://depositphotos.com/ (₹500-₹2,000/image)

### Free (Limited Rights):
- **Unsplash:** https://unsplash.com/ (Free, attribution required)
- **Pexels:** https://www.pexels.com/ (Free, no attribution)
- **Pixabay:** https://pixabay.com/ (Free, no attribution)

⚠️ **Warning:** Verify license allows commercial use and healthcare context

---

## 🚀 Launch Readiness

**Current Status:** 🔴 NOT READY

**Blockers:**
- [ ] 0/4 doctor headshots available
- [ ] 0/1 homepage hero media
- [ ] 0/1 logo/favicon set
- [ ] 0/12 service hero images

**Minimum for Launch:**
- ✅ 4 doctor headshots
- ✅ 1 homepage hero image (static)
- ✅ Logo & favicon set

**Nice to Have:**
- 12 service hero images
- 5 before/after sets (dermatology)
- 3 city landmark images

---

*Document Version: 1.0*  
*Last Updated: October 30, 2025*  
*Next Review: After asset procurement phase*
