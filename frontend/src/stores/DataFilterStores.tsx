// DataFilterStores.js
import { makeObservable, observable, action } from 'mobx';

class DataFilterStores {
    filter = '';

    constructor() {
        makeObservable(this, {
            filter: observable,
            setFilter: action,
        });
    }

    setFilter(value: string) {
        this.filter = value;
    }

    getFilter() {
        return this.filter;
    }
}

export default new DataFilterStores();
