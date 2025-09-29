import { NextRequest, NextResponse } from 'next/server';
import { serverEmailService, type EmailOtpData } from '@/lib/server-email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, userName, otp, userType, expiresAt }: EmailOtpData = body;

    // Validate required fields
    if (!email || !userName || !otp || !userType || !expiresAt) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send OTP email
    const result = await serverEmailService.sendOtpEmail({
      email,
      userName,
      otp,
      userType,
      expiresAt,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error - Send OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}