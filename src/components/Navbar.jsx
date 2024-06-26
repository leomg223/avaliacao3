import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/services">Services</Link>
      <Link to="/users">Users</Link>
    </div>
  );
}

export default Navbar;