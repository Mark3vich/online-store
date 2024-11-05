import { makeObservable, observable, action } from 'mobx';

class DataFilterStores {
    filter = '';
    min_price = '';
    max_price = '';

    constructor() {
        makeObservable(this, {
            filter: observable,
            min_price: observable,
            max_price: observable,
            setFilter: action,
            setPriceFilter: action,
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
}

export default new DataFilterStores();
