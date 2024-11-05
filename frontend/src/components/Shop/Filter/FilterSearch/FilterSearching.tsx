import React from 'react';
import { Input } from 'antd';
import DataFilterStores from '../../../../stores/DataFilterStores';

const { Search } = Input;

class FilterSearching extends React.Component {
    render() {
        return (
            <div className="filter-block">
                <Search
                    placeholder="Search..."
                    enterButton="SEARCH"
                    size="large"
                    onSearch={(value) => DataFilterStores.setFilter(value)}
                    style={{ width: '100%' }}
                />
            </div>
        );
    }
}

export default FilterSearching;