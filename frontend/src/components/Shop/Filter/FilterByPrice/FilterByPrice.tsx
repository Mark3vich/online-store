import React from 'react';
import { Slider, Button } from 'antd';
import DataFilterStores from '../../../../stores/DataFilterStores';

interface FilterByPriceState {
    priceRange: [number, number];
}

class FilterByPrice extends React.Component<{}, FilterByPriceState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            priceRange: [1, 10000],
        };
    }

    onPriceChange = (value: number[]) => {
        this.setState({ priceRange: [value[0], value[1]] });
    };

    onApplyFilter = () => {
        const { priceRange } = this.state;
        DataFilterStores.setPriceFilter(priceRange); // Set min and max price in the store
    };

    render() {
        const { priceRange } = this.state;
        return (
            <div className="filter-block">
                <h3>FILTER BY PRICE</h3>
                <p>${priceRange[0]} — ${priceRange[1]}</p>
                <Slider
                    range
                    min={1}
                    max={10000}
                    value={priceRange}
                    onChange={this.onPriceChange}
                    trackStyle={[{ backgroundColor: '#007bff', height: 6 }]}
                    handleStyle={[{ borderColor: '#007bff', backgroundColor: '#fff' }]}
                />
                <Button type="primary" onClick={this.onApplyFilter} style={{ marginTop: '10px' }}>
                    Apply
                </Button>
            </div>
        );
    }
}

export default FilterByPrice;
