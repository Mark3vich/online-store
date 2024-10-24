import React from 'react';
import { Checkbox, message } from 'antd';
import './FilterCategories.css';
import ICategory from '../../../../interfaces/ICategory';
import { getCategories } from '../../../../services/CategoriesService';

interface FilterCategoriesState {
    categories: { label: string; value: string }[];
}

class FilterCategories extends React.Component<{}, FilterCategoriesState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            categories: [], // Изначально категории пустые
        };
    }

    async componentDidMount() {
        try {
            const categories: ICategory[] = await getCategories(); // Вызов сервиса
            // Обновление состояния с полученными категориями
            this.setState({
                categories: categories.map((category: ICategory) => ({
                    label: category.title, // Отображаемое название категории
                    value: String(category.id),
                })),
            });
        } catch (error) {
            message.error('Failed to load categories'); // Обработка ошибки
            console.error('Error fetching categories:', error);
        }
    }

    render(): React.ReactNode {
        const { categories } = this.state;
        return (
            <div className="filter-block">
                <h3>PRODUCT CATEGORIES</h3>
                {categories.length > 0 ? (
                    <Checkbox.Group options={categories} className="category-checkbox-group" />
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        );
    }
}

export default FilterCategories;