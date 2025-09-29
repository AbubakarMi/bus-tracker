# 📧 Real Email Setup for Bus Tracker

This guide will help you set up real email sending for OTP delivery in your Bus Tracker application.

## 🚀 Quick Setup

### Step 1: Get a Resend API Key

1. Go to [Resend.com](https://resend.com) and create a free account
2. Verify your email address
3. In the dashboard, click "API Keys" in the left sidebar
4. Click "Create API Key"
5. Give it a name like "Bus Tracker OTP"
6. Copy the generated API key (starts with `re_`)

### Step 2: Add API Key to Environment

1. Open `.env.local` file in your project root
2. Uncomment and update this line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### Step 3: Restart Your Development Server

```bash
npm run dev
```

## ✅ Testing the Email System

### Current Behavior

**Without API Key** (Development Mode):
- OTP will show in console/terminal
- Email content logged for debugging
- System works for testing purposes

**With API Key** (Production Mode):
- Real emails sent to user's email address
- Beautiful HTML email template
- Email tracking via Resend dashboard

### Test the Forgot Password Flow

1. Go to `http://localhost:3005/forgot-password`
2. Enter a real email address (yours)
3. Click "Send Password to Email"
4. Check your email inbox for the OTP code
5. Enter the OTP in the verification form
6. Reset your password

## 📧 Email Templates

The system includes:

### OTP Email Template
- Beautiful responsive HTML design
- Clear OTP code display
- Expiration time information
- Professional Bus Tracker branding

### Password Email Template
- Clean, secure password delivery
- Account type information
- Security recommendations

## 🔧 Advanced Configuration

### Custom Email Domain (Optional)

1. In Resend dashboard, go to "Domains"
2. Add your custom domain (e.g., `yourdomain.com`)
3. Update the email service configuration:

```typescript
// In src/lib/email-service.ts, change line 406:
from: 'Bus Tracker <noreply@yourdomain.com>',
```

### Email Customization

You can customize the email templates in:
- `src/components/emails/otp-email.tsx` - OTP email template
- `src/lib/email-service.ts` - Email service logic

## 🚨 Security Best Practices

1. **Never commit API keys** to version control
2. **Use different API keys** for development and production
3. **Monitor email usage** in Resend dashboard
4. **Implement rate limiting** for email sending (already included)

## 📊 Monitoring

### Email Delivery Tracking

Check Resend dashboard for:
- Email delivery status
- Bounce rates
- Open rates
- Failed deliveries

### Console Logs

The system logs detailed information:
- OTP generation
- Email sending status
- Error handling
- Fallback behavior

## 🛠 Troubleshooting

### Common Issues

**"Failed to send email"**
- Check your API key is correct
- Verify internet connection
- Check Resend account status

**"Email not received"**
- Check spam/junk folder
- Verify email address is correct
- Check Resend dashboard for delivery status

**"Development mode fallback"**
- API key not set or incorrect
- Check `.env.local` file
- Restart development server

### Debug Mode

For additional debugging, check the browser console and terminal output:

```bash
# Terminal shows:
🔐 OTP GENERATED FOR TESTING:
============================
📧 Email: user@example.com
🔑 OTP Code: 123456
⏰ Expires: 12/31/2023, 11:59:59 PM
👤 User: John Doe (student)
============================
✅ Email sent successfully!
📧 Email ID: re_abc123def456
```

## 💡 Free Tier Limits

Resend free tier includes:
- 3,000 emails/month
- 100 emails/day
- Full API access
- Email analytics

Perfect for development and small-scale production use!

## 🎉 Success!

Once configured, your users will receive:
- Professional OTP emails
- Secure password reset emails
- Instant delivery notifications
- Beautiful, mobile-friendly templates

The system automatically handles fallbacks and ensures reliability for your users.