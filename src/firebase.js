import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore"
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDntE1uWs4qE1rwNSAV6gp3ZQfd-326bVE",
  authDomain: "fir-e4748.firebaseapp.com",
  projectId: "fir-e4748",
  storageBucket: "fir-e4748.firebasestorage.app",
  messagingSenderId: "1022745498430",
  appId: "1:1022745498430:web:5c303485a07e5f4b0a126f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const realTimeDb = getDatabase(app)

export const auth = getAuth(app);