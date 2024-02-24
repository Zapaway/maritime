// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfZf5x_Aa7Bz43pPPtWe3SwPopCYEcAtg",
  authDomain: "maritime-c5183.firebaseapp.com",
  projectId: "maritime-c5183",
  storageBucket: "maritime-c5183.appspot.com",
  messagingSenderId: "1040824039323",
  appId: "1:1040824039323:web:171496a514620c8670133e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
