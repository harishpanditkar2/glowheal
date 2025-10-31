# Glowheal Copilot Instructions

## Project Architecture

**Monorepo Structure:** Next.js 14 App Router in `apps/web/`, with npm workspaces (not Turborepo).

**Key Directories:**
- `apps/web/src/app/` - App Router pages with file-based routing
- `apps/web/src/data/catalog/` - City-specific pricing catalogs (JSON)
- `apps/web/src/components/` - React components organized by purpose (ui/, features/, layout/)
- `apps/web/src/lib/` - Utilities, schema builders, catalog logic
- `data/` - Root-level static data (services, doctors, cities)
- `scripts/` - Node.js validation and build tools

**Build Commands:**
```bash
npm run dev        # Start dev server (cd apps/web && next dev)
npm run build      # Production build (cd apps/web && next build)
npm run typecheck  # TypeScript validation
node scripts/validate-catalog.js  # Validate pricing catalogs
```

---

## Critical Domain Patterns

### 1. Fixed Pricing Catalog System

**Core Concept:** Multi-city pricing with fixed prices (no ranges/tiers). Each city has a JSON catalog; incomplete catalogs fallback to Pune.

**Files:**
- `apps/web/src/lib/catalog.ts` - Central API for catalog access
- `apps/web/src/data/catalog/{pune,mumbai,bengaluru}.json` - City pricing files

**Key Functions:**
```typescript
getCatalog(citySlug: string): CatalogCity | null
  // Returns city catalog, falls back to Pune if incomplete
  // Logs console warnings for missing cities

getCatalogItem(citySlug: string, itemCode: string): CatalogItem | null
  // Fetches single pricing item by code

isCatalogReady(catalog: CatalogCity): boolean
  // Checks for TODO markers, price=0 (placeholder detection)
```

**Catalog Structure:**
```typescript
{
  city: "Pune",
  citySlug: "pune",
  teleconsult: { first_consult: 0, note: "Free" },
  specialties: [
    {
      slug: "dermatology",
      title: "Dermatology",
      items: [
        {
          code: "ACNE_PLAN_30",
          name: "Acne Treatment (30-day)",
          price: 2499,
          unit: "plan",
          includes: ["Initial consultation", "..."],
          excludes: ["Lab tests", "..."]
        }
      ]
    }
  ]
}
```

**When Adding New Cities:**
1. Create `apps/web/src/data/catalog/{city}.json` matching structure
2. Set `price: 0` and `code: "TODO_*"` for placeholders
3. Run `node scripts/validate-catalog.js` (expects warnings, 0 errors)
4. Catalog won't activate until `isCatalogReady()` passes (no TODO/zero prices)

---

### 2. Free-First Consultation Funnel

**Core Concept:** All CTAs route to `/book` for free first consultation. Paid specialist services require catalog item selection.

**Hook:** `useFreeCta()` - Centralized copy for all free consultation messaging

```typescript
const { ctaText, ctaHref, whatsappText } = useFreeCta();
// ctaText: "Book Free Consultation"
// ctaHref: "/book"
// whatsappText: "Hi, I want to book my free first consultation..."
```

**Usage:** Import in every component needing CTA copy (Header, Footer, AnnouncementBanner, pages).

**Booking Flow:**
1. User lands on `/book?service=ACNE_PLAN_30` (optional pre-selection)
2. Form submits to `/api/bookings` with `selectedItems: string[]` (catalog codes)
3. API creates lead JSON in `/data/leads/YYYY/MM/` with items array
4. Non-fatal quote generation: If items selected, calls `/api/quote/create`
5. Success page shows items + quote download link (if generated)

**WhatsApp Integration:**
- `getFreeConsultWhatsAppURL(phone, concern?, city?)` - Generates wa.me link
- Used in sticky buttons, success page, header
- Phone: `+918329563445` (hardcoded in multiple components)

---

### 3. Quote PDF System

**Implementation:** HTML-based quotes (not binary PDFs), designed for browser print-to-PDF.

**API Endpoints:**
- `POST /api/quote/create` - Generates HTML quote, saves to `/data/quotes/YYYY/MM/`
- `GET /api/quote/download?file=...` - Serves saved quote with security checks

**Security (Path Traversal Prevention):**
```typescript
if (file.includes('..') || file.includes('~')) {
  return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
}
```

**Quote HTML Features:**
- Print CSS: `@page { size: A4; margin: 1cm; }`
- Itemized services with includes/excludes
- **"Amount Due Now: ₹0 (Free Consultation)"** (green emphasis)
- Disclaimers: provisional pricing, valid 30 days, payment after consent

**Non-Fatal Quote Generation:**
Quote creation failure does NOT block booking. Lead JSON created first, quote generated asynchronously.

---

### 4. Analytics & Tracking

**GTM DataLayer Events:**
```typescript
(window as any).dataLayer.push({
  event: 'pricing_select_initiated',
  service: 'ACNE_PLAN_30',
  city: 'pune'
});

// Other events:
// - pricing_item_added (service, city)
// - pricing_item_removed (service, city)
// - free_consult_form_submit (items, city, leadId)
// - quote_create (leadId, itemsCount)
```

**Usage:** Fire events in:
- `/book` page: Item add/remove, form submission, quote generation
- `LeadFormCard`: Form submission
- `StickyMobileBar`: WhatsApp click

**Implementation Pattern:** Check for `window.dataLayer` before pushing (avoids SSR errors).

---

## Code Conventions

### Styling

**Utility Function:** `cn()` from `lib/utils.ts` - Combines `clsx` + `tailwind-merge`

```typescript
import { cn } from '@/lib/utils';

className={cn(
  'base-classes',
  variant === 'primary' && 'primary-variant',
  className // Props override
)}
```

**Design System:**
- Colors: Forest green palette (`forest-*` classes) - see `DESIGN_TOKENS.md`
- Typography: `font-display` (headings), `font-body` (text)
- Spacing: Healthcare-appropriate whitespace (generous, calm)

### Component Structure

**Layout:** `apps/web/src/components/layout/` - Header, Footer, AnnouncementBanner, StickyMobileBar
**UI Primitives:** `apps/web/src/components/ui/` - Button, Card, Input, Select (shadcn-inspired)
**Features:** `apps/web/src/components/features/` - Domain components (LeadFormCard, DoctorCard, ServiceCard)

**Pattern for New Components:**
```tsx
import { cn } from '@/lib/utils';

interface ComponentProps {
  variant?: 'default' | 'primary';
  className?: string;
}

export function Component({ variant = 'default', className, ...props }: ComponentProps) {
  return (
    <div className={cn('base-styles', variantStyles[variant], className)} {...props}>
      {/* Content */}
    </div>
  );
}
```

### Metadata & SEO

**Pattern:** Export `metadata` object or `generateMetadata()` function in page.tsx

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Glowheal',
  description: 'SEO description with keywords',
  openGraph: { /* OG tags */ }
};
```

**Dynamic Pages:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  // Fetch data based on slug
  return { title, description };
}
```

**JSON-LD Schema:** Use `lib/schema-builders.ts` - `buildOrganizationSchema()`, `buildPhysicianSchema()`, `buildBreadcrumbSchema()`, etc.

---

## Common Workflows

### Adding New Service/Specialty

1. Add to `data/services.json` (root-level static data)
2. Add specialty to catalog: `apps/web/src/data/catalog/pune.json`
3. Create `/services/{slug}/page.tsx` with `generateMetadata()`
4. Add to `KNOWN_SPECIALTIES` in `scripts/validate-catalog.js`
5. Run validation: `node scripts/validate-catalog.js`

### Adding Pricing Item

1. Edit `apps/web/src/data/catalog/{city}.json`
2. Add item to appropriate specialty:
   ```json
   {
     "code": "NEW_SERVICE_CODE",
     "name": "Service Name",
     "price": 1499,
     "unit": "session",
     "includes": ["Benefit 1", "Benefit 2"],
     "excludes": ["Not included 1"]
   }
   ```
3. Validate: `node scripts/validate-catalog.js` (checks uniqueness, positive price)
4. Test booking flow: `/book?service=NEW_SERVICE_CODE`

### Debugging Quote Generation

**Check:**
1. `/data/quotes/` folder exists with write permissions
2. Lead JSON created first (non-blocking)
3. Console logs in quote API (`/api/quote/create/route.ts`)
4. Verify catalog item codes match selected services
5. Test quote download: `/api/quote/download?file=QUOTE_*.html`

**Path traversal blocked:** Queries with `..` or `~` return 400 error (security feature).

---

## Known Constraints & TODOs

### Placeholder Catalogs
- Mumbai/Bengaluru catalogs use `TODO_*` codes and `price: 0`
- Fallback to Pune until medical + legal review complete
- Console warnings logged (not errors)

### Schema Type Issues
- `schema-dts` Physician type doesn't support `alumniOf`, `jobTitle`
- Use `as any` for extended properties (medical specialty, education)
- Prefer core properties: `name`, `description`, `affiliation`, `aggregateRating`

### Lead Storage
- JSON files in `/data/leads/YYYY/MM/` (not database)
- Production: Migrate to database or S3 export
- Current: Manual CSV export from JSON files

### Performance Optimizations
- Hero images use `<img>` (next/image migration pending)
- Self-hosted fonts loaded in root layout (already optimized)
- Lighthouse target: ≥90 Performance/Accessibility (current status: passing)

---

## Testing & Validation

### Pre-Deploy Checklist
```bash
# 1. Type check
npm run typecheck

# 2. Build
npm run build  # Must succeed with 0 errors (warnings OK)

# 3. Validate catalogs
node scripts/validate-catalog.js  # Warnings OK, 0 errors required

# 4. Manual tests
# - Visit /book?service=ACNE_PLAN_30
# - Submit booking → verify quote downloads
# - Test Mumbai fallback: /pricing?city=mumbai (console warning expected)
# - Check no price ranges: "From ₹X - ₹Y" should not exist
```

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation (Tab, Space, Enter, Escape)
- Touch targets ≥48x48px
- Focus visible on all interactive elements
- `<details>` elements for collapsible content (pricing includes/excludes)

---

## Documentation References

**Deep Dives:**
- `LAUNCH_READINESS_RUNBOOK.md` - Comprehensive pre-deployment verification
- `PHASE_3_COMPLETION_SUMMARY.md` - Quote PDF, multi-city, booking UX features
- `DESIGN_TOKENS.md` - Full design system, color palette, typography
- `README.md` - Project overview, status tracking, component inventory

**Quick References:**
- `QUICK_LAUNCH_CHECKLIST.md` - 15-minute pre-flight verification
- `scripts/validate-catalog.js` - Catalog validation logic and error messages

---

## Common Pitfalls

1. **Don't call React Hooks in regular functions** - Use `useFreeCta()` only in components; use `getFreeConsultWhatsAppURL()` helper for non-Hook contexts.

2. **Catalog fallback is intentional** - Mumbai/Bengaluru showing Pune prices + console warnings is expected behavior until catalogs finalized.

3. **Quote generation is non-fatal** - Booking should succeed even if quote fails. Don't block on quote API response.

4. **Path aliases use `@/`** - Import from `@/lib/utils`, `@/components/ui/Button`, etc. (configured in `tsconfig.json`).

5. **City slugs are lowercase** - Use `citySlug.toLowerCase()` in catalog logic; URL params may vary case.

6. **First consultation is always free** - `teleconsult.first_consult: 0` in all catalogs; "Amount Due Now: ₹0" is correct.

---

## Getting Help

**Blocked on:**
- Schema validation errors → Check `schema-builders.ts`, may need `as any` cast
- Build failures → Run `npm run typecheck`, check ESLint config
- Catalog issues → Run `node scripts/validate-catalog.js`, review warnings
- Quote not generating → Verify `/data/quotes/` folder exists, check API logs

**For new features:**
1. Check existing patterns in similar components
2. Review `DESIGN_TOKENS.md` for styling conventions
3. Run validation scripts before committing
4. Follow accessibility requirements (keyboard, ARIA, focus management)
