import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Add user email to headers for all requests
api.interceptors.request.use((config) => {
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail) {
    config.headers['User-Email'] = userEmail;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
