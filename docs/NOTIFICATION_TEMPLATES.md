# Notification Templates - Free Consultation Messaging

**Created:** October 31, 2025  
**Purpose:** Email/SMS templates for free consultation funnel  
**Status:** Documentation only (not deployed)  
**Tone:** Hospital-grade - empathetic, calm, clinical trust

---

## Template Guidelines

### Brand Voice
- **Empathetic:** Acknowledge health concerns with compassion
- **Calm:** Avoid urgency tactics, maintain clinical composure
- **Trustworthy:** Use medical terminology appropriately, cite credentials
- **Clear:** Short sentences, actionable steps, no jargon

### Formatting
- Subject lines: ≤50 characters (mobile optimization)
- Email body: ≤200 words (80% read rate)
- SMS: ≤160 characters (single segment)
- CTA: One primary action per message

### Accessibility
- Plain text + HTML versions (email)
- Alt text for images
- High contrast text (≥4.5:1)
- No color-only meaning

---

## 1. Free Consultation Confirmation (Email)

**Trigger:** User books free first consultation  
**Send:** Immediately after booking  
**Goal:** Confirm booking, reduce no-shows

### Subject Line
```
Your free consultation is scheduled ✓
```

### HTML Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free Consultation Confirmed - Glowheal</title>
</head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111827; background-color: #f3f4f6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #134E4A 0%, #2F8F83 100%); color: #ffffff; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Your Free Consultation is Confirmed</h1>
    </div>
    
    <!-- Body -->
    <div style="padding: 30px 20px;">
      <p style="font-size: 16px; margin-bottom: 20px;">
        Hi <strong>[Patient Name]</strong>,
      </p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Your <strong>free first consultation</strong> with our in-house doctor is scheduled. We'll discuss your <strong>[Concern]</strong> concern and create a personalized care plan.
      </p>
      
      <!-- Booking Details Card -->
      <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #134E4A;">📅 Appointment Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #4b5563;">Date:</td>
            <td style="padding: 8px 0; color: #111827;">[Date - e.g., November 5, 2025]</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #4b5563;">Time:</td>
            <td style="padding: 8px 0; color: #111827;">[Time - e.g., 10:00 AM IST]</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #4b5563;">City:</td>
            <td style="padding: 8px 0; color: #111827;">[City]</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #4b5563;">Doctor:</td>
            <td style="padding: 8px 0; color: #111827;">Glowheal In-House Physician</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #4b5563;">Fee:</td>
            <td style="padding: 8px 0; color: #14b8a6; font-weight: 700;">₹0 (Free)</td>
          </tr>
        </table>
      </div>
      
      <!-- What to Expect -->
      <h3 style="font-size: 18px; color: #134E4A; margin-bottom: 15px;">What to Expect:</h3>
      <ol style="padding-left: 20px; margin-bottom: 20px; color: #4b5563;">
        <li style="margin-bottom: 10px;">Our doctor will discuss your health concern</li>
        <li style="margin-bottom: 10px;">Review your medical history if needed</li>
        <li style="margin-bottom: 10px;">Recommend next steps or specialist referral</li>
        <li style="margin-bottom: 10px;">Answer all your questions</li>
      </ol>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="[WhatsApp Link]" style="display: inline-block; background-color: #F59E0B; color: #134E4A; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px;">
          Confirm on WhatsApp
        </a>
      </div>
      
      <!-- Reschedule Link -->
      <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 20px;">
        Need to reschedule? <a href="[Reschedule Link]" style="color: #2F8F83; text-decoration: underline;">Click here</a>
      </p>
      
      <!-- Medical Disclaimer -->
      <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #6b7280; line-height: 1.5;">
        <strong>Medical Note:</strong> You'll speak with our in-house doctor first. They'll route you to a specialist only if needed. Specialist fees apply only if you proceed with their consultation.
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #134E4A; color: #ffffff; padding: 20px; text-align: center; font-size: 14px;">
      <p style="margin: 0 0 10px 0;">Glowheal - Your trusted healthcare partner</p>
      <p style="margin: 0; font-size: 12px; color: #a7f3d0;">
        <a href="https://glowheal.in" style="color: #a7f3d0; text-decoration: none;">Visit Website</a> |
        <a href="[Privacy Link]" style="color: #a7f3d0; text-decoration: none;">Privacy Policy</a> |
        <a href="[Unsubscribe Link]" style="color: #a7f3d0; text-decoration: none;">Unsubscribe</a>
      </p>
    </div>
    
  </div>
</body>
</html>
```

### Plain Text Version
```
Your Free Consultation is Confirmed - Glowheal

Hi [Patient Name],

Your free first consultation with our in-house doctor is scheduled. We'll discuss your [Concern] concern and create a personalized care plan.

APPOINTMENT DETAILS
-------------------
Date: [Date - e.g., November 5, 2025]
Time: [Time - e.g., 10:00 AM IST]
City: [City]
Doctor: Glowheal In-House Physician
Fee: ₹0 (Free)

WHAT TO EXPECT
--------------
1. Our doctor will discuss your health concern
2. Review your medical history if needed
3. Recommend next steps or specialist referral
4. Answer all your questions

Confirm on WhatsApp: [WhatsApp Link]

Need to reschedule? Visit: [Reschedule Link]

MEDICAL NOTE: You'll speak with our in-house doctor first. They'll route you to a specialist only if needed. Specialist fees apply only if you proceed with their consultation.

---
Glowheal - Your trusted healthcare partner
Website: https://glowheal.in
Privacy: [Privacy Link]
Unsubscribe: [Unsubscribe Link]
```

---

## 2. Free Consultation Confirmation (SMS)

**Trigger:** User books free first consultation  
**Send:** Immediately after booking  
**Goal:** Instant mobile confirmation

### Template (160 characters)
```
Glowheal: Your FREE consult is confirmed for [Date] at [Time]. Doctor will call on [Phone]. Questions? WhatsApp: [Link] -Team Glowheal
```

### Variables
- `[Date]`: e.g., "Nov 5"
- `[Time]`: e.g., "10AM"
- `[Phone]`: Patient's number
- `[Link]`: Short link to WhatsApp (bit.ly format)

---

## 3. 24-Hour Reminder (Email)

**Trigger:** 24 hours before scheduled consultation  
**Send:** Automated  
**Goal:** Reduce no-shows

### Subject Line
```
Tomorrow: Your free consultation at [Time]
```

### Body (Short Version)
```html
<div style="font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #134E4A;">Reminder: Free Consultation Tomorrow</h2>
  
  <p>Hi <strong>[Patient Name]</strong>,</p>
  
  <p>Your free consultation is scheduled for tomorrow at <strong>[Time]</strong>.</p>
  
  <div style="background-color: #f0fdfa; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0;"><strong>📅 [Date]</strong></p>
    <p style="margin: 10px 0 0 0;"><strong>🕐 [Time] IST</strong></p>
    <p style="margin: 10px 0 0 0;"><strong>💊 Concern: [Concern]</strong></p>
  </div>
  
  <p><strong>What to prepare:</strong></p>
  <ul>
    <li>List your current symptoms</li>
    <li>Note any medications you're taking</li>
    <li>Have questions ready</li>
  </ul>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="[WhatsApp Link]" style="display: inline-block; background-color: #F59E0B; color: #134E4A; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700;">
      I'm Ready - WhatsApp Confirm
    </a>
  </div>
  
  <p style="font-size: 14px; color: #6b7280; text-align: center;">
    Need to reschedule? <a href="[Reschedule Link]" style="color: #2F8F83;">Click here</a>
  </p>
</div>
```

---

## 4. 24-Hour Reminder (SMS)

**Trigger:** 24 hours before consultation  
**Send:** Automated

### Template
```
Glowheal Reminder: Your FREE consult is tomorrow at [Time]. Be ready with your symptoms & questions. WhatsApp: [Link]
```

---

## 5. 1-Hour Before (SMS Only)

**Trigger:** 1 hour before consultation  
**Send:** Automated  
**Goal:** Final reminder

### Template
```
Glowheal: Your FREE consult starts in 1 hour ([Time]). Doctor will call [Phone]. Keep phone ready. Questions? [WhatsApp Link]
```

---

## 6. Post-Consultation (Email)

**Trigger:** After free consultation completes  
**Send:** Within 30 minutes  
**Goal:** Share next steps, encourage specialist booking if routed

### Subject Line
```
Your consultation summary and next steps
```

### Body Template
```html
<div style="font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #134E4A;">Thank You for Consulting with Glowheal</h2>
  
  <p>Hi <strong>[Patient Name]</strong>,</p>
  
  <p>Thank you for your free consultation today. Here's a summary of our discussion:</p>
  
  <!-- Conditional: If routed to specialist -->
  <div style="background-color: #fef3c7; border-left: 4px solid #F59E0B; padding: 20px; border-radius: 4px; margin: 20px 0;">
    <h3 style="margin: 0 0 10px 0; color: #92400e;">Recommended Next Step</h3>
    <p style="margin: 0;">
      Our doctor recommends consulting with a <strong>[Specialist Type]</strong> for your [Concern] concern. This will ensure you get specialized care.
    </p>
  </div>
  
  <h3 style="color: #134E4A;">Your Care Plan:</h3>
  <ul style="color: #4b5563;">
    <li>[Recommendation 1]</li>
    <li>[Recommendation 2]</li>
    <li>[Recommendation 3]</li>
  </ul>
  
  <!-- CTA to book specialist -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="[Book Specialist Link]" style="display: inline-block; background-color: #F59E0B; color: #134E4A; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px;">
      Book Specialist Consultation
    </a>
  </div>
  
  <p style="font-size: 14px; color: #6b7280; text-align: center;">
    Specialist consultation fee: <strong>₹[Fee]</strong>
  </p>
  
  <!-- Prescription (if any) -->
  <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <h3 style="margin: 0 0 15px 0; color: #134E4A;">📄 Your Prescription</h3>
    <p style="margin: 0; color: #4b5563;">
      Your digital prescription has been sent to your email. You can also download it from your Glowheal dashboard.
    </p>
    <div style="margin-top: 15px;">
      <a href="[Dashboard Link]" style="color: #2F8F83; text-decoration: underline;">View Prescription →</a>
    </div>
  </div>
  
  <!-- Feedback -->
  <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
    <p style="color: #6b7280; margin-bottom: 15px;">How was your experience?</p>
    <div>
      <a href="[Feedback Link - 5]" style="display: inline-block; padding: 10px; text-decoration: none; font-size: 24px;">⭐⭐⭐⭐⭐</a>
    </div>
  </div>
</div>
```

---

## 7. Specialist Booking Reminder (Email)

**Trigger:** 3 days after free consultation if user hasn't booked specialist (routed users only)  
**Send:** Automated  
**Goal:** Convert routed patients to specialist bookings

### Subject Line
```
Complete your care: Book [Specialist] consultation
```

### Body Template
```html
<div style="font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #134E4A;">Your Next Step in Your Care Journey</h2>
  
  <p>Hi <strong>[Patient Name]</strong>,</p>
  
  <p>Following your free consultation, our doctor recommended consulting with a <strong>[Specialist Type]</strong> for your [Concern] concern.</p>
  
  <p>We've matched you with the best specialists in [City]:</p>
  
  <!-- Doctor Cards -->
  <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; margin: 15px 0;">
    <h3 style="margin: 0 0 10px 0; color: #134E4A;">[Doctor Name]</h3>
    <p style="margin: 0; color: #6b7280; font-size: 14px;">[Specialty] • [Experience] years</p>
    <p style="margin: 10px 0 0 0; color: #4b5563; font-size: 14px;">Next available: <strong>[Date & Time]</strong></p>
    <p style="margin: 5px 0 0 0; color: #F59E0B; font-weight: 700;">₹[Fee]</p>
    <div style="margin-top: 10px;">
      <a href="[Book Link]" style="color: #2F8F83; text-decoration: underline; font-size: 14px;">Book Now →</a>
    </div>
  </div>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="[View All Specialists Link]" style="display: inline-block; background-color: #F59E0B; color: #134E4A; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700;">
      View All Specialists
    </a>
  </div>
  
  <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 30px;">
    Questions? <a href="[WhatsApp Link]" style="color: #2F8F83;">Chat with us on WhatsApp</a>
  </p>
</div>
```

---

## 8. No-Show Follow-Up (Email + SMS)

**Trigger:** User missed free consultation appointment  
**Send:** 2 hours after missed appointment  
**Goal:** Re-engage and reschedule

### Email Subject Line
```
Reschedule your free consultation?
```

### Email Body
```html
<div style="font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #134E4A;">We Missed You Today</h2>
  
  <p>Hi <strong>[Patient Name]</strong>,</p>
  
  <p>We noticed you missed your free consultation scheduled for today at [Time]. We understand things come up.</p>
  
  <p>Your health matters to us. Would you like to reschedule?</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="[Reschedule Link]" style="display: inline-block; background-color: #F59E0B; color: #134E4A; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700;">
      Reschedule My Free Consultation
    </a>
  </div>
  
  <p style="font-size: 14px; color: #6b7280; text-align: center;">
    Or chat with us on <a href="[WhatsApp Link]" style="color: #2F8F83;">WhatsApp</a> to find a convenient time
  </p>
  
  <div style="background-color: #f0fdfa; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center;">
    <p style="margin: 0; color: #134E4A; font-weight: 600;">Your first consultation is still FREE</p>
  </div>
</div>
```

### SMS
```
Glowheal: We missed you today at [Time]. Your FREE consult is still waiting! Reschedule: [Link] Questions? WhatsApp: [Link]
```

---

## 9. Welcome Series - Day 1 (New User)

**Trigger:** User creates account / books first consultation  
**Send:** Immediate  
**Goal:** Onboard and build trust

### Subject Line
```
Welcome to Glowheal - Your free consultation awaits
```

### Body (Abbreviated)
```html
<div style="font-family: system-ui, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #134E4A;">Welcome to Your Health Journey</h2>
  
  <p>Hi <strong>[Patient Name]</strong>,</p>
  
  <p>Thank you for choosing Glowheal. We're here to make healthcare accessible, affordable, and trustworthy.</p>
  
  <h3 style="color: #134E4A;">What Makes Glowheal Different:</h3>
  <ul style="color: #4b5563;">
    <li><strong>Free First Consultation:</strong> Talk to our in-house doctor at no cost</li>
    <li><strong>500+ Verified Doctors:</strong> All licensed, background-checked specialists</li>
    <li><strong>Available 24/7:</strong> Healthcare when you need it</li>
    <li><strong>100% Secure:</strong> Your medical data is encrypted and confidential</li>
  </ul>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="/book" style="display: inline-block; background-color: #F59E0B; color: #134E4A; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700;">
      Book Your Free Consultation Now
    </a>
  </div>
</div>
```

---

## WhatsApp Message Templates

### Template 1: Booking Confirmation
```
Hi [Name]! 👋

Your *FREE first consultation* is confirmed ✅

📅 Date: [Date]
🕐 Time: [Time]
💊 Concern: [Concern]
💰 Fee: ₹0 (Free)

Our doctor will call you on [Phone]. Be ready with your symptoms & questions.

Need to reschedule? Reply "RESCHEDULE"

- Team Glowheal 🩺
```

### Template 2: Reminder (1 Hour Before)
```
Hi [Name]! ⏰

Your FREE consult starts in 1 hour at [Time].

Keep your phone ready. Our doctor will call [Phone].

Questions? Reply here!

- Team Glowheal
```

### Template 3: Post-Consultation (Specialist Routed)
```
Hi [Name],

Thank you for consulting with us today!

*Next Step:* Our doctor recommends seeing a [Specialist Type] for your [Concern] concern.

📋 View your care plan: [Link]
📅 Book specialist: [Link]

Your health is our priority 💚

- Team Glowheal
```

---

## Implementation Notes

### Email Service
- **Provider:** SendGrid, AWS SES, or Postmark
- **Rate Limit:** 100 emails/minute
- **SPF/DKIM:** Configure for deliverability
- **Unsubscribe:** Required footer link

### SMS Service
- **Provider:** Twilio, AWS SNS, or MSG91 (India)
- **Sender ID:** "GLOWHL" or "GLOWHEAL"
- **DND Compliance:** India DLT registration required
- **Character Limit:** 160 (English), 70 (Unicode)

### WhatsApp Business API
- **Provider:** Twilio, MessageBird, or WhatsApp Cloud API
- **Template Approval:** Submit templates to WhatsApp (24-48hr approval)
- **Session Windows:** 24 hours after last user message

### Variables Mapping
```javascript
{
  patientName: string,
  date: string,              // e.g., "November 5, 2025"
  time: string,              // e.g., "10:00 AM IST"
  phone: string,             // Patient phone number
  city: string,
  concern: string,           // Health concern category
  specialistType: string,    // If routed
  specialistFee: number,     // If routed
  whatsappLink: string,      // Prefilled wa.me link
  rescheduleLink: string,    // Dashboard reschedule URL
  bookSpecialistLink: string,
  dashboardLink: string,
  prescriptionLink: string,
  feedbackLink: string
}
```

---

## Testing Checklist

- [ ] Test HTML email rendering (Litmus or Email on Acid)
- [ ] Test plain text fallback
- [ ] Test all variable substitutions
- [ ] Test links (ensure HTTPS, tracking parameters)
- [ ] Test unsubscribe flow
- [ ] Test mobile rendering (Gmail app, Outlook mobile)
- [ ] Test SMS delivery (multiple carriers)
- [ ] Test WhatsApp template approval
- [ ] Test accessibility (screen readers, high contrast)
- [ ] Test spam score (Mail Tester)

---

## Legal & Compliance

### Required Elements
- Unsubscribe link (email)
- Physical address (email footer)
- Privacy policy link
- Medical disclaimer
- STOP keyword (SMS)

### HIPAA/DPDPA Compliance
- No PHI in subject lines
- Encrypted email transport (TLS)
- Secure link destinations (HTTPS)
- Audit trail logging

---

**Status:** Templates documented - Ready for implementation  
**Next Steps:** Integrate with booking system, configure email/SMS providers  
**Owner:** Engineering + Marketing Teams  
**Review:** Quarterly for tone/clarity optimization
