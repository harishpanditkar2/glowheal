# Post-Launch Improvement Roadmap
**Version:** 1.0  
**Created:** November 1, 2025  
**Status:** Queued for Week 2 (after 7 days baseline data)

---

## 🎯 Core Principles

**DO NOT CHANGE before Week 2:**
- ✅ Fixed-price, free-first, city-aware funnel (proven model)
- ✅ Colorful specialty icons (just launched, need data)
- ✅ Frosted glass hero badges (just launched, need data)
- ✅ City badge dropdown behavior (just launched, need data)
- ✅ "View Care Packages →" CTA copy (just launched, need data)

**Improvement Philosophy:**
1. **Collect 7 days baseline data first** (traffic, conversions, CTRs)
2. **Prioritize signal-adding changes** (trust, clarity, discoverability)
3. **Queue A/B test candidates** (icon size, badge placement, CTA copy)
4. **Avoid regressions** (maintain accessibility, performance, mobile comfort)

---

## 📊 Week 1: Data Collection Phase (Nov 1-7)

### Critical Metrics to Track

**Engagement:**
- [ ] City badge CTR (target: 5-10%)
- [ ] Service card clicks (colorful icons baseline)
- [ ] Hero scroll depth (% reaching stats section)
- [ ] Microproof badge visibility time
- [ ] "View Care Packages →" CTR vs old "View Fixed Prices"

**Conversion Funnel:**
- [ ] Homepage → /pricing views
- [ ] /pricing → service detail views
- [ ] Service detail → /book starts
- [ ] /book form completions
- [ ] Quote downloads
- [ ] Add-on adoption rate (LAB_BASIC, HEALTH_CHECK_PLUS, GUT_PANEL)

**City Dropdown Behavior:**
- [ ] Pune confirmations (users understanding availability)
- [ ] Mumbai/Bengaluru tap attempts (should be <1%)
- [ ] Dropdown open → close without selection

**Doctor Profile CTAs:**
- [ ] Clicks with preselected service labels
- [ ] Conversion rate vs generic "Book in Pune"

**Technical Health:**
- [ ] CLS scores across all pages (target: <0.1)
- [ ] Mobile bounce rate
- [ ] Page load times (target: <3s)

---

## 🔧 Week 2+: Implementation Plan

### Priority 1: Homepage Clarity (Est. 4 hours)

**🎯 Goal:** Concentrate value props above the fold, reduce layout shift, improve scanability

#### 1.1 Hero Trust Caption
```tsx
// Add under H1 (apps/web/src/app/page.tsx lines ~80-95)
<div className="flex items-center justify-center gap-3 text-sm text-white/90 mt-3">
  <div className="flex items-center gap-1.5">
    <svg className="w-4 h-4" aria-hidden="true">/* Checkmark icon */</svg>
    <span>Always ₹0 first consult</span>
  </div>
  <span className="text-white/50">•</span>
  <div className="flex items-center gap-1.5">
    <svg className="w-4 h-4" aria-hidden="true">/* Price tag icon */</svg>
    <span>Fixed city pricing</span>
  </div>
  <span className="text-white/50">•</span>
  <div className="flex items-center gap-1.5">
    <svg className="w-4 h-4" aria-hidden="true">/* Document icon */</svg>
    <span>Quote before payment</span>
  </div>
</div>
```

**A11y Notes:**
- Icons have `aria-hidden="true"` (decorative)
- Text provides all context
- Min contrast 4.5:1 on gradient background

#### 1.2 Lock Frosted Pill Heights
```tsx
// Prevent CLS (apps/web/src/app/page.tsx lines ~103-132)
<div className="h-[38px] bg-white/20 backdrop-blur-md ...">
  {/* Fixed height prevents layout shift when pills load */}
</div>
```

#### 1.3 Standardize Service Card Heights
```tsx
// apps/web/src/components/features/ServiceCard.tsx
<p className="text-gray-600 leading-relaxed line-clamp-2 min-h-[48px]">
  {description}
</p>
// Ensures 2 lines minimum, cards align in grid
```

#### 1.4 Limit "Most Booked" Badges
```tsx
// Keep only 3-5 strategic items (apps/web/src/data/catalog/pune.json)
// Current: ACNE_PLAN_30, WEIGHT_LOSS_90, HAIR_PRP_1 (3 total)
// Add 2 more: MENTAL_HEALTH_SESSION_4, GUT_HEALTH_PLAN_30
// Total: 5 badges (avoid fatigue)
```

#### 1.5 Add "See All Specialties" Chip
```tsx
// Add after service grid (apps/web/src/app/page.tsx)
<div className="text-center mt-8">
  <a href="/services" 
     className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-forest-600 text-forest-700 font-semibold rounded-lg hover:bg-forest-50 transition-colors">
    See All Specialties
    <svg className="w-5 h-5">/* Arrow right */</svg>
  </a>
</div>
```

**Success Metrics:**
- CLS remains <0.1
- Service card CTR increases 5-10%
- "See All Specialties" CTR: 3-5%

---

### Priority 2: Pricing Index Enhancements (Est. 6 hours)

**🎯 Goal:** Improve shareability, navigation, mobile readability

#### 2.1 Persist Tab in URL
```tsx
// apps/web/src/app/pricing/page.tsx
const [activeTab, setActiveTab] = useState('packages');

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab && ['packages', 'consultation', 'comparison'].includes(tab)) {
    setActiveTab(tab);
  }
}, []);

const handleTabChange = (tab: string) => {
  setActiveTab(tab);
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tab);
  window.history.pushState({}, '', url);
};
```

**Benefits:**
- Shareable links (e.g., `/pricing?tab=comparison`)
- Better analytics tracking
- Preserves user context on refresh

#### 2.2 Sticky Sub-Nav with ScrollTo
```tsx
// Add specialty jump navigation
<nav className="sticky top-16 bg-white/95 backdrop-blur-sm border-b z-40">
  <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
    <div className="flex gap-4 py-3">
      {SPECIALTIES.map(specialty => (
        <button
          onClick={() => {
            const el = document.getElementById(`pricing-${specialty.slug}`);
            const headerOffset = 128; // 64px header + 64px sub-nav
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }}
          className="whitespace-nowrap text-sm font-medium text-forest-700 hover:text-jade-600">
          {specialty.title}
        </button>
      ))}
    </div>
  </div>
</nav>
```

#### 2.3 Compress Comparison Table (Mobile)
```tsx
// apps/web/src/components/features/PricingComparisonTable.tsx
<td className="px-2 py-2 text-xs md:text-sm leading-snug">
  {/* 1 line per cell on mobile */}
  Free<span className="hidden md:inline"> first consultation</span>
</td>
```

#### 2.4 Add Pricing Method Footnote
```tsx
// Add below comparison table
<div className="mt-4 text-xs text-gray-600">
  * Our pricing method: <a href="/pricing-policy" className="text-jade-600 underline">transparent fixed rates</a> reviewed quarterly with medical partners. No hidden fees.
</div>
```

**Success Metrics:**
- Tab persistence usage: 15-20% of visits
- Sub-nav clicks: 10-15% of /pricing visitors
- Mobile comparison table readability (qualitative)

---

### Priority 3: Specialty Pricing Context (Est. 3 hours)

**🎯 Goal:** Build trust, provide secondary conversion path

#### 3.1 Inline "Top Reasons" Section
```tsx
// apps/web/src/app/pricing/[specialty]/page.tsx (before pricing cards)
<div className="bg-jade-50/30 border border-jade-200 rounded-xl p-6 mb-8">
  <h3 className="text-lg font-bold text-forest-700 mb-4">
    Top reasons patients choose Glowheal for {specialty.title}
  </h3>
  <ul className="space-y-2">
    <li className="flex items-start gap-2">
      <svg className="w-5 h-5 text-jade-600 mt-0.5">/* Checkmark */</svg>
      <span className="text-gray-700">Fixed transparent pricing—no surprises</span>
    </li>
    <li className="flex items-start gap-2">
      <svg className="w-5 h-5 text-jade-600 mt-0.5">/* Checkmark */</svg>
      <span className="text-gray-700">500+ specialist doctors across India</span>
    </li>
    <li className="flex items-start gap-2">
      <svg className="w-5 h-5 text-jade-600 mt-0.5">/* Checkmark */</svg>
      <span className="text-gray-700">Free first consultation to discuss your needs</span>
    </li>
  </ul>
</div>
```

#### 3.2 "Talk to a Doctor" Micro-CTA
```tsx
// Add beneath first row of pricing cards
<div className="col-span-full flex justify-center mt-6 mb-2">
  <a href="/book" 
     className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-jade-600 transition-colors">
    <svg className="w-5 h-5">/* Chat icon */</svg>
    Not sure? Talk to a doctor first (always free)
  </a>
</div>
```

#### 3.3 Dynamic Metadata with City + Specialty
```tsx
// apps/web/src/app/pricing/[specialty]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty } = params;
  const citySlug = 'pune'; // From city context hook
  const city = getCityDisplayName(citySlug);
  
  return {
    title: `${specialty.title} Pricing in ${city} | Fixed Rates | Glowheal`,
    description: `Transparent ${specialty.title.toLowerCase()} pricing in ${city}. Fixed rates, free first consultation, quote before payment. 500+ specialist doctors.`,
    keywords: [
      `${specialty.title.toLowerCase()} cost ${city}`,
      `${specialty.title.toLowerCase()} pricing India`,
      'fixed healthcare pricing',
      'transparent medical costs'
    ]
  };
}
```

#### 3.4 BreadcrumbList JSON-LD
```tsx
// Add to specialty pricing pages
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://glowheal.com' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://glowheal.com/pricing' },
    { '@type': 'ListItem', position: 3, name: specialty.title, item: `https://glowheal.com/pricing/${specialty.slug}` }
  ]
};
```

**Success Metrics:**
- "Top reasons" section scroll depth: 70%+
- "Talk to a doctor" micro-CTA clicks: 2-3%
- SEO: City + specialty keyword ranking improvements (track in 30 days)

---

### Priority 4: Services Discovery (Est. 5 hours)

**🎯 Goal:** Improve non-expert navigation, add pricing context

#### 4.1 Filter Chip Row
```tsx
// apps/web/src/app/services/page.tsx
const [filters, setFilters] = useState({ specialty: 'all', concern: 'all', city: 'pune' });

<div className="flex gap-2 overflow-x-auto pb-2">
  <select 
    value={filters.specialty}
    onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium">
    <option value="all">All Specialties</option>
    {SPECIALTIES.map(s => <option value={s.slug}>{s.title}</option>)}
  </select>
  
  <select 
    value={filters.concern}
    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium">
    <option value="all">All Concerns</option>
    <option value="acne">Acne</option>
    <option value="hair-loss">Hair Loss</option>
    <option value="anxiety">Anxiety</option>
    <option value="knee-pain">Knee Pain</option>
  </select>
  
  <div className="px-4 py-2 bg-jade-50 border-2 border-jade-200 rounded-lg text-sm font-semibold text-forest-700">
    {getCityDisplayName(filters.city)}
  </div>
</div>
```

#### 4.2 Mini Pricing Labels on Cards
```tsx
// apps/web/src/components/features/ServiceCard.tsx
const catalogItem = getCatalogItem(citySlug, serviceCode);

{catalogItem && (
  <div className="mt-auto pt-4 border-t">
    <span className="text-xs text-gray-500">from</span>
    <span className="text-lg font-bold text-forest-700 ml-1">₹{catalogItem.price}</span>
    <span className="text-xs text-gray-500 ml-1">in {getCityDisplayName(citySlug)}</span>
  </div>
)}

<p className="text-jade-600 font-semibold hover:text-jade-800 mt-2">
  View Care Packages →
</p>
```

**Note:** Keep free-first CTA primary, pricing is secondary context

#### 4.3 "Browse by Concern" Section
```tsx
// Add to /services page
<section className="mt-16">
  <h2 className="text-2xl font-bold text-forest-700 mb-6">Browse by Concern</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {CONCERNS.map(concern => (
      <a 
        href={`/services/${concern.specialtySlug}#${concern.anchor}`}
        className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-jade-600 hover:shadow-lg transition-all">
        <svg className="w-12 h-12 text-gray-400 group-hover:text-jade-600 mb-3">
          {concern.icon}
        </svg>
        <h3 className="font-bold text-forest-700">{concern.title}</h3>
        <p className="text-xs text-gray-600 mt-1">{concern.specialtyTitle}</p>
      </a>
    ))}
  </div>
</section>

// Example concerns:
const CONCERNS = [
  { title: 'Acne', specialtyTitle: 'Dermatology', specialtySlug: 'dermatology', anchor: 'acne-treatments' },
  { title: 'Hair Loss', specialtyTitle: 'Hair & Scalp', specialtySlug: 'hair-care', anchor: 'hair-loss' },
  { title: 'Anxiety', specialtyTitle: 'Mental Health', specialtySlug: 'mental-health', anchor: 'anxiety-therapy' },
  { title: 'Knee Pain', specialtyTitle: 'Orthopedics', specialtySlug: 'orthopedics', anchor: 'knee-treatments' }
];
```

**Success Metrics:**
- Filter usage: 20-25% of /services visitors
- "Browse by concern" CTR: 10-15%
- Service detail views from /services: +15-20%

---

### Priority 5: Service Detail Trust Signals (Est. 3 hours)

**🎯 Goal:** Reinforce transparency, reduce booking hesitation

#### 5.1 Keep Pricing Near Top + "See All" Button
```tsx
// apps/web/src/app/services/[slug]/page.tsx
<section className="mt-8" id="pricing">
  <h2 className="text-2xl font-bold text-forest-700 mb-6">Fixed Pricing in {city}</h2>
  
  <div className="grid md:grid-cols-2 gap-6">
    {keyItems.slice(0, 4).map(item => (
      <PricingCard item={item} />
    ))}
  </div>
  
  {keyItems.length > 4 && (
    <div className="text-center mt-6">
      <a href={`/pricing/${specialty.slug}`} 
         className="inline-flex items-center gap-2 text-jade-600 font-semibold hover:text-jade-800">
        See all {specialty.title} prices
        <svg className="w-5 h-5">/* Arrow right */</svg>
      </a>
    </div>
  )}
</section>
```

#### 5.2 Pricing Transparency FAQs
```tsx
// Add below pricing section
<section className="mt-12 bg-jade-50/30 border border-jade-200 rounded-xl p-8">
  <h3 className="text-xl font-bold text-forest-700 mb-6">Pricing Transparency FAQs</h3>
  
  <details className="group mb-4">
    <summary className="cursor-pointer font-semibold text-forest-700 hover:text-jade-600 flex items-center justify-between">
      Why are your prices fixed?
      <svg className="w-5 h-5 transition-transform group-open:rotate-180">/* Chevron */</svg>
    </summary>
    <p className="mt-3 text-gray-700 leading-relaxed">
      We believe healthcare pricing should be transparent. Our fixed rates are reviewed quarterly with medical partners and published upfront—no hidden fees, no surprises. You'll receive a detailed quote before any payment.
    </p>
  </details>
  
  <details className="group">
    <summary className="cursor-pointer font-semibold text-forest-700 hover:text-jade-600 flex items-center justify-between">
      When do I pay for add-ons?
      <svg className="w-5 h-5 transition-transform group-open:rotate-180">/* Chevron */</svg>
    </summary>
    <p className="mt-3 text-gray-700 leading-relaxed">
      Add-ons (like lab tests) are optional and only billed after you've consulted with your doctor and provided explicit consent. Your first consultation is always free—we'll discuss all options and costs before you commit.
    </p>
  </details>
</section>
```

#### 5.3 Service Schema with City Availability
```tsx
// apps/web/src/lib/schema-builders.ts
export function buildServiceSchema(service: Service, citySlug: string) {
  const city = getCityDisplayName(citySlug);
  const isAvailable = getCityStatus(citySlug) === 'available';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    'name': service.name,
    'description': service.description,
    'procedureType': 'Therapeutic',
    'availableService': {
      '@type': 'Offer',
      'availability': isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      'areaServed': {
        '@type': 'City',
        'name': city
      }
    }
    // Do NOT include aggregateRating unless showing reviews on page
  };
}
```

**Success Metrics:**
- FAQ expansion rate: 30-40%
- "See all prices" CTR: 5-8%
- Time on page: +15-20% (deeper engagement)

---

### Priority 6: Doctors Index Filters (Est. 4 hours)

**🎯 Goal:** Improve urgency signals, mobile usability

#### 6.1 Quick Availability Filters
```tsx
// apps/web/src/app/doctors/page.tsx
const [quickFilter, setQuickFilter] = useState('all');

<div className="flex gap-2 mb-6 overflow-x-auto pb-2">
  <button
    onClick={() => setQuickFilter('all')}
    className={cn(
      'px-4 py-2 rounded-lg font-medium whitespace-nowrap',
      quickFilter === 'all' ? 'bg-jade-600 text-white' : 'bg-white border-2 border-gray-200'
    )}>
    All Doctors
  </button>
  <button
    onClick={() => setQuickFilter('instant')}
    className={cn(
      'px-4 py-2 rounded-lg font-medium whitespace-nowrap',
      quickFilter === 'instant' ? 'bg-jade-600 text-white' : 'bg-white border-2 border-gray-200'
    )}>
    🟢 Instant
  </button>
  <button
    onClick={() => setQuickFilter('today')}
    className={cn(
      'px-4 py-2 rounded-lg font-medium whitespace-nowrap',
      quickFilter === 'today' ? 'bg-jade-600 text-white' : 'bg-white border-2 border-gray-200'
    )}>
    Today
  </button>
  <button
    onClick={() => setQuickFilter('tomorrow')}
    className={cn(
      'px-4 py-2 rounded-lg font-medium whitespace-nowrap',
      quickFilter === 'tomorrow' ? 'bg-jade-600 text-white' : 'bg-white border-2 border-gray-200'
    )}>
    Tomorrow
  </button>
</div>
```

#### 6.2 "Reset All" Button (Always Visible)
```tsx
// Add to filter panel
<div className="sticky top-0 bg-white border-b pb-3 mb-4 flex items-center justify-between">
  <h3 className="font-bold text-forest-700">Filters</h3>
  <button
    onClick={() => {
      setQuickFilter('all');
      setSpecialtyFilter('all');
      setCityFilter('pune');
      // Reset other filters
    }}
    className="text-sm text-gray-600 hover:text-jade-600 font-medium">
    Reset all
  </button>
</div>
```

#### 6.3 Standardize Card Heights + Collapsible Details
```tsx
// apps/web/src/components/features/DoctorCard.tsx
<div className="min-h-[320px] flex flex-col">
  <div className="flex-1">
    {/* Doctor info, specialty, price badge */}
  </div>
  
  <details className="mt-4">
    <summary className="text-sm text-gray-600 cursor-pointer hover:text-jade-600">
      Education & Experience
    </summary>
    <div className="mt-2 text-sm text-gray-700 space-y-1">
      <p>{doctor.education}</p>
      <p>{doctor.experience}</p>
    </div>
  </details>
  
  <Button className="mt-4 w-full">Book Free Consultation</Button>
</div>
```

#### 6.4 Cap Filter Panel Height
```tsx
// For mobile screens
<aside className="lg:sticky lg:top-20 max-h-[75vh] overflow-y-auto">
  {/* Filters */}
</aside>
```

**Success Metrics:**
- Quick filter usage: 25-30% of /doctors visitors
- "Reset all" clicks: 10-15%
- Card standardization: Reduced bounce rate (qualitative)

---

### Priority 7: Doctor Profile CTA Enhancements (Est. 2 hours)

**🎯 Goal:** Reduce cognitive load, improve accessibility

#### 7.1 "Top Pick" Tag in Pricing Widget
```tsx
// apps/web/src/components/features/DoctorPricingWidget.tsx
const topPickCode = getTopPickForSpecialty(doctor.specialty); // e.g., ACNE_PLAN_30 for dermatology

<div className="space-y-3">
  {items.slice(0, 3).map((item, idx) => (
    <div key={item.code} className="relative p-3 bg-white border rounded-lg">
      {item.code === topPickCode && (
        <div className="absolute -top-2 right-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
          Top Pick
        </div>
      )}
      <div className="font-semibold text-forest-700">{item.name}</div>
      <div className="text-2xl font-bold text-jade-600">₹{item.price}</div>
    </div>
  ))}
</div>
```

#### 7.2 Confirmation Chip When Service Preselected
```tsx
// Add above CTA button when ?service= param exists
{preselectedService && (
  <div className="flex items-center gap-2 px-3 py-2 bg-jade-50 border border-jade-200 rounded-lg mb-3">
    <svg className="w-5 h-5 text-jade-600">/* Checkmark */</svg>
    <span className="text-sm text-forest-700">
      <strong>{preselectedService.name}</strong> selected
    </span>
  </div>
)}

<Button 
  className="w-full min-h-[48px]"
  aria-label={`Book consultation in ${city}${preselectedService ? ` for ${preselectedService.name}` : ''}`}>
  {preselectedService ? (
    <span className="truncate" title={`Book in ${city} — ${preselectedService.name}`}>
      Book in {city} — {preselectedService.name}
    </span>
  ) : (
    `Book in ${city}`
  )}
</Button>
```

#### 7.3 Verify Truncation on 320-375px Widths
```tsx
// Test cases:
// - "Book in Pune — Acne Treatment (30-day)" → truncates with tooltip
// - "Book in Pune — PRP Hair Restoration (Single Session)" → truncates with tooltip
// - "Book in Pune" → no truncation needed

// Ensure min-h-[48px] maintained for touch targets
```

**Success Metrics:**
- "Top Pick" tagged items CTR: +10-15% vs non-tagged
- Confirmation chip visibility: 90%+ (when service preselected)
- Mobile CTA truncation: 0 overflow issues

---

### Priority 8: Booking Contextual Add-ons (Est. 4 hours)

**🎯 Goal:** Increase add-on relevance, reduce choice paralysis

#### 8.1 Filter Add-ons by Specialty
```tsx
// apps/web/src/app/book/page.tsx
const getRelevantAddOns = (selectedServices: string[]) => {
  const specialties = selectedServices.map(code => {
    const item = getCatalogItemByCode(code);
    return item?.specialty;
  }).filter(Boolean);
  
  // Filter add-ons based on specialty
  if (specialties.includes('dermatology') || specialties.includes('hair-care')) {
    return ADD_ONS.filter(ao => ao.code.includes('LAB') || ao.code === 'HEALTH_CHECK_PLUS');
  }
  
  if (specialties.includes('gut-health')) {
    return ADD_ONS.filter(ao => ao.code === 'GUT_PANEL' || ao.code === 'HEALTH_CHECK_PLUS');
  }
  
  return ADD_ONS; // Default: show all
};

const relevantAddOns = getRelevantAddOns(selectedItems);
```

#### 8.2 "Recommended for [Service]" Tag
```tsx
// Add to add-on cards
<div className="space-y-4">
  {relevantAddOns.map(addOn => (
    <div key={addOn.code} className="relative p-4 border-2 rounded-xl">
      {isRecommended(addOn, selectedItems) && (
        <div className="absolute -top-2 left-4 px-3 py-1 bg-jade-600 text-white text-xs font-bold rounded-full">
          Recommended for {getServiceName(selectedItems[0])}
        </div>
      )}
      
      <div className="font-semibold text-forest-700">{addOn.name}</div>
      <div className="text-xl font-bold text-jade-600">₹{addOn.price}</div>
      
      <button 
        onClick={() => toggleAddOn(addOn.code)}
        className="mt-3 w-full py-2 border-2 border-jade-600 rounded-lg">
        {selectedAddOns.includes(addOn.code) ? 'Remove' : 'Add'}
      </button>
    </div>
  ))}
</div>
```

#### 8.3 "Why This?" Tooltip for Transparency
```tsx
// Add info icon next to add-on name
<div className="flex items-center gap-2">
  <span className="font-semibold text-forest-700">{addOn.name}</span>
  <button
    onClick={() => setShowTooltip(!showTooltip)}
    className="text-gray-400 hover:text-jade-600"
    aria-label="Why this add-on is recommended">
    <svg className="w-5 h-5">/* Info circle icon */</svg>
  </button>
</div>

{showTooltip && (
  <div className="mt-2 p-3 bg-jade-50 border border-jade-200 rounded-lg text-sm text-gray-700">
    {addOn.rationale}
    {/* e.g., "Basic lab panel helps identify nutritional deficiencies that may affect skin health" */}
  </div>
)}
```

#### 8.4 Progress Indicators (Step 1-3)
```tsx
// Add to top of booking page
<div className="flex items-center justify-center gap-2 mb-8">
  {[1, 2, 3].map(step => (
    <div key={step} className="flex items-center">
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold',
        currentStep === step ? 'bg-jade-600 text-white' : 'bg-gray-200 text-gray-600',
        currentStep > step && 'bg-jade-600 text-white'
      )}>
        {currentStep > step ? '✓' : step}
      </div>
      {step < 3 && <div className="w-12 h-1 bg-gray-200 mx-1" />}
    </div>
  ))}
</div>

<div className="text-center mb-6">
  <h2 className="text-2xl font-bold text-forest-700">
    {currentStep === 1 && 'Select Service'}
    {currentStep === 2 && 'Your Details'}
    {currentStep === 3 && 'Add-ons (Optional)'}
  </h2>
</div>
```

#### 8.5 Reassurance Line Under CTA
```tsx
// apps/web/src/app/book/page.tsx (below submit button)
<Button type="submit" className="w-full min-h-[48px]">
  Book Free Consultation
</Button>

<p className="text-center text-sm text-gray-600 mt-3">
  <svg className="w-4 h-4 text-jade-600 inline mr-1">/* Shield checkmark */</svg>
  No payment now—₹0 first consult. We'll send your quote after review.
</p>
```

#### 8.6 WhatsApp Prefill with City + Service
```tsx
// Update getFreeConsultWhatsAppURL helper (apps/web/src/lib/cta-helpers.ts)
export function getFreeConsultWhatsAppURL(
  phone: string,
  concern?: string,
  city?: string,
  service?: string
): string {
  const baseMessage = `Hi, I want to book my free first consultation`;
  const parts = [baseMessage];
  
  if (service) parts.push(`for ${service}`);
  if (city) parts.push(`in ${city}`);
  if (concern) parts.push(`regarding ${concern}`);
  
  const message = parts.join(' ') + '.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

**Success Metrics:**
- Contextual add-on adoption: +20-30% vs non-filtered
- "Why this?" tooltip clicks: 15-20%
- Progress indicator completion rate: +10-15%

---

### Priority 9: Join as Doctor Enhancements (Est. 3 hours)

**🎯 Goal:** Build credibility, reduce form abandonment

#### 9.1 Partner Proof Section
```tsx
// apps/web/src/app/join-doctor/page.tsx (near top)
<section className="bg-jade-50/30 border border-jade-200 rounded-xl p-8 mb-12">
  <h3 className="text-xl font-bold text-forest-700 mb-6">Join 500+ Specialist Doctors</h3>
  
  <div className="grid md:grid-cols-3 gap-6">
    <div className="text-center">
      <div className="text-4xl font-bold text-jade-600">12-18</div>
      <div className="text-sm text-gray-600 mt-1">Median weekly leads</div>
      <div className="text-xs text-gray-500 mt-1">by specialty</div>
    </div>
    
    <div className="text-center">
      <div className="text-4xl font-bold text-jade-600">48h</div>
      <div className="text-sm text-gray-600 mt-1">Onboarding timeline</div>
      <div className="text-xs text-gray-500 mt-1">from application to first patient</div>
    </div>
    
    <div className="text-center">
      <div className="text-4xl font-bold text-jade-600">₹5.2k</div>
      <div className="text-sm text-gray-600 mt-1">Avg. monthly earnings</div>
      <div className="text-xs text-gray-500 mt-1">part-time, teleconsult only</div>
    </div>
  </div>
  
  <p className="text-center text-sm text-gray-600 mt-6">
    View our <a href="/doctor-payout-policy" className="text-jade-600 underline">payout policy</a> for details
  </p>
</section>
```

#### 9.2 "Save and Continue Later" (LocalStorage)
```tsx
// Add localStorage persistence for form data
const [formData, setFormData] = useState(() => {
  const saved = localStorage.getItem('doctorApplicationDraft');
  return saved ? JSON.parse(saved) : DEFAULT_FORM_STATE;
});

useEffect(() => {
  localStorage.setItem('doctorApplicationDraft', JSON.stringify(formData));
}, [formData]);

// Add "Save Draft" button
<button
  type="button"
  onClick={() => {
    alert('Draft saved! You can return anytime to complete your application.');
  }}
  className="text-sm text-gray-600 hover:text-jade-600">
  💾 Save and continue later
</button>
```

**Success Metrics:**
- Partner proof section scroll depth: 80%+
- "Save draft" usage: 10-15% of incomplete forms
- Form completion rate: +15-20%

---

### Priority 10: Cities Page Enhancements (Est. 2 hours)

**🎯 Goal:** Capture demand for inactive cities, prevent confusion

#### 10.1 Consistent Active/Coming Soon Styles
```tsx
// apps/web/src/app/cities/page.tsx
<div className="grid md:grid-cols-3 gap-6">
  {CITIES.map(city => {
    const status = getCityStatus(city.slug);
    const isActive = status === 'available';
    
    return (
      <div
        key={city.slug}
        className={cn(
          'p-6 border-2 rounded-xl',
          isActive 
            ? 'border-jade-600 bg-white cursor-pointer hover:shadow-lg' 
            : 'border-gray-200 bg-gray-50 opacity-75 cursor-not-allowed'
        )}>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-forest-700">{city.name}</h3>
          {isActive ? (
            <span className="px-3 py-1 bg-jade-600 text-white text-xs font-bold rounded-full">
              Active
            </span>
          ) : (
            <span className="px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        
        {isActive ? (
          <a href={`/?city=${city.slug}`} className="text-jade-600 font-semibold hover:text-jade-800">
            View pricing in {city.name} →
          </a>
        ) : (
          <p className="text-gray-600 text-sm">
            We're expanding to {city.name}. Get notified when we launch.
          </p>
        )}
      </div>
    );
  })}
</div>
```

#### 10.2 Newsletter Micro-CTA for Inactive Cities
```tsx
// Add form for coming soon cities
{!isActive && (
  <form onSubmit={handleNotifyMe} className="mt-4">
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg mb-2"
      required
    />
    <button
      type="submit"
      className="w-full py-2 bg-jade-600 text-white font-semibold rounded-lg hover:bg-jade-700">
      Notify me when {city.name} launches
    </button>
  </form>
)}
```

**Success Metrics:**
- "Notify me" submissions: 5-8% of visitors clicking inactive cities
- Prevents confusion: <1% users trying to book in inactive cities

---

### Priority 11: Blog/About Page Enhancements (Est. 2 hours)

**🎯 Goal:** Convey momentum, maintain professional tone

#### 11.1 "Most Read" or "Coming Soon Topics" Block
```tsx
// apps/web/src/app/blog/page.tsx (if blog exists) or /about
<section className="bg-white rounded-xl p-8 border-2 border-gray-200">
  <h3 className="text-xl font-bold text-forest-700 mb-6">Coming Soon on Our Blog</h3>
  
  <div className="grid md:grid-cols-3 gap-6">
    {UPCOMING_TOPICS.map(topic => (
      <div key={topic.slug} className="border-l-4 border-jade-600 pl-4">
        <h4 className="font-bold text-forest-700 mb-2">{topic.title}</h4>
        <p className="text-sm text-gray-600">{topic.description}</p>
        <span className="text-xs text-gray-500 mt-2 block">Publishing in {topic.monthYear}</span>
      </div>
    ))}
  </div>
</section>

// Example topics:
const UPCOMING_TOPICS = [
  { 
    title: 'Understanding Fixed Healthcare Pricing in India', 
    description: 'Why transparent pricing matters for patients',
    monthYear: 'Dec 2025'
  },
  { 
    title: 'Choosing the Right Dermatologist for Acne', 
    description: 'Expert tips from 500+ specialist doctors',
    monthYear: 'Jan 2026'
  },
  { 
    title: 'Teleconsult vs In-Person: Which is Right for You?', 
    description: 'Comparing virtual and physical consultations',
    monthYear: 'Feb 2026'
  }
];
```

#### 11.2 Footer CTA Priority
```tsx
// apps/web/src/components/layout/Footer.tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <Button size="lg" className="bg-jade-600 hover:bg-jade-700 text-white">
    Book Free Consultation
  </Button>
  
  <Button size="lg" variant="outline" className="border-2 border-forest-600 text-forest-700 hover:bg-forest-50">
    View Fixed Pricing
  </Button>
  
  {/* NO WhatsApp in header/footer - keep in low-priority areas only */}
</div>
```

**Success Metrics:**
- "Coming Soon" section scroll depth: 60%+
- Footer CTA clicks: Primary 70%, Secondary 30%

---

### Priority 12: Header/Navigation IA (Est. 2 hours)

**🎯 Goal:** Optimize nav order, improve accessibility

#### 12.1 Reorder Nav Links
```tsx
// apps/web/src/components/layout/Header.tsx
// OLD ORDER: Home > Services > Doctors > Pricing > Cities
// NEW ORDER: Home > Pricing > Services > Doctors > Cities

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' }, // MOVED UP (primary entry path)
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/cities', label: 'Cities' }
];
```

#### 12.2 De-emphasize "Join as Doctor" for Patients
```tsx
// Change from primary button to outline style
<Button variant="outline" href="/join-doctor" className="hidden lg:inline-flex border-2 border-gray-300 text-gray-700 hover:border-jade-600 hover:text-jade-600">
  Join as Doctor
</Button>

// Keeps it accessible but less prominent for patient-focused flow
```

#### 12.3 City Badge Accessibility
```tsx
// Ensure proper ARIA attributes (apps/web/src/components/layout/Header.tsx)
<button
  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
  aria-expanded={isCityDropdownOpen}
  aria-controls="city-dropdown-menu"
  aria-label={`Change city. Currently showing ${cityDisplayName} prices`}
  className="...">
  {/* Badge content */}
</button>

<div 
  id="city-dropdown-menu"
  role="menu"
  aria-hidden={!isCityDropdownOpen}
  className="...">
  {CITIES.map(city => (
    <button
      role="menuitem"
      disabled={status === 'coming-soon'}
      aria-disabled={status === 'coming-soon'}
      className="...">
      {city.name}
    </button>
  ))}
</div>
```

**Success Metrics:**
- /pricing views from header: +10-15% (moved higher in nav)
- City badge keyboard navigation: 100% functional

---

### Priority 13: Accessibility & Performance Final Sweep (Est. 3 hours)

**🎯 Goal:** Ensure AA compliance, CLS <0.1 across all pages

#### 13.1 Re-verify Contrast Ratios
```bash
# Use axe DevTools Chrome extension
# Test all pages with insufficient contrast warnings:

# Hero pills: bg-white/20 on gradient (min 4.5:1 AA)
# Pricing cards: text-white on gradient (min 12:1 AAA)
# Service icons: All colorful icons on white bg (min 4.5:1 AA)
# City badge: text-forest-900 on jade-50 (min 7:1 AAA)

# Fix any failures with explicit color values
```

#### 13.2 Lock Icon Container Sizes
```tsx
// Prevent CLS from icon loads

// Homepage stats section (apps/web/src/app/page.tsx)
<div className="w-10 h-10 flex items-center justify-center"> {/* Fixed container */}
  <svg className="w-10 h-10 text-jade-500">...</svg>
</div>

// Service cards (apps/web/src/components/features/ServiceCard.tsx)
<div className="w-12 h-12 flex items-center justify-center"> {/* Fixed container */}
  <SpecialtyIcon specialty={specialty} size="md" />
</div>

// How It Works section
<div className="w-16 h-16 flex items-center justify-center"> {/* Fixed container */}
  <svg className="w-16 h-16 text-jade-500">...</svg>
</div>
```

#### 13.3 Verify City Dropdown No Layout Shift
```tsx
// Test: Open dropdown should NOT push content down
// Solution: Use absolute positioning on dropdown

<div className="relative"> {/* Position context */}
  <button>City Badge</button>
  
  <div className="absolute left-0 top-full mt-2 z-50"> {/* Absolute positioned dropdown */}
    {/* Dropdown content */}
  </div>
</div>
```

#### 13.4 Color + Label for All Badges
```tsx
// Avoid color-only meaning
// Always include icon + text label

// "Most Booked" badge
<div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full">
  <svg className="w-4 h-4" aria-hidden="true">/* Fire icon */</svg>
  <span className="font-bold">Most Booked</span>
</div>

// "Coming Soon" badge
<div className="flex items-center gap-1.5 px-3 py-1 bg-gray-400 text-white rounded-full">
  <svg className="w-4 h-4" aria-hidden="true">/* Clock icon */</svg>
  <span className="font-bold">Coming Soon</span>
</div>
```

**Success Metrics:**
- axe DevTools: 0 critical issues
- Lighthouse Accessibility: ≥95
- CLS: <0.1 on all pages

---

## 🧪 Week 2+ A/B Test Candidates

### Test 1: City Badge Placement
- **Control:** Near hamburger menu (current)
- **Variant:** Near logo (left-aligned)
- **Hypothesis:** Left placement increases visibility by 10%
- **Metric:** Badge CTR
- **Duration:** 2 weeks, min 1,000 visitors per variant

### Test 2: Icon Size
- **Control:** 48px (current)
- **Variant A:** 56px (bolder)
- **Variant B:** 40px (subtler)
- **Hypothesis:** 56px increases service card CTR by 8%
- **Metric:** Service card clicks
- **Duration:** 2 weeks, min 2,000 visitors per variant

### Test 3: CTA Copy
- **Control:** "View Care Packages →"
- **Variant A:** "See Treatment Options →"
- **Variant B:** "Explore Services →"
- **Hypothesis:** "Treatment Options" increases conversions by 5%
- **Metric:** /pricing → service detail CTR
- **Duration:** 2 weeks, min 3,000 visitors per variant

### Test 4: Microproof Badge Style
- **Control:** Frosted glass (bg-white/20 backdrop-blur-md)
- **Variant:** Solid background (bg-white/95)
- **Hypothesis:** Solid improves readability by 12%
- **Metric:** Hero scroll depth, qualitative feedback
- **Duration:** 1 week, min 1,000 visitors per variant

### Test 5: Add-on Panel Position
- **Control:** Step 3 (current)
- **Variant:** Step 2 (earlier in funnel)
- **Hypothesis:** Step 2 increases adoption by 15%
- **Metric:** Add-on selection rate
- **Duration:** 2 weeks, min 500 bookings per variant

**CRITICAL:** Do NOT run any tests before collecting 7 days of baseline data. Premature optimization risks false conclusions.

---

## 📈 Success Metrics Summary

| Page | Key Metric | Baseline Target | Post-Improvement Target |
|------|-----------|-----------------|-------------------------|
| Homepage | Hero scroll depth | 65% | 75% |
| Homepage | Service card CTR | 12% | 18% (colorful icons) |
| Homepage | "See All Specialties" CTR | - | 5% (new element) |
| /pricing | Tab persistence usage | - | 20% (new feature) |
| /pricing | Sub-nav clicks | - | 12% (new feature) |
| /pricing/[specialty] | "Top reasons" scroll depth | - | 70% (new element) |
| /pricing/[specialty] | "Talk to a doctor" CTR | - | 3% (new element) |
| /services | Filter usage | - | 25% (new feature) |
| /services | "Browse by concern" CTR | - | 12% (new section) |
| /services/[slug] | FAQ expansion rate | - | 35% (new FAQs) |
| /doctors | Quick filter usage | - | 28% (new filters) |
| /doctors/[slug] | "Top Pick" item CTR | 15% | 25% (tagged items) |
| /book | Contextual add-on adoption | 8% | 20% (filtered by specialty) |
| /join-doctor | Form completion rate | 22% | 35% (save draft + proof) |

---

## 🚦 Implementation Checklist

### Before Starting (Week 1 Baseline)
- [ ] Confirm 7 days of clean analytics data collected
- [ ] Document baseline metrics (CTRs, conversions, scroll depths)
- [ ] Review user feedback/support tickets for pain points
- [ ] Run axe DevTools audit on all pages (baseline accessibility)

### During Implementation (Week 2-3)
- [ ] Work in feature branches (e.g., `feature/homepage-trust-caption`)
- [ ] Test each change on mobile (360px, 375px, 414px widths)
- [ ] Run Lighthouse audits after each major change
- [ ] Verify no CLS regressions (target: <0.1)
- [ ] Update unit tests if schema or components change

### After Implementation (Week 4)
- [ ] Deploy to staging first, test end-to-end
- [ ] Run full accessibility audit (axe DevTools + manual keyboard nav)
- [ ] Verify analytics events fire correctly for new features
- [ ] Deploy to production during low-traffic window
- [ ] Monitor for 48 hours: errors, CLS spikes, bounce rate changes

---

## 🎯 Priority Matrix

| Priority | Changes | Est. Hours | Impact | Risk |
|----------|---------|-----------|---------|------|
| **P0 (Week 2)** | Homepage clarity, pricing enhancements, specialty context | 13h | High (above-the-fold trust) | Low |
| **P1 (Week 3)** | Services discovery, doctor filters, booking add-ons | 15h | High (conversion funnel) | Medium |
| **P2 (Week 4)** | Doctor profile CTAs, join doctor proof, cities page | 7h | Medium (niche segments) | Low |
| **P3 (Week 5+)** | Blog/about content, nav IA, A/B tests | 7h + ongoing | Medium (polish + optimization) | Low |

**Total Estimated Hours:** 42 hours (1-2 weeks for 1 developer)

---

## 🔒 Non-Negotiables

These elements MUST remain intact:

1. **Free-first consultation funnel** - Primary CTA always "Book Free Consultation"
2. **Fixed transparent pricing** - No ranges, no "from ₹X", exact prices only
3. **City-aware pricing** - Always show user's selected city context
4. **Disabled city states** - Mumbai/Bengaluru non-clickable until catalogs complete
5. **Accessibility standards** - AA minimum, AAA for pricing text
6. **Mobile-first design** - All touch targets ≥48px
7. **Performance targets** - CLS <0.1, Lighthouse Performance ≥90

---

## 📝 Notes

- This roadmap assumes **7 days of baseline data** before any changes
- All A/B tests require **minimum sample sizes** (listed per test)
- Changes should be **deployed incrementally** (not all at once)
- **Monitor for regressions** after each deployment (CLS, bounce rate, conversions)
- **User feedback** should inform priority adjustments
- **Technical debt** (e.g., next/image migration) can be tackled separately

---

**Last Updated:** November 1, 2025  
**Next Review:** November 8, 2025 (after Week 1 baseline data collected)
