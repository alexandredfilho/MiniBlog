import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxV4CvsHImnPkDHhuI-sKApG8__h9xoMw",
  authDomain: "miniblog-98437.firebaseapp.com",
  projectId: "miniblog-98437",
  storageBucket: "miniblog-98437.appspot.com",
  messagingSenderId: "514491143858",
  appId: "1:514491143858:web:e96984407c47f6ad551bab"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
