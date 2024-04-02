import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR2xscJj8P0_PQ01btpjf6FZ-JrJPfghU",
  authDomain: "getstuffdone-80541.firebaseapp.com",
  projectId: "getstuffdone-80541",
  storageBucket: "getstuffdone-80541.appspot.com",
  messagingSenderId: "57215308646",
  appId: "1:57215308646:web:7e08323ff6ad76ecbfaea7",
  measurementId: "G-97G1DC6QKL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
export const auth = getAuth(app);
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export const db = getFirestore(app);
