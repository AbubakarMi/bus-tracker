# ADUSTECH Bus Tracker - Password Reset API

A secure Node.js/Express API for handling password reset functionality with Firebase Firestore and Resend email service.

## 🚀 Features

- **Secure Password Reset**: JWT-based tokens with 1-hour expiration
- **Email Integration**: Professional HTML emails via Resend
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Helmet.js security middleware
- **Firestore Integration**: Scalable NoSQL database
- **CORS Support**: Cross-origin resource sharing
- **Error Handling**: Comprehensive error management

## 📋 Prerequisites

- Node.js 18+
- Firebase project with Firestore enabled
- Resend account and API key
- Environment variables configured

## ⚙️ Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.api.example .env.local
# Edit .env.local with your actual values
```

3. **Start the development server:**
```bash
npm run api:dev
```

## 🔧 Environment Variables

```env
# API Server
API_PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Resend Email Service
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## 🛠 API Endpoints

### 1. Forgot Password

**POST** `/api/auth/forgot-password`

Request a password reset for a user.

**Request Body:**
```json
{
  "email": "user@adustech.edu.ng"
}
```

**Response:**
```json
{
  "message": "If that email exists in our system, a reset link was sent."
}
```

**Features:**
- ✅ Email validation
- ✅ Rate limiting (3 requests per 15 minutes)
- ✅ Security: Always returns success (no email enumeration)
- ✅ Generates secure 32-byte reset token
- ✅ 1-hour token expiration
- ✅ Professional HTML email template

---

### 2. Reset Password

**POST** `/api/auth/reset-password`

Reset user password using a valid token.

**Request Body:**
```json
{
  "token": "32-character-reset-token",
  "newPassword": "NewSecurePassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successful. You can now log in with your new password."
}
```

**Password Requirements:**
- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Features:**
- ✅ Token validation and expiration checking
- ✅ Password strength validation
- ✅ BCrypt hashing (12 rounds)
- ✅ One-time token usage
- ✅ Rate limiting (5 requests per 15 minutes)

---

### 3. Validate Reset Token

**POST** `/api/auth/validate-reset-token`

Validate if a reset token is still valid (optional frontend helper).

**Request Body:**
```json
{
  "token": "32-character-reset-token"
}
```

**Response:**
```json
{
  "valid": true,
  "email": "user@adustech.edu.ng"
}
```

---

### 4. Cleanup Expired Tokens

**POST** `/api/auth/cleanup-expired-tokens`

Remove expired tokens from database (should be called by cron job).

**Response:**
```json
{
  "message": "Expired tokens cleaned up successfully",
  "deletedCount": 5
}
```

## 🗃️ Database Structure

### Firestore Collections

#### `users` Collection
```javascript
{
  "email": "user@adustech.edu.ng",
  "name": "John Doe",
  "role": "student",
  "regNumber": "UG20/COMS/1234",
  "password": "bcrypt_hashed_password",
  "passwordHash": "bcrypt_hashed_password", // future compatibility
  "passwordUpdatedAt": "2024-01-01T00:00:00Z"
}
```

#### `passwordResets` Collection
```javascript
{
  "email": "user@adustech.edu.ng",
  "token": "32-character-secure-token",
  "expiresAt": "2024-01-01T01:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "used": false,
  "userId": "user_document_id",
  "usedAt": null // set when token is used
}
```

## 🔒 Security Features

### Rate Limiting
- **Global**: 100 requests per 15 minutes per IP
- **Forgot Password**: 3 requests per 15 minutes per IP
- **Reset Password**: 5 requests per 15 minutes per IP

### Password Security
- BCrypt hashing with 12 salt rounds
- Strong password requirements
- Secure token generation (crypto.randomBytes)

### Email Security
- No email enumeration (always returns success)
- Professional email templates
- Token expiration warnings

### Headers & CORS
- Helmet.js security headers
- CORS configuration
- Content Security Policy

## 🧪 Testing

**Run API tests:**
```bash
npm run api:test
```

**Start both frontend and API:**
```bash
npm run dev:full
```

**Test individual endpoints:**
```bash
# Health check
curl http://localhost:3001/health

# Forgot password
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@adustech.edu.ng"}'
```

## 📧 Email Templates

The API sends professional HTML emails with:
- ADUSTECH branding and colors
- Mobile-responsive design
- Security warnings and instructions
- Clear call-to-action buttons
- Plain text fallback

## 🚀 Production Deployment

1. **Environment Setup:**
   - Set `NODE_ENV=production`
   - Configure production URLs
   - Set up Firebase service account (optional)

2. **Email Configuration:**
   - Set up custom domain in Resend
   - Configure SPF/DKIM records
   - Update `RESEND_FROM_EMAIL`

3. **Security:**
   - Use HTTPS everywhere
   - Set up proper CORS origins
   - Configure firewall rules
   - Set up monitoring and logging

4. **Scaling:**
   - Use PM2 or similar process manager
   - Set up load balancer
   - Configure auto-scaling
   - Set up database connection pooling

## 📚 API Scripts

```bash
# Development
npm run api:dev        # Start API in development mode
npm run api:start      # Start API in production mode
npm run api:test       # Run API endpoint tests

# Full Stack
npm run dev:full       # Start both frontend and API
npm run start:full     # Start both in production mode
```

## 🤝 Error Handling

The API provides consistent error responses:

```json
{
  "error": "Error message",
  "details": ["Validation errors if any"],
  "retryAfter": 900
}
```

## 📞 Support

For issues or questions:
- **Email**: transport@adustech.edu.ng
- **Phone**: +234-800-ADUSTECH

---

**Built with ❤️ for ADUSTECH Campus Transportation**