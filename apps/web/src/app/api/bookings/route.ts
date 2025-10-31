import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.id || !data.contact?.name || !data.contact?.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure leads directory exists
    const leadsDir = join(process.cwd(), '../../data/leads');
    if (!existsSync(leadsDir)) {
      await mkdir(leadsDir, { recursive: true });
    }

    // Write lead data to JSON file
    const fileName = `${data.id}.json`;
    const filePath = join(leadsDir, fileName);
    
    await writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    console.log(`✅ Booking saved: ${fileName}`);

    return NextResponse.json(
      { 
        success: true, 
        bookingId: data.id,
        message: 'Booking received successfully' 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
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
