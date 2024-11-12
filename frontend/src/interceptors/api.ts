import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API } from '../consts/constApi';

const api = axios.create({
  baseURL: `${API}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получение токена из localStorage
const getToken = () => localStorage.getItem('token');
const setToken = (token: string) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

// Устанавливаем токен в заголовок Authorization перед каждым запросом
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Флаг и очередь для обновления токена
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если получаем 401 и запрос не был повторен
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Если уже идет процесс обновления токена
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest); // Повторяем запрос с api, а не с axios
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = getToken();
        if (!refreshToken) {
          throw new Error('Токен отсутствует');
        }

        const { data } = await api.post('/refresh/', {}, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const newToken = data.token;
        setToken(newToken);

        // Обновляем заголовок для последующих запросов
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (authError) {
        processQueue(authError, null);
        removeToken();
        return Promise.reject(authError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default api;
