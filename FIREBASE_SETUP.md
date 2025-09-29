# Firebase Setup Guide

This guide helps resolve Firebase connection issues, particularly the "400 Bad Request" errors when running the app on different computers.

## 🔧 Quick Fix Steps

### Step 1: Environment Variables Setup

1. Copy the `.env.local.example` file to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Firebase configuration in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Step 2: Clear Next.js Cache
```bash
# Remove build cache
rm -rf .next
rm -rf node_modules

# Reinstall dependencies
npm install
```

### Step 3: Use Regular Next.js (Not Turbopack)
Make sure your `package.json` uses:
```json
{
  "scripts": {
    "dev": "next dev"
  }
}
```

## 🚨 Common Issues & Solutions

### Firebase 400 Errors
If you see these errors:
```
GET https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/... 400 (Bad Request)
WebChannelConnection RPC 'Write' stream transport errored
```

**Possible Causes:**
1. **Missing/incorrect environment variables**
2. **Firebase project permissions**
3. **Network/firewall blocking Firebase APIs**

**Solutions:**

#### 1. Verify Environment Variables
```bash
# Check if variables are loaded
npm run dev
# Look for Firebase initialization logs in console
```

#### 2. Test Firebase Connection
Add this to your browser console on the app:
```javascript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other configs
});
```

#### 3. Check Firebase Project Settings
- Ensure the Firebase project exists and is active
- Verify API keys are valid
- Check Firestore is enabled for the project

#### 4. Network Troubleshooting
- Try disabling antivirus/firewall temporarily
- Check if corporate firewall blocks Firebase domains
- Test on different network/mobile hotspot

### Turbopack Runtime Errors
If you see:
```
Error: Cannot find module '../chunks/ssr/[turbopack]_runtime.js'
```

**Solution:** Use regular Next.js dev server instead of Turbopack:
```json
"dev": "next dev"  // instead of "next dev --turbopack"
```

## 🔍 Debugging Steps

1. **Check Firebase Console Logs**
   - Go to Firebase Console → Project → Logs
   - Look for authentication/permission errors

2. **Browser Network Tab**
   - Open Developer Tools → Network
   - Look for failed Firebase requests
   - Check request headers and response details

3. **Enable Firebase Debug Logging**
   Add to your app:
   ```javascript
   // Add to firebase.ts
   import { connectFirestoreEmulator } from 'firebase/firestore';

   // Enable debug logging
   if (typeof window !== 'undefined') {
     window.localStorage.setItem('debug', 'firebase*');
   }
   ```

## 📋 Environment Variable Checklist

Make sure ALL these variables are set with `NEXT_PUBLIC_` prefix:

- ✅ `NEXT_PUBLIC_FIREBASE_API_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- ✅ `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_APP_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## 🆘 Still Having Issues?

1. Check the Firebase project exists: https://console.firebase.google.com/
2. Verify Firestore database is created and rules allow access
3. Ensure API keys haven't been regenerated/disabled
4. Try creating a new `.env.local` file with fresh config values

## 📞 Firebase Project Info
- Current project: `bus-tracker-28780` (from .firebaserc)
- Make sure this matches your `NEXT_PUBLIC_FIREBASE_PROJECT_ID`