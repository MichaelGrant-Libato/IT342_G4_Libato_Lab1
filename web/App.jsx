import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

// 🔒 Protected Route: Only allows logged-in users
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
};

// 🔓 Public Route: Redirects logged-in users away from Login/Register to Dashboard
const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      {/* You can add a <Navbar /> here later to show on all pages */}
      <Routes>
        {/* Root path logic */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Public Pages: Wrapped in PublicRoute to prevent re-login */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        
        {/* 🔒 Protected Pages: Dashboard and future Pet features */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;