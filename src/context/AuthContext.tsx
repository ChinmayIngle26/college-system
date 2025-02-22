import React, { createContext, useContext, useState, useEffect } from "react";

 import { auth, db } from "../services/firebase"; // ✅ Import Firestore instance

 import {

   createUserWithEmailAndPassword,

   signInWithEmailAndPassword,

   signOut,

   onAuthStateChanged,

   User,

 } from "firebase/auth";

 import { doc, setDoc, getDoc } from "firebase/firestore"; // ✅ Firestore functions
 
// Create Auth Context

 const AuthContext = createContext<any>(null);
 
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const [currentUser, setCurrentUser] = useState<User | null>(null);

   const [userData, setUserData] = useState<any>(null);

   const [loading, setLoading] = useState(true);
 
  useEffect(() => {

     const unsubscribe = onAuthStateChanged(auth, async (user) => {

       setCurrentUser(user);

       if (user) {

         await fetchUserData(user.uid); // ✅ Fetch user data when auth state changes

       } else {

         setUserData(null);

       }

       setLoading(false);

     });
 
    return () => unsubscribe();

   }, []);
 
  // ✅ Function to Fetch User Data from Firestore

   const fetchUserData = async (uid: string) => {

     try {

       const docRef = doc(db, "users", uid);

       const docSnap = await getDoc(docRef);

       if (docSnap.exists()) {

         setUserData(docSnap.data());

       } else {

         setUserData(null);

       }

     } catch (error) {

       console.error("Error fetching user data:", error);

     }

   };
 
  // ✅ Updated Signup Function to Store Name & Registration Number

   const signup = async (email: string, password: string, name: string, registrationNumber: string) => {

     try {

       const userCredential = await createUserWithEmailAndPassword(auth, email, password);

       const user = userCredential.user;
 
      // 🔹 Store Additional Data in Firestore

       await setDoc(doc(db, "users", user.uid), {

         uid: user.uid,

         name,

         email,

         registrationNumber,

         createdAt: new Date(),

       });
 
      // ✅ Fetch user data immediately after signup

       await fetchUserData(user.uid);
 
      return user;

     } catch (error) {

       console.error("Signup Error:", error);

       throw error;

     }

   };
 
  const login = async (email: string, password: string) => {

     try {

       const userCredential = await signInWithEmailAndPassword(auth, email, password);

       const user = userCredential.user;
 
      // ✅ Fetch user data immediately after login

       await fetchUserData(user.uid);
 
      return user;

     } catch (error) {

       console.error("Login Error:", error);

       throw error;

     }

   };
 
  const logout = async () => {

     try {

       await signOut(auth);

       setCurrentUser(null);

       setUserData(null); // ✅ Clear user data on logout

     } catch (error) {

       console.error("Logout Error:", error);

       throw error;

     }

   };
 
  return (
<AuthContext.Provider value={{ currentUser, userData, signup, login, logout }}>

       {loading ? <p>Loading...</p> : children} {/* ✅ Prevent UI flicker while loading */}
</AuthContext.Provider>

   );

 };
 
// Hook to Use Auth

 export const useAuth = () => {

   return useContext(AuthContext);

 };

//----------------------------------------------------------------

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth, db } from "../services/firebase"; // ✅ Import Firestore instance
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   User,
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore"; // ✅ Firestore functions

// // Create Auth Context
// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//         }
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // ✅ Updated Signup Function to Store Name & Registration Number
//   const signup = async (email: string, password: string, name: string, registrationNumber: string) => {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // 🔹 Store Additional Data in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       uid: user.uid,
//       name,
//       email,
//       registrationNumber,
//       createdAt: new Date(),
//     });

//     return user;
//   };

//   const login = (email: string, password: string) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     setUserData(null); // Clear user data on logout
//     return signOut(auth);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, userData, signup, login, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to Use Auth
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// import { createContext, useContext, useState, useEffect } from "react";
// import { auth, db } from "../services/firebase";
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut, 
//   onAuthStateChanged 
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// interface CustomUser {
//   uid: string;
//   name: string;
//   email: string;
//   registrationNumber: string;
// }

// const AuthContext = createContext<CustomUser | null>(null);

//   const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
// return useContext(AuthContext);

// import { ReactNode } from "react";

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function signup(name: string, email: string, password: string, registrationNumber: string) {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
    
//     // Store user info in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       name,
//       email,
//       registrationNumber,
//       uid: user.uid,
//     });
//   }

//   async function login(email: string, password: string) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   async function logout() {
//     return signOut(auth);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         setCurrentUser({ uid: user.uid, ...userDoc.data() });
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// }
