import React from 'react';
import FilterByPrice from './FilterByPrice/FilterByPrice';
import FilterCategories from './FilterCatagories/FilterCategories';
import FilterSearching from './FilterSearch/FilterSearching';
import FilterRecentReviews from './FIlterRecentReviews/FilterRecentReviews';

class Filter extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-start min-vh-100 w-25">
                    <div className='filter-sidebar'>
                        <FilterByPrice />
                        <FilterCategories />
                        <FilterSearching />
                        {/* <FilterRecentReviews /> */}
                    </div>
            </div>        
        );
    }
}

export default Filter;