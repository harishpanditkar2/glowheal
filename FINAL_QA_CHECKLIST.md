# Final QA Checklist - Glowheal Production Deploy
**Date:** October 31, 2025  
**Build Status:** ✅ SUCCESS (0 errors, 1 ESLint warning - documented)  
**Catalog Status:** ✅ VALID (30 services, 8 packages, 3 add-ons in Pune)

---

## 1. Visual QA Checklist

### Homepage (`/`)
- [ ] **Hero Copy:** "Free First Consultation. Fixed Prices. Right Care."
- [ ] **Subcopy:** Mentions "city-specific fixed prices" and "no surprise fees"
- [ ] **Microproof Row:** 500+ doctors • 2M+ patients • 12+ specialties • Pune first
- [ ] **CTAs:** 
  - "Book Free Consultation" (amber with white text) ✅ AA contrast
  - "Join as Doctor" (outline, forest border)
- [ ] **No WhatsApp button** in hero
- [ ] **City Selector:** Prominent pill in header (gradient bg, rounded-full, 48px height)
- [ ] **Service Cards:** 
  - Modern SVG icons (not emoji) ✅
  - "View Fixed Prices →" CTA
  - "Start free—talk to a doctor" microcopy
  - "City: Pune" label (dynamic)
  - "Most Booked" star badge on mental-health, dermatology, nutrition-dietetics

### Pricing Page (`/pricing`)
- [ ] **City Pill:** "Pune Fixed Prices" (white/20 backdrop pill in hero)
- [ ] **Hero H1:** "Fixed Prices for Pune"
- [ ] **Persuasion Bar:** 4 trust signals (free consult, fixed prices, quote, payouts) with SVG icons
- [ ] **Comparison Table:** 
  - Glowheal vs Generic Aggregator vs Walk-in Clinic
  - 5 rows (first consult, pricing model, quote, transparency, WhatsApp)
  - Glowheal column highlighted with jade-50 background
  - Responsive table on mobile (horizontal scroll if needed)
- [ ] **Tabs:** "Individual Services" / "Package Bundles" (toggle working)
- [ ] **Services Tab:** 13 specialties with PriceCard grids
- [ ] **Packages Tab:** 8 bundles showing:
  - Bundle name, total price, "Save ₹X (Y% off)" chip
  - "What's Included" details section
  - "Book This Package" CTA → `/book?service=CODE`
- [ ] **Free Consultation Banner:** "Your first consultation is always ₹0"

### Specialty Pricing (`/pricing/dermatology`)
- [ ] **Breadcrumb:** Home › Pricing › Dermatology
- [ ] **City Pill:** Shows selected city (Pune by default)
- [ ] **Hero H1:** "Dermatology Prices in Pune"
- [ ] **Persuasion Bar:** Same 4 trust signals
- [ ] **Comparison Table:** "Why Glowheal for Dermatology?" headline
- [ ] **Free Consultation Banner:** "Your first dermatology consultation is ₹0"
- [ ] **Services Grid:** 4 dermatology items with PriceCard components
- [ ] **Pricing items show:**
  - Service name, price, unit
  - "What's Included" collapsible (checkmark icon)
  - "Start Free (₹0)" CTA → `/book?service=CODE`

### Doctors Directory (`/doctors`)
- [ ] **Hero:** Doctor count, specialty filters (if implemented)
- [ ] **Doctor Cards:** 
  - Name, specialty, rating, experience
  - **Price Badge:** "Glowheal price in **Pune**: ₹500" (dynamic city, not hardcoded)
  - Info icon with tooltip/popover explaining fixed pricing
  - "View Profile" CTA
- [ ] **Mobile:** Price badges readable, no overlap

### Doctor Profile (`/doctors/dr-priya-sharma`)
- [ ] **Hero Section:**
  - Doctor photo, name, title, specialty
  - Rating badge, city badge, experience badge
  - "Start with a free consultation" green box
  - "Specialist Fee (if you proceed): ₹500"
  - "Book Free Consultation" primary CTA
- [ ] **Free Consultation Banner:** "How it works" explainer
- [ ] **Right Sidebar (Desktop):**
  - **"Book Appointment" card** (next available, fee, CTAs)
  - **DoctorPricingWidget** (NEW):
    - "Fixed Prices" heading
    - City badge (e.g., "Pune")
    - 1-3 pricing items (compact cards with price, name, unit)
    - "See All [Specialty] Prices →" outline button
    - "Book in Pune" primary button → `/book?service=CODE`
    - "Start with free consultation (₹0)" microcopy
  - **Fallback Toast (Mumbai/Bengaluru):** "Showing Pune reference prices. [City] coming soon"
  - **Quick Info** card (experience, location, gender, languages)
- [ ] **Mobile:** Pricing widget inline (not sticky), all CTAs ≥48px tap targets

### Booking Page (`/book`)
- [ ] **Step 1:** Name, phone, email (validation working)
- [ ] **Step 2:** Specialty + service selection (multi-select checkboxes)
- [ ] **Step 3:** 
  - City selector (Pune, Mumbai, Bengaluru dropdown)
  - Preferred date, time (morning/afternoon/evening radio buttons)
  - WhatsApp instant confirm toggle (green box)
  - **Popular Add-ons Panel (NEW):**
    - Jade-50 background with border
    - 3 checkboxes:
      1. Basic Health Panel - ₹999
      2. Comprehensive Health Check Plus - ₹5,999
      3. Gut Health Panel - ₹1,999
    - Checkboxes sync with `selectedItems` state
    - Disclaimer: "Add-ons are optional and billed only after your free consultation and consent"
- [ ] **Navigation:** Back/Next buttons, step progress indicator
- [ ] **Submit:** "Confirm Booking" button (disabled while submitting)

### Booking Success Page (`/book-success` or modal)
- [ ] **Success Message:** Booking ID, confirmation
- [ ] **Selected Services:** List includes add-ons if checked
- [ ] **Quote Download Link:** "Download Your Quote" CTA
- [ ] **WhatsApp CTA:** Pre-filled message with booking details
- [ ] **Quote includes add-ons** with correct prices (verify by downloading)

### Services Page (`/services/dermatology`)
- [ ] **Hero:** Service name, icon, tagline
- [ ] **Overview:** Description, conditions treated
- [ ] **Pricing Section:** Link to `/pricing/dermatology`
- [ ] **Doctor Cards:** Dermatology specialists
- [ ] **FAQ:** Common questions accordion

---

## 2. Accessibility Checklist

### Keyboard Navigation
- [ ] **Tab Order:** 
  - Header: Logo → City Selector → Book Free → Join as Doctor
  - Service cards: All cards focusable, Enter activates
  - Pricing tabs: Arrow keys switch tabs (if implemented), Tab moves to content
  - Booking form: All inputs, checkboxes, buttons reachable
  - Add-ons: Tab through checkboxes, Space toggles
- [ ] **Focus Rings:** 
  - Visible 2px `ring-forest-700` on all interactive elements
  - No invisible focus states
  - Skip link to main content (if implemented)
- [ ] **Escape Key:** Closes modals/toasts (if applicable)

### ARIA & Screen Readers
- [ ] **Icons:** All decorative icons have `aria-hidden="true"`
- [ ] **Buttons:** Descriptive labels (not just icons)
  - "Book Free Consultation" (not "Book")
  - "See All Dermatology Prices →" (not "See All")
- [ ] **Form Labels:** All inputs have `<label>` or `aria-label`
- [ ] **Error Messages:** `role="alert"` for validation errors
- [ ] **Live Regions:** Toast messages use `aria-live="polite"`
- [ ] **Landmarks:** `<nav>`, `<main>`, `<aside>` for page structure

### Color Contrast (WCAG AA)
- [ ] **Amber Buttons:** White text on amber-500 (4.5:1 ratio) ✅
- [ ] **Forest Buttons:** White text on forest-700 (4.5:1 ratio) ✅
- [ ] **Outline Buttons:** Forest-700 border + text on white (4.5:1 ratio) ✅
- [ ] **Body Text:** Gray-700 on white (4.5:1 ratio) ✅
- [ ] **Links:** Underlined or sufficient color difference
- [ ] **Comparison Table:** Forest-700 on jade-50 (4.5:1 ratio) ✅

### Touch Targets (Mobile)
- [ ] **All Buttons:** ≥48x48px tap area
- [ ] **Checkboxes:** ≥48x48px including label padding
- [ ] **City Selector:** 48px min-height ✅
- [ ] **Service Cards:** Entire card clickable with ≥48px height
- [ ] **Add-ons:** Checkbox labels expand click area

---

## 3. Performance Checklist

### Lighthouse Scores (Target: ≥90)
Run on mobile + desktop for each page:

#### Homepage (`/`)
- [ ] **Performance:** ≥90
- [ ] **Accessibility:** ≥90
- [ ] **Best Practices:** ≥90
- [ ] **SEO:** ≥90
- [ ] **CLS:** <0.1 (no layout shift from icons, city pill, stats)
- [ ] **LCP:** <2.5s (hero image optimized)
- [ ] **FID:** <100ms (no blocking scripts)

#### Pricing (`/pricing`)
- [ ] **Performance:** ≥90
- [ ] **Accessibility:** ≥90
- [ ] **CLS:** <0.1 (no shift from tabs, comparison table, persuasion bar)
- [ ] **TTI:** <3.8s (client components lazy-loaded)

#### Doctors (`/doctors`)
- [ ] **Performance:** ≥90
- [ ] **Accessibility:** ≥90
- [ ] **CLS:** <0.1 (doctor cards render with placeholder images)

#### Doctor Profile (`/doctors/[slug]`)
- [ ] **Performance:** ≥90
- [ ] **Accessibility:** ≥90
- [ ] **CLS:** <0.1 (pricing widget doesn't shift, right sidebar stable)

#### Booking (`/book`)
- [ ] **Performance:** ≥90 (acceptable: ≥85 due to form complexity)
- [ ] **Accessibility:** ≥90
- [ ] **CLS:** <0.1 (add-ons panel doesn't shift on checkbox)

### Asset Optimization
- [ ] **Icons:** SVG inlined (no HTTP requests) ✅
- [ ] **Fonts:** Self-hosted, preloaded in root layout ✅
- [ ] **Images:** Lazy-loaded (except LCP hero image)
- [ ] **CSS:** Purged unused Tailwind classes in production
- [ ] **JS:** Code-split by route (Next.js automatic)

### No Layout Shifts (CLS <0.1)
- [ ] **City Pill:** Fixed width (doesn't expand on longer city names)
- [ ] **Toast Messages:** Positioned absolute/fixed (doesn't push content)
- [ ] **Service Card Icons:** Fixed 24px width/height (no reflow after load)
- [ ] **Comparison Table:** Reserve space with `min-height` or skeleton
- [ ] **Doctor Cards:** Fixed image placeholder (doesn't jump after load)
- [ ] **Add-ons Panel:** Expands section on step 3 (doesn't shift step content)

---

## 4. City Switching Integration Test

### Test Scenario 1: Mumbai Fallback
**Steps:**
1. Visit homepage, click City Selector in header
2. Select "Mumbai" from dropdown
3. Cookie `glowheal_city=mumbai` set ✅
4. Navigate to `/pricing`
   - **Expected:** Toast appears: "Showing Pune prices; Mumbai coming soon."
   - **Expected:** City pill in hero says "Mumbai Fixed Prices"
   - **Expected:** Pricing items show Pune prices (fallback working)
5. Navigate to `/doctors`
   - **Expected:** Price badges say "Glowheal price in **Mumbai**: ₹500"
   - **Expected:** Prices are Pune fallback values
6. Navigate to `/doctors/dr-priya-sharma`
   - **Expected:** DoctorPricingWidget shows:
     - City badge: "Mumbai"
     - Fallback toast: "Showing Pune reference prices. Mumbai coming soon."
     - Pricing items: Pune prices
     - CTA: "Book in Mumbai"

### Test Scenario 2: Pune (Default, No Fallback)
**Steps:**
1. Visit homepage, click City Selector
2. Select "Pune" (or refresh page if Pune already selected)
3. Cookie `glowheal_city=pune` set ✅
4. Navigate to `/pricing`
   - **Expected:** No toast (Pune has full catalog)
   - **Expected:** City pill says "Pune Fixed Prices"
   - **Expected:** Pricing items show Pune prices
5. Navigate to `/doctors`
   - **Expected:** Price badges say "Glowheal price in **Pune**: ₹500"
6. Navigate to `/doctors/dr-priya-sharma`
   - **Expected:** DoctorPricingWidget shows:
     - City badge: "Pune"
     - No fallback toast
     - Pricing items: Pune prices
     - CTA: "Book in Pune"

### Test Scenario 3: Cookie Persistence
**Steps:**
1. Set city to Mumbai
2. Refresh page
   - **Expected:** City Selector still shows "Mumbai"
3. Navigate to different pages (`/pricing`, `/doctors`, `/book`)
   - **Expected:** City persists across all pages
4. Close browser, reopen
   - **Expected:** Cookie persists (7-day expiry)

---

## 5. Add-ons Booking Flow Test

### Test Scenario: Full Booking with Add-ons
**Steps:**
1. Visit `/book` (start booking flow)
2. **Step 1:** Enter name, phone, email → Click "Next"
3. **Step 2:** Select specialty "Dermatology" → Select service "Acne Treatment (30-day)" → Click "Next"
4. **Step 3:** 
   - Select city: "Pune"
   - Select date: Tomorrow's date
   - Select time: "Morning (9 AM - 12 PM)"
   - **Check add-ons:**
     - ✅ Basic Health Panel (₹999)
     - ✅ Comprehensive Health Check Plus (₹5,999)
     - Leave Gut Health Panel unchecked
5. Click "Confirm Booking"
   - **Expected:** Loading state, then success page appears
6. **Success Page Verification:**
   - **Selected Services:** Shows:
     - Acne Treatment (30-day) - ₹2,499
     - Basic Health Panel - ₹999
     - Comprehensive Health Check Plus - ₹5,999
   - **Total (provisional):** ₹9,497 (sum of above)
   - **Quote Download Link:** "Download Your Quote" button visible
7. Click "Download Your Quote"
   - **Expected:** Opens HTML quote in new tab or downloads file
8. **Quote Verification:**
   - **Header:** Booking ID, date, "Provisional Quote"
   - **Items List:**
     1. Acne Treatment (30-day) - ₹2,499
        - Includes: Initial consultation, 30-day medication, follow-up
     2. Basic Health Panel - ₹999
        - Includes: CBC, Blood Sugar, Lipid Profile, etc.
     3. Comprehensive Health Check Plus - ₹5,999
        - Includes: Full panel + consultation + diet plan
   - **Total:** ₹9,497
   - **Amount Due Now:** ₹0 (Free Consultation) — highlighted in green
   - **Disclaimers:** 
     - "Provisional pricing. Final quote after free consultation."
     - "Payment required only if you proceed."
     - "Valid for 30 days from issue date."

---

## 6. Deployment Checklist

### Pre-Deploy Validation
- [x] **TypeScript:** `npx tsc --noEmit` → 0 errors ✅
- [x] **Build:** `npm run build` → Success ✅
- [x] **Catalog:** `node scripts/validate-catalog.js` → 30 services + 8 packages + 3 add-ons ✅
- [ ] **ESLint:** `npm run lint` → Fix critical issues (warning about `<img>` is documented TODO)
- [ ] **Git Status:** All changes committed, branch up-to-date

### Deploy Commands
```bash
# Option 1: Vercel CLI
vercel --prod

# Option 2: Platform-specific (e.g., Netlify, AWS Amplify)
# Follow platform deployment guide

# Option 3: Manual
npm run build
# Upload .next/ folder to server
```

### Post-Deploy Verification (Live Site)
- [ ] **Homepage:** Visit `https://glowheal.in/` → Verify hero copy, icons, CTAs load
- [ ] **Pricing:** Visit `https://glowheal.in/pricing` → Verify persuasion bar, comparison table render
- [ ] **Doctor Profile:** Visit `https://glowheal.in/doctors/dr-priya-sharma` → Verify pricing widget shows
- [ ] **Booking:** Visit `https://glowheal.in/book` → Test full flow with add-ons
- [ ] **City Switching:** Select Mumbai in header → Verify toast, fallback working on live site
- [ ] **Performance:** Run Lighthouse on live URLs → Confirm ≥90 scores
- [ ] **Mobile:** Test on real device (iOS Safari, Android Chrome) → Verify responsiveness
- [ ] **Console Errors:** Open DevTools → Check for 0 errors in console
- [ ] **Network:** Check for broken API calls (404s, 500s)

### SEO Post-Deploy
- [ ] **Sitemap:** Submit `https://glowheal.in/sitemap.xml` to Google Search Console
- [ ] **Indexing:** Request indexing for:
  - `/pricing`
  - `/pricing/dermatology`
  - `/doctors`
  - `/doctors/dr-priya-sharma`
- [ ] **Canonical Tags:** Verify `<link rel="canonical">` on all pages
- [ ] **Meta Descriptions:** Check 155-160 char limit, includes target keywords
- [ ] **Open Graph:** Test social share previews (LinkedIn, Twitter, WhatsApp)

### Monitoring Setup
- [ ] **Google Analytics:** Verify events firing:
  - `pricing_select_initiated`
  - `pricing_item_added`
  - `pricing_item_removed`
  - `free_consult_form_submit`
  - `quote_create`
- [ ] **Error Tracking:** Sentry/LogRocket configured (if applicable)
- [ ] **Uptime Monitoring:** Pingdom/UptimeRobot configured for `/` and `/book`
- [ ] **Performance Monitoring:** Vercel Analytics or equivalent tracking Core Web Vitals

---

## 7. Known Issues / Future Enhancements

### Documented TODOs (Non-Blocking)
1. **Doctor Images:** Currently using emoji placeholder 👨‍⚕️
   - TODO: Replace with next/image optimized photos
2. **Reviews:** Sample data with "TODO: medical review" notes
   - TODO: Replace with verified patient reviews
3. **Calendar Integration:** "TODO: Integrate calendar API" for real-time availability
4. **Social Profiles:** "TODO: Add sameAs when LinkedIn profiles verified"
5. **City-Specific Catalogs:** Mumbai/Bengaluru have TODOs
   - Expected: Fallback to Pune until medical + legal review complete

### Future Enhancements (Post-Launch)
1. **Specialty-Specific Add-ons:** Show derma labs on derma bookings (higher relevance)
2. **A/B Testing:** Test add-ons placement (step 2 vs step 3) for AOV lift
3. **Dynamic Pricing:** Real-time availability-based pricing (surge/off-peak)
4. **Doctor Reviews Aggregation:** Import from Practo/Google (if available)
5. **WhatsApp Booking API:** Direct booking confirmation via WhatsApp Business API
6. **Multi-Language Support:** Hindi, Marathi translations for Pune market

---

## 8. Sign-Off Checklist

**Tech Lead:**
- [ ] Build passes with 0 errors ✅
- [ ] Catalog validation passes ✅
- [ ] TypeScript strict mode enabled ✅
- [ ] No critical security vulnerabilities (npm audit)

**QA Lead:**
- [ ] All visual QA items verified
- [ ] Accessibility scan passes (0 critical issues)
- [ ] City switching works correctly
- [ ] Add-ons flow tested end-to-end
- [ ] Mobile responsive verified on 2+ devices

**Product Owner:**
- [ ] Free-first funnel preserved (no payment before consent)
- [ ] Fixed pricing messaging consistent across site
- [ ] City awareness working (Pune default, fallback for others)
- [ ] AOV boosters in place (packages, add-ons) without breaking trust
- [ ] Conversion goals aligned with business metrics

**Marketing:**
- [ ] SEO meta descriptions optimized
- [ ] Social share previews tested
- [ ] Google Analytics events firing correctly
- [ ] Landing page copy aligns with ad campaigns

---

## 9. Rollback Plan

**If Critical Issues Found Post-Deploy:**

1. **Immediate Rollback:**
   ```bash
   # Vercel: Rollback to previous deployment
   vercel rollback [previous-deployment-url]
   
   # Or: Redeploy previous git commit
   git revert HEAD
   git push origin main
   ```

2. **Hotfix Process:**
   - Create `hotfix/` branch from `main`
   - Fix critical issue
   - Test locally: `npm run build` + manual QA
   - Deploy to staging first (if available)
   - Merge to `main` and redeploy

3. **Communication:**
   - Post in #engineering Slack channel
   - Update status page (if applicable)
   - Notify stakeholders of issue + ETA

---

## 10. Success Metrics (Post-Launch Tracking)

**Week 1 Targets:**
- [ ] **Uptime:** ≥99.5% (allow for minor deployment blips)
- [ ] **Page Load (P75):** <3s for homepage, pricing, booking
- [ ] **Bounce Rate:** <60% on pricing pages
- [ ] **Conversion Rate (Booking):** ≥2% of pricing page visitors
- [ ] **AOV Lift:** ≥15% increase from add-ons + packages vs baseline

**Month 1 Targets:**
- [ ] **City Adoption:** ≥20% of users select Mumbai/Bengaluru (track via cookie analytics)
- [ ] **Add-ons Adoption:** ≥25% of bookings include at least 1 add-on
- [ ] **Package Adoption:** ≥30% of bookings choose bundle vs individual services
- [ ] **Quote Generation:** ≥80% success rate (non-fatal, but track failures)
- [ ] **Mobile Traffic:** ≥60% (verify mobile UX meets expectations)

---

**Status:** ✅ READY FOR PRODUCTION DEPLOY  
**Next Action:** Execute visual QA → Deploy → Monitor metrics

