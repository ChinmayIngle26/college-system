// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4KSBTh3INwyG9RwZUJ3fcyHkiThGw1R4",
  authDomain: "college-system-61294.firebaseapp.com",
  projectId: "college-system-61294",
  storageBucket: "college-system-61294.firebasestorage.app",
  messagingSenderId: "146748708139",
  appId: "1:146748708139:web:aef11557fc01ccb753216e",
  measurementId: "G-3V0M7FHSVX"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Make sure auth is exported