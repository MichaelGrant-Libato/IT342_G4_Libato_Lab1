// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        } else {
            navigate("/"); // Kick user out if not logged in
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> Active</p>
            
            <button 
                onClick={handleLogout} 
                style={{backgroundColor: "#dc3545", marginTop: "20px"}}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;