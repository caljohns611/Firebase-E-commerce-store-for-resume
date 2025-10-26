import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArKpuch8_km_iw1AD0cVvpCdCfe4xjrcE",
  authDomain: "project-for-resume-cf6f7.firebaseapp.com",
  projectId: "project-for-resume-cf6f7",
  storageBucket: "project-for-resume-cf6f7.firebasestorage.app",
  messagingSenderId: "292410830583",
  appId: "1:292410830583:web:2f328d88fdf83028386df2",
  measurementId: "G-4B45KLKWYL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);