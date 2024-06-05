import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxDoqvIioEh98Cui4_6Ql_9yIqjZnSjTg",
  authDomain: "pipivo-corp.firebaseapp.com",
  projectId: "pipivo-corp",
  storageBucket: "pipivo-corp.appspot.com",
  messagingSenderId: "418554278943",
  appId: "1:418554278943:web:ff55013881dd4f3010d12a",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const fStorage = getFirestore(app);
export const imgStorage = getStorage(app);

export { app, auth };
