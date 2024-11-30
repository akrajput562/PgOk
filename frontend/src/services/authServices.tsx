import axios from 'axios';
import apiClient from '../utils/axiosInstance';

const API_URL = process.env.API_URL;

export const register = async (ownerName: string, ownerEmail: string, ownerPassword: string, ownerPhone: string, propertyName: string, propertyLocation: string) => {
  const response = await apiClient.post(`${API_URL}/register`, { 
    ownerName, 
    ownerEmail, 
    ownerPassword, 
    ownerPhone, 
    propertyName, 
    propertyLocation 
  });
  return response.data;
};

export const login = async (ownerEmail: string, ownerPassword: string) => {
  try {
    const response = await apiClient.post(`owners/login`, {
      ownerEmail,
      ownerPassword,
    });
    return response.data; // Returning token and role from backend
  } catch (error: any) {
    if (error.response) {
      // If response error (i.e. 400, 401, etc.)
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      // If network or other error
      throw new Error(error.message || 'Something went wrong');
    }
  }
};
