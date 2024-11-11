import { API } from "../consts/constApi";
import axios from "axios";
import IReview from "../interfaces/IReview";
import IReviewItem from "../interfaces/IRevieItem";

export const getReview = async (id: string): Promise<IReviewItem[]> => {
    try {
        const response = await axios.get(`${API}/reviews/${id}`);
        return response.data;
    } catch(error) { 
        console.log("Error fetching review:", error);
        throw error;
    }
}

export const postReview = async (id: string, token: string, review: IReview): Promise<IReview> => {
    try {
        const response = await axios.post(`${API}/review/${id}`, {
            review: review.review,   // Передаем текст отзыва
            rating: review.rating,   // Передаем рейтинг
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching review:", error);
        throw error;
    }
}