import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCKMov3IE3FetByZNLsXaw2NVo7cuzYSUs",
  authDomain: "mealmate-9b03a.firebaseapp.com",
  projectId: "mealmate-9b03a",
  storageBucket: "mealmate-9b03a.firebasestorage.app",
  messagingSenderId: "478769997550",
  appId: "1:478769997550:web:eee5683ee2f90c608975ff",
  measurementId: "G-SSV17P04QP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);