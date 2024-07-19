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

class ReNewToken {
  accessToken: string;
  refreshToken: string;
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const accessToken = localStorage.getItem('accessToken')!;
      const refreshToken = localStorage.getItem('refreshToken')!;
      const req = new ReNewToken(accessToken, refreshToken);

      return new Promise((resolve, reject) => {
        refreshAccessToken(req)
          .then((newAccessToken) => {
            localStorage.setItem('accessToken', newAccessToken);
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + newAccessToken;
            originalRequest.headers['Authorization'] =
              'Bearer ' + newAccessToken;
            processQueue(null, newAccessToken);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

const refreshAccessToken = async (req: ReNewToken) => {
  const baseUrl = 'http://localhost:8080/';
  const response = await axiosService.post(
    `${baseUrl}Auth/reset-access-token`,
    req,
  );
  const newAccessToken = response.data?.object.accessToken;
  const newRefreshToken = response.data?.object.refreshToken;
  localStorage.setItem('accessToken', newAccessToken);
  localStorage.setItem('refreshToken', newRefreshToken);
  return newAccessToken;
};

export default axiosService;
