import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/users');
      if (!res.ok) throw new Error('Erro ao buscar usuários');
      const users = await res.json();
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        setError('');
        onLogin();
        navigate('/products');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;