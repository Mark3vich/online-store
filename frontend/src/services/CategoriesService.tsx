import { API } from "../consts/constApi";
import axios from "axios";
import ICategory from "../interfaces/ICategory";

export const getCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await axios.get(`${API}/categories_all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}