import axios from 'axios';
import { API } from '../consts/constApi';

const api = axios.create({
  baseURL: `${API}`, // Укажите ваш API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получение токена из localStorage
const getToken = () => localStorage.getItem('token');

// Устанавливаем токен в заголовок Authorization перед каждым запросом
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехватчик для обработки истечения токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверка на ошибку 401 (неавторизован) и отсутствие повторного запроса
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Отправляем запрос на получение нового токена
        const { data } = await axios.post(`${API}/api/refresh/`, {}, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        // Сохраняем новый токен
        localStorage.setItem('token', data.token);

        // Устанавливаем новый токен в заголовок и повторяем запрос
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (authError) {
        console.error('Token refresh failed:', authError);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(authError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
