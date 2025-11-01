
# Create a comprehensive bugs and issues document
bugs_issues = {
    'Issue Type': [],
    'Severity': [],
    'Location': [],
    'Description': [],
    'How to Fix': [],
    'Test Method': []
}

issues_list = [
    # CRITICAL BUGS
    ('Performance', 'CRITICAL', 'All Pages', 
     'Page load time may exceed 2.5 seconds - kills 50% of mobile traffic',
     '1. Run Google PageSpeed Insights\n2. Compress all images to WebP\n3. Enable Gzip compression\n4. Implement lazy loading\n5. Minify CSS/JS\n6. Use CDN for static assets',
     'Test with PageSpeed Insights, GTmetrix, WebPageTest. Target: LCP < 2.5s, FCP < 1.8s'),
    
    ('Mobile', 'CRITICAL', 'All Pages',
     'Buttons smaller than 48x48px on mobile - users can\'t tap accurately',
     '1. Audit all buttons and links\n2. Set minimum touch target: 48x48px\n3. Add adequate spacing (8px minimum)\n4. Test on actual mobile devices',
     'Use Chrome DevTools mobile view, test on real iPhone/Android'),
    
    ('Forms', 'CRITICAL', 'Booking Form',
     'Form submission may fail or have no error handling',
     '1. Add client-side validation\n2. Implement real-time error messages\n3. Show success confirmation\n4. Add loading spinner on submit\n5. Prevent double submission',
     'Fill form with invalid data, check error messages, test edge cases'),
    
    ('Security', 'CRITICAL', 'All Forms',
     'Missing HTTPS or mixed content warnings',
     '1. Verify SSL certificate is valid\n2. Check all resources load via HTTPS\n3. Add HSTS header\n4. Display security badge on forms',
     'Check browser address bar for padlock, run SSL Labs test'),
    
    # HIGH SEVERITY
    ('Accessibility', 'HIGH', 'All Pages',
     'Missing alt text on images - screen readers can\'t interpret',
     '1. Add descriptive alt text to all images\n2. Use empty alt="" for decorative images\n3. Test with screen reader',
     'Use WAVE accessibility tool, test with NVDA/JAWS screen reader'),
    
    ('Accessibility', 'HIGH', 'All Pages',
     'Color contrast below WCAG 4.5:1 ratio',
     '1. Check all text/background combinations\n2. Use darker shades for text on light backgrounds\n3. Ensure links are distinguishable',
     'Use WebAIM Contrast Checker, browser extensions'),
    
    ('Navigation', 'HIGH', 'Header',
     'Phone number not clickable on mobile',
     '1. Wrap phone in <a href="tel:+91XXXXXXXXXX">\n2. Format consistently\n3. Add phone icon',
     'Tap phone number on mobile device, should dial'),
    
    ('Forms', 'HIGH', 'Booking Form',
     'No mobile-optimized date picker',
     '1. Implement native date input for mobile\n2. Use calendar widget on desktop\n3. Show available time slots',
     'Test booking on iPhone and Android'),
    
    ('Content', 'HIGH', 'Service Pages',
     'Missing pricing information causes drop-off',
     '1. Add clear pricing to each service page\n2. Show "Starting from ₹XXX"\n3. Link to detailed pricing page',
     'Navigate to each service, verify price is visible within 5 seconds'),
    
    # MEDIUM SEVERITY
    ('UX', 'MEDIUM', 'Homepage',
     'No clear path to book appointment',
     '1. Add multiple "Book Now" CTAs\n2. Ensure above the fold\n3. Make buttons high contrast',
     'Ask 5 users to book appointment without instruction, should succeed'),
    
    ('Links', 'MEDIUM', 'All Pages',
     'Broken links or dead ends',
     '1. Run broken link checker\n2. Fix all 404 errors\n3. Ensure all footer links work\n4. Test external links',
     'Use online broken link checker, manually click all links'),
    
    ('Content', 'MEDIUM', 'Doctor Pages',
     'Missing doctor photos or credentials',
     '1. Add professional headshots\n2. List all qualifications\n3. Show specializations\n4. Add patient reviews',
     'Visit each doctor page, verify complete information'),
    
    ('Forms', 'MEDIUM', 'Contact Form',
     'No confirmation message after submission',
     '1. Show success message on page\n2. Send confirmation email\n3. Redirect to thank you page\n4. Add to calendar option',
     'Submit form, verify user receives feedback immediately'),
    
    ('Mobile', 'MEDIUM', 'All Pages',
     'Horizontal scrolling on small screens',
     '1. Check viewport meta tag\n2. Use max-width: 100% on images\n3. Test on 320px width\n4. Fix overflowing elements',
     'Test on iPhone SE (smallest common screen), no horizontal scroll'),
    
    ('Performance', 'MEDIUM', 'All Pages',
     'Large uncompressed images slow page load',
     '1. Compress all images (80% quality)\n2. Use correct dimensions\n3. Implement lazy loading\n4. Convert to WebP format',
     'Check image file sizes, should be < 100KB for most images'),
    
    # LOW SEVERITY
    ('SEO', 'LOW', 'All Pages',
     'Missing or duplicate meta descriptions',
     '1. Write unique meta description for each page\n2. Keep under 160 characters\n3. Include target keywords',
     'View page source, check <meta name="description"> tag'),
    
    ('UX', 'LOW', 'Navigation',
     'Menu items not logically organized',
     '1. Group related services\n2. Limit main menu to 5-7 items\n3. Add dropdown for subcategories',
     'Ask users to find specific service, measure time taken'),
    
    ('Content', 'LOW', 'Footer',
     'Missing important links or contact info',
     '1. Add privacy policy\n2. Include terms of service\n3. Show address and hours\n4. Add social media links',
     'Check footer on every page for consistency'),
    
    ('UX', 'LOW', 'All Pages',
     'No breadcrumb navigation',
     '1. Add breadcrumbs to all inner pages\n2. Show: Home > Services > Cardiology\n3. Make clickable',
     'Navigate deep into site, verify breadcrumb trail exists'),
]

for issue in issues_list:
    bugs_issues['Issue Type'].append(issue[0])
    bugs_issues['Severity'].append(issue[1])
    bugs_issues['Location'].append(issue[2])
    bugs_issues['Description'].append(issue[3])
    bugs_issues['How to Fix'].append(issue[4])
    bugs_issues['Test Method'].append(issue[5])

bugs_df = pd.DataFrame(bugs_issues)
bugs_df.to_csv('glowheal_bugs_and_issues.csv', index=False)

print("="*100)
print("GLOWHEAL.IN - POTENTIAL BUGS AND ISSUES TO CHECK")
print("="*100)

for severity in ['CRITICAL', 'HIGH', 'MEDIUM']:
    severity_items = bugs_df[bugs_df['Severity'] == severity]
    print(f"\n{'='*100}")
    print(f"{severity} SEVERITY - {len(severity_items)} ISSUES")
    print('='*100)
    
    for idx, row in severity_items.iterrows():
        print(f"\n{idx+1}. {row['Issue Type']} - {row['Location']}")
        print(f"   Problem: {row['Description']}")
        print(f"   Fix: {row['How to Fix'].split(chr(10))[1][:80]}...")
        print(f"   Test: {row['Test Method'][:80]}...")

print("\n" + "="*100)
print(f"\n✓ Full bugs list exported to: glowheal_bugs_and_issues.csv")
print(f"✓ Total issues to check: {len(bugs_df)}")
print(f"✓ Critical: {len(bugs_df[bugs_df['Severity'] == 'CRITICAL'])}")
print(f"✓ High: {len(bugs_df[bugs_df['Severity'] == 'HIGH'])}")
print(f"✓ Medium: {len(bugs_df[bugs_df['Severity'] == 'MEDIUM'])}")
print(f"✓ Low: {len(bugs_df[bugs_df['Severity'] == 'LOW'])}")
