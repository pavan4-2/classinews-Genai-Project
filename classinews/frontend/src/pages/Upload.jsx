import React, { useState } from 'react';
import api from '../api';
import '../styles/Upload.css';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first!');
            setMessageType('error');
            return;
        }

        if (!file.name.endsWith('.csv')) {
            setMessage('Please select a CSV file');
            setMessageType('error');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            setMessage('Uploading and processing...');
            setMessageType('info');
            const res = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(res.data.message);
            setMessageType('success');
            if (res.data.results) {
                setResults(res.data.results);
            }
            setFile(null);
            document.getElementById('file-input').value = '';
        } catch (error) {
            console.error('Upload failed:', error);
            setMessage('Upload failed. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        window.open('http://localhost:8000/export', '_blank');
    };

    return (
        <div className="upload-container">
            <div className="upload-content">
                <h1>Batch Classification</h1>
                <p className="subtitle">Upload a CSV file with multiple articles for classification</p>

                {/* Upload Section */}
                <div className="upload-section">
                    <div className="upload-box">
                        <div className="upload-icon">📁</div>
                        <h2>Upload CSV File</h2>
                        <p>CSV must have 'title' and 'content' columns</p>
                        <div className="file-input-wrapper">
                            <input 
                                type="file" 
                                id="file-input"
                                accept=".csv" 
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                            <label htmlFor="file-input" className="file-label">
                                Choose File
                            </label>
                        </div>
                        {file && <p className="file-name">📄 {file.name}</p>}
                        <button 
                            onClick={handleUpload}
                            className="btn-upload"
                            disabled={loading || !file}
                        >
                            {loading ? 'Processing...' : 'Upload & Classify'}
                        </button>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div className={`message ${messageType}`}>
                        {messageType === 'success' && '✓ '}
                        {messageType === 'error' && '✗ '}
                        {messageType === 'info' && '⏳ '}
                        {message}
                    </div>
                )}

                {/* Export Button */}
                {results.length > 0 && (
                    <div className="export-section">
                        <button 
                            onClick={handleDownload}
                            className="btn-download"
                        >
                            📥 Download All Results (CSV)
                        </button>
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="results-section">
                        <h2>Batch Results ({results.length} articles)</h2>
                        <div className="results-table-wrapper">
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Predicted Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((row, index) => (
                                        <tr key={index}>
                                            <td className="title-cell">{row.title}</td>
                                            <td className="category-cell">
                                                <span className="category-badge">{row.category}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="instructions">
                    <h3>How to prepare your CSV file:</h3>
                    <ol>
                        <li>Create a CSV file with two columns: <strong>title</strong> and <strong>content</strong></li>
                        <li>Add your news articles with titles and content</li>
                        <li>Save the file and upload it here</li>
                        <li>Our AI will classify each article</li>
                        <li>Download the results with predictions</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Upload;
