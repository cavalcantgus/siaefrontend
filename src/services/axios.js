import axios from 'axios';
import router from '../router/routes';
import NProgress from 'nprogress';

// Configurações globais
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://siaeserver.com', // URL base da API
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

// Finaliza NProgress depois da resposta
api.interceptors.response.use(response => {
  NProgress.done()
  return response
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

// Adicionando automaticamente o token ao cabeçalho (se existir no localStorage)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        console.log(error.response)
        console.log(error.response.data)
        localStorage.removeItem('token');
  
        if (router.currentRoute.value.path !== '/login') {
          router.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );
export default api;
