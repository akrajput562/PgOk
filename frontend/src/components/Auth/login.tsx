import React, { useState } from 'react';
import { login } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type LoginProps = {
  onLogin: (role: 'tenant' | 'owner', token: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [ownerEmail, setEmail] = useState('');
  const [ownerPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(ownerEmail, ownerPassword);
      console.log('Login successful:', data);

      // Save token in local storage for session management
      localStorage.setItem('authToken', data.token);

      // Example role assignment (e.g., 'owner') - replace with actual role from data if available
      const userRole = 'owner'; // Adjust this based on your response structure
      const token = data.token;
      onLogin(userRole, token);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={ownerEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={ownerPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
