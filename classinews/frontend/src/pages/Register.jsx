import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', { email, password, name });
            navigate('/login');
        } catch (error) {
            console.error('Registration Failed:', error);
            setError(error.response?.data?.detail || 'Registration failed. Email might already be registered.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">📰</div>
                    <h1>ClassInews</h1>
                    <p>Create a new account</p>
                </div>

                {error && (
                    <div className="error-message">
                        <span>✗</span> {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError('');
                            }}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            required
                            disabled={loading}
                        />
                        <small>Minimum 6 characters</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError('');
                            }}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>

            <div className="auth-banner">
                <h2>Join ClassInews</h2>
                <p>Start classifying news with intelligent automation</p>
                <ul className="feature-list">
                    <li>✓ Instant article classification</li>
                    <li>✓ Organized news categories</li>
                    <li>✓ Cloud-based storage</li>
                    <li>✓ Free to get started</li>
                </ul>
            </div>
        </div>
    );
};

export default Register;
