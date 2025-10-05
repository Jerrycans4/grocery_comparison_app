import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyB9ASTFk_kxmXP7LPj3rYsHpJAlesxgKYA",

  authDomain: "price-comparison-9f3a9.firebaseapp.com",

  projectId: "price-comparison-9f3a9",

  storageBucket: "price-comparison-9f3a9.firebasestorage.app",

  messagingSenderId: "711635959095",

  appId: "1:711635959095:web:4a6f5e152c0ba21ceaeeb2",

  measurementId: "G-HSRY5MLCXW"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
