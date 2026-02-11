import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';     
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Main Root Path (http://localhost:3000/) */}
        <Route path="/" element={<Login />} />

        {/* 2. ADD THIS LINE (http://localhost:3000/login) */}
        <Route path="/login" element={<Login />} />

        {/* Other Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;