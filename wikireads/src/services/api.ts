// src/services/api.ts

import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define interfaces for API responses
interface LoginResponse {
  qualified: boolean;
  message: string;
}

interface LogoutResponse {
  message: string;
}

// Create an Axios instance with default configurations
const api: AxiosInstance = axios.create({
  baseURL: '/api/v1', // Aligns with Vite's proxy setup
  withCredentials: true, // Ensures cookies are sent with requests
});

// Login function to authenticate the user
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/login', { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Network error');
    }
  }
};

// Logout function to end the user session
export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    const response: AxiosResponse<LogoutResponse> = await api.post('/logout');
    return response.data;
  } catch (error: any) {
    throw new Error('Logout failed');
  }
};

// Export the Axios instance for other API calls
export default api;
