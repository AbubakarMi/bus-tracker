// Quick Firebase fix for immediate database operations
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Simple, direct Firebase initialization
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required config is present
const hasValidConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId
);

let simpleApp: any = null;
let simpleDb: any = null;
let simpleAuth: any = null;

if (hasValidConfig) {
  try {
    // Initialize directly without complex checks
    if (getApps().length === 0) {
      simpleApp = initializeApp(firebaseConfig);
    } else {
      simpleApp = getApps()[0];
    }

    simpleAuth = getAuth(simpleApp);
    simpleDb = getFirestore(simpleApp);

    console.log('🔥 Simple Firebase initialized:', {
      hasApp: !!simpleApp,
      hasAuth: !!simpleAuth,
      hasDb: !!simpleDb,
      projectId: firebaseConfig.projectId
    });

  } catch (error) {
    console.error('❌ Simple Firebase init failed:', error);
  }
} else {
  console.error('❌ Firebase config invalid for simple init');
}

// Export simple Firebase instances
export { simpleApp as app, simpleAuth as auth, simpleDb as db, hasValidConfig as isConfigured };

// Quick ready check
export function isSimpleFirebaseReady(): boolean {
  return !!(simpleApp && simpleAuth && simpleDb && hasValidConfig);
}

// No-wait Firebase check
export function getFirebaseIfReady() {
  if (isSimpleFirebaseReady()) {
    return { app: simpleApp, auth: simpleAuth, db: simpleDb, ready: true };
  }
  return { app: null, auth: null, db: null, ready: false };
}