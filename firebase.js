// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0Xb5Z7Wacz_aLEb8jV-EWBkBIUugx_UM",
  authDomain: "project2-a4587.firebaseapp.com",
  projectId: "project2-a4587",
  storageBucket: "project2-a4587.appspot.com",
  messagingSenderId: "489134696596",
  appId: "1:489134696596:web:a92846d78b9d0b49b12c81",
  measurementId: "G-0X4RZ6L0NK"
};

// Initialize Firebase
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };