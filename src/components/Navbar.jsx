import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Produtos</Link>
      <Link to="/services">Serviços</Link>
      <Link to="/users">Usuários</Link>
    </nav>
  );
};

export default Navbar;