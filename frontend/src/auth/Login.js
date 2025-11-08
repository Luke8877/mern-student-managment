// src/auth/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/api'; // your Axios instance or use fetch if you prefer
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload

    try {
      // 1️⃣ send credentials to your backend
      const res = await api.post('/auth/login', { email, password });

      // 2️⃣ extract token + user info
      const { token, user } = res.data;

      // 3️⃣ store in context/localStorage
      login(user, token);

      // 4️⃣ redirect to protected route
      navigate('/students');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
