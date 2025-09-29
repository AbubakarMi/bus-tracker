// Client-side email service that calls server APIs

export interface EmailOtpData {
  email: string;
  userName: string;
  otp: string;
  userType: string;
  expiresAt: string;
}

export class ClientEmailService {
  private static instance: ClientEmailService;

  public static getInstance(): ClientEmailService {
    if (!ClientEmailService.instance) {
      ClientEmailService.instance = new ClientEmailService();
    }
    return ClientEmailService.instance;
  }

  async sendOtpEmail(data: EmailOtpData): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      console.log('📧 Sending OTP email via API...');

      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ API Error:', result.message);
        return {
          success: false,
          message: result.message || 'Failed to send email',
        };
      }

      console.log('✅ OTP email API response:', result);
      return result;
    } catch (error) {
      console.error('❌ Client email service error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async sendPasswordEmail(email: string, userName: string, password: string, userType: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Password email would be sent via API...');

      // For now, just log to console as fallback
      console.log('📧 PASSWORD EMAIL:');
      console.log('==================');
      console.log(`📧 To: ${email}`);
      console.log(`👤 User: ${userName} (${userType})`);
      console.log(`🔑 Password: ${password}`);
      console.log('==================');

      return {
        success: true,
        message: 'Password information logged (development mode)',
      };
    } catch (error) {
      console.error('❌ Password email service error:', error);
      return {
        success: false,
        message: 'Failed to send password email',
      };
    }
  }
}

export const emailService = ClientEmailService.getInstance();