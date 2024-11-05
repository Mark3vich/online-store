import { API } from "../consts/constApi";
import axios from "axios";
import ICartItem from "../interfaces/ICartItem";
import IProduct from "../interfaces/IProduct";

export const addCartItems = async (
    cartItems: ICartItem[], // Accepts an array of ICartItem
    token: string // Pass the token as a parameter
): Promise<ICartItem[]> => {
    try {
        const response = await axios.put(
            `${API}/cart`,
            cartItems,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding cart items:", error);
        throw error;
    }
};

export const getCartItems = async (token: string): Promise<IProduct[]> => {
    try {
        const response = await axios.get(`${API}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Map over the cart items and extract only the product details
        const products = response.data.map((cartItem: { product: IProduct; quantity_items_cart: number }) => ({
            ...cartItem.product,
            quantity_items_cart: cartItem.quantity_items_cart
        }));

        return products;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
};