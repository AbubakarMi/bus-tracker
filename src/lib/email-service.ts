// Server-side only email service
// This file should only be imported on the server side

export interface EmailConfig {
  service: 'gmail' | 'nodemailer' | 'resend' | 'sendgrid';
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user: string;
    pass: string;
  };
  apiKey?: string;
}

export interface EmailOtpData {
  email: string;
  userName: string;
  otp: string;
  userType: string;
  expiresAt: string;
}

export interface ResetEmailData {
  userEmail: string;
  userName: string;
  resetToken: string;
  expiresAt: Date;
  userType: 'student' | 'staff' | 'admin' | 'driver';
}

// Generate a secure reset token
export function generateResetToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create reset link with token
export function createResetLink(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/reset-password?token=${token}`;
}

// Generate reset email HTML template
export function generateResetEmailHTML(data: ResetEmailData): string {
  const resetLink = createResetLink(data.resetToken);
  const expiresInHours = Math.round((data.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60));

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - ADUSTECH Bus Tracker</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1f2937;
        }
        .message {
            font-size: 16px;
            margin-bottom: 30px;
            color: #4b5563;
        }
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .reset-button:hover {
            transform: translateY(-2px);
        }
        .alternative-link {
            background-color: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            word-break: break-all;
            font-family: monospace;
            font-size: 14px;
            color: #374151;
        }
        .warning {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .warning-title {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 5px;
        }
        .warning-text {
            color: #78350f;
            font-size: 14px;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #6b7280;
        }
        .footer a {
            color: #3b82f6;
            text-decoration: none;
        }
        .user-info {
            background-color: #eff6ff;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .user-info-title {
            font-weight: 600;
            color: #1d4ed8;
            margin-bottom: 5px;
        }
        .user-info-text {
            color: #1e40af;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚌 ADUSTECH Bus Tracker</h1>
            <p>Smart Campus Transportation System</p>
        </div>

        <div class="content">
            <div class="greeting">
                Hello ${data.userName}! 👋
            </div>

            <div class="message">
                We received a request to reset your password for your ADUSTECH Bus Tracker account.
                If you made this request, click the button below to reset your password.
            </div>

            <div class="user-info">
                <div class="user-info-title">Account Information:</div>
                <div class="user-info-text">
                    Email: ${data.userEmail}<br>
                    Account Type: ${data.userType.charAt(0).toUpperCase() + data.userType.slice(1)}
                </div>
            </div>

            <center>
                <a href="${resetLink}" class="reset-button">
                    🔒 Reset My Password
                </a>
            </center>

            <div class="message">
                If the button above doesn't work, copy and paste this link into your browser:
            </div>

            <div class="alternative-link">
                ${resetLink}
            </div>

            <div class="warning">
                <div class="warning-title">⚠️ Security Notice</div>
                <div class="warning-text">
                    • This link will expire in ${expiresInHours} hours<br>
                    • This link can only be used once<br>
                    • If you didn't request this reset, please ignore this email<br>
                    • For security, never share this link with anyone
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>ADUSTECH Bus Tracker</strong></p>
            <p>Secure Campus Transportation Management</p>
            <p>
                <a href="mailto:transport@adustech.edu.ng">transport@adustech.edu.ng</a> |
                <a href="tel:+234-800-ADUSTECH">+234-800-ADUSTECH</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px;">
                This email was sent from an automated system. Please do not reply directly to this email.
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

// Generate plain text version for email clients that don't support HTML
export function generateResetEmailText(data: ResetEmailData): string {
  const resetLink = createResetLink(data.resetToken);
  const expiresInHours = Math.round((data.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60));

  return `
ADUSTECH Bus Tracker - Password Reset Request

Hello ${data.userName}!

We received a request to reset your password for your ADUSTECH Bus Tracker account.

Account Information:
- Email: ${data.userEmail}
- Account Type: ${data.userType.charAt(0).toUpperCase() + data.userType.slice(1)}

To reset your password, click or copy this link into your browser:
${resetLink}

SECURITY NOTICE:
- This link will expire in ${expiresInHours} hours
- This link can only be used once
- If you didn't request this reset, please ignore this email
- For security, never share this link with anyone

For support, contact:
Email: transport@adustech.edu.ng
Phone: +234-800-ADUSTECH

ADUSTECH Bus Tracker
Secure Campus Transportation Management
  `;
}

// Mock email sending function (replace with actual email service)
export async function sendResetEmail(data: ResetEmailData): Promise<boolean> {
  try {
    // For development/testing - log email content
    console.log('📧 Password Reset Email:', {
      to: data.userEmail,
      subject: 'Reset Your ADUSTECH Bus Tracker Password',
      resetToken: data.resetToken,
      expiresAt: data.expiresAt,
    });

    // In a real implementation, you would integrate with:
    // - Nodemailer with SMTP
    // - SendGrid API
    // - Resend API
    // - AWS SES
    // - etc.

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, always return success (replace with actual email service call)
    return true;
  } catch (error) {
    console.error('Failed to send reset email:', error);
    return false;
  }
}

// Store reset token (in a real app, this would be in a database)
const resetTokens = new Map<string, {
  email: string;
  token: string;
  expiresAt: Date;
  used: boolean;
}>();

export function storeResetToken(email: string, token: string, expiresAt: Date): void {
  resetTokens.set(token, {
    email,
    token,
    expiresAt,
    used: false,
  });

  // Clean up expired tokens
  setTimeout(() => {
    resetTokens.delete(token);
  }, expiresAt.getTime() - Date.now());
}

export function validateResetToken(token: string): { valid: boolean; email?: string; error?: string } {
  const tokenData = resetTokens.get(token);

  if (!tokenData) {
    return { valid: false, error: 'Invalid or expired reset token' };
  }

  if (tokenData.used) {
    return { valid: false, error: 'This reset link has already been used' };
  }

  if (tokenData.expiresAt < new Date()) {
    resetTokens.delete(token);
    return { valid: false, error: 'Reset link has expired' };
  }

  return { valid: true, email: tokenData.email };
}

export function markTokenAsUsed(token: string): void {
  const tokenData = resetTokens.get(token);
  if (tokenData) {
    tokenData.used = true;
  }
}

// This file now contains legacy token-based functions and server-side email configuration
// The actual email sending has been moved to server-side API routes for security