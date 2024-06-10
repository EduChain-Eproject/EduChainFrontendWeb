import axios from 'axios';

const axiosService = axios.create({
<<<<<<< Updated upstream
    baseURL: process.env.REACT_APP_API_BASE_URL,
=======
    baseURL: import.meta.env.VITE_API_BASE_URL
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export default axiosService;
=======
export default axiosService;
>>>>>>> Stashed changes
