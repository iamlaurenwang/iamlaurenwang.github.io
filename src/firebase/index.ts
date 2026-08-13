import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// initialize
const app = initializeApp(firebaseConfig);

// instanize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

async function askAI(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    console.log("ai response:", result.response.text);
  } catch (error) {
    console.log("ai response failed:", error);
  }
}
