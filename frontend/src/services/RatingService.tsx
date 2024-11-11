import { API } from "../consts/constApi";
import axios from "axios";

export const getRating = async (id: string): Promise<string> => {
    try {
        const response = await axios.get(`${API}/reviews/rating/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching rating:", error);
        throw error;
    }
}