import axios from 'axios';

const API_URL = 'http://localhost:5000/api/owners';

export const register = async (ownerName: string, ownerEmail: string, ownerPassword: string, ownerPhone: string, propertyName: string, propertyLocation: string) => {
  const response = await axios.post(`${API_URL}/register`, { 
    ownerName, 
    ownerEmail, 
    ownerPassword, 
    ownerPhone, 
    propertyName, 
    propertyLocation 
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return the token and other login details from the server
  } catch (error) {
    throw error; // Propagate error to the login page
  }
};
