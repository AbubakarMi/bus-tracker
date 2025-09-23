const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send password reset email using Resend
 * @param {string} email - User's email address
 * @param {string} resetToken - Password reset token
 * @param {string} userName - User's name for personalization
 * @returns {Promise<boolean>} - Success status
 */
async function sendResetEmail(email, resetToken, userName = 'User') {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const emailHtml = `
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
                line-height: 1.6;
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
                text-align: center;
            }
            .reset-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
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
                    Hello ${userName}! 👋
                </div>

                <div class="message">
                    We received a request to reset your password for your ADUSTECH Bus Tracker account.
                    If you made this request, click the button below to reset your password.
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
                        • This link will expire in 1 hour<br>
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

    const emailText = `
ADUSTECH Bus Tracker - Password Reset Request

Hello ${userName}!

We received a request to reset your password for your ADUSTECH Bus Tracker account.

To reset your password, click or copy this link into your browser:
${resetLink}

SECURITY NOTICE:
- This link will expire in 1 hour
- This link can only be used once
- If you didn't request this reset, please ignore this email
- For security, never share this link with anyone

For support, contact:
Email: transport@adustech.edu.ng
Phone: +234-800-ADUSTECH

ADUSTECH Bus Tracker
Secure Campus Transportation Management
    `;

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Reset Your ADUSTECH Bus Tracker Password',
      html: emailHtml,
      text: emailText,
    });

    console.log('✅ Password reset email sent successfully:', {
      emailId: response.id,
      to: email,
      resetToken: resetToken.substring(0, 8) + '...' // Log partial token for debugging
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to send password reset email:', {
      error: error.message,
      email: email,
      resetToken: resetToken.substring(0, 8) + '...'
      
    });
    return false;
  }
}

module.exports = {
  sendResetEmail
};