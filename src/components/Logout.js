import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Import the CSS for styling

const Logout = ({ setToken, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Reset token and role state
    setToken(null);
    setRole(null);

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Logout;
