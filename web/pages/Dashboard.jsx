import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="container dashboard">
      <h1>Welcome, {user}!</h1>
      <p>This is your protected dashboard.</p>
      
      <div className="card">
        <h3>Your Symbiote Status</h3>
        <p>❤️ Health: 100%</p>
        <p>🍔 Hunger: Satiated</p>
      </div>

      <button onClick={handleLogout} className="logout-btn">Log Out</button>
    </div>
  );
}

export default Dashboard;   