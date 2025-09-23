'use client';

export interface OTPData {
  userEmail: string;
  userName: string;
  otp: string;
  expiresAt: Date;
  userType: 'student' | 'staff' | 'admin' | 'driver';
}

// Generate a secure 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate OTP email HTML template
export function generateOTPEmailHTML(data: OTPData): string {
  const expiresInMinutes = Math.round((data.expiresAt.getTime() - Date.now()) / (1000 * 60));

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP - ADUSTECH Bus Tracker</title>
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
            line-height: 1.6;
        }
        .otp-container {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-title {
            font-size: 14px;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .otp-code {
            font-size: 36px;
            font-weight: 900;
            color: #1e40af;
            letter-spacing: 8px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            padding: 15px;
            background: white;
            border-radius: 8px;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .otp-subtitle {
            font-size: 12px;
            color: #64748b;
            margin-top: 10px;
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
            line-height: 1.5;
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
        .steps {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .steps-title {
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
        }
        .step {
            margin: 10px 0;
            padding-left: 20px;
            position: relative;
        }
        .step::before {
            content: counter(step-counter);
            counter-increment: step-counter;
            position: absolute;
            left: 0;
            top: 0;
            background: #3b82f6;
            color: white;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
        }
        .steps {
            counter-reset: step-counter;
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
                Please use the verification code below to complete your password reset.
            </div>

            <div class="user-info">
                <div class="user-info-title">Account Information:</div>
                <div class="user-info-text">
                    Email: ${data.userEmail}<br>
                    Account Type: ${data.userType.charAt(0).toUpperCase() + data.userType.slice(1)}
                </div>
            </div>

            <div class="otp-container">
                <div class="otp-title">Your Verification Code</div>
                <div class="otp-code">${data.otp}</div>
                <div class="otp-subtitle">Enter this code to reset your password</div>
            </div>

            <div class="steps">
                <div class="steps-title">How to use this code:</div>
                <div class="step">Go to the ADUSTECH Bus Tracker password reset page</div>
                <div class="step">Enter your email or registration number</div>
                <div class="step">Input the 6-digit verification code above</div>
                <div class="step">Create your new secure password</div>
            </div>

            <div class="warning">
                <div class="warning-title">⚠️ Security Notice</div>
                <div class="warning-text">
                    • This code will expire in ${expiresInMinutes} minutes<br>
                    • This code can only be used once<br>
                    • If you didn't request this reset, please ignore this email<br>
                    • Never share this code with anyone<br>
                    • ADUSTECH staff will never ask for this code
                </div>
            </div>

            <div class="message">
                If you didn't request a password reset, you can safely ignore this email.
                Your account security is important to us.
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
export function generateOTPEmailText(data: OTPData): string {
  const expiresInMinutes = Math.round((data.expiresAt.getTime() - Date.now()) / (1000 * 60));

  return `
ADUSTECH Bus Tracker - Password Reset Verification Code

Hello ${data.userName}!

We received a request to reset your password for your ADUSTECH Bus Tracker account.

Account Information:
- Email: ${data.userEmail}
- Account Type: ${data.userType.charAt(0).toUpperCase() + data.userType.slice(1)}

Your Verification Code: ${data.otp}

How to use this code:
1. Go to the ADUSTECH Bus Tracker password reset page
2. Enter your email or registration number
3. Input the 6-digit verification code: ${data.otp}
4. Create your new secure password

SECURITY NOTICE:
- This code will expire in ${expiresInMinutes} minutes
- This code can only be used once
- If you didn't request this reset, please ignore this email
- Never share this code with anyone
- ADUSTECH staff will never ask for this code

For support, contact:
Email: transport@adustech.edu.ng
Phone: +234-800-ADUSTECH

ADUSTECH Bus Tracker
Secure Campus Transportation Management
  `;
}

// Store OTP (in a real app, this would be in a database)
const otpStore = new Map<string, {
  email: string;
  otp: string;
  expiresAt: Date;
  used: boolean;
  attempts: number;
}>();

export function storeOTP(email: string, otp: string, expiresAt: Date): void {
  // Remove any existing OTP for this email
  for (const [key, value] of otpStore.entries()) {
    if (value.email === email) {
      otpStore.delete(key);
    }
  }

  // Store new OTP
  otpStore.set(otp, {
    email,
    otp,
    expiresAt,
    used: false,
    attempts: 0
  });

  // Clean up expired OTP
  setTimeout(() => {
    otpStore.delete(otp);
  }, expiresAt.getTime() - Date.now());
}

export function validateOTP(email: string, otp: string): { valid: boolean; error?: string } {
  // Find OTP for this email
  let otpData = null;
  for (const [key, value] of otpStore.entries()) {
    if (value.email === email && value.otp === otp) {
      otpData = value;
      break;
    }
  }

  if (!otpData) {
    return { valid: false, error: 'Invalid or expired verification code' };
  }

  if (otpData.used) {
    return { valid: false, error: 'This verification code has already been used' };
  }

  if (otpData.expiresAt < new Date()) {
    otpStore.delete(otp);
    return { valid: false, error: 'Verification code has expired' };
  }

  // Increment attempts (for rate limiting)
  otpData.attempts++;
  if (otpData.attempts > 3) {
    otpStore.delete(otp);
    return { valid: false, error: 'Too many invalid attempts. Please request a new code.' };
  }

  return { valid: true };
}

export function markOTPAsUsed(otp: string): void {
  const otpData = otpStore.get(otp);
  if (otpData) {
    otpData.used = true;
  }
}

// Get remaining attempts for an email
export function getRemainingAttempts(email: string): number {
  for (const [key, value] of otpStore.entries()) {
    if (value.email === email && !value.used && value.expiresAt > new Date()) {
      return Math.max(0, 3 - value.attempts);
    }
  }
  return 0;
}

// Check if user can request new OTP (rate limiting)
export function canRequestNewOTP(email: string): boolean {
  // Allow new OTP if no active OTP exists or current one has expired
  for (const [key, value] of otpStore.entries()) {
    if (value.email === email && !value.used && value.expiresAt > new Date()) {
      return false; // Still has active OTP
    }
  }
  return true;
}