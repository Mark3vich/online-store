import { API } from "../consts/constApi";
import axios from "axios";

export const checkToken = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    // Проверяем наличие токена в localStorage
    if (!token) return false;

    try {
        // Отправляем запрос для проверки токена
        const response = await axios.post(
            `${API}/check_token/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Если статус ответа 200, считаем токен валидным
        return response.status === 200;
    } catch (error) {
        console.error('Token validation failed:', error);
        return false;
    }
};
