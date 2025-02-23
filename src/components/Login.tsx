import "../../public/login.css"; 
import React, { useState } from "react"; // ✅ Import useState
import { useAuth } from "../context/AuthContext"; // ✅ Correct path for useAuth
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState(""); // ✅ No more error
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Redirects after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } catch (error) {
      alert("Failed to login: " + (error as any).message);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        {/* Heading for College System */}
        <h1 className="heading">College System</h1>

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* Signup Link */}
        <div className="auth-links">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
