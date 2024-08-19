// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu3Fv5ERtQlM1H9NSn8xvBeeQOs4VMGcA",
  authDomain: "flashcardsaas-2e010.firebaseapp.com",
  projectId: "flashcardsaas-2e010",
  storageBucket: "flashcardsaas-2e010.appspot.com",
  messagingSenderId: "289959931691",
  appId: "1:289959931691:web:2315cbd764dd2facff1f6e",
  measurementId: "G-J5W7FVKQQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app)

export{db}