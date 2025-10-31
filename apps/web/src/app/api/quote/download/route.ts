import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/**
 * GET /api/quote/download?file=YYYY/MM/QUOTE_*.html
 * Download a previously generated quote HTML file
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'Missing file parameter' },
        { status: 400 }
      );
    }

    // Security: Prevent path traversal
    if (file.includes('..') || file.includes('~')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Construct safe file path
    const filepath = path.join(process.cwd(), 'data', 'quotes', file);

    // Check if file exists
    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Quote file not found' },
        { status: 404 }
      );
    }

    // Read file
    const content = await readFile(filepath, 'utf-8');

    // Return HTML with appropriate headers
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="${path.basename(filepath)}"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Quote download error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
