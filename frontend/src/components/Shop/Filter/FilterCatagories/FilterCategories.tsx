import React from 'react';
import { Checkbox } from 'antd';
import './FilterCategories.css';

class FilterCategories extends React.Component {
    render(): React.ReactNode {
        const categories = [
            { label: 'Build Muscle', value: 'build-muscle' },
            { label: 'Improve Workout', value: 'improve-workout' },
            { label: 'Lose Fat', value: 'lose-fat' },
        ];
        return (
            <div className="filter-block">
                <h3>PRODUCT CATEGORIES</h3>
                <Checkbox.Group options={categories} className="category-checkbox-group" />
            </div>
        );
    }
}

export default FilterCategories;