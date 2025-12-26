import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/LogoutNavbar.css';

const LogoutNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="logout-navbar">
      <div className="navbar-container">
        <Link to="/login" className="navbar-logo">
          📰 ClassInews
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/login" 
            className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/login" 
            className={`nav-link ${isActive('/about-public') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/login" 
            className={`nav-link ${isActive('/contact-public') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
          <button 
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LogoutNavbar;
