import IProduct from "./IProduct";

export default interface IProductPagination {
    products: IProduct[],
    currentPage: number,
    pageSize: number,
    total: number
}