import React from 'react';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';

import Pagination from 'antd/lib/pagination';

import Product from '../../Home/Product/Product';
import IProduct from '../../../interfaces/IProduct';
import { getProducts } from '../../../services/ProductsService';
import DataFilterStores from '../../../stores/DataFilterStores';
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

        // Create a reaction to listen for changes in the filter and price range
        this.disposer = reaction(
            () => ({
                filter: DataFilterStores.filter,
                priceRange: DataFilterStores.getPriceFilter(),
                category: DataFilterStores.category,
                sort_by: DataFilterStores.sort_by,
                order: DataFilterStores.order,
            }),
            () => {
                this.fetchProducts(1); // Reset to page 1 on filter or price change
            }
        );
    }

    async componentDidMount() {
        await this.fetchProducts(this.state.currentPage);
    }

    componentWillUnmount() {
        this.disposer();
    }

    private fetchProducts = async (page: number) => {
        const filter = DataFilterStores.getFilter();
        const [min_price, max_price] = DataFilterStores.getPriceFilter();
        const category = DataFilterStores.getCategory();
        const sort_by = DataFilterStores.getSortBy();
        const order = DataFilterStores.getOrder();
        
        this.setState({ loading: true });

        try {
            const products: IProductPagination = await getProducts(page, category, filter, min_price.toString(), max_price.toString(), sort_by, order);

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
