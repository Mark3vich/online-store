import { makeObservable, observable, action } from 'mobx';

class DataFilterStores {
    public filter = '';
    public min_price = '';
    public max_price = '';
    public category = '';
    public sort_by = 'price';
    public order = 'asc';

    constructor() {
        makeObservable(this, {
            filter: observable,
            min_price: observable,
            max_price: observable,
            category: observable,
            sort_by: observable,
            order: observable,
            setFilter: action,
            setPriceFilter: action,
            setCategory: action,
            setSortBy: action,
            setOrder: action,
        });
    }

    // Sets the search filter value
    setFilter(value: string) {
        this.filter = value;
    }

    // Returns the current search filter value
    getFilter() {
        return this.filter;
    }

    // Sets the price range filter values
    setPriceFilter([min, max]: [number, number]) {
        this.min_price = min.toString();
        this.max_price = max.toString();
    }

    // Gets the current price filter as a tuple
    getPriceFilter(): [string, string] {
        return [this.min_price, this.max_price];
    }

    // Sets the category filter value
    setCategory(value: string) {
        this.category = value;
    }

    // Returns the current category filter value
    getCategory() {
        return this.category;
    }

    // Sets the sort by filter value
    setSortBy(value: string) {
        this.sort_by = value;
    }

    // Returns the current sort by filter value
    getSortBy() {
        return this.sort_by;
    }

    // Sets the order filter value
    setOrder(value: string) {
        this.order = value;
    }

    // Returns the current order filter value
    getOrder() {
        return this.order;
    }
}

export default new DataFilterStores();
