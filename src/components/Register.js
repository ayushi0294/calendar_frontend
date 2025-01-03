import React, { useState } from 'react';
import { useSignup } from '../hooks/useAuthHooks';
import './Signup.css'; // Ensure you create this CSS file for styles
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const { signup, loading, error, success } = useSignup(); // Destructure the hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(formData); // Call the signup function from the hook
    if (data) { 
      navigate("/login"); // Redirect to the login page upon successful signup
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-heading">Create Account</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <button type="button" className="submit-btn loading" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          )}
        </form>

        {success && <p className="success-message">Signup successful! Redirecting to the login page...</p>}

        <div className="login-redirect">
          <p>Already have an account? 
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
