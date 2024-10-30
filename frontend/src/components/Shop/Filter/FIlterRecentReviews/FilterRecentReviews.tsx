import React from 'react';
import Product from '../../../Home/Product/Product';
import IProduct from '../../../../interfaces/IProduct';

class FilterRecentReviews extends React.Component {
    render() {
        const recentProducts: IProduct[] = [
            {
                id: 1,
                title: 'Pulse-Pre-Workout',
                description: "31g of Whey Protein with Amino. Whey Protein Blends combines multiple...",
                image: '../../../assets/day1.webp',
                price: '44.00',
                discount: 10,
                category: 'Supplements'
            },
            {
                id: 2,
                title: 'INSTANT-OATS-POWDER',
                description: "27g of Whey Protein with Amino. Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout.",
                image: '../../../assets/day2.webp',
                price: '54.00',
                discount: 15,
                category: 'Supplements'
            },
            {
                id: 3,
                title: 'MASS-TECH-PERFORMANCE',
                description: "Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout. Our nutrition store offers great choice of different nutrition supplements.",
                image: '../../../assets/day3.webp',
                price: '21.00 – 43.00',
                discount: 5,
                category: 'Supplements'
            }
        ];
        return (
            <div className="filter-block">
                <h3>RECENT REVIEWS</h3>
                <div className='d-flex'>
                {recentProducts.map(product => (
                        <Product
                            width="425px"
                            padding="60px"
                            border={true}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default FilterRecentReviews;