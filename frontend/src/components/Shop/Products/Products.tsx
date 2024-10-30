import React from 'react';
import { getProducts } from '../../../services/ProductService'; // Adjust path as necessary
import IProduct from '../../../interfaces/IProduct'; // Adjust path as necessary
import Pagination from 'antd/lib/pagination'; // Adjust path as necessary
import Product from '../../Home/Product/Product';
import IProductPagination from '../../../interfaces/IProductPagination';

interface ProductListProps { }

interface ProductListState {
    products: IProduct[];
    currentPage: number;
    pageSize: number;
    loading: boolean;
    total: number;
}

class Products extends React.Component<ProductListProps, ProductListState> {
    constructor(props: ProductListProps) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            pageSize: 9, 
            loading: true,
            total: 0,
        };
    }

    async componentDidMount() {
        await this.fetchProducts(this.state.currentPage);
    }

    private fetchProducts = async (page: number) => {
        try {
            const products: IProductPagination = await getProducts(page);

            this.setState({
                products: products.products,
                currentPage: products.currentPage,
                pageSize: products.pageSize,
                total: products.total,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            this.setState({ loading: false });
        }
    };

    private handlePageChange = (page: number) => {
        this.setState({ currentPage: page, loading: true }, () => {
            this.fetchProducts(page);
        });
    };

    render() {
        const { products, currentPage, pageSize, loading, total } = this.state;

        return (
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className="product-grid mt-3">
                            {products.map((product, index) => (
                                <Product key={product.id || index} product={product} />
                            ))}
                        </div>

                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={total} // Total number of products
                            onChange={this.handlePageChange}
                            className="mt-4 mb-5 text-center d-flex justify-content-center"
                        />
                    </>
                )}
            </div>
        );
    }
}

export default Products;
