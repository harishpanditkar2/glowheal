# Phase 2 - Quick Test Guide

**Date:** October 31, 2025  
**Status:** Ready for Testing

---

## 🚀 QUICK START

### 1. Start Dev Server
```powershell
cd d:\web\glowheal
npm run dev
```

### 2. Open Browser
Navigate to: `http://localhost:3000`

---

## ✅ 5-MINUTE SMOKE TEST

### Test 1: Navigation (30 seconds)
1. ✅ Click "Pricing" in header → Lands on `/pricing`
2. ✅ Scroll to footer → See "Pune Fixed Prices" link
3. ✅ Click "Dermatology Pricing" → Lands on `/pricing/dermatology`

### Test 2: Services Page (1 minute)
1. ✅ Visit `/services`
2. ✅ See "Pune Fixed Prices" panel with amber background
3. ✅ See 3 dermatology items, 3 mental health items, 2 orthopedics items
4. ✅ Click "Book Free Consultation" on "Acne Treatment (30 days)" → URL has `?service=ACNE_PLAN_30`

### Test 3: Service Detail Page (1 minute)
1. ✅ Visit `/services/dermatology`
2. ✅ See "Fixed Pricing in Pune" section after hero
3. ✅ See all 4 dermatology catalog items
4. ✅ Scroll to FAQ → "What is the consultation fee?" references fixed pricing

### Test 4: Booking Flow (2 minutes)
1. ✅ Visit `/book?service=ACNE_PLAN_30&specialty=dermatology`
2. ✅ At Step 1, see "Selected Services (Provisional)" card
3. ✅ See "Acne Treatment (30 days) - ₹899 / plan"
4. ✅ Click "Change" → Modal opens with all catalog items
5. ✅ Select "PRP Hair (Single Session)" → Checkbox checked
6. ✅ Click "Done (2 selected)" → Modal closes
7. ✅ See both items in provisional card
8. ✅ Click X on first item → Removed
9. ✅ Fill form and submit → Success page shows 1 provisional item

### Test 5: Doctors Directory (30 seconds)
1. ✅ Visit `/doctors`
2. ✅ Find a Dermatologist card → See "Glowheal price in Pune: ₹899" amber badge
3. ✅ Hover info icon → Tooltip: "Partner doctors follow Glowheal fixed prices"
4. ✅ Click badge → Lands on `/pricing/dermatology`

### Test 6: Doctor Profile (30 seconds)
1. ✅ Visit `/doctors/dr-priya-sharma` (or any dermatologist)
2. ✅ Scroll to sidebar → See "Fixed Prices in Pune" widget
3. ✅ See 1-3 dermatology items with compact cards
4. ✅ Click "Start Free (₹0)" → Lands on `/book?service=...&doctor=...`
5. ✅ On mobile, scroll to bottom → Sticky CTA has "View Glowheal Fixed Prices" link

---

## 🐛 COMMON ISSUES & FIXES

### Issue: Catalog items not showing
**Check:**
```powershell
node scripts/validate-catalog.js
```
**Expected:** ✅ Validation passed

**Fix:** Verify `data/catalog/pune.json` exists

### Issue: URL params not working
**Check:** Browser URL bar shows `?service=ACNE_PLAN_30&specialty=dermatology`

**Fix:** Verify `useSearchParams()` import in booking page

### Issue: Modal not opening
**Check:** Console for JavaScript errors

**Fix:** Verify `showServiceModal` state and `openServiceModal` handler

### Issue: Pricing tags missing on doctor cards
**Check:** Doctor specialty matches mapping in `getRepresentativePricing()`

**Fix:** Add specialty to mapping object in `apps/web/src/app/doctors/page.tsx`

---

## 📊 ANALYTICS VERIFICATION

### Open Browser Console (F12)
1. Navigate to `/book`
2. Click "Browse Fixed Prices"
3. **Expected in console:**
   ```javascript
   dataLayer.push({
     event: 'pricing_select_initiated',
     page: 'book',
     specialty: 'all',
     itemsCountBefore: 0
   })
   ```

4. Select an item
5. **Expected:**
   ```javascript
   dataLayer.push({
     event: 'pricing_item_added',
     page: 'book',
     code: 'ACNE_PLAN_30'
   })
   ```

6. Submit booking
7. **Expected:**
   ```javascript
   dataLayer.push({
     event: 'free_consult_form_submit',
     selectedItems: ['ACNE_PLAN_30'],
     itemsCount: 1
   })
   ```

---

## 🎨 VISUAL CHECKS

### Colors
- ✅ Pricing sections: Amber-50 background, Amber-200 borders
- ✅ Price text: Forest-700 (2xl font-bold)
- ✅ CTAs: Amber-500 hover:Amber-600
- ✅ Checkmarks: Lime-600
- ✅ Focus rings: 2px Forest-700

### Spacing
- ✅ Price cards: p-4 to p-6
- ✅ Modal: max-w-4xl with px-6 py-4 header
- ✅ Touch targets: ≥44px (CTAs, close buttons, checkboxes)

### Typography
- ✅ Body text: 16px
- ✅ Price headlines: text-2xl (24px)
- ✅ Card titles: font-bold
- ✅ Disclaimers: text-xs (12px)

---

## 📱 MOBILE TESTING

### Responsive Breakpoints
1. **Mobile (< 768px)**
   - ✅ Pricing modal: Full-screen on small devices
   - ✅ Price cards: Stack vertically (grid-cols-1)
   - ✅ Sticky CTA: Includes pricing link
   - ✅ Provisional card: Buttons stack on narrow screens

2. **Tablet (768px - 1024px)**
   - ✅ Price cards: 2 columns (md:grid-cols-2)
   - ✅ Doctor profile: Sidebar below main content

3. **Desktop (> 1024px)**
   - ✅ Price cards: 3 columns (lg:grid-cols-3)
   - ✅ Doctor profile: Sidebar on right (lg:col-span-1)

---

## ♿ ACCESSIBILITY TESTING

### Keyboard Navigation
1. Tab through pricing modal
   - ✅ Focus moves through checkboxes
   - ✅ Esc closes modal
   - ✅ Focus returns to trigger button

2. Tab through provisional card
   - ✅ "Change" button focusable
   - ✅ "Remove" chips focusable
   - ✅ "Add More Services" button focusable

### Screen Reader (Optional)
1. Use NVDA/JAWS/VoiceOver
2. Navigate to booking page
3. ✅ Provisional card announced: "Selected Services (Provisional)"
4. ✅ Each item announced: "Acne Treatment, ₹899 per plan"
5. ✅ Disclaimer read aloud

### Run axe DevTools
1. Install extension
2. Visit `/pricing`, `/services`, `/doctors`, `/book`
3. ✅ No critical or serious issues

---

## 🏁 DEPLOYMENT CHECKLIST

Before deploying:
- [ ] Run `npm run build` - no errors
- [ ] All 6 smoke tests pass
- [ ] Analytics events verified in console
- [ ] Mobile responsive on 3 breakpoints
- [ ] Keyboard navigation works
- [ ] axe DevTools shows no critical issues

After deploying:
- [ ] Visit production URLs
- [ ] Test booking flow end-to-end
- [ ] Monitor lead submissions for `items` array
- [ ] Check Google Analytics for `pricing_*` events
- [ ] Monitor Lighthouse scores (Performance ≥90, Accessibility ≥90)

---

## 📞 SUPPORT

**Documentation:**
- Full summary: `docs/PHASE2_COMPLETION_SUMMARY.md`
- Progress report: `docs/PHASE2_PROGRESS_REPORT.md`

**Code Locations:**
- Booking: `apps/web/src/app/book/page.tsx`
- Catalog lib: `apps/web/src/lib/catalog.ts`
- Pricing pages: `apps/web/src/app/pricing/`
- Doctors: `apps/web/src/app/doctors/`

**Catalog Data:**
- `apps/web/src/data/catalog/pune.json` (9 items)
- `apps/web/src/data/catalog/addons.pune.json` (3 add-ons)

---

**✅ Phase 2 Complete - Ready to Test!**
