
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

const isFirebaseConfigured = !!firebaseConfig.apiKey;

let app: FirebaseApp;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      console.log("✅ Firebase initialized successfully");
    } catch (e) {
      console.error("❌ Failed to initialize Firebase", e)
    }
  } else {
    app = getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("✅ Firebase already initialized");
  }
} else {
  console.error("❌ Firebase config is missing. Please set up your .env file.");
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

export { auth, db, isFirebaseConfigured };
