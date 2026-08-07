import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY_REMOVED",
  authDomain: "githubio-database.firebaseapp.com",
  projectId: "githubio-database",
  storageBucket: "githubio-database.firebasestorage.app",
  messagingSenderId: "958543748073",
  appId: "1:958543748073:web:75370de26a036b92238978",
  measurementId: "G-JN0TNKV29F",
};

// initialize
const app = initializeApp(firebaseConfig);

// instanize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
