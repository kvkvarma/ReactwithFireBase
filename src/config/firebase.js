// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVw3JZZ7zp7a9jkCUXaCUhA0XXSziEDeM",
  authDomain: "fir-course-ad609.firebaseapp.com",
  projectId: "fir-course-ad609",
  storageBucket: "fir-course-ad609.appspot.com",
  messagingSenderId: "1060046715233",
  appId: "1:1060046715233:web:2f9b41c54e86de9c8aad20",
  measurementId: "G-1ENRHMJ026"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);