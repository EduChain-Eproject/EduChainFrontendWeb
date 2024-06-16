import axios from 'axios';

const axiosService = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL,
});

axiosService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosService;
