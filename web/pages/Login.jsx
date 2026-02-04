import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Save a fake session marker
        localStorage.setItem("user", formData.username);
        alert("Login Successful!");
        navigate('/dashboard');
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to server.");
    }
  };

  return (
    <div className="container">
      <h2>Login to Symbi</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Username" required
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;