// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

//paginas
import Begin from './routes/Begin';
import Login from './routes/Login';
import Tags from './routes/Tags';
import Final from './routes/Final';
import Error from './routes/Error';

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
export const db = getFirestore(app)

//const database = firebase.database();

const router = createBrowserRouter([
  {
    path:'/',
    element: <Begin/>,
    errorElement: <Error/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/tags',
    element: <Tags/>
  },
  {
    path:'/final',
    element: <Final/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <RouterProvider router={router} />
);

//<App />
