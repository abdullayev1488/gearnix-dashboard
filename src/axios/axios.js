import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7000/api',
    // baseURL: 'https://admin.elcanali.site/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000,
});

// Attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
