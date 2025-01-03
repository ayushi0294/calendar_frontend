import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuthHooks';
import './Login.css'; // Include the CSS file for styling

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, success } = useLogin(); // Destructure the hook
  const navigate = useNavigate(); // To navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password); // Call the login function from the hook
    if (data) {
      setToken(data.token);
      setRole(data.role);
      navigate(data.role === 'user' ? '/calender' : '/summary');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <button type="button" className="btn loading" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn submit-btn">
              Login
            </button>
          )}
        </form>
        {success && <p className="success-message">Login successful! Redirecting...</p>}
      </div>
    </div>
  );
};

export default Login;
