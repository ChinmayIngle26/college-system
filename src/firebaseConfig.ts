import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4KSBTh3INwyG9RwZUJ3fcyHkiThGw1R4",
  authDomain: "college-system-61294.firebaseapp.com",
  projectId: "college-system-61294",
  storageBucket: "college-system-61294.appspot.com", // ✅ Fix storageBucket URL
  messagingSenderId: "146748708139",
  appId: "1:146748708139:web:aef11557fc01ccb753216e",
  measurementId: "G-3V0M7FHSVX"
};


// ✅ Ensure Firebase is initialized only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
