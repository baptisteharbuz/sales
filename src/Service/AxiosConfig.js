// src/Service/AxiosConfig.js
import axios from 'axios';
import { port } from './Port_service';

// Créez une instance Axios
const axiosInstance = axios.create({
    baseURL: port,
});

// Ajouter un intercepteur de requête
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Ajouter un intercepteur de réponse
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Supprimer le token stocké
            localStorage.clear();
            // Émettre un événement personnalisé pour informer l'application
            window.dispatchEvent(new Event('logout'));
            // Rediriger vers /login si nécessaire
            if (window.location.pathname !== "/login") {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
