import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            if (response.status === 200) {
                alert("Registration Successful! Please Login.");
                navigate('/'); // Redirect to Login page
            }
        } catch (error) {
            alert(error.response?.data || "Registration Failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <input name="username" placeholder="Username" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
    );
};

export default Register;