import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api'; // Use environment variable or fallback to default

const apiClient = axios.create({
  baseURL: API_URL, // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor (e.g., for attaching auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer token if available
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized: Handle token expiration
        console.warn('Unauthorized: Redirecting to login...');
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Redirect to login page
      } else if (error.response.status >= 500) {
        console.error('Server error:', error.response.statusText);
        alert('An error occurred on the server. Please try again later.');
      }
    } else {
      console.error('Network error:', error.message);
      alert('Network error: Please check your internet connection or backend service.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
