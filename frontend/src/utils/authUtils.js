// authUtils.js

export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
    const expiryTime = localStorage.getItem('tokenExpiry');  // Retrieve token expiry time
  
    // If there's no token or if the token has expired, return false
    if (!token || Date.now() > expiryTime) {
      return false;
    }
  
    return true;  // Token exists and is valid
  };
  