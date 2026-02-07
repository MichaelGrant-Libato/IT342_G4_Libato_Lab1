import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", formData);
            alert("Registration Successful! Please login.");
            navigate("/"); 
        } catch (error) {
            console.error(error);
            alert("Registration Failed: " + (error.response?.data || "Unknown Error"));
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username" 
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    onChange={handleChange} 
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/')}>
                Already have an account? Login here.
            </button>
        </div>
    );
};

export default Register;