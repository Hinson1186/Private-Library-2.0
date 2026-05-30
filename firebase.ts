import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// 優先使用環境變數
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID
};

export const isValidConfig = !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.apiKey !== "placeholder");
console.log("Firebase config found:", isValidConfig);

let app;
export let auth: any = undefined;
export let db: any = undefined;

if (getApps().length === 0) {
  if (isValidConfig) {
    console.log("Using real Firebase config");
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
    } catch (e) {
      console.error("Firebase initialization failed:", e);
      // Fallback
    }
  } else {
    console.log("Using placeholder Firebase config (disabled real sdk calls)");
    // We intentionally do not initialize getAuth and getFirestore here
  }
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export default app;