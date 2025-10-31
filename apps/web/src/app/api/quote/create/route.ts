import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { getCatalogItem, formatPrice } from '@/lib/catalog';

interface QuoteRequest {
  leadId: string;
  items: string[]; // Array of catalog item codes
  city: string;
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  concern?: {
    specialty: string;
    description: string;
  };
}

/**
 * POST /api/quote/create
 * Generate a printable quote PDF from provisional service selections
 */
export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();
    const { leadId, items, city, contact, concern } = body;

    // Validation
    if (!leadId || !items || items.length === 0 || !city || !contact) {
      return NextResponse.json(
        { error: 'Missing required fields: leadId, items, city, contact' },
        { status: 400 }
      );
    }

    // Fetch catalog items
    const catalogItems = items
      .map(code => getCatalogItem(city.toLowerCase(), code))
      .filter(Boolean);

    if (catalogItems.length === 0) {
      return NextResponse.json(
        { error: 'No valid catalog items found' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const subtotal = catalogItems.reduce((sum, item) => sum + (item?.price || 0), 0);

    // Generate HTML for PDF (using print CSS)
    const html = generateQuoteHTML({
      leadId,
      contact,
      concern,
      catalogItems,
      subtotal,
      city,
      generatedAt: new Date().toISOString(),
    });

    // Create directory structure: /data/quotes/YYYY/MM/
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    
    const quotesDir = path.join(process.cwd(), 'data', 'quotes', String(year), month);
    
    if (!existsSync(quotesDir)) {
      await mkdir(quotesDir, { recursive: true });
    }

    // Save HTML file (can be printed to PDF by browser)
    const filename = `QUOTE_${leadId}_${timestamp}.html`;
    const filepath = path.join(quotesDir, filename);
    
    await writeFile(filepath, html, 'utf-8');

    // Return download URL and metadata
    return NextResponse.json({
      success: true,
      quoteId: `${leadId}_${timestamp}`,
      filename,
      downloadUrl: `/api/quote/download?file=${encodeURIComponent(`${year}/${month}/${filename}`)}`,
      printUrl: `/quote/preview?id=${leadId}_${timestamp}`,
      metadata: {
        leadId,
        itemsCount: catalogItems.length,
        subtotal,
        city,
        generatedAt: now.toISOString(),
      },
    });

  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Generate print-ready HTML for quote
 */
function generateQuoteHTML(data: {
  leadId: string;
  contact: { name: string; phone: string; email?: string };
  concern?: { specialty: string; description: string };
  catalogItems: any[];
  subtotal: number;
  city: string;
  generatedAt: string;
}): string {
  const { leadId, contact, concern, catalogItems, subtotal, city, generatedAt } = data;
  const date = new Date(generatedAt);
  const formattedDate = date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glowheal Quote - ${leadId}</title>
  <style>
    @media print {
      @page {
        margin: 1cm;
        size: A4;
      }
      body {
        margin: 0;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #1a3a2e;
      background: white;
      padding: 2rem;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 3px solid #1a3a2e;
    }

    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #1a3a2e;
    }

    .quote-meta {
      text-align: right;
      font-size: 12px;
      color: #6b7280;
    }

    .quote-meta strong {
      color: #1a3a2e;
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .patient-info {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 4px;
    }

    .patient-info h2 {
      font-size: 16px;
      margin-bottom: 0.5rem;
      color: #1a3a2e;
    }

    .patient-info p {
      margin: 4px 0;
      font-size: 13px;
    }

    .services-section {
      margin-bottom: 2rem;
    }

    .services-section h2 {
      font-size: 18px;
      margin-bottom: 1rem;
      color: #1a3a2e;
      display: flex;
      align-items: center;
    }

    .services-section h2::before {
      content: '📋';
      margin-right: 8px;
    }

    .service-item {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .service-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.75rem;
    }

    .service-name {
      font-weight: 600;
      font-size: 15px;
      color: #1a3a2e;
    }

    .service-price {
      font-size: 18px;
      font-weight: 700;
      color: #1a3a2e;
      white-space: nowrap;
    }

    .service-unit {
      font-size: 12px;
      color: #6b7280;
      margin-left: 4px;
    }

    .service-details {
      font-size: 12px;
      color: #4b5563;
    }

    .includes, .excludes {
      margin-top: 0.75rem;
    }

    .includes h4, .excludes h4 {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #1a3a2e;
    }

    .includes ul {
      list-style: none;
    }

    .includes li::before {
      content: '✓ ';
      color: #10b981;
      font-weight: bold;
      margin-right: 4px;
    }

    .excludes ul {
      list-style: none;
    }

    .excludes li::before {
      content: '✗ ';
      color: #ef4444;
      font-weight: bold;
      margin-right: 4px;
    }

    .includes li, .excludes li {
      font-size: 12px;
      color: #4b5563;
      margin: 2px 0;
    }

    .totals {
      background: #e0f2e9;
      border: 2px solid #1a3a2e;
      border-radius: 6px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .totals-row {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      font-size: 14px;
    }

    .totals-row.subtotal {
      font-size: 16px;
      font-weight: 600;
      padding-top: 8px;
      border-top: 1px solid #1a3a2e;
    }

    .totals-row.due-now {
      font-size: 20px;
      font-weight: 700;
      color: #1a3a2e;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 2px solid #1a3a2e;
    }

    .disclaimers {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .disclaimers h3 {
      font-size: 14px;
      margin-bottom: 0.5rem;
      color: #92400e;
    }

    .disclaimers ul {
      list-style: disc;
      margin-left: 1.5rem;
    }

    .disclaimers li {
      font-size: 12px;
      color: #78350f;
      margin: 4px 0;
    }

    .footer {
      text-align: center;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
      font-size: 11px;
      color: #6b7280;
    }

    .footer strong {
      display: block;
      color: #1a3a2e;
      margin-bottom: 4px;
    }

    .print-button {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #f59e0b;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 1rem 2rem;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background 0.2s;
    }

    .print-button:hover {
      background: #d97706;
    }

    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }
      .container {
        padding: 1rem;
      }
      .header {
        flex-direction: column;
        gap: 1rem;
      }
      .quote-meta {
        text-align: left;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Glowheal</div>
      <div class="quote-meta">
        <strong>Quote #${leadId}</strong>
        <div>Date: ${formattedDate}</div>
        <div>City: ${city}</div>
      </div>
    </div>

    <div class="patient-info">
      <h2>Patient Information</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Phone:</strong> +${contact.phone}</p>
      ${contact.email ? `<p><strong>Email:</strong> ${contact.email}</p>` : ''}
      ${concern ? `
        <p><strong>Specialty:</strong> ${concern.specialty}</p>
        <p><strong>Concern:</strong> ${concern.description}</p>
      ` : ''}
    </div>

    <div class="services-section">
      <h2>Provisional Services Selected</h2>
      ${catalogItems.map(item => `
        <div class="service-item">
          <div class="service-header">
            <div class="service-name">${item.name}</div>
            <div class="service-price">
              ${formatPrice(item.price)}
              <span class="service-unit">/ ${item.unit}</span>
            </div>
          </div>
          ${item.includes.length > 0 ? `
            <div class="includes">
              <h4>What's Included:</h4>
              <ul>
                ${item.includes.map((inc: string) => `<li>${inc}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${item.excludes.length > 0 ? `
            <div class="excludes">
              <h4>Not Included:</h4>
              <ul>
                ${item.excludes.map((exc: string) => `<li>${exc}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>

    <div class="totals">
      <div class="totals-row subtotal">
        <span>Subtotal (${catalogItems.length} ${catalogItems.length === 1 ? 'service' : 'services'}):</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="totals-row due-now">
        <span>Amount Due Now:</span>
        <span style="color: #10b981;">₹0 (Free Consultation)</span>
      </div>
    </div>

    <div class="disclaimers">
      <h3>⚠️ Important Notes:</h3>
      <ul>
        <li><strong>This is a provisional quote only.</strong> Final services and costs will be confirmed after your free consultation with our doctor.</li>
        <li><strong>Payment required only after consultation and consent.</strong> You are under no obligation to proceed with any service.</li>
        <li><strong>Add-ons not included:</strong> Lab tests, imaging, medications, and implants are billed separately per Glowheal add-on catalog.</li>
        <li><strong>Prices are fixed for ${city}.</strong> No hidden charges. All prices include GST.</li>
        <li><strong>Valid for 30 days</strong> from the date of this quote.</li>
        <li><strong>Partner doctor fees:</strong> If routed to a specialist, standard consultation fees may apply separately from treatment costs.</li>
      </ul>
    </div>

    <div class="footer">
      <strong>Glowheal Healthcare Services</strong>
      <div>Phone: +91 8329563445 | Email: hello@glowheal.in</div>
      <div>Visit: https://glowheal.in/pricing</div>
      <div style="margin-top: 8px;">Generated on ${new Date(generatedAt).toLocaleString('en-IN')}</div>
    </div>
  </div>

  <button class="print-button no-print" onclick="window.print()">
    🖨️ Print / Save as PDF
  </button>

  <script>
    // Auto-print on load (optional)
    // window.onload = () => window.print();
  </script>
</body>
</html>`;
}
