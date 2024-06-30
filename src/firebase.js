// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHiWSt7O5-k7EQwkyJfX_JsmxCdLSXzeE",
  authDomain: "chatapplication-22a5d.firebaseapp.com",
  projectId: "chatapplication-22a5d",
  storageBucket: "chatapplication-22a5d.appspot.com",
  messagingSenderId: "499386318340",
  appId: "1:499386318340:web:1b9f7a13e1bd3274df3f51"
};

// Initialize Firebase
export const ap = initializeApp(firebaseConfig); 
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();