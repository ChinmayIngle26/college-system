import React, { useState } from "react"; // ✅ Import useState
import { useAuth } from "../context/AuthContext"; // ✅ Correct path for useAuth
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function Signup() {
  const [email, setEmail] = useState(""); // ✅ useState is now defined
  const [password, setPassword] = useState("");
  const { signup } = useAuth(); // ✅ useAuth is now properly imported
  const navigate = useNavigate(); // ✅ useNavigate is correctly imported

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(email, password);
      alert("Signup Successful!");

      navigate("/login"); // ✅ Redirects to login
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
