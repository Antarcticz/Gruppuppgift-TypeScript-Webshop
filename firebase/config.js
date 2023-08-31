import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfchoJIz2VE8X6Gg5_6OEbtw13awb0VpI",
  authDomain: "typescript-webshop-551b1.firebaseapp.com",
  projectId: "typescript-webshop-551b1",
  storageBucket: "typescript-webshop-551b1.appspot.com",
  messagingSenderId: "885080868045",
  appId: "1:885080868045:web:dc7cb9fb86ab97a5d25584",
  measurementId: "G-C2NEKRWXEQ"
};

initializeApp(firebaseConfig);

const db = getFirestore()
const auth = getAuth()

export { db, auth}