import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const doctorApplicationSchema = z.object({
  fullName: z.string().min(2),
  clinicName: z.string().min(2),
  specialties: z.array(z.string()).min(1),
  registrationNo: z.string().min(3),
  yearsExperience: z.number().min(0).max(70),
  city: z.string().min(1),
  address: z.string().min(10),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email(),
  slotAvailability: z.string().min(10),
  panGst: z.string().optional(),
  clinicServices: z.array(z.string()),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = doctorApplicationSchema.parse(body);

    // Generate timestamp and ID
    const timestamp = new Date().toISOString();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const applicationId = `DOCTOR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare lead data
    const leadData = {
      id: applicationId,
      timestamp,
      type: 'doctor_partnership',
      status: 'pending_review',
      ...validatedData,
      source: 'join-doctor-page',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Save to file system
    const partnersDir = path.join(process.cwd(), 'data', 'partners', String(year), month);
    
    // Ensure directory exists
    if (!fs.existsSync(partnersDir)) {
      fs.mkdirSync(partnersDir, { recursive: true });
    }

    const filePath = path.join(partnersDir, `${applicationId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(leadData, null, 2), 'utf8');

    // Log to console for monitoring
    console.log(`✅ Doctor application received: ${applicationId}`);
    console.log(`   Name: ${validatedData.fullName}`);
    console.log(`   Specialties: ${validatedData.specialties.join(', ')}`);
    console.log(`   City: ${validatedData.city}`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Application received successfully',
      applicationId,
      nextSteps: [
        'Credential verification (1-2 days)',
        'Onboarding call scheduling',
        'KYC completion',
        'Slot synchronization',
        'Go live',
      ],
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Doctor application error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to process application. Please try again or contact support.',
    }, { status: 500 });
  }
}

// Preflight for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
