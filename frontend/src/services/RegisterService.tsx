import { API } from "../consts/constApi";
import IRegisterUser from "../interfaces/IRegisterUser";
import axios from "axios";

export const registerUser = async (data: IRegisterUser): Promise<any> => {
    const formData = new FormData();

    // Добавляем данные в объект FormData
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.confirmPassword);

    if (data.image) {
        formData.append('image', data.image); // Если есть аватар, добавляем его
    }

    try {
        const response = await axios.post(`${API}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data;

        // Обрабатываем полученные данные
        const token = data.token;

        if (token) {
            localStorage.setItem('token', token);
        }

        return data; // Возвращаем данные ответа
    } catch (error) {
        console.error('Registration error:', error);
        // Обрабатываем ошибку (можно также пробросить её дальше, чтобы обработать в компоненте)
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Registration failed');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};