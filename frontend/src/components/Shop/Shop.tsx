import React from 'react';
import "./Shop.css";
import Filter from './Filter/Filter';

class Shop extends React.Component {
    render() {
        return (
            <div className='container'>
                <Filter />
            </div>
        );
    }
}

export default Shop;