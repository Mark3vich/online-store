import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

class Sort extends React.Component {
    handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    render(): React.ReactNode {
        return (
            <div className='mt-3'>
                <Select
                    defaultValue="Sort by price: low to high"
                    style={{ width: 290 }}
                    onChange={this.handleChange}
                >
                    <Option value="default">Default sorting</Option>
                    <Option value="popularity">Sort by popularity</Option>
                    <Option value="averageRating">Sort by average rating</Option>
                    <Option value="latest">Sort by latest</Option>
                    <Option value="lowToHigh">Sort by price: low to high</Option>
                    <Option value="highToLow">Sort by price: high to low</Option>
                </Select>
            </div>
        );
    }
}

export default Sort;