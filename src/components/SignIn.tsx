import React, { useState } from "react";
import { auth } from "../services/firebase";  // Ensure this path is correct
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 shadow-lg rounded-lg bg-white w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign In</button>
        </form>
        <button onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white py-2 mt-2 rounded">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
