import { API } from "../consts/constApi";
import IProduct from "../interfaces/IProduct";
import api from "../interceptors/api";

export const getLikes = async (): Promise<IProduct[]> => {
    try {
        let token = localStorage.getItem('token');
        const response = await api.get(`${API}/like`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
    }
}

export const postLike = async (id: string): Promise<{ status: string; product: IProduct }> => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post(`${API}/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};
