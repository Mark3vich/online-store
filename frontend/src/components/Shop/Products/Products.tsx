// components/Products/Products.js
import React from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { getProducts } from '../../../services/ProductService';
import DataFilterStores from '../../../stores/DataFilterStores';
import IProduct from '../../../interfaces/IProduct';
import Pagination from 'antd/lib/pagination';
import Product from '../../Home/Product/Product';
import IProductPagination from '../../../interfaces/IProductPagination';

interface ProductListState {
    products: IProduct[];
    currentPage: number;
    pageSize: number;
    loading: boolean;
    total: number;
}

@observer
class Products extends React.Component<{}, ProductListState> {
    private disposer: () => void; // Will store the disposer for the reaction

    constructor(props: {}) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            pageSize: 9,
            loading: true,
            total: 0,
        };

        // Create a reaction to listen for changes in the filter value
        this.disposer = reaction(
            () => DataFilterStores.filter, // Observe changes in the filter
            () => {
                this.fetchProducts(1); // Reset to page 1 on search
            }
        );
    }

    async componentDidMount() {
        await this.fetchProducts(this.state.currentPage);
    }

    componentWillUnmount() {
        // Clean up the reaction when the component unmounts
        this.disposer();
    }

    private fetchProducts = async (page: number) => {
        const filter = DataFilterStores.getFilter();

        this.setState({ loading: true });

        try {
            const products: IProductPagination = await getProducts(page, '', filter, '', '', 'title', 'asc');

            this.setState({
                products: products.products,
                currentPage: products.currentPage,
                pageSize: products.pageSize,
                total: products.total,
                loading: false,
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
                            {products.map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={total}
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
