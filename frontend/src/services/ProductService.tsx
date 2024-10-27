import { API } from "../consts/constApi";
import axios from "axios";
import IProductPagination from "../interfaces/IProductPagination";

export const getProducts = async (page: number): Promise<IProductPagination> => {
    try {
        const response = await axios.get(`${API}/products?page=${page}`);
        const productPagination: IProductPagination = {
            products: response.data.data || [],  // Array of products
            currentPage: response.data.current_page || 1,
            pageSize: response.data.per_page || 9,
            total: response.data.total || 0
        };

        return productPagination;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}