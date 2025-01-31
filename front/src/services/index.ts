import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "http://0.0.0.0:8000",
  headers: {
    'Content-Type': 'application/json'
  }
});
