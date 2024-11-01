export default interface IProduct {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    discount: number;
    category: string;
    quantity_items_cart?: number;
}