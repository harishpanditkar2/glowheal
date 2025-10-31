# Analytics Events - Free Consultation Funnel

**Created:** October 31, 2025  
**Purpose:** Track free consultation funnel conversion points for GA4 optimization  
**Implementation:** Data layer events (not deployed with credentials)

---

## Event Taxonomy

### Event Naming Convention
```
{action}_{object}
```
- Use snake_case
- Start with verb (view, click, book, route)
- End with noun (consult, button, form)

---

## 1. free_consult_view

**Trigger:** User lands on any page with "Free First Consultation" messaging  
**Purpose:** Measure awareness of free consult offer

**Parameters:**
```javascript
{
  event: 'free_consult_view',
  page_path: string,              // e.g., '/', '/services', '/landing/glowheal-offer'
  page_title: string,             // e.g., 'Homepage', 'Services'
  user_type: 'new' | 'returning', // Based on cookie/localStorage
  session_id: string,             // Unique session identifier
  timestamp: number               // Unix timestamp
}
```

**Implementation Example:**
```javascript
// On page load
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'free_consult_view',
  page_path: window.location.pathname,
  page_title: document.title,
  user_type: localStorage.getItem('glowheal_user_type') || 'new',
  session_id: sessionStorage.getItem('glowheal_session_id'),
  timestamp: Date.now()
});
```

---

## 2. free_consult_click

**Trigger:** User clicks any "Book Free Consultation" CTA button  
**Purpose:** Measure intent to book free consultation

**Parameters:**
```javascript
{
  event: 'free_consult_click',
  cta_location: string,           // 'header' | 'hero' | 'footer' | 'banner' | 'services' | 'landing'
  cta_text: string,               // 'Book Free Consultation' | 'Book Free Consult' | 'Book Now'
  cta_variant: string,            // 'primary' | 'free' | 'secondary'
  page_path: string,              // Current page
  page_section: string,           // 'hero' | 'services' | 'how-it-works' | 'faq' | 'cta'
  target_url: string,             // '/book'
  session_id: string,
  timestamp: number
}
```

**Implementation Example:**
```javascript
// On CTA click
document.querySelectorAll('a[href="/book"], button[data-action="book-consult"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    window.dataLayer.push({
      event: 'free_consult_click',
      cta_location: btn.dataset.location || 'unknown',
      cta_text: btn.textContent.trim(),
      cta_variant: btn.className.includes('free') ? 'free' : 'primary',
      page_path: window.location.pathname,
      page_section: btn.closest('section')?.id || 'unknown',
      target_url: btn.href || '/book',
      session_id: sessionStorage.getItem('glowheal_session_id'),
      timestamp: Date.now()
    });
  });
});
```

---

## 3. free_consult_booked

**Trigger:** User successfully submits booking form with "Free First Consultation" selected  
**Purpose:** Measure conversion from awareness to booking

**Parameters:**
```javascript
{
  event: 'free_consult_booked',
  lead_id: string,                // Unique lead identifier
  concern: string,                // Health concern category
  city: string,                   // User's city
  preferred_time: string,         // ISO 8601 datetime
  contact_method: 'phone' | 'whatsapp' | 'email',
  source: string,                 // 'free_consult' (attribution)
  page_path: '/book',
  funnel_stage: 'booking_complete',
  session_id: string,
  user_id: string | null,         // If authenticated
  timestamp: number
}
```

**Implementation Example:**
```javascript
// On booking form submit success
async function handleBookingSuccess(leadData) {
  window.dataLayer.push({
    event: 'free_consult_booked',
    lead_id: leadData.id,
    concern: leadData.concern,
    city: leadData.city,
    preferred_time: leadData.preferredTime,
    contact_method: leadData.contactMethod,
    source: 'free_consult',
    page_path: '/book',
    funnel_stage: 'booking_complete',
    session_id: sessionStorage.getItem('glowheal_session_id'),
    user_id: leadData.userId || null,
    timestamp: Date.now()
  });
  
  // Also track as conversion event
  window.dataLayer.push({
    event: 'conversion',
    conversion_type: 'free_consultation_booking',
    value: 0, // Free
    currency: 'INR'
  });
}
```

---

## 4. specialist_routed

**Trigger:** Post-consultation when patient is routed to a specialist  
**Purpose:** Measure conversion from free consult to paid specialist booking

**Parameters:**
```javascript
{
  event: 'specialist_routed',
  lead_id: string,                // Original free consult lead ID
  consult_id: string,             // Free consultation record ID
  specialist_type: string,        // 'dermatologist' | 'mental-health' | etc.
  specialist_fee: number,         // Consultation fee in ₹
  routing_reason: string,         // 'requires_specialist' | 'patient_request' | 'complex_case'
  time_to_routing: number,        // Minutes from free consult to routing
  booking_status: 'booked' | 'pending' | 'declined',
  session_id: string,
  user_id: string,
  timestamp: number
}
```

**Implementation Example:**
```javascript
// After in-house doctor completes free consultation
async function handleSpecialistRouting(routingData) {
  window.dataLayer.push({
    event: 'specialist_routed',
    lead_id: routingData.leadId,
    consult_id: routingData.consultId,
    specialist_type: routingData.specialistType,
    specialist_fee: routingData.fee,
    routing_reason: routingData.reason,
    time_to_routing: routingData.timeToRouting,
    booking_status: routingData.bookingStatus,
    session_id: sessionStorage.getItem('glowheal_session_id'),
    user_id: routingData.userId,
    timestamp: Date.now()
  });
  
  // Track revenue opportunity
  if (routingData.bookingStatus === 'booked') {
    window.dataLayer.push({
      event: 'purchase',
      transaction_id: routingData.consultId,
      value: routingData.fee,
      currency: 'INR',
      items: [{
        item_name: `${routingData.specialistType} consultation`,
        item_category: 'specialist_consult',
        price: routingData.fee,
        quantity: 1
      }]
    });
  }
}
```

---

## 5. whatsapp_click

**Trigger:** User clicks WhatsApp CTA with free consultation prefill  
**Purpose:** Measure alternative contact method usage

**Parameters:**
```javascript
{
  event: 'whatsapp_click',
  cta_location: string,           // 'header' | 'footer' | 'hero' | 'floating-button'
  message_type: 'free_consult',   // Prefill category
  concern: string | null,         // If concern specified
  city: string | null,            // If city specified
  page_path: string,
  session_id: string,
  timestamp: number
}
```

**Implementation Example:**
```javascript
// On WhatsApp link click
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const url = new URL(link.href);
    const text = decodeURIComponent(url.searchParams.get('text') || '');
    
    window.dataLayer.push({
      event: 'whatsapp_click',
      cta_location: link.dataset.location || 'unknown',
      message_type: text.includes('free first consultation') ? 'free_consult' : 'general',
      concern: extractConcern(text),
      city: extractCity(text),
      page_path: window.location.pathname,
      session_id: sessionStorage.getItem('glowheal_session_id'),
      timestamp: Date.now()
    });
  });
});
```

---

## 6. banner_dismissed

**Trigger:** User dismisses announcement banner  
**Purpose:** Measure banner visibility duration and dismissal rate

**Parameters:**
```javascript
{
  event: 'banner_dismissed',
  banner_type: 'announcement',
  banner_content: 'free_consult',
  time_visible: number,           // Seconds banner was visible
  page_path: string,
  session_id: string,
  timestamp: number
}
```

**Implementation Example:**
```javascript
// On banner dismiss
const bannerShownTime = Date.now();

function handleBannerDismiss() {
  const timeVisible = (Date.now() - bannerShownTime) / 1000;
  
  window.dataLayer.push({
    event: 'banner_dismissed',
    banner_type: 'announcement',
    banner_content: 'free_consult',
    time_visible: timeVisible,
    page_path: window.location.pathname,
    session_id: sessionStorage.getItem('glowheal_session_id'),
    timestamp: Date.now()
  });
  
  localStorage.setItem('glowheal_banner_dismissed', 'true');
}
```

---

## GA4 Configuration

### Custom Definitions

**Custom Events (Create in GA4):**
1. free_consult_view
2. free_consult_click
3. free_consult_booked
4. specialist_routed
5. whatsapp_click
6. banner_dismissed

**Custom Dimensions (User-Scoped):**
- user_type (new | returning)
- lead_source (free_consult | paid | referral)

**Custom Dimensions (Event-Scoped):**
- cta_location
- cta_text
- cta_variant
- concern
- city
- specialist_type
- routing_reason
- booking_status
- contact_method

**Custom Metrics:**
- time_to_routing (minutes)
- time_visible (seconds)
- specialist_fee (INR)

---

## Conversion Goals

### Primary Conversions
1. **Free Consultation Booking** (free_consult_booked)
   - Value: 0 INR
   - Category: Lead Generation
   - Counting: Once per session

2. **Specialist Booking** (specialist_routed + booking_status='booked')
   - Value: specialist_fee INR
   - Category: Revenue
   - Counting: Every time

### Secondary Conversions
3. **WhatsApp Engagement** (whatsapp_click)
   - Value: 0 INR
   - Category: Engagement
   - Counting: Once per session

---

## Funnel Analysis

### Free Consultation Funnel
```
Step 1: free_consult_view       (Awareness)
  ↓
Step 2: free_consult_click      (Intent)
  ↓
Step 3: free_consult_booked     (Conversion)
  ↓
Step 4: specialist_routed       (Upsell)
```

**Key Metrics:**
- Awareness → Intent: CTR% = (clicks / views) × 100
- Intent → Conversion: Booking Rate% = (bookings / clicks) × 100
- Conversion → Upsell: Routing Rate% = (routed / bookings) × 100
- Overall: End-to-End% = (specialist_booked / views) × 100

---

## Implementation Checklist

- [ ] Add dataLayer initialization to root layout
- [ ] Implement session_id generation (sessionStorage)
- [ ] Track free_consult_view on all pages
- [ ] Track free_consult_click on all CTAs
- [ ] Track free_consult_booked on booking success
- [ ] Track specialist_routed post-consultation
- [ ] Track whatsapp_click on WhatsApp links
- [ ] Track banner_dismissed on banner close
- [ ] Create GA4 custom events
- [ ] Create GA4 custom dimensions
- [ ] Create GA4 custom metrics
- [ ] Set up conversion goals
- [ ] Set up funnel visualization
- [ ] Test events in GA4 DebugView
- [ ] Document event parameters for team
- [ ] Train team on GA4 dashboard usage

---

## Privacy & Compliance

**PII Handling:**
- ❌ Do NOT send: patient names, phone numbers, email addresses, medical details
- ✅ DO send: anonymized lead_id, user_id, concern categories (not specifics)

**Data Retention:**
- GA4 default: 14 months
- Adjust to 26 months for healthcare compliance (if needed)

**GDPR/DPDPA Compliance:**
- Obtain consent before tracking (cookie banner)
- Provide opt-out mechanism
- Document data processing in privacy policy
- Anonymize IP addresses (GA4 default)

---

## Testing

### Manual Testing (Chrome DevTools)
```javascript
// Open Console
console.log(window.dataLayer);

// Simulate event
window.dataLayer.push({
  event: 'free_consult_click',
  cta_location: 'test',
  cta_text: 'Test Button',
  cta_variant: 'free',
  page_path: '/test',
  page_section: 'hero',
  target_url: '/book',
  session_id: 'test-session-123',
  timestamp: Date.now()
});
```

### GA4 DebugView
1. Admin → Data Streams → Web → Configure tag settings → Show advanced settings → Enable debug mode
2. Visit site with `?gtm_debug=1` or use Chrome extension
3. GA4 → Admin → DebugView → View real-time events
4. Verify parameters and values

---

## Reporting Dashboards

### Recommended GA4 Reports
1. **Free Consultation Funnel** (Exploration → Funnel Exploration)
2. **CTA Performance** (Reports → Engagement → Events → free_consult_click)
3. **Conversion Attribution** (Reports → Advertising → Acquisition → Traffic Acquisition)
4. **Specialist Routing** (Custom Report: specialist_routed by specialist_type)

---

**Status:** Documentation complete - Ready for implementation  
**Next Steps:** Implement dataLayer events in production after QA sign-off  
**Owner:** Analytics Team + Engineering Team  
**Review:** Monthly optimization based on funnel drop-off points
