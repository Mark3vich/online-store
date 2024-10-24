import { API } from "../consts/constApi";
import axios from "axios";
import ILoginUser from "../interfaces/ILoginUser";


export const loginUser = async (userData: ILoginUser): Promise<any> => {    
    try {
        const response = await axios.post(`${API}/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Предполагается, что в ответе будет объект с токеном
        const { token } = response.data;

        // Сохранение токена в локальное хранилище
        if (token) {
            localStorage.setItem('token', token);
        }

        return response.data; // Возвращаем ответ для дальнейшего использования
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to login');
    }
}