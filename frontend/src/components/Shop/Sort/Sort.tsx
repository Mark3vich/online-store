import React from 'react';
import { Select } from 'antd';
import DataFilterStores from '../../../stores/DataFilterStores';

const { Option } = Select;

class Sort extends React.Component {
    handleChange = (value: string) => {
        DataFilterStores.setOrder(value);
    };
    render(): React.ReactNode {
        return (
            <div className='mt-3'>
                <Select
                    defaultValue="Sort by price: low to high"
                    style={{ width: 290 }}
                    onChange={this.handleChange}
                >
                    <Option value="asc">Sort by price: low to high</Option>
                    <Option value="desc">Sort by price: high to low</Option>
                </Select>
            </div>
        );
    }
}

export default Sort;