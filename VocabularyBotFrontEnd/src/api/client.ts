import axios from 'axios';

const TOKEN_STORAGE_KEY = 'accessToken';

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem('expiresAt');
};

export const apiClient = axios.create({
  baseURL: 'http://localhost:5261',
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
