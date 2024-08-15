import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAEKQOiby1nwbutOlzxfWFQNrU6sh3ILU",
  authDomain: "pf-henry-front-end.firebaseapp.com",
  projectId: "pf-henry-front-end",
  storageBucket: "pf-henry-front-end.appspot.com",
  messagingSenderId: "519336137197",
  appId: "1:519336137197:web:720cde25f93d56125857e4",
  measurementId: "G-9JB08LLQ7X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
auth.languageCode = 'en'

// Exporta instancias de Firebase
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
