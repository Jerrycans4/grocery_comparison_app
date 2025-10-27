import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged, getAuth, signInAnonymously } from "firebase/auth";

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
export const auth = getAuth(app);
export const db = getFirestore(app);

signInAnonymously(auth).catch(((error) =>
  console.error("Failed to sign in", error)
))

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Signed in.", user.uid);

    try {
    const snapshot = await getDocs(collection(db, "products"));
    snapshot.forEach(doc => console.log(doc.id, doc.data()));
    } catch (error) {
      console.error("Failed to get products.", error)
    }
    
  } else {
    console.log("No login yet.")
  }
})

