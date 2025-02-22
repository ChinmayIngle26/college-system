import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
// import App from "./App";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// console.log("Clerk Publishable Key:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);


// if (!PUBLISHABLE_KEY) {
//     throw new Error("Missing Clerk Publishable Key");
// }

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//         <App />
//     </ClerkProvider>
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );