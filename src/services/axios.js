import axios from 'axios';

// Configurações globais
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://siaeserver.com', // URL base da API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adicionando automaticamente o token ao cabeçalho (se existir no localStorage)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
