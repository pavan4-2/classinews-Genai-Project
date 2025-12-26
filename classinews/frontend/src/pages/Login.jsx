import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/google', {
                access_token: credentialResponse.credential,
                token_type: 'bearer',
            });
            console.log('Login Success:', res.data);
            localStorage.setItem('token', res.data.access_token);
            // Store user email from response
            if (res.data.user_email) {
                localStorage.setItem('userEmail', res.data.user_email);
            }
            // Notify App about login so it can re-render and redirect properly
            window.dispatchEvent(new Event('userLoggedIn'));
            navigate('/home');
        } catch (error) {
            console.error('Login Failed:', error);
            setError('Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLocalLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        try {
            const res = await api.post('/auth/login', { email, password });
            console.log('Login Success:', res.data);
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('userEmail', email);
            // Notify App about login so it can re-render and redirect properly
            window.dispatchEvent(new Event('userLoggedIn'));
            navigate('/home');
        } catch (error) {
            console.error('Login Failed:', error);
            setError(error.response?.data?.detail || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">📰</div>
                    <h1>ClassInews</h1>
                    <p>Sign in to your account</p>
                </div>

                {error && (
                    <div className="error-message">
                        <span>✗</span> {error}
                    </div>
                )}

                <form onSubmit={handleLocalLogin} className="auth-form">
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
                    </div>

                    <button 
                        type="submit" 
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="divider">
                    <span>or continue with</span>
                </div>

                <div className="google-login">
                    <GoogleLogin 
                        onSuccess={handleGoogleSuccess} 
                        onError={handleError}
                        theme="outline"
                        size="large"
                        width="100%"
                    />
                </div>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
            </div>

            <div className="auth-banner">
                <h2>Welcome Back</h2>
                <p>Classify your news articles with AI-powered intelligence</p>
                <ul className="feature-list">
                    <li>✓ Fast and accurate classification</li>
                    <li>✓ Batch processing capabilities</li>
                    <li>✓ Secure data storage</li>
                    <li>✓ Easy export functionality</li>
                </ul>
            </div>
        </div>
    );
};

export default Login;
