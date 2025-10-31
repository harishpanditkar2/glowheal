# Font Self-Hosting Implementation Guide

## 📦 Required Font Files

Download these fonts from Google Fonts or use `google-webfonts-helper`:

### Inter (Body Font)
- `inter-v13-latin-regular.woff2` (400 weight)
- `inter-v13-latin-600.woff2` (600 weight - semi-bold)
- `inter-v13-latin-700.woff2` (700 weight - bold)

### Poppins (Display Font)
- `poppins-v20-latin-600.woff2` (600 weight - semi-bold)
- `poppins-v20-latin-700.woff2` (700 weight - bold)

**Download Source:** https://gwfh.mranftl.com/fonts

---

## 📁 File Structure

```
apps/web/public/fonts/
├── inter-v13-latin-regular.woff2
├── inter-v13-latin-600.woff2
├── inter-v13-latin-700.woff2
├── poppins-v20-latin-600.woff2
└── poppins-v20-latin-700.woff2
```

---

## 🎨 CSS Implementation

Add to `apps/web/src/styles/globals.css` (BEFORE Tailwind directives):

```css
/* ========================================
   SELF-HOSTED FONTS - Core Web Vitals Optimization
   ======================================== */

/* Inter Regular (Body Text) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Prevents invisible text during load */
  src: url('/fonts/inter-v13-latin-regular.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* Inter Semi-Bold (Subheadings) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-v13-latin-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* Inter Bold (Strong Emphasis) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-v13-latin-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* Poppins Semi-Bold (Display Headings) */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/poppins-v20-latin-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* Poppins Bold (Hero Headings) */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/poppins-v20-latin-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* Now include Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ...rest of globals.css */
```

---

## ⚡ Preload Critical Font (LCP Optimization)

Add to `apps/web/src/app/layout.tsx` in the `<head>` section:

```tsx
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preload display font to prevent layout shift on hero */}
        <link
          rel="preload"
          href="/fonts/poppins-v20-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Optional: Preload body font if it's LCP element */}
        <link
          rel="preload"
          href="/fonts/inter-v13-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

---

## 🎯 Expected Performance Improvements

### Before Self-Hosting (Google Fonts CDN)
- External DNS lookup: ~50-100ms
- Connection time: ~50-100ms
- Download time: ~100-200ms
- **Total:** 200-400ms added to LCP

### After Self-Hosting
- Local file serving: ~10-30ms
- No external requests
- Browser cache reuse
- **Total:** 10-30ms (90% reduction)

### Core Web Vitals Impact
- **LCP Improvement:** -200ms to -500ms
- **CLS Prevention:** font-display: swap prevents invisible text
- **FCP Improvement:** -100ms to -200ms

---

## ✅ Verification Steps

1. **Build and Test:**
   ```bash
   cd apps/web
   npm run build
   npm start
   ```

2. **Check Network Tab:**
   - Open Chrome DevTools > Network
   - Filter by "Font"
   - Verify fonts load from `/fonts/` (not `fonts.googleapis.com`)
   - Check size: woff2 should be 20-50KB per font

3. **Lighthouse Audit:**
   ```bash
   lighthouse http://localhost:3000 --view
   ```
   - Check "Eliminate render-blocking resources" - should be green
   - Check "Ensure text remains visible during webfont load" - should pass

4. **Visual Regression:**
   - Compare homepage before/after
   - Verify no FOUT (Flash of Unstyled Text)
   - Confirm no FOIT (Flash of Invisible Text)

---

## 🐛 Troubleshooting

### Fonts not loading
- Check file paths: `/fonts/` not `/public/fonts/`
- Verify file extensions: `.woff2` not `.woff`
- Check MIME types in Network tab: `font/woff2`

### Performance not improved
- Verify preload links have `crossOrigin="anonymous"`
- Check browser cache headers
- Ensure `font-display: swap` is present

### FOUT (Flash of Unstyled Text)
- Add `font-display: optional` instead of `swap` (more aggressive)
- Preload critical fonts in `<head>`

---

## 📚 Additional Resources

- **Google Webfonts Helper:** https://gwfh.mranftl.com/fonts
- **Font Squirrel:** https://www.fontsquirrel.com/tools/webfont-generator
- **Web.dev Guide:** https://web.dev/font-best-practices/
- **WOFF2 Compression:** https://gist.github.com/sergejmueller/cf6b4f2133bcb3e2f64a

---

## 🔄 Migration Checklist

- [ ] Download 5 font files (Inter: 3, Poppins: 2)
- [ ] Place in `apps/web/public/fonts/` directory
- [ ] Add `@font-face` declarations to `globals.css` (before @tailwind)
- [ ] Add preload links to `layout.tsx`
- [ ] Remove Google Fonts `<link>` tag (if present)
- [ ] Test in dev server
- [ ] Run production build
- [ ] Run Lighthouse audit
- [ ] Verify LCP improvement in PageSpeed Insights
- [ ] Deploy to production
- [ ] Monitor Core Web Vitals in Search Console

---

**Estimated Time:** 30-45 minutes  
**Impact:** 🚀 High (LCP -200ms to -500ms)  
**Priority:** 🔴 Critical for launch
