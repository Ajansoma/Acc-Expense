import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "trackexpense-7b28f.firebaseapp.com",
  projectId: "trackexpense-7b28f",
  storageBucket: "trackexpense-7b28f.appspot.com",
  messagingSenderId: "675908796659",
  appId: "1:675908796659:web:b44741e5e6836ff9093786",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
