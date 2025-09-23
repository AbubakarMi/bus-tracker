const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
let db;

try {
  // For production, use service account key
  // For development, we'll use the client SDK config
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Check if Firebase app is already initialized
  let app;
  try {
    app = initializeApp({
      projectId: firebaseConfig.projectId,
    });
  } catch (error) {
    // App might already be initialized
    if (error.code === 'app/duplicate-app') {
      const { getApps } = require('firebase-admin/app');
      app = getApps()[0];
    } else {
      throw error;
    }
  }

  db = getFirestore(app);
  console.log('✅ Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error);
  process.exit(1);
}

module.exports = { db };