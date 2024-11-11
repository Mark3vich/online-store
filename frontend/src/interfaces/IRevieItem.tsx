export default interface IReviewItem {
    id: number;
    user_id: number;
    product_id: number;
    review: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}