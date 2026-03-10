import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7000/api',
    // baseURL: 'https://admin.elcanali.site/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000,
});

export default api;
