import axios from 'axios';

// Base API URL configured via environment variables
// In local dev with Vite proxy, fallback is '/api'
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request Interceptor: Attach JWT token from localStorage to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jobtrack_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors like expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized and not already on login/register page
    if (error.response && error.response.status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes('/auth/login') ||
        error.config?.url?.includes('/auth/register');

      if (!isAuthEndpoint) {
        localStorage.removeItem('jobtrack_token');
        localStorage.removeItem('jobtrack_user');
        // Let the application route or auth state redirect
      }
    }
    return Promise.reject(error);
  }
);

export default api;
