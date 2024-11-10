import React, { useState } from 'react';
import { login } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the stylesheet

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the navigate function to handle redirection after login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error message on each new attempt
    setError('');

    try {
      const data = await login(email, password);
      console.log('Login successful:', data);

      // On successful login, save the token (in local storage or context) and redirect user
      localStorage.setItem('authToken', data.token);  // Save JWT token for session

      // Navigate to the appropriate page after login
      navigate('/dashboard');
    } catch (error: any) {
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
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
