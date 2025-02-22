// src/pages/Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/signin");
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {currentUser ? (
                <>
                    <p>Welcome, {currentUser.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <p>You are not signed in.</p>
                    <button onClick={() => navigate("/signin")}>Sign In</button>
                </>
            )}
        </div>
    );
};

export { Dashboard };

// src/pages/SignIn.tsx
import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="signin-container">
            <h1>Sign In</h1>
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
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
