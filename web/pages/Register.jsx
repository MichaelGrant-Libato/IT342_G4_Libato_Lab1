import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration Successful! Please login.");
        navigate('/login');
      } else {
        alert("Username already taken or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection failed.");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Username" required
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input 
          type="email" placeholder="Email" required
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;