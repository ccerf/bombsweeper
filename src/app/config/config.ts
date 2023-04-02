import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdtwegM5pVgQVMqrQffP0swYipHHNADvU",
  authDomain: "bomb-sweeper-5143c.firebaseapp.com",
  databaseURL: "https://bomb-sweeper-5143c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bomb-sweeper-5143c",
  storageBucket: "bomb-sweeper-5143c.appspot.com",
  messagingSenderId: "640669023553",
  appId: "1:640669023553:web:29e49c90171a26ea24f5c0",
  measurementId: "G-NL2563W9PS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);