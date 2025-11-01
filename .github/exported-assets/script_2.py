
import pandas as pd

# Create pricing comparison table
pricing_data = {
    'Service': [
        'First Consultation',
        'General Physician (In-person)',
        'General Physician (Video)',
        'Specialist Consultation',
        'Specialist (Video)',
        'Basic Health Checkup',
        'Comprehensive Checkup',
        'Premium Full Body Checkup',
        'Diagnostic Test (Avg)',
        'Follow-up Consultation'
    ],
    'Market Average (₹)': [
        '200-400',
        '200-300',
        '180-250',
        '400-800',
        '350-600',
        '1,999-2,499',
        '2,999-3,999',
        '4,999-6,999',
        '350-400',
        '150-250'
    ],
    'Recommended Pricing (₹)': [
        'FREE (₹0)',
        '199-249',
        '149-199',
        '399-599',
        '299-449',
        '999-1,499',
        '2,499-3,499',
        '4,999-6,499',
        '299-399',
        '99-149'
    ],
    'Strategy': [
        'Loss Leader - Critical for acquisition',
        'Competitive with Practo/online platforms',
        '25% discount vs in-person',
        'Mid-range pricing',
        '25% discount vs in-person',
        'Entry-level package',
        'Most Popular - Best value',
        'Premium positioning',
        'Competitive diagnostic pricing',
        'Loyalty pricing'
    ],
    'Display Method': [
        'BOLD - Hero section banner',
        'Show original ₹299, offer ₹199',
        'Online Exclusive - Save 50%',
        'Starting from ₹399',
        'Video Special - Limited slots',
        'Package - Save ₹500',
        'MOST POPULAR badge',
        'Comprehensive care package',
        'Per test pricing',
        'Patient loyalty discount'
    ]
}

pricing_df = pd.DataFrame(pricing_data)
pricing_df.to_csv('glowheal_pricing_strategy.csv', index=False)

print("="*80)
print("GLOWHEAL.IN - COMPETITIVE PRICING STRATEGY")
print("="*80)
print(pricing_df.to_string(index=False))
print("\n")

# Create color palette recommendations
color_palette_data = {
    'Color Scheme': [
        'Recommended Primary',
        'Recommended Primary',
        'Recommended Primary',
        'Alternative Modern',
        'Alternative Modern',
        'Alternative Modern',
        'Current (If keeping)',
        'Current (If keeping)',
        'Accent/CTA Colors',
        'Accent/CTA Colors',
        'Background Colors',
        'Background Colors',
        'Text Colors',
        'Text Colors'
    ],
    'Color Name': [
        'Royal Blue',
        'White',
        'Light Gray',
        'Teal',
        'Beige/Cream',
        'White',
        'Forest Green',
        'White',
        'Orange (Primary CTA)',
        'Blue (Secondary CTA)',
        'White',
        'Light Gray',
        'Dark Charcoal',
        'Medium Gray'
    ],
    'Hex Code': [
        '#4169E1',
        '#FFFFFF',
        '#F5F5F5',
        '#20B2AA',
        '#F5F5DC',
        '#FFFFFF',
        '#2D5F3F',
        '#FFFFFF',
        '#FF8C42',
        '#0066CC',
        '#FFFFFF',
        '#F8F9FA',
        '#212529',
        '#6C757D'
    ],
    'Usage': [
        'Headers, buttons, links, trust badges',
        'Page backgrounds, card backgrounds',
        'Section dividers, subtle backgrounds',
        'Headers, buttons, modern medical feel',
        'Section backgrounds, warmth',
        'Primary backgrounds',
        'Keep if brand recognition strong',
        'Backgrounds',
        'Primary CTAs (Book Now, Call)',
        'Secondary CTAs (Learn More)',
        'Main page background',
        'Alternate section backgrounds',
        'Primary text (body copy)',
        'Secondary text (captions)'
    ],
    'Psychology/Effect': [
        'Trust, professionalism, calm, medical',
        'Cleanliness, simplicity, medical sterility',
        'Subtle, non-distracting, modern',
        'Modern healthcare, calm, tech-forward',
        'Warmth, welcoming, comfortable',
        'Clean, professional',
        'Health, nature, balance (test against blue)',
        'Medical, clean',
        'Action, warmth, friendly urgency',
        'Trust, reliability, safe action',
        'Maximum clarity and readability',
        'Subtle section separation',
        'Professional, readable, WCAG compliant',
        'Less emphasis, supporting info'
    ],
    'Contrast Ratio (on white)': [
        '4.6:1 (AA Pass)',
        'N/A',
        'N/A',
        '3.9:1 (Need darker for text)',
        'N/A',
        'N/A',
        '7.5:1 (AAA Pass)',
        'N/A',
        '3.4:1 (Large text only)',
        '7.8:1 (AAA Pass)',
        'N/A',
        'N/A',
        '16:1 (AAA Pass)',
        '4.7:1 (AA Pass)'
    ]
}

color_df = pd.DataFrame(color_palette_data)
color_df.to_csv('glowheal_color_palette.csv', index=False)

print("="*80)
print("GLOWHEAL.IN - COLOR PALETTE RECOMMENDATIONS")
print("="*80)
print(color_df.to_string(index=False))
print("\n")

# Create button design specifications
button_specs = {
    'Button Type': [
        'Primary CTA',
        'Primary CTA',
        'Secondary CTA',
        'Tertiary CTA',
        'Phone CTA',
        'Mobile Sticky'
    ],
    'Example Text': [
        'Book Free Consultation',
        'Schedule Appointment',
        'Learn More',
        'View Doctors',
        'Call Now: +91-XXXXX',
        'Book Now'
    ],
    'Background Color': [
        '#FF8C42 (Orange)',
        '#0066CC (Blue)',
        'Transparent',
        'Transparent',
        '#25D366 (WhatsApp Green)',
        '#FF8C42 (Orange)'
    ],
    'Text Color': [
        '#FFFFFF (White)',
        '#FFFFFF (White)',
        '#0066CC (Blue)',
        '#6C757D (Gray)',
        '#FFFFFF (White)',
        '#FFFFFF (White)'
    ],
    'Size (Desktop)': [
        '160px x 48px',
        '160px x 48px',
        '140px x 44px',
        '120px x 40px',
        '180px x 48px',
        'Full width x 56px'
    ],
    'Size (Mobile)': [
        '100% x 52px',
        '100% x 52px',
        '100% x 48px',
        'Auto x 44px',
        '100% x 52px',
        'Full width x 60px'
    ],
    'Border': [
        'None',
        'None',
        '2px solid #0066CC',
        '1px solid #6C757D',
        'None',
        'None'
    ],
    'Border Radius': [
        '6px',
        '6px',
        '6px',
        '4px',
        '8px',
        '0px'
    ],
    'Hover Effect': [
        'Darker #E67932',
        'Darker #0052A3',
        'Fill with blue #0066CC, white text',
        'Fill with gray',
        'Pulse animation',
        'Shadow elevation'
    ],
    'Placement': [
        'Hero section, above fold',
        'After service sections',
        'After informational content',
        'Navigation, footer',
        'Header (sticky on mobile)',
        'Bottom of viewport (mobile only)'
    ]
}

button_df = pd.DataFrame(button_specs)
button_df.to_csv('glowheal_button_specifications.csv', index=False)

print("="*80)
print("GLOWHEAL.IN - BUTTON DESIGN SPECIFICATIONS")
print("="*80)
print(button_df.to_string(index=False))

print("\n✓ Files created: glowheal_pricing_strategy.csv")
print("✓ Files created: glowheal_color_palette.csv")
print("✓ Files created: glowheal_button_specifications.csv")
