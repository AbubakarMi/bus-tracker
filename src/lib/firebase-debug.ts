import { db, auth, isFirebaseConfigured } from './firebase';

export function debugFirebaseConfig() {
  console.log('🔍 Firebase Configuration Debug:');
  console.log('Environment Variables:');

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? '✅ Set' : '❌ Missing',
  };

  console.table(config);

  console.log('Firebase Services Status:');
  console.log('- isFirebaseConfigured:', isFirebaseConfigured);
  console.log('- auth:', auth ? '✅ Initialized' : '❌ Not initialized');
  console.log('- db:', db ? '✅ Initialized' : '❌ Not initialized');

  // Check actual values (masked for security)
  console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);

  // Network connectivity test
  if (typeof window !== 'undefined') {
    console.log('🌐 Network connectivity test...');

    // Test Google connectivity
    fetch('https://www.google.com/', { method: 'HEAD', mode: 'no-cors' })
      .then(() => console.log('✅ Google connectivity: OK'))
      .catch(err => console.error('❌ Google connectivity:', err));

    // Test Firebase domains
    fetch('https://firebaseapp.com/', { method: 'HEAD', mode: 'no-cors' })
      .then(() => console.log('✅ Firebase domains: OK'))
      .catch(err => console.error('❌ Firebase domains:', err));

    // Test specific Firebase project
    const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    if (authDomain) {
      fetch(`https://${authDomain}/`, { method: 'HEAD', mode: 'no-cors' })
        .then(() => console.log('✅ Project auth domain: OK'))
        .catch(err => console.error('❌ Project auth domain:', err));
    }
  }
}

// Auto-run debug on client side
if (typeof window !== 'undefined') {
  setTimeout(debugFirebaseConfig, 1000);
}