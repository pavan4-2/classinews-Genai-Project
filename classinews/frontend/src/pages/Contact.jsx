import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send this to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <section className="contact-header">
          <h1>Contact Us</h1>
          <p>Have questions? We'd love to hear from you.</p>
        </section>

        <div className="contact-wrapper">
          {/* Contact Information */}
          <section className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>support@classinews.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h3>Address</h3>
                <p>123 Tech Street<br />Innovation City, IC 12345</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="socials">
                <a href="#" className="social-btn">Twitter</a>
                <a href="#" className="social-btn">LinkedIn</a>
                <a href="#" className="social-btn">GitHub</a>
                <a href="#" className="social-btn">Facebook</a>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            {submitted ? (
              <div className="success-message">
                <h2>Thank You!</h2>
                <p>We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a Message</h2>
                
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message here..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            )}
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How accurate is the classification?</h3>
              <p>Our system achieves 92% accuracy across all news categories. Accuracy may vary slightly depending on content clarity.</p>
            </div>
            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>Yes, all user data is encrypted and stored securely in our PostgreSQL database. We follow industry best practices for data protection.</p>
            </div>
            <div className="faq-item">
              <h3>Can I export my results?</h3>
              <p>Yes, you can export all your classified articles as a CSV file directly from the dashboard.</p>
            </div>
            <div className="faq-item">
              <h3>What file formats are supported?</h3>
              <p>Currently, we support CSV files with 'title' and 'content' columns for batch processing.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
