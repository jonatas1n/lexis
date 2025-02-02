import axios from 'axios';

const FALLBACK_API_URL = 'http://localhost:8000'

const API_URL = process.env.VITE_API_URL ?? FALLBACK_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
