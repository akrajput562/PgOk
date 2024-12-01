import axios from 'axios';

const API_URL = process.env.API_URL;

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor (if any token is required)
apiClient.interceptors.request.use(
  (config) => {
    // Log the request config before sending the request
    console.log('Request Config:', config);

    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    console.log('Auth Token:', token); // Check if token is being retrieved correctly

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // Log any errors in the request interceptor
    console.error('Request Error:', error); // Log request error
    return Promise.reject(error);
  }
);

// // Add response interceptor (optional)
// apiClient.interceptors.response.use(
//   (response) => {
//     // Log the response data for debugging purposes
//     console.log('Response Data:', response.data);
//     return response;
//   },
//   (error) => {
//     // Log any errors in the response interceptor
//     console.error('Response Error:', error); // Log response error

//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access (e.g., redirect to login)
//       console.log('Unauthorized access detected. Removing auth token...');
//       localStorage.removeItem('authToken');
//     }

//     return Promise.reject(error);
//   }
// );
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error.response || error); // Log the full error response
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
