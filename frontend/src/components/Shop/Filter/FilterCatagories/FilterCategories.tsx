import React from 'react';
import { Checkbox, Button, message } from 'antd';
import './FilterCategories.css';
import ICategory from '../../../../interfaces/ICategory';
import { getCategories } from '../../../../services/CategoriesService';
import DataFilterStores from '../../../../stores/DataFilterStores'; // Import your DataFilterStores

interface FilterCategoriesState {
    categories: { label: string; value: string }[];
    selectedCategory: string | null; // Keep track of the selected category
}

class FilterCategories extends React.Component<{}, FilterCategoriesState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: null, // Initialize selected category as null
        };
    }

    async componentDidMount() {
        try {
            const categories: ICategory[] = await getCategories(); // Call the service to fetch categories
            // Update state with fetched categories
            this.setState({
                categories: categories.map((category: ICategory) => ({
                    label: category.title, // Display name for the category
                    value: String(category.id),
                })),
            });
        } catch (error) {
            message.error('Failed to load categories'); // Handle error
            console.error('Error fetching categories:', error);
        }
    }

    handleCategoryChange = (checkedValues: any) => {
        this.setState({
            selectedCategory: checkedValues.length > 0 ? checkedValues[0] : null, // Allow only one selection
        });
    };

    applyCategoryFilter = () => {
        const { selectedCategory } = this.state;
        if (selectedCategory) {
            DataFilterStores.setCategory(selectedCategory); // Set the selected category in the store
        } 
    };

    render(): React.ReactNode {
        const { categories, selectedCategory } = this.state;

        return (
            <div className="filter-block">
                <h3>PRODUCT CATEGORIES</h3>
                {categories.length > 0 ? (
                    <>
                        <Checkbox.Group
                            options={categories}
                            onChange={this.handleCategoryChange}
                            value={selectedCategory ? [selectedCategory] : []} // Only allow one selected category
                            className="category-checkbox-group"
                        />
                        <Button type="primary" onClick={this.applyCategoryFilter} style={{ marginTop: '10px' }}>
                            Apply Filter
                        </Button>
                    </>
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        );
    }
}

export default FilterCategories;
