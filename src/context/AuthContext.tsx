// // import React, { createContext, useContext, useState, useEffect } from "react";
// // import { auth } from "../services/firebase";
// // import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// // // Create Auth Context
// // const AuthContext = createContext<any>(null);

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [user, setUser] = useState<any>(null);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setUser(user);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   // Signup Function
// //   const signup = (email: string, password: string) => {
// //     return createUserWithEmailAndPassword(auth, email, password);
// //   };

// //   // Login Function
// //   const login = (email: string, password: string) => {
// //     return signInWithEmailAndPassword(auth, email, password);
// //   };

// //   // Logout Function
// //   const logout = () => {
// //     return signOut(auth);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, signup, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // Hook to Use Auth
// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };


// // import React, { createContext, useContext, useState, useEffect } from "react";

// //  import { auth } from "../services/firebase";

// //  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
 
// // // Create Auth Context

// //  const AuthContext = createContext<any>(null);
 
// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

// //    const [user, setUser] = useState<User | null>(null);

// //    const [loading, setLoading] = useState(true); // ✅ Prevents redirect before auth check
 
// //   useEffect(() => {

// //      const unsubscribe = onAuthStateChanged(auth, (user) => {

// //        setUser(user);

// //        setLoading(false); // ✅ Mark loading as false after auth check

// //      });

// //      return () => unsubscribe();

// //    }, []);
 
// //   // Signup Function

// //    const signup = (email: string, password: string) => {

// //      return createUserWithEmailAndPassword(auth, email, password);

// //    };
 
// //   // Login Function

// //    const login = (email: string, password: string) => {

// //      return signInWithEmailAndPassword(auth, email, password);

// //    };
 
// //   // Logout Function

// //    const logout = () => {

// //      return signOut(auth);

// //    };
 
// //   return (
// // <AuthContext.Provider value={{ user, signup, login, logout }}>

// //        {!loading && children} {/* ✅ Prevents rendering before checking auth */}
// // </AuthContext.Provider>

// //    );

// //  };
 
// // // Hook to Use Auth

// //  export const useAuth = () => {

// //    return useContext(AuthContext);

// //  };

// import React, { createContext, useContext, useState, useEffect } from "react";

//  import { auth } from "../services/firebase";

//  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
 
// // Create Auth Context

//  const AuthContext = createContext<any>(null);
 
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

//    const [user, setUser] = useState<User | null>(null);

//    const [loading, setLoading] = useState(true);
 
//   useEffect(() => {

//      const unsubscribe = onAuthStateChanged(auth, (user) => {

//        setUser(user);

//        setLoading(false);

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
// <AuthContext.Provider value={{ user, signup, login, logout }}>

//        {!loading && children} {/* ✅ Prevent rendering before auth check */}
// </AuthContext.Provider>

//    );

//  };
 
// // ✅ Export useAuth() Hook

//  export const useAuth = () => {

//    return useContext(AuthContext);

//  };

import React, { createContext, useContext, useState, useEffect } from "react";

 import { auth } from "../services/firebase";

 import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
 
// Create Auth Context

 const AuthContext = createContext<any>(null);
 
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const [currentUser, setCurrentUser] = useState<User | null>(null);

   const [loading, setLoading] = useState(true); // ✅ Prevent blank page by tracking loading state
 
  useEffect(() => {

     const unsubscribe = onAuthStateChanged(auth, (user) => {

       setCurrentUser(user);

       setLoading(false); // ✅ Set loading to false once auth state is checked

     });

     return () => unsubscribe();

   }, []);
 
  const signup = (email: string, password: string) => {

     return createUserWithEmailAndPassword(auth, email, password);

   };
 
  const login = (email: string, password: string) => {

     return signInWithEmailAndPassword(auth, email, password);

   };
 
  const logout = () => {

     return signOut(auth);

   };
 
  return (
<AuthContext.Provider value={{ currentUser, signup, login, logout }}>

       {!loading && children} {/* ✅ Prevents blank page by rendering only after auth check */}
</AuthContext.Provider>

   );

 };
 
// Hook to Use Auth

 export const useAuth = () => {

   return useContext(AuthContext);

 };