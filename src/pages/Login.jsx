import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Validação de login
    if (username === 'admin' && password === 'password') {
      navigate('/products');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label className="form-label" htmlFor="username">Usuário:</label>
        <input className="form-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label className="form-label" htmlFor="password">Senha:</label>
        <input className="form-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="form-submit" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;