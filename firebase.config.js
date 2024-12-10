// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoxpR9rlDbY8hJXGX86n_QdRBet47CO4w",
  authDomain: "healio-218f1.firebaseapp.com",
  projectId: "healio-218f1",
  storageBucket: "healio-218f1.firebasestorage.app",
  messagingSenderId: "529993160574",
  appId: "1:529993160574:web:3e3bfcf7a184a7e8f4452f",
  measurementId: "G-LJ7GBWYRD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;