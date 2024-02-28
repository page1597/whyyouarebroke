import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "whyyouarebroke-cee8d.firebaseapp.com",
  projectId: "whyyouarebroke-cee8d",
  storageBucket: "whyyouarebroke-cee8d.appspot.com",
  messagingSenderId: "726538082246",
  appId: "1:726538082246:web:82288bcff67a25163fc4c7",
  measurementId: "G-XGDZXEWEX2",
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const db = getFirestore(app);
