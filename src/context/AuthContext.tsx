// import React, { createContext, useContext, useState, useEffect } from "react";

//  import { auth } from "../services/firebase";

//  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
 
// // Create Auth Context

//  const AuthContext = createContext<any>(null);
 
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

//    const [currentUser, setCurrentUser] = useState<User | null>(null);

//    const [loading, setLoading] = useState(true); // ✅ Prevent blank page by tracking loading state
 
//   useEffect(() => {

//      const unsubscribe = onAuthStateChanged(auth, (user) => {

//        setCurrentUser(user);

//        setLoading(false); // ✅ Set loading to false once auth state is checked

//      });

//      return () => unsubscribe();

//    }, []);
 
//   const signup = (email: string, password: string) => {

//      return createUserWithEmailAndPassword(auth, email, password);

//    };
 
//   const login = (email: string, password: string) => {

//      return signInWithEmailAndPassword(auth, email, password);

//    };
 
//   const logout = () => {

//      return signOut(auth);

//    };
 
//   return (
// <AuthContext.Provider value={{ currentUser, signup, login, logout }}>

//        {!loading && children} {/* ✅ Prevents blank page by rendering only after auth check */}
// </AuthContext.Provider>

//    );

//  };
 
// // Hook to Use Auth

//  export const useAuth = () => {

//    return useContext(AuthContext);

//  };

//----------------------------------------------------------------

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
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Updated Signup Function to Store Name & Registration Number
  const signup = async (email: string, password: string, name: string, registrationNumber: string) => {
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

    return user;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setUserData(null); // Clear user data on logout
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userData, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to Use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};


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
