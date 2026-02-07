// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Check if your backend is running on 8080!
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                identifier: identifier,
                password: password
            });

            if (response.status === 200) {
                // Save user info to Local Storage
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Login Failed: Invalid Username or Password");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username or Email" 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)} 
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
            <button className="link-btn" onClick={() => navigate('/register')}>
                Don't have an account? Register here.
            </button>
        </div>
    );
};

export default Login;