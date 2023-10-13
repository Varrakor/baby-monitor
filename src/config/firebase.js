// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAR7GuMzr8VRxLKqDPCjoHK9Gth42lN0ck",
  authDomain: "iot-group13.firebaseapp.com",
  projectId: "iot-group13",
  storageBucket: "iot-group13.appspot.com",
  messagingSenderId: "424047561158",
  appId: "1:424047561158:web:954f153a9e4ac2b56f4ac7",
  measurementId: "G-0BX9B9LX61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();
