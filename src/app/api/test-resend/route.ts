import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
  try {
    // Check if API key is available
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: 'RESEND_API_KEY not found in environment variables',
        hasApiKey: false,
      });
    }

    console.log('🔑 API Key found:', apiKey.substring(0, 10) + '...');

    // Initialize Resend
    const resend = new Resend(apiKey);

    // Test sending a simple email
    const response = await resend.emails.send({
      from: 'Bus Tracker <onboarding@resend.dev>',
      to: ['abubakarmi131@gmail.com'], // Your email
      subject: 'Test Email from Bus Tracker',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; text-align: center;">🚌 Bus Tracker Test Email</h2>
            <p>Hello!</p>
            <p>This is a test email to verify that your Resend configuration is working correctly.</p>
            <p>If you received this email, your email service is functioning properly!</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
            <p style="margin-top: 30px;">Best regards,<br><strong>The Bus Tracker Team</strong></p>
          </div>
        </div>
      `,
      text: `Bus Tracker Test Email

Hello!

This is a test email to verify that your Resend configuration is working correctly.

If you received this email, your email service is functioning properly!

Timestamp: ${new Date().toLocaleString()}

Best regards,
The Bus Tracker Team`,
    });

    if (response.error) {
      console.error('❌ Resend API Error:', response.error);
      return NextResponse.json({
        success: false,
        message: 'Resend API error',
        error: response.error,
        hasApiKey: true,
      });
    }

    console.log('✅ Test email sent successfully:', response.data?.id);
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: response.data?.id,
      hasApiKey: true,
    });

  } catch (error) {
    console.error('❌ Test email error:', error);
    return NextResponse.json({
      success: false,
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      hasApiKey: !!process.env.RESEND_API_KEY,
    });
  }
}