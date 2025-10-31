import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'phone', 'concern', 'city', 'preferredTime', 'source'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate unique lead ID
    const leadId = `LEAD_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Prepare lead data
    const leadData = {
      id: leadId,
      name: data.name,
      phone: data.phone,
      concern: data.concern,
      city: data.city,
      preferredTime: data.preferredTime,
      whatsappConfirm: data.whatsappConfirm || false,
      source: data.source, // e.g., 'free_consult_hero', 'free_consult_mid'
      timestamp: data.timestamp || new Date().toISOString(),
      status: 'new',
    };

    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data', 'leads');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Write lead to JSON file
    const filename = `${leadId}.json`;
    const filepath = join(dataDir, filename);
    await writeFile(filepath, JSON.stringify(leadData, null, 2), 'utf-8');

    // Also append to master log file
    const logFile = join(dataDir, 'leads-log.jsonl');
    const logEntry = JSON.stringify(leadData) + '\n';
    
    try {
      const { appendFile } = await import('fs/promises');
      await appendFile(logFile, logEntry, 'utf-8');
    } catch (error) {
      // Log file append failed, but individual file saved
      console.warn('Failed to append to log file:', error);
    }

    return NextResponse.json({
      success: true,
      leadId: leadId,
      message: 'Lead captured successfully',
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead submission' },
      { status: 500 }
    );
  }
}
