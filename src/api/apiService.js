// src/api/apiService.js
import axios from 'axios';

// 🚨 URL BASE CORRIGIDA CONFORME SOLICITADO
const BASE_URL = 'https://localhost:7238/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;