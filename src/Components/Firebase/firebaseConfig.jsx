// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log("Firebase Configuration:");
console.log("apiKey:", import.meta.env.VITE_REACT_APP_API_KEY);
console.log("authDomain:", import.meta.env.VITE_REACT_APP_authDomain);
console.log("storageBucket:", import.meta.env.VITE_REACT_APP_storageBucket);
console.log(
  "messagingSenderId:",
  import.meta.env.VITE_REACT_APP_messagingSenderId
);
console.log("appId:", import.meta.env.VITE_REACT_APP_appId);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  projectId: "react-quill-editor",
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
