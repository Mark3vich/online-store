import React from 'react';
import Product from '../../Home/Product/Product';
import { Pagination } from 'antd';

interface ProductListProps { }

interface ProductListState {
    currentPage: number;
    pageSize: number;
}

class Products extends React.Component<ProductListProps, ProductListState> {
    constructor(props: ProductListProps) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 9, // 9 products per page
        };
    }

    handlePageChange = (page: number) => {
        this.setState({ currentPage: page });
    };

    render() {
        const products = [
            { width: '320px', padding: '30px', border: false, alt: 'Whey Protein', image: '../../../assets/day1.webp', title: 'Pulse-Pre-Workout', description: '31g of Whey Protein with Amino...', price: '44.00' },
            { width: '320px', padding: '30px', border: false, alt: 'Whey Protein 2', image: '../../../assets/day2.webp', title: 'INSTANT-OATS-POWDER', description: '27g of Whey Protein with Amino...', price: '54.00' },
            { width: '320px', padding: '30px', border: false, alt: 'Whey Protein 3', image: '../../../assets/day3.webp', title: 'MASS-TECH-PERFORMANCE', description: 'Whey Protein Blends combines multiple...', price: '21.00 – $43.00' },
            { width: '320px', padding: '30px', border: false, alt: 'Whey Protein 4', image: '../../../assets/day2.webp', title: 'INSTANT-OATS-POWDER', description: '27g of Whey Protein with Amino...', price: '54.00' },
            // Add more products as needed (for demo, you will need at least 10+)
        ];

        const { currentPage, pageSize } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

        return (
            <div>
                <div className='product-grid mt-3'>
                    {paginatedProducts.map((product, index) => (
                        <Product key={index} {...product} />
                    ))}
                </div>

                {/* Pagination Component */}
                <Pagination
                    current={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    total={products.length} // Total number of products
                    onChange={this.handlePageChange}
                    className='mt-4 mb-5 text-center d-flex justify-content-center' 
                />
            </div>
        );
    }
}

export default Products;