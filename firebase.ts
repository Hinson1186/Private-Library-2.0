import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

const isValidConfig = !!(firebaseConfig.apiKey && firebaseConfig.projectId);
console.log("Firebase config found:", isValidConfig);

let app;
if (getApps().length === 0) {
  if (isValidConfig) {
    console.log("Using real Firebase config");
    app = initializeApp(firebaseConfig);
  } else {
    console.log("Using placeholder Firebase config");
    app = initializeApp({ apiKey: "placeholder", projectId: "placeholder" });
  }
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;