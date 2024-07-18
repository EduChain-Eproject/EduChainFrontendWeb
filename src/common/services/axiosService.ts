import axios from 'axios';

const axiosService = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

axiosService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Assuming you have a function to refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Update the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        // Handle refresh error, e.g., redirect to login page
        console.error("Failed to refresh access token:", refreshError);
        // Redirect to the login page or handle the error appropriately
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  // Assuming you have a function to request a new access token using the old access token
  // This function should make a request to your authentication service
  // and return the new access token
  const _token = localStorage.getItem("accessToken");
  const accessToken: string = JSON.parse(_token === null ? " " : _token);

  const response = await axiosService.post("/api/auth/RefreshToken", {  accessToken });
  const newAccessToken = response.data?.accessToken;

  // Update the local storage with the new access token
  localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

  return newAccessToken;
};

export default axiosService;
