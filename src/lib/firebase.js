import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBzSMOTf52spA9VZhpKAWizYui2hh6ZPNY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'islamic-girls-shs.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'islamic-girls-shs',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'islamic-girls-shs.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '747635523441',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:747635523441:web:fb6a1220bb2219777a40d0'
};

let app, auth, db;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.warn('Firebase credentials not configured. App will run in demo mode.');
    app = null;
    auth = null;
    db = null;
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  app = null;
  auth = null;
  db = null;
}

export { auth, db };
export default app;
