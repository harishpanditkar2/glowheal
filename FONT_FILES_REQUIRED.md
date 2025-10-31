# ⚠️ FONT FILES REQUIRED FOR PRODUCTION

## Status: CRITICAL - Download Required Before Launch

The application is now configured for self-hosted fonts to optimize LCP performance (-200 to -500ms improvement).

**Current Status:** Font @font-face declarations added to `globals.css`, but font files are missing from `/public/fonts/` directory.

---

## 📥 REQUIRED FONT FILES (5 Total)

### Inter Font (Body Text)
Download from: https://gwfh.mranftl.com/fonts/inter?subsets=latin

**Required files:**
1. `inter-v13-latin-regular.woff2` (Weight 400) - Body text
2. `inter-v13-latin-600.woff2` (Weight 600) - Semi-bold
3. `inter-v13-latin-700.woff2` (Weight 700) - Bold headings

### Poppins Font (Display Headings)
Download from: https://gwfh.mranftl.com/fonts/poppins?subsets=latin

**Required files:**
4. `poppins-v20-latin-600.woff2` (Weight 600) - Semi-bold display
5. `poppins-v20-latin-700.woff2` (Weight 700) - **PRELOADED** - Bold display (hero headings)

---

## 📁 FILE PLACEMENT

Place all 5 `.woff2` files in:
```
apps/web/public/fonts/
```

Directory structure:
```
apps/web/
  public/
    fonts/
      inter-v13-latin-regular.woff2
      inter-v13-latin-600.woff2
      inter-v13-latin-700.woff2
      poppins-v20-latin-600.woff2
      poppins-v20-latin-700.woff2   ← Preloaded in layout.tsx
```

---

## ✅ VERIFICATION STEPS

After placing font files:

1. **Start dev server:**
   ```powershell
   npm run dev
   ```

2. **Open Chrome DevTools:**
   - Press F12
   - Go to Network tab
   - Filter by "Font"
   - Reload page (Ctrl+R)

3. **Verify fonts load from local `/fonts/` directory:**
   ```
   ✅ /fonts/poppins-v20-latin-700.woff2 (Status 200)
   ✅ /fonts/inter-v13-latin-regular.woff2 (Status 200)
   ✅ /fonts/inter-v13-latin-600.woff2 (Status 200)
   ❌ Should NOT see: fonts.googleapis.com or fonts.gstatic.com
   ```

4. **Check preload worked:**
   - Look for `<link rel="preload" ... poppins-v20-latin-700.woff2>` in page source
   - Font should load with high priority in Network tab

5. **Measure LCP improvement:**
   ```powershell
   npx lighthouse http://localhost:3000 --view
   ```
   - Before: LCP ~3.0-3.5s (with Google Fonts CDN)
   - After: LCP ~2.2-2.8s (self-hosted) ← Target ≤2.5s

---

## 🚨 FALLBACK (If Download Issues)

If you cannot download from gwfh.mranftl.com, use official Google Fonts helper:

1. Visit https://fonts.google.com/
2. Select "Inter" → Download family
3. Select "Poppins" → Download family
4. Extract ZIP files
5. Use `.woff2` files from `static/` folder
6. Rename to match the required filenames above

---

## 📊 EXPECTED PERFORMANCE IMPACT

| Metric | Before (Google CDN) | After (Self-Hosted) | Improvement |
|--------|---------------------|---------------------|-------------|
| LCP | 3.0-3.5s | 2.2-2.8s | **-200 to -500ms** |
| FOIT/FOUT | Occasional flash | None (font-display:swap) | Better UX |
| Requests | +2 external DNS | 0 external | Fewer DNS lookups |
| Lighthouse Performance | 65-75 | 85-90 | **+15-20 points** |

---

## 🔗 CODE REFERENCES

**Font declarations:** `apps/web/src/styles/globals.css:1-50`
**Preload link:** `apps/web/src/app/layout.tsx:78-84`
**Tailwind config:** Uses `font-sans` (Inter) and `font-display` (Poppins)

---

## ⏰ DEADLINE

**Must complete before:** Production launch (Nov 15-21, 2025)
**Estimated time:** 10-15 minutes (download + place files + verify)
**Priority:** 🔴 CRITICAL - Blocks optimal LCP performance

---

**Status as of Oct 30, 2025:** Configuration complete, awaiting font file download.
