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

    // Check if we're in production (Vercel)
    const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // PRODUCTION: Just log and return success (WhatsApp will handle communication)
      console.log('🌐 PRODUCTION MODE: Booking logged');
      console.log('📋 Booking Details:', JSON.stringify(data, null, 2));
      
      // TODO: In future, send to database or email service
      // For now, WhatsApp message contains all booking details
      
      return NextResponse.json(
        { 
          success: true, 
          bookingId: data.id,
          message: 'Booking received successfully (production mode)',
          note: 'Booking details logged. WhatsApp confirmation sent to customer.'
        },
        { status: 201 }
      );
    }

    // DEVELOPMENT: Write to file system
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    const currentDir = process.cwd();
    console.log('📁 Current working directory:', currentDir);
    
    const isInAppsWeb = currentDir.includes('apps/web') || currentDir.includes('apps\\web');
    const projectRoot = isInAppsWeb ? join(currentDir, '..', '..') : currentDir;
    const leadsDir = join(projectRoot, 'data', 'leads', String(year), month);
    
    console.log('📁 Project root:', projectRoot);
    console.log('📁 Target directory:', leadsDir);
    
    // Create directory if it doesn't exist
    if (!existsSync(leadsDir)) {
      console.log('📁 Directory does not exist, creating...');
      await mkdir(leadsDir, { recursive: true });
      console.log('✅ Directory created successfully');
    } else {
      console.log('✅ Directory already exists');
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
