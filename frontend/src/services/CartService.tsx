import { API } from "../consts/constApi";
import axios from "axios";
import ICartItem from "../interfaces/ICartItem";

export const addCartItems = async (
    cartItems: ICartItem[] // Принимаем массив элементов ICartItem
): Promise<ICartItem[]> => {
    try {
        const response = await axios.post(`${API}/cart`, cartItems);
        return response.data;
    } catch (error) {
        console.error("Error adding cart items:", error);
        throw error;
    }
};