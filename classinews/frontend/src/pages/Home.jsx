import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ClassInews</h1>
          <p>Intelligent News Classification System powered by AI</p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn-hero primary">
              Start Classifying
            </Link>
            <Link to="/about" className="btn-hero secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Classification</h3>
            <p>Advanced machine learning algorithms to classify news into multiple categories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Batch Processing</h3>
            <p>Upload multiple articles at once and get classifications in seconds</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and securely stored in our database</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on desktop, tablet, and mobile devices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Easy Export</h3>
            <p>Download your classified results as CSV for further analysis</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h3>Dark Mode</h3>
            <p>Comfortable viewing with light and dark theme options</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Login / Register</h3>
            <p>Create an account or login with your Google account</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload Articles</h3>
            <p>Upload a CSV file with articles or enter text manually</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Classifications</h3>
            <p>Our AI classifies articles into World, Sports, Business, or Sci/Tech</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Export Results</h3>
            <p>Download results as CSV or view in the dashboard</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users who are using ClassInews to organize their news</p>
        <Link to="/dashboard" className="btn-cta">
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
};

export default Home;
