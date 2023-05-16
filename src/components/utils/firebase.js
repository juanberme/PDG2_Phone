// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2SneRA8qsz-_a5zjBO1fCC8o2Ui1mI7E",
  authDomain: "pdgdatabase-7eebb.firebaseapp.com",
  databaseURL: "https://pdgdatabase-7eebb-default-rtdb.firebaseio.com",
  projectId: "pdgdatabase-7eebb",
  storageBucket: "pdgdatabase-7eebb.appspot.com",
  messagingSenderId: "1072612563928",
  appId: "1:1072612563928:web:89a9ad87f48a5c57d470ad",
  measurementId: "G-LJ5RRRSG3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);