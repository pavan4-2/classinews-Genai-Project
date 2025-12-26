import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import LogoutNavbar from './components/LogoutNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import './styles/theme.css';

// REPLACE WITH YOUR ACTUAL CLIENT ID
const GOOGLE_CLIENT_ID = '865888361342-svptsdeq95qk10m9246bii4sjpt4j4au.apps.googleusercontent.com';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Auth state: keep reactive to localStorage changes and custom events
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')));

  // Listen for cross-window storage changes and custom login/logout events
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'token') setIsLoggedIn(Boolean(e.newValue));
    };

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    window.addEventListener('storage', handleStorage);
    window.addEventListener('userLoggedIn', handleLogin);
    window.addEventListener('userLoggedOut', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userLoggedIn', handleLogin);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        {isLoggedIn ? (
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        ) : (
          <LogoutNavbar />
        )}
        <main>
          <Routes>
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/home" />} />
            <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/home" />} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
            <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/upload" element={isLoggedIn ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLoggedIn ? <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> : <Navigate to="/login" />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
