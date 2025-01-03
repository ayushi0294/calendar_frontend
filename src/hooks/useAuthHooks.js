import { useState } from 'react';
import {  apiPost } from '../utils/api';


// Custom hook for handling signup
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Make API request to signup endpoint
      const response = await apiPost('/auth/register', formData);
      setSuccess(true);
      return response

    } catch (err) {
      setError(err.response?.data?.error || 'Error signing up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    error,
    success,
  };
};

// Custom hook for handling login
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await  apiPost('/auth/login', { email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      setSuccess(true);
      return response; // Return the data if needed (like token, role)
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    success,
  };
};

// Export both hooks
export { useSignup, useLogin };
