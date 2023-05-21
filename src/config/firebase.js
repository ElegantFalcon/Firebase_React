import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSFo8iMLprNgFKzTNJ7WeFi03CPnKMYDc",
  authDomain: "baseapp-31776.firebaseapp.com",
  projectId: "baseapp-31776",
  storageBucket: "baseapp-31776.appspot.com",
  messagingSenderId: "437626336544",
  appId: "1:437626336544:web:e3180cad3fec7838ba1345",
  measurementId: "G-X6PJWY4JJ1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 