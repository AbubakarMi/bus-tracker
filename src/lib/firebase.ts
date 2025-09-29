
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Enhanced validation
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
const isFirebaseConfigured = missingEnvVars.length === 0;

if (missingEnvVars.length > 0) {
  console.error("❌ Missing Firebase environment variables:", missingEnvVars);
  console.error("🔧 Please check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_* variables are set");
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Initialize Firebase
function initializeFirebaseApp() {
  console.log('🚀 Starting Firebase initialization...');

  if (!isFirebaseConfigured) {
    console.error("❌ Firebase config is incomplete. Required variables:", requiredEnvVars);
    console.error("📋 See FIREBASE_SETUP.md for configuration help");
    return;
  }

  console.log('📋 Firebase config validation passed');

  try {
    // Check if already initialized
    if (getApps().length > 0) {
      console.log("♻️ Firebase apps already exist, using existing app");
      app = getApps()[0];
      auth = getAuth(app);
      db = getFirestore(app);
      console.log("✅ Using existing Firebase initialization");
      return;
    }

    console.log('🔧 Initializing new Firebase app...');

    // Initialize new app
    app = initializeApp(firebaseConfig);
    console.log("✅ Firebase app created successfully");

    // Initialize auth service
    try {
      auth = getAuth(app);
      console.log("✅ Firebase Auth service initialized");
    } catch (authError) {
      console.error("❌ Firebase Auth initialization failed:", authError);
    }

    // Initialize Firestore service
    try {
      db = getFirestore(app);
      console.log("✅ Firestore service initialized");
      console.log("🔥 Project ID:", firebaseConfig.projectId);

      // Immediate connection test
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          import('./firebase-test').then(({ testFirebaseConnection }) => {
            console.log('🧪 Running Firebase connection test...');
            testFirebaseConnection();
          }).catch(err => console.warn('Firebase test import failed:', err));
        }, 1000);
      }

    } catch (firestoreError) {
      console.error("❌ Firestore initialization failed:", firestoreError);
      db = null;
    }

    console.log("🎉 Firebase initialization process completed");

  } catch (error) {
    console.error("❌ Critical Firebase initialization failure:", error);
    console.error("🔧 Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      code: (error as any)?.code || 'No code'
    });

    // Reset to null on failure
    app = null;
    auth = null;
    db = null;
  }
}

// Initialize immediately if configuration is available
initializeFirebaseApp();

// Import debug utilities
if (typeof window !== 'undefined') {
  import('./firebase-debug').catch(err =>
    console.warn('Firebase debug module failed to load:', err)
  );
}

// Test Firebase connection
if (db) {
  console.log("🔥 Firestore database connected");
} else {
  console.error("❌ Firestore database not available");
}

// Auth utility functions
export async function logoutUser(): Promise<void> {
  try {
    if (auth) {
      await signOut(auth);
    }
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    if (!auth) {
      throw new Error('Firebase auth not available');
    }
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// Helper function to check if Firebase is ready
export function isFirebaseReady(): boolean {
  return !!(app && auth && db && isFirebaseConfigured);
}

// Helper function to wait for Firebase to be ready
export function waitForFirebase(timeout: number = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    console.log('⏳ Waiting for Firebase to be ready...', { timeout });

    // Quick check first
    if (isFirebaseReady()) {
      console.log('✅ Firebase already ready');
      resolve(true);
      return;
    }

    const startTime = Date.now();
    let attempts = 0;

    const checkInterval = setInterval(() => {
      attempts++;
      const ready = isFirebaseReady();
      const elapsed = Date.now() - startTime;

      console.log(`🔄 Firebase check #${attempts}:`, {
        ready,
        elapsed,
        hasApp: !!app,
        hasDb: !!db,
        hasAuth: !!auth,
        isConfigured: isFirebaseConfigured
      });

      if (ready) {
        clearInterval(checkInterval);
        console.log('✅ Firebase ready after', elapsed, 'ms');
        resolve(true);
      } else if (elapsed > timeout) {
        clearInterval(checkInterval);
        console.error('⏰ Firebase initialization timeout after', timeout, 'ms');
        console.error('🔍 Final state:', {
          app: !!app,
          auth: !!auth,
          db: !!db,
          isConfigured: isFirebaseConfigured,
          attempts
        });
        resolve(false);
      }
    }, 200); // Check every 200ms
  });
}

export { auth, db, isFirebaseConfigured, app };
