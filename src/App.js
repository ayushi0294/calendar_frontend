import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Register';
import CalendarComponent from './components/Calender';
import SummaryPage from './components/Summary';
import Logout from './components/Logout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  // PrivateRoute component for checking both token and role
  const PrivateRoute = ({ element, redirectTo, allowedRoles }) => {
    if (!token) {
      return <Navigate to={redirectTo} />;
    }

    // Check if the user's role is in allowedRoles
    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to={redirectTo} />;
    }

    return element;
  };

  return (
    <Router>
      <div style={{ padding: '16px' }}>
        {/* Show logout button if user is logged in */}
        {token && <Logout setToken={setToken} setRole={setRole} />}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
          <Route path="/" element={<Signup />} />

          {/* Private Routes */}
          <Route path="/calender" element={
            <PrivateRoute
              element={<CalendarComponent />}
              redirectTo="/login"
              allowedRoles={['user']} // Only users with 'user' role can access the calendar
            />
          } />
          <Route path="/summary" element={
            <PrivateRoute
              element={<SummaryPage />}
              redirectTo="/login"
              allowedRoles={['doctor']} // Only users with 'doctor' role can access the summary
            />
          } />

          {/* Redirect to login if user is not authenticated */}
          <Route path="/" element={<Navigate to={token ? (role === 'user' ? '/calender' : '/summary') : '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
