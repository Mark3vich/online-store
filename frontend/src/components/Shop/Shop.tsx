import React from 'react';
import "./Shop.css";
import Filter from './Filter/Filter';
import Sort from './Sort/Sort';
import Products from './Products/Products';

class Shop extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='d-flex justify-content-start'>
                    <Filter />
                    <div className='w-75'>
                        <Sort />
                        <Products />
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;