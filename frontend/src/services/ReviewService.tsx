import { API } from "../consts/constApi";
import axios from "axios";
import IReview from "../interfaces/IReview";
import IReviewItem from "../interfaces/IRevieItem";
import api from "../interceptors/api";

export const getReview = async (id: string): Promise<IReviewItem[]> => {
    try {
        const response = await axios.get(`${API}/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching review:", error);
        throw error;
    }
}

export const postReview = async (id: string, token: string, review: IReview): Promise<IReview> => {
    try {
        const response = await api.post(`${API}/review/${id}`, {
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

export const updateReview = async (id: string, token: string, review: IReview): Promise<IReview> => {
    try {
        const response = await api.put(`${API}/review/${id}`, {
            review_id: review.id,    // Передаем id отзыва
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

export const deleteReview = async (
    id: string,
    token: string,
    review_id: string
): Promise<void> => {
    try {
        const response = await api.delete(`${API}/review/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                review_id,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting review:", error);
        throw error;
    }
};
