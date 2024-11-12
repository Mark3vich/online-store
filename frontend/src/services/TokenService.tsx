import { API } from "../consts/constApi";
import axios from "axios";
import IUser from "../interfaces/IUser";

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

export const getUser = async(): Promise<IUser> => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(
            `${API}/user/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}
