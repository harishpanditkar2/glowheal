# 🎨 ASSET GENERATION GUIDE - AI Prompts & Specifications

**Date:** October 30, 2025  
**Total Assets Needed:** 18 files (images + videos)  
**Estimated Cost:** ₹40,000-₹1,40,000  
**Timeline:** 1-2 weeks

---

## 📊 QUICK SUMMARY

| Category | Count | Priority | Cost | Timeline |
|----------|-------|----------|------|----------|
| **Doctor Photos** | 4 | 🔴 Critical | ₹15-20k | 3-5 days |
| **Hero Images** | 1 | 🟡 High | ₹5-20k | 2-3 days |
| **Logo & Branding** | 7 | 🟡 High | ₹20-100k | 1-2 weeks |
| **Service Images** | 12 | 🟢 Low | ₹0-10k | 1 week |
| **Testimonial Videos** | 3 | 🟢 Optional | ₹20-50k | 2-3 weeks |

---

## 🔴 CRITICAL PRIORITY - Doctor Headshots (4 files)

### Current Status:
- Using: `placeholder.svg` (purple doctor icon)
- Impact: Professional but temporary
- Launch Blocker: ⚠️ Can launch with placeholders, upgrade in Week 1

### Required Files:

#### 1. Dr. Priya Sharma (Female Dermatologist)
**Filename:** `dr-priya-sharma.webp`  
**Location:** `apps/web/public/images/doctors/`  
**Specifications:**
- Resolution: 400×400px (displays at 200×200px)
- Format: WebP
- File size: <50KB
- Background: Clean white or soft gradient

**AI Generation Prompt (Midjourney/DALL-E/Stable Diffusion):**
```
Professional headshot of an Indian female dermatologist, Dr. Priya Sharma, 
age 35-40, wearing white medical coat with stethoscope, confident warm smile, 
brown eyes, neat hair in a bun, professional makeup, modern clinic setting, 
soft natural lighting, white background, high resolution portrait photography, 
Canon EOS R5 style, f/2.8, professional medical photography, 
trustworthy and approachable expression
```

**Alternative: Real Photo Commission**
- Platform: Fiverr, Upwork, or local medical photographer
- Brief: "Indian female dermatologist, professional headshot, white coat, warm smile"
- Budget: ₹3,000-₹5,000 per photo
- Delivery: 3-5 days

---

#### 2. Dr. Rajesh Kumar (Male Psychiatrist)
**Filename:** `dr-rajesh-kumar.webp`  
**Location:** `apps/web/public/images/doctors/`  
**Specifications:** Same as above

**AI Generation Prompt:**
```
Professional headshot of an Indian male psychiatrist, Dr. Rajesh Kumar, 
age 40-45, wearing blue button-down shirt and white medical coat, 
kind empathetic expression, short well-groomed hair, glasses, 
professional demeanor, modern clinic background, soft natural lighting, 
white background, high resolution portrait, Canon EOS R5 style, f/2.8, 
professional medical photography, calm and trustworthy appearance
```

---

#### 3. Dr. Anjali Desai (Female Gynecologist)
**Filename:** `dr-anjali-desai.webp`  
**Location:** `apps/web/public/images/doctors/`  
**Specifications:** Same as above

**AI Generation Prompt:**
```
Professional headshot of an Indian female gynecologist, Dr. Anjali Desai, 
age 32-38, wearing white medical coat with light blue scrubs underneath, 
warm reassuring smile, long straight hair, minimal jewelry, 
professional appearance, modern medical facility background, 
soft natural lighting, white background, high resolution portrait, 
Canon EOS R5 style, f/2.8, approachable and caring expression
```

---

#### 4. Dr. Vikram Patel (Male Endocrinologist)
**Filename:** `dr-vikram-patel.webp`  
**Location:** `apps/web/public/images/doctors/`  
**Specifications:** Same as above

**AI Generation Prompt:**
```
Professional headshot of an Indian male endocrinologist, Dr. Vikram Patel, 
age 45-50, wearing white medical coat over formal shirt and tie, 
experienced confident demeanor, salt and pepper hair, short beard, 
professional appearance, modern hospital background, soft natural lighting, 
white background, high resolution portrait, Canon EOS R5 style, f/2.8, 
authoritative yet friendly expression, medical expert appearance
```

---

### Post-Generation Steps:
1. **Optimize for Web:**
   ```bash
   # Use tools like Squoosh.app or ImageMagick
   # Target: <50KB per image
   # Format: WebP with 85% quality
   ```

2. **Update Data File:**
   ```json
   // In data/doctors.sample.json, replace:
   "image": "/images/doctors/placeholder.svg"
   // With:
   "image": "/images/doctors/dr-priya-sharma.webp"
   ```

3. **Verify Display:**
   - Check homepage doctor carousel
   - Check doctors directory page
   - Check individual doctor profile pages

---

## 🟡 HIGH PRIORITY - Homepage Hero Image (1 file)

### Current Status:
- Using: Gradient background (CSS)
- Impact: Functional but not engaging
- Launch Blocker: ⚠️ Can launch without, upgrade in Week 1

### Required File:

**Filename:** `hero-home.webp`  
**Location:** `apps/web/public/images/`  
**Specifications:**
- Resolution: 1920×1080px (Full HD)
- Format: WebP
- File size: <200KB
- Aspect ratio: 16:9
- Subject: Healthcare/wellness theme

**AI Generation Prompt (Midjourney/DALL-E):**
```
Modern Indian healthcare telemedicine scene, diverse Indian patients 
consulting with doctors via laptop and smartphone, bright clean clinic interior, 
Indian doctor in white coat smiling at camera, patient looking relieved and happy, 
warm natural lighting, professional medical photography, high resolution, 
modern minimalist aesthetic, teal and purple color accents, 
hopeful and caring atmosphere, Canon EOS R5 style, f/2.8, 
wide angle 16:9 composition, shallow depth of field
```

**Alternative Prompt (More Abstract):**
```
Abstract healthcare and wellness concept, flowing purple and teal gradients, 
geometric medical icons (stethoscope, heart, medical cross), 
soft glowing light effects, modern minimalist design, Indian skin tone hand 
holding smartphone with medical app interface, clean professional aesthetic, 
high resolution 1920x1080, smooth bokeh background, healthcare technology theme
```

**Stock Photo Alternative:**
- Platforms: Unsplash, Pexels, Shutterstock
- Search terms: "Indian doctor telemedicine", "healthcare technology India", "video consultation doctor"
- Budget: Free (Unsplash/Pexels) or ₹5,000-₹20,000 (Shutterstock license)
- Licensing: Ensure commercial use allowed

---

## 🟡 HIGH PRIORITY - Logo & Branding Suite (7 files)

### Current Status:
- Using: Text-based logo (CSS)
- Impact: Functional but unprofessional
- Launch Blocker: ⚠️ Can launch with text, upgrade in Week 1

### Required Files:

#### 1. Primary Logo (Vector)
**Filename:** `logo.svg`  
**Location:** `apps/web/public/`  
**Specifications:**
- Format: SVG (scalable vector)
- Colors: Purple (#9333EA) + Teal/Coral gradient
- Size: Scalable (typically exports at 512×512px)
- Background: Transparent

**Design Brief for Designer:**
```
Brand Name: Glowheal
Industry: Healthcare / Telemedicine
Style: Modern, trustworthy, approachable, tech-forward
Colors: 
  - Primary: Purple (#9333EA)
  - Secondary: Teal (#14B8A6) to Coral (#F97316) gradient
  - Accent: Pink (#EC4899)
Concept: Combine medical symbolism (heart, pulse, cross) with 
         technology/connectivity (network nodes, digital elements)
Mood: Professional yet friendly, innovative, caring
Typography: Sans-serif, clean, rounded (similar to Inter/Poppins)
Deliverable: SVG with transparent background
```

**AI Generation Prompt (Logo-specific tools like Looka, Brandmark):**
```
Create a modern healthcare logo for "Glowheal", 
telemedicine platform, purple and teal color scheme, 
medical cross or heartbeat symbol integrated with digital elements, 
minimalist design, professional and trustworthy, vector format, 
suitable for web and mobile applications
```

---

#### 2. Logo White Version
**Filename:** `logo-white.svg`  
**Location:** `apps/web/public/`  
**Specifications:**
- Format: SVG
- Color: White (#FFFFFF)
- Use: Dark backgrounds, footer, marketing materials

---

#### 3. Favicon (Multi-size ICO)
**Filename:** `favicon.ico`  
**Location:** `apps/web/public/`  
**Specifications:**
- Format: ICO (contains 16×16, 32×32, 48×48)
- Background: Transparent
- Design: Simplified logo mark (icon only, no text)

**Generation Tool:**
- Use: https://realfavicongenerator.net/
- Upload: Main logo SVG
- Configure: Generate all sizes automatically

---

#### 4. PWA Icon - Small
**Filename:** `icon-192.png`  
**Location:** `apps/web/public/`  
**Specifications:**
- Resolution: 192×192px
- Format: PNG
- Background: White or transparent
- Use: Progressive Web App icon (Android)

---

#### 5. PWA Icon - Large
**Filename:** `icon-512.png`  
**Location:** `apps/web/public/`  
**Specifications:**
- Resolution: 512×512px
- Format: PNG
- Background: White or transparent
- Use: Progressive Web App icon (Android, splash screens)

---

#### 6. Apple Touch Icon
**Filename:** `apple-touch-icon.png`  
**Location:** `apps/web/public/`  
**Specifications:**
- Resolution: 180×180px
- Format: PNG
- Background: Solid color (purple or white)
- Corners: Square (iOS adds rounded corners automatically)
- Use: iOS home screen icon

---

#### 7. Open Graph Image
**Filename:** `og-image.jpg`  
**Location:** `apps/web/public/`  
**Specifications:**
- Resolution: 1200×630px
- Format: JPG
- File size: <300KB
- Content: Logo + tagline + gradient background

**Design Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Glowheal Logo]             │
│                                     │
│  "Book Doctor Consultation Online"  │
│   500+ Verified Doctors | ₹499+    │
│                                     │
│     [Purple to Teal Gradient BG]   │
└─────────────────────────────────────┘
```

**AI Generation Prompt:**
```
Social media preview card for Glowheal healthcare platform, 
1200x630px, centered Glowheal logo, tagline "Book Doctor Consultation Online", 
"500+ Verified Doctors | Starting ₹499", modern clean design, 
purple to teal gradient background, professional medical aesthetic, 
high contrast text, suitable for Facebook/Twitter/LinkedIn sharing
```

---

## 🟢 LOW PRIORITY - Service Hero Images (12 files)

### Current Status:
- Using: Gradient backgrounds or emoji icons
- Impact: Functional
- Launch Blocker: ✅ Can launch without, add post-launch

### Required Files (Optional):

**Filenames:**
```
1. dermatology-hero.webp (Skin care, dermatologist consultation)
2. mental-health-hero.webp (Counseling session, peaceful setting)
3. womens-health-hero.webp (Female doctor, gynecology theme)
4. metabolic-health-hero.webp (Diabetes care, nutrition)
5. gastroenterology-hero.webp (Digestive health)
6. cardiology-hero.webp (Heart health, ECG monitor)
7. pediatrics-hero.webp (Child healthcare, friendly doctor)
8. orthopedics-hero.webp (Bone/joint care)
9. hair-care-hero.webp (Hair treatment, trichology)
10. sexual-wellness-hero.webp (Discreet, professional)
11. general-medicine-hero.webp (Primary care)
12. nutrition-hero.webp (Healthy food, dietitian)
```

**Location:** `apps/web/public/images/services/`  
**Specifications (each):**
- Resolution: 1200×675px (16:9)
- Format: WebP
- File size: <150KB each
- Style: Consistent across all services

**Generic AI Prompt Template:**
```
Professional medical photography for [SERVICE] specialty, 
Indian doctor consulting with patient, modern clinic interior, 
warm natural lighting, professional medical aesthetic, 
[SERVICE-SPECIFIC ELEMENTS: e.g., dermatology - examining skin, 
mental health - counseling session], high resolution, 
Canon EOS R5 style, f/2.8, 16:9 composition, purple and teal accents, 
trustworthy and caring atmosphere
```

**Budget Alternative:**
- Use free stock photos from Unsplash/Pexels
- Search: "[service name] doctor consultation"
- Cost: ₹0
- Time: 2-3 hours to curate

---

## 🟢 OPTIONAL - Testimonial Videos (3 files)

### Current Status:
- Not implemented
- Impact: Social proof, trust building
- Launch Blocker: ✅ Can launch without, add in Phase 2

### Required Files:

**Filenames:**
```
1. testimonial-priya-acne.mp4
2. testimonial-rahul-anxiety.mp4
3. testimonial-sneha-pcos.mp4
```

**Location:** `apps/web/public/videos/testimonials/`  
**Specifications (each):**
- Duration: 30-45 seconds
- Resolution: 1080p (1920×1080) at 30fps
- Format: MP4 (H.264 codec)
- File size: <5MB per video
- Audio: Clear, professional voiceover or on-camera testimonial
- Subtitles: Embedded SRT or VTT file

**Script Template:**
```
[Patient Name], [Age], [City]
"I was suffering from [condition] for [duration]. 
I found Glowheal online and booked a consultation with Dr. [Name]. 
The video consultation was easy and convenient. 
Dr. [Name] prescribed a treatment plan that really worked. 
Within [timeframe], I saw significant improvement. 
I highly recommend Glowheal for anyone seeking quality healthcare from home."
```

**Production Options:**
1. **Hire Actors:**
   - Platform: Casting networks, Fiverr
   - Budget: ₹10,000-₹20,000 per video
   - Pros: Professional, controlled environment

2. **Use Real Patients (with consent):**
   - Budget: ₹5,000-₹10,000 incentive
   - Pros: Authentic, genuine
   - Legal: Written release form required

3. **AI-Generated (Avatar.ai, Synthesia):**
   - Budget: ₹5,000-₹15,000 per video
   - Pros: Quick turnaround, no filming
   - Cons: May look artificial

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Critical Assets (Week 1)
- [ ] Generate 4 doctor headshots (AI or commission)
- [ ] Optimize to WebP <50KB each
- [ ] Upload to `public/images/doctors/`
- [ ] Update `data/doctors.sample.json` image paths
- [ ] Test on homepage, doctors page, profiles

### Phase 2: Branding (Week 1-2)
- [ ] Commission logo design (or use AI logo maker)
- [ ] Generate all 7 logo variants (SVG, PNG, ICO)
- [ ] Upload to `public/` directory
- [ ] Update metadata references in layout.tsx
- [ ] Test Open Graph sharing on social media

### Phase 3: Hero Image (Week 1)
- [ ] Generate or license homepage hero image
- [ ] Optimize to WebP <200KB
- [ ] Upload to `public/images/`
- [ ] Update homepage component to use image
- [ ] Test responsive display (mobile/desktop)

### Phase 4: Optional Enhancements (Post-Launch)
- [ ] Generate 12 service hero images
- [ ] Create 3 testimonial videos
- [ ] Commission custom illustrations
- [ ] Add before/after galleries (if applicable)

---

## 💰 BUDGET BREAKDOWN

### Minimum Viable Launch (Week 1)
| Asset | Option | Cost |
|-------|--------|------|
| **4 Doctor Photos** | AI Generation (Midjourney) | ₹2,000-₹5,000 |
| **4 Doctor Photos** | Real Photography | ₹15,000-₹20,000 |
| **Logo Suite (7 files)** | AI Logo Maker (Looka) | ₹5,000-₹10,000 |
| **Logo Suite (7 files)** | Professional Designer | ₹20,000-₹1,00,000 |
| **Hero Image** | Free Stock (Unsplash) | ₹0 |
| **Hero Image** | Licensed Stock (Shutterstock) | ₹5,000-₹10,000 |
| **Hero Image** | Custom AI Generation | ₹2,000-₹5,000 |
| **TOTAL (Budget Option)** |  | **₹10,000-₹20,000** |
| **TOTAL (Professional)** |  | **₹40,000-₹1,40,000** |

### Recommended Approach:
1. **Week 1 (Launch):** AI-generated doctor photos (₹5k) + AI logo (₹5k) + free hero = **₹10,000**
2. **Week 2-4 (Upgrade):** Commission professional photos + designer logo = **₹35,000-₹1,20,000**
3. **Phase 2 (Post-Launch):** Service images + videos = **₹20,000-₹50,000**

---

## 🛠️ RECOMMENDED TOOLS

### AI Image Generation:
1. **Midjourney** - Best quality, $30/month
2. **DALL-E 3** (via ChatGPT Plus) - Good quality, $20/month
3. **Stable Diffusion** (local) - Free, requires setup
4. **Leonardo.ai** - Medical-specific models, free tier available

### AI Logo Design:
1. **Looka** - $20-$100 for full branding package
2. **Brandmark** - $25-$175 one-time payment
3. **Canva** - AI logo maker, free tier available

### Image Optimization:
1. **Squoosh** (squoosh.app) - Free, web-based
2. **ImageOptim** (Mac) - Free
3. **TinyPNG** (tinypng.com) - Free with limits

### Favicon Generation:
1. **RealFaviconGenerator** - Free, generates all sizes
2. **Favicon.io** - Free, simple interface

---

## 📞 QUICK START COMMANDS

### After Asset Upload:
```powershell
# Verify file sizes
cd D:\web\glowheal\apps\web\public
Get-ChildItem -Recurse -File | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB,2)}} | Sort-Object SizeKB -Descending

# Restart dev server to see changes
cd D:\web\glowheal
npm run dev

# Run Lighthouse to measure impact
npx lighthouse http://localhost:3000 --view
```

---

## ✅ ACCEPTANCE CRITERIA

### Doctor Photos:
- [ ] All 4 photos <50KB each (WebP)
- [ ] 400×400px resolution
- [ ] Professional medical appearance
- [ ] Consistent lighting and style
- [ ] No 404 errors on any page

### Logo Suite:
- [ ] SVG logos scale without pixelation
- [ ] All 7 files generated and uploaded
- [ ] Favicon visible in browser tab
- [ ] Open Graph image shows in social shares
- [ ] PWA icons work on mobile devices

### Hero Image:
- [ ] <200KB file size (WebP)
- [ ] 1920×1080px resolution
- [ ] Loads in <1 second
- [ ] Responsive on mobile devices
- [ ] Enhances LCP score (not degrades)

---

**Created:** October 30, 2025  
**Status:** Ready for asset generation  
**Next Step:** Choose AI tool or commission professional photographer  
**Launch Impact:** Can proceed without, but Week 1 upgrade strongly recommended

