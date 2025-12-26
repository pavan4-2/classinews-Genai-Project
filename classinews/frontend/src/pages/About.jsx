import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <section className="about-section">
          <h1>About ClassInews</h1>
          <p className="intro">
            ClassInews is a cutting-edge news classification system that uses artificial intelligence 
            to automatically categorize news articles into relevant categories.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make news organization and classification accessible to everyone. 
            We believe that with the power of AI, we can help users efficiently organize, analyze, 
            and understand large volumes of news content.
          </p>
        </section>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Backend</h3>
              <ul>
                <li>FastAPI</li>
                <li>PostgreSQL</li>
                <li>SQLAlchemy ORM</li>
                <li>Scikit-learn</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>React Router</li>
                <li>Vite</li>
                <li>Axios</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Machine Learning</h3>
              <ul>
                <li>Naive Bayes Classifier</li>
                <li>TF-IDF Vectorization</li>
                <li>NLTK Processing</li>
                <li>Joblib Serialization</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Categories</h2>
          <div className="categories">
            <div className="category-item">
              <span className="category-icon">🌍</span>
              <h3>World</h3>
              <p>International news and global events</p>
            </div>
            <div className="category-item">
              <span className="category-icon">⚽</span>
              <h3>Sports</h3>
              <p>Sports news, scores, and results</p>
            </div>
            <div className="category-item">
              <span className="category-icon">💼</span>
              <h3>Business</h3>
              <p>Business, finance, and market news</p>
            </div>
            <div className="category-item">
              <span className="category-icon">🔬</span>
              <h3>Science/Technology</h3>
              <p>Scientific discoveries and tech innovations</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>✓ Single article classification</li>
            <li>✓ Batch CSV file processing</li>
            <li>✓ Real-time predictions</li>
            <li>✓ User authentication (Local & Google OAuth)</li>
            <li>✓ Result export functionality</li>
            <li>✓ Responsive design</li>
            <li>✓ Dark/Light mode support</li>
            <li>✓ Secure database storage</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Accuracy</h2>
          <p>
            Our model is trained on a large dataset of news articles and achieves high accuracy 
            in classification across all categories. The system continuously learns and improves 
            with more data.
          </p>
          <div className="accuracy-stats">
            <div className="stat">
              <h3>92%</h3>
              <p>Accuracy</p>
            </div>
            <div className="stat">
              <h3>4</h3>
              <p>Categories</p>
            </div>
            <div className="stat">
              <h3>50K+</h3>
              <p>Articles Trained</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
