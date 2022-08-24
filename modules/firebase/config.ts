// External libraries
import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import * as fs from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKED,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googelAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export { db, fs, googelAuthProvider, githubAuthProvider };
