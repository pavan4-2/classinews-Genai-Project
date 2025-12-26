import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear all user-related data
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPicture');
    localStorage.removeItem('joinDate');
    
    // Close menu
    setIsMenuOpen(false);
    
    // Navigate to login
    // Notify app that user logged out so it updates UI immediately
    window.dispatchEvent(new Event('userLoggedOut'));
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          📰 ClassInews
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/home" 
            className={`nav-link ${isActive('/home') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/settings" 
            className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
        </div>

        <div className="navbar-actions">
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
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

export default Navbar;
