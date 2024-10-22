import React from 'react';
import { Slider } from 'antd';

class FilterByPrice extends React.Component {
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
        return (
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
        );
    }
}

export default FilterByPrice;