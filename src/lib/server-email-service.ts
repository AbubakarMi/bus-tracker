import { Resend } from 'resend';
import { render } from '@react-email/render';
import { OtpEmail } from '@/components/emails/otp-email';

// Server-side only - Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOtpData {
  email: string;
  userName: string;
  otp: string;
  userType: string;
  expiresAt: string;
}

export class ServerEmailService {
  private static instance: ServerEmailService;

  public static getInstance(): ServerEmailService {
    if (!ServerEmailService.instance) {
      ServerEmailService.instance = new ServerEmailService();
    }
    return ServerEmailService.instance;
  }

  async sendOtpEmail(data: EmailOtpData): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      // Check if Resend API key is configured
      if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️ RESEND_API_KEY not configured. Falling back to console logging for development.');

        // Fallback to console logging for development
        console.log('📧 EMAIL WOULD BE SENT:');
        console.log('======================');
        console.log(`📧 To: ${data.email}`);
        console.log(`👤 User: ${data.userName} (${data.userType})`);
        console.log(`🔑 OTP: ${data.otp}`);
        console.log(`⏰ Expires: ${data.expiresAt}`);
        console.log('======================');

        return {
          success: true,
          message: 'OTP sent successfully (development mode - check console)',
        };
      }

      // Render the email template
      let emailHtml: string;
      try {
        emailHtml = await render(OtpEmail({
          userEmail: data.email,
          userName: data.userName,
          otp: data.otp,
          userType: data.userType,
          expiresAt: data.expiresAt,
        }));

        if (typeof emailHtml !== 'string') {
          console.error('❌ Email template did not render to string:', typeof emailHtml);
          throw new Error('Email template rendering failed');
        }
      } catch (templateError) {
        console.error('❌ React Email template error:', templateError);

        // Fallback to simple HTML template
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">🚌 Bus Tracker</h2>
              <h3 style="color: #1f2937;">Password Reset Request</h3>
              <p>Hello ${data.userName},</p>
              <p>You requested to reset your password for your Bus Tracker ${data.userType} account.</p>
              <p>Your verification code is:</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; border: 2px dashed #2563eb; letter-spacing: 4px;">
                ${data.otp}
              </div>
              <p>This code will expire at: <strong>${data.expiresAt}</strong></p>
              <p>If you didn't request this password reset, please ignore this email.</p>
              <p style="margin-top: 30px;">Best regards,<br><strong>The Bus Tracker Team</strong></p>
            </div>
          </div>
        `;
      }

      // Send email using Resend
      const response = await resend.emails.send({
        from: 'Bus Tracker <onboarding@resend.dev>', // Use your verified domain
        to: [data.email],
        subject: `Your Bus Tracker Password Reset Code: ${data.otp}`,
        html: emailHtml,
        text: `Hello ${data.userName},

You requested to reset your password for your Bus Tracker ${data.userType} account.

Your verification code is: ${data.otp}

This code will expire at: ${data.expiresAt}

If you didn't request this password reset, please ignore this email.

Best regards,
The Bus Tracker Team`,
      });

      if (response.error) {
        console.error('❌ Email sending failed:', response.error);
        return {
          success: false,
          message: 'Failed to send email. Please try again.',
        };
      }

      console.log('✅ Email sent successfully:', response.data?.id);
      return {
        success: true,
        message: 'OTP sent to your email successfully!',
        messageId: response.data?.id,
      };

    } catch (error) {
      console.error('❌ Email service error:', error);

      // Fallback to console logging if email service fails
      console.log('📧 EMAIL FALLBACK (Service Error):');
      console.log('===================================');
      console.log(`📧 To: ${data.email}`);
      console.log(`👤 User: ${data.userName} (${data.userType})`);
      console.log(`🔑 OTP: ${data.otp}`);
      console.log(`⏰ Expires: ${data.expiresAt}`);
      console.log('===================================');

      return {
        success: true,
        message: 'OTP sent successfully (fallback mode - check console)',
      };
    }
  }

  async sendPasswordEmail(email: string, userName: string, password: string, userType: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.log('📧 PASSWORD EMAIL WOULD BE SENT:');
        console.log('=================================');
        console.log(`📧 To: ${email}`);
        console.log(`👤 User: ${userName} (${userType})`);
        console.log(`🔑 Password: ${password}`);
        console.log('=================================');

        return {
          success: true,
          message: 'Password sent to email successfully (development mode)',
        };
      }

      const response = await resend.emails.send({
        from: 'Bus Tracker <onboarding@resend.dev>',
        to: [email],
        subject: 'Your Bus Tracker Account Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">🚌 Bus Tracker</h2>
              <h3 style="color: #1f2937;">Account Password</h3>
              <p>Hello ${userName},</p>
              <p>Your Bus Tracker ${userType} account password is:</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; border: 2px dashed #2563eb;">
                ${password}
              </div>
              <p>Please keep this password secure and consider changing it after logging in.</p>
              <p style="margin-top: 30px;">Best regards,<br><strong>The Bus Tracker Team</strong></p>
            </div>
          </div>
        `,
        text: `Hello ${userName},

Your Bus Tracker ${userType} account password is: ${password}

Please keep this password secure and consider changing it after logging in.

Best regards,
The Bus Tracker Team`,
      });

      if (response.error) {
        console.error('❌ Password email sending failed:', response.error);
        return {
          success: false,
          message: 'Failed to send password email. Please try again.',
        };
      }

      return {
        success: true,
        message: 'Password sent to your email successfully!',
      };

    } catch (error) {
      console.error('❌ Password email service error:', error);

      // Fallback
      console.log('📧 PASSWORD EMAIL FALLBACK:');
      console.log('============================');
      console.log(`📧 To: ${email}`);
      console.log(`👤 User: ${userName} (${userType})`);
      console.log(`🔑 Password: ${password}`);
      console.log('============================');

      return {
        success: true,
        message: 'Password sent successfully (fallback mode)',
      };
    }
  }
}

export const serverEmailService = ServerEmailService.getInstance();