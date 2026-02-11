import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                identifier: identifier, 
                password: password
            });

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                alert("Login Successful!");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Username/Email or Password");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username or Email</label>
                    <input 
                        type="text" 
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;