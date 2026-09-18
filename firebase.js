import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEYOIm315Hko-vi0pSdzBhLkpHsBOkon8",
  authDomain: "calendar-4687d.firebaseapp.com",
  projectId: "calendar-4687d",
  storageBucket: "calendar-4687d.firebasestorage.app",
  messagingSenderId: "423136200805",
  appId: "1:423136200805:web:789d01356d750ba3c01e8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
