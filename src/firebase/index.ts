import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


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
export const app = initializeApp(firebaseConfig);

// ── App Check ──
// 本機開發時啟用 debug token（必須在 initializeAppCheck 之前設定，且只在 dev）。
// 文件：https://firebase.google.com/docs/app-check/web/debug-provider
if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

// instanize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Firebase AI Logic — Gemini via the Google AI backend.
// Consumers create models through the `useAI` composable.
export const ai = getAI(app, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, { model: "gemini-3.6-flash" });

export async function run() {
  // ]Provide a prompt that contains text
  const prompt = "Write a story about a magic backpack."

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  console.log(text);
}
