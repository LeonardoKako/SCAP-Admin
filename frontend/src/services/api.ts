import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  try {
    const authStorageStr = localStorage.getItem('scap-auth-storage');
    if (authStorageStr) {
      const authStorage = JSON.parse(authStorageStr);
      const token = authStorage?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error('Error reading token from localStorage', error);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('scap-auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
