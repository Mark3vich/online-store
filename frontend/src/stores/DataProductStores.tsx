import { makeAutoObservable, observable, action } from "mobx";
import IProduct from "../interfaces/IProduct";

class DataProductStores {
    @observable products: IProduct[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    @action
    setProducts(products: IProduct[]) {
        this.products = products;
    }

    @action
    getProducts() {
        return this.products;
    }
}

export default new DataProductStores();