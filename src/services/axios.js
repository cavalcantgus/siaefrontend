import axios from 'axios';

// Configurações globais
const api = axios.create({
    baseURL: 'https://syssiae.ddns.net:8080', // URL base da API
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
