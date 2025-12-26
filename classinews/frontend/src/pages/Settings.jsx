import React, { useState, useEffect } from 'react';
import '../styles/Settings.css';

const Settings = ({ isDarkMode, setIsDarkMode }) => {
  const [profile, setProfile] = useState({
    name: localStorage.getItem('userName') || 'User',
    email: localStorage.getItem('userEmail') || 'user@example.com',
    picture: localStorage.getItem('userPicture') || null,
  });

  const [notification, setNotification] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedName = formData.get('name');
    
    setProfile({
      ...profile,
      name: updatedName
    });
    
    localStorage.setItem('userName', updatedName);
    setNotification('Profile updated successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          picture: reader.result
        });
        localStorage.setItem('userPicture', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h1>Settings</h1>

        {notification && (
          <div className="notification success">
            {notification}
          </div>
        )}

        {/* Theme Settings */}
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="theme-settings">
            <div className="theme-option">
              <input
                type="radio"
                id="light-mode"
                value="light"
                checked={!isDarkMode}
                onChange={() => setIsDarkMode(false)}
              />
              <label htmlFor="light-mode">
                <span className="theme-icon">☀️</span>
                Light Mode
              </label>
            </div>
            <div className="theme-option">
              <input
                type="radio"
                id="dark-mode"
                value="dark"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(true)}
              />
              <label htmlFor="dark-mode">
                <span className="theme-icon">🌙</span>
                Dark Mode
              </label>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="settings-section">
          <h2>Profile</h2>
          <div className="profile-section">
            <div className="profile-picture">
              {profile.picture ? (
                <img src={profile.picture} alt="Profile" />
              ) : (
                <div className="profile-placeholder">👤</div>
              )}
            </div>
            <div className="picture-upload">
              <input
                type="file"
                id="picture-input"
                accept="image/*"
                onChange={handlePictureChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={() => document.getElementById('picture-input').click()}
              >
                Change Picture
              </button>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={profile.name}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={profile.email}
                disabled
              />
              <small>Email cannot be changed</small>
            </div>

            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        </div>

        {/* Account Settings */}
        <div className="settings-section">
          <h2>Account</h2>
          <div className="account-info">
            <p><strong>Account Status:</strong> <span className="status-active">Active</span></p>
            <p><strong>Member Since:</strong> {new Date(localStorage.getItem('joinDate') || new Date()).toLocaleDateString()}</p>
            <button className="btn-danger">
              Delete Account
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="notification-settings">
            <div className="setting-item">
              <input type="checkbox" id="email-notif" defaultChecked />
              <label htmlFor="email-notif">Email Notifications</label>
            </div>
            <div className="setting-item">
              <input type="checkbox" id="classification-notif" defaultChecked />
              <label htmlFor="classification-notif">Classification Alerts</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
