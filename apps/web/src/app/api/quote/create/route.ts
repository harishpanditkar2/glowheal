import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
// TODO: Remove catalog dependency - quote system needs redesign for single-doctor model
// import { getCatalogItem, formatPrice } from '@/lib/catalog';

interface QuoteRequest {
  leadId: string;
  items: string[]; // Array of service slugs
  visitType: 'in-clinic' | 'online';
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  condition?: {
    name: string;
    description: string;
  };
}

/**
 * POST /api/quote/create
 * Generate a printable quote from appointment booking
 * NOTE: This API needs to be redesigned for single-doctor practice
 */
export async function POST(request: NextRequest) {
  try {
    // Temporarily return success - quote generation disabled pending redesign
    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote generation disabled - will be redesigned for single-doctor model' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { error: 'Quote generation temporarily disabled' },
      { status: 500 }
    );
  }
}
