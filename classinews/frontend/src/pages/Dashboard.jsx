import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await api.get('/articles');
            setArticles(res.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleClassify = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please enter both title and content');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/classify', { title, content });
            setResult(res.data);
            setTitle('');
            setContent('');
            fetchArticles(); // Refresh list
        } catch (error) {
            console.error('Error classifying article:', error);
            alert('Error classifying article. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            <div className="dashboard-grid">
                {/* Classify Section */}
                <div className="dashboard-section classify-section">
                    <h2>Classify New Article</h2>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Article title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            placeholder="Article content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="6"
                        />
                    </div>
                    <button 
                        onClick={handleClassify}
                        disabled={loading}
                        className="btn-classify"
                    >
                        {loading ? 'Classifying...' : 'Classify & Save'}
                    </button>

                    {result && (
                        <div className="result-box">
                            <h3>✓ Successfully Classified</h3>
                            <p><strong>Title:</strong> {result.title}</p>
                            <p><strong>Category:</strong> <span className="category-badge">{result.category?.name || 'Unclassified'}</span></p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="dashboard-section actions-section">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <Link to="/upload" className="action-btn">
                            <span className="action-icon">📤</span>
                            <span>Batch Upload</span>
                        </Link>
                        <Link to="/settings" className="action-btn">
                            <span className="action-icon">⚙️</span>
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Articles */}
            <div className="recent-articles">
                <h2>Recent Articles</h2>
                {articles.length === 0 ? (
                    <p className="no-articles">No articles yet. Classify one to get started!</p>
                ) : (
                    <div className="articles-grid">
                        {articles.map((article) => (
                            <div key={article.id} className="article-card">
                                <h3>{article.title}</h3>
                                <p className="article-content">{article.content.substring(0, 100)}...</p>
                                <div className="article-footer">
                                    <span className="category-badge">
                                        {article.category?.name || 'Unclassified'}
                                    </span>
                                    <span className="article-date">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
