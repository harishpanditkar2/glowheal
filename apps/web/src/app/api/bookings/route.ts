import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log('📥 Booking API received data:', data);

    // Validate required fields
    if (!data.id || !data.contact?.name || !data.contact?.phone) {
      console.error('❌ Missing required fields:', { 
        hasId: !!data.id, 
        hasName: !!data.contact?.name, 
        hasPhone: !!data.contact?.phone 
      });
      return NextResponse.json(
        { error: 'Missing required fields: id, name, or phone' },
        { status: 400 }
      );
    }

    // Create leads directory with year/month structure
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    // Use environment-aware path resolution
    // In development: works from apps/web directory
    // In production: uses absolute path or VERCEL_PROJECT_DIR
    const projectRoot = process.env.VERCEL ? process.env.VERCEL_PROJECT_DIR || process.cwd() : process.cwd();
    let leadsDir = join(projectRoot, 'data', 'leads', String(year), month);
    
    console.log('📁 Project root:', projectRoot);
    console.log('📁 Target directory:', leadsDir);
    
    try {
      if (!existsSync(leadsDir)) {
        await mkdir(leadsDir, { recursive: true });
        console.log('✅ Directory created successfully');
      }
    } catch (dirError) {
      console.error('❌ Failed to create directory:', dirError);
      // Try alternative path (fallback for monorepo structure)
      leadsDir = join(process.cwd(), '..', '..', 'data', 'leads', String(year), month);
      console.log('📁 Trying fallback directory:', leadsDir);
      await mkdir(leadsDir, { recursive: true });
    }

    // Write lead data to JSON file
    const fileName = `${data.id}.json`;
    const filePath = join(leadsDir, fileName);
    
    console.log('💾 Writing file to:', filePath);
    
    await writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    console.log(`✅ Booking saved successfully: ${fileName}`);

    return NextResponse.json(
      { 
        success: true, 
        bookingId: data.id,
        message: 'Booking received successfully',
        filePath: filePath
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Booking API error:', error);
    return NextResponse.json(
      { error: `Failed to process booking: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// GET method to retrieve bookings (optional, for admin)
export async function GET() {
  return NextResponse.json(
    { message: 'Bookings API endpoint. Use POST to submit new bookings.' },
    { status: 200 }
  );
}
