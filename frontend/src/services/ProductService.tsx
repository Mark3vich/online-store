import { API } from "../consts/constApi";
import axios from "axios";
import IProductPagination from "../interfaces/IProductPagination";

export const getProducts = async (
    page: number,
    category: string = '',
    title: string = '',
    min_price: string = '',
    max_price: string = '',
    sort_by: string = 'price', // Default sort attribute
    order: string = 'asc' // Default order (asc or desc)
): Promise<IProductPagination> => {
    try {
        // Construct query parameters dynamically based on filters and sorting options
        const queryParams = new URLSearchParams();

        queryParams.append('page', page.toString());

        if (category) queryParams.append('category', category);
        if (title) queryParams.append('title', title);
        if (min_price) queryParams.append('min_price', min_price);
        if (max_price) queryParams.append('max_price', max_price);
        if (sort_by) queryParams.append('sort_by', sort_by);
        if (order) queryParams.append('order', order);

        const response = await axios.get(`${API}/products?${queryParams.toString()}`);

        // Format the response data into IProductPagination structure
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