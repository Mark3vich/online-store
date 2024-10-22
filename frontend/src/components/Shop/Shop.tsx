import React from 'react';
import { Slider, Checkbox, Input } from 'antd';
import "./Shop.css";

const { Search } = Input;

class Shop extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            priceRange: [15, 64],
        };
    }

    onPriceChange = (value: any) => {
        this.setState({ priceRange: value });
    };
    render() {
        const { priceRange }: any = this.state;

        const categories = [
            { label: 'Build Muscle', value: 'build-muscle' },
            { label: 'Improve Workout', value: 'improve-workout' },
            { label: 'Lose Fat', value: 'lose-fat' },
        ];
        return (
            <div className='container'>
                <div className="d-flex justify-content-start min-vh-100 w-25">
                    <div className='filter-sidebar'>
                        <div className="filter-block">
                            <h3>FILTER BY PRICE</h3>
                            <p>${priceRange[0]} — ${priceRange[1]}</p>
                            <Slider
                                range
                                min={15}
                                max={64}
                                defaultValue={priceRange}
                                onChange={this.onPriceChange}
                                trackStyle={[{ backgroundColor: '#007bff', height: 6 }]}
                                handleStyle={[{ borderColor: '#007bff', backgroundColor: '#fff' }]}
                            />
                        </div>

                        {/* Product Categories */}
                        <div className="filter-block">
                            <h3>PRODUCT CATEGORIES</h3>
                            <Checkbox.Group options={categories} />
                        </div>

                        {/* Search Box */}
                        <div className="filter-block">
                            <Search
                                placeholder="Search..."
                                enterButton="SEARCH"
                                size="large"
                                onSearch={(value) => console.log(value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;