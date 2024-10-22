import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

class FilterSearching extends React.Component {
    render() {
        return (
            <div className="filter-block">
                <Search
                    placeholder="Search..."
                    enterButton="SEARCH"
                    size="large"
                    onSearch={(value) => console.log(value)}
                    style={{ width: '100%' }}
                />
            </div>
        );
    }
}

export default FilterSearching;