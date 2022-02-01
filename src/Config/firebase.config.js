
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtoj93fL2P3KhzYRguuLnjwwn6UgQMjZI",
  authDomain: "react-recipes-app-72e0c.firebaseapp.com",
  projectId: "react-recipes-app-72e0c",
  storageBucket: "react-recipes-app-72e0c.appspot.com",
  messagingSenderId: "858984296985",
  appId: "1:858984296985:web:36b6880300bbbe828ef088"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };