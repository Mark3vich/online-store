import React from 'react';
import Product from '../../../Home/Product/Product';

class FilterRecentReviews extends React.Component {
    render() {
        return (
            <div className="filter-block">
                <h3>RECENT REVIEWS</h3>
                <div className='d-flex'>
                    <Product alt='Whey Protein' image='../../../assets/day1.webp' title='Pulse-Pre-Workout' description="31g of Whey Protein with Amino. Whey Protein Blends combines multiple..." price='44.00' />
                    <Product alt="Whey Protein 2" image='../../../assets/day2.webp' title='INSTANT-OATS-POWDER' description="27g of Whey Protein with Amino. Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout." price='54.00' />
                    <Product alt="Whey Protein 3" image='../../../assets/day3.webp' title='MASS-TECH-PERFORMANCE' description="Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout. Our nutrition store offers great choice of different nutrition supplements." price='21.00 – $43.00' />
                </div>
            </div>
        );
    }
}

export default FilterRecentReviews;