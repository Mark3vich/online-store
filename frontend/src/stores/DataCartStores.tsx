import { makeAutoObservable, observable, action, computed } from "mobx";
import IProduct from "../interfaces/IProduct";
import { addCartItems } from "../services/CartService";
import ICartItem from "../interfaces/ICartItem";

class DataCartStores {
    @observable public cart: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    private convertProductToCart(product: IProduct[]): ICartItem[] {
        return product.map(item => ({
            product_id: item.id,
            quantity_items_cart: item.quantity_items_cart
        }));
    }

    @action
    public addCartProduct(product: IProduct | undefined) {
        if (!product) return;

        const cartItem = this.cart.find(item => item.id === product.id);

        if (cartItem) {
            // Увеличиваем количество товара и создаем новый массив для this.cart
            cartItem.quantity_items_cart = (cartItem.quantity_items_cart || 1) + 1;
            this.cart = [...this.cart];
        } else {
            // Добавляем новый товар в корзину
            this.cart = [...this.cart, { ...product, quantity_items_cart: 1 }];
        }
        addCartItems(this.convertProductToCart(this.cart), localStorage.getItem("token") || "");
    }

    @action
    public removeCartProduct(id: number) {
        const cartItem = this.cart.find(item => item.id === id);
        if (!cartItem) return; // Если товара нет, выходим

        // Уменьшаем количество товара
        if ((cartItem.quantity_items_cart || 1) > 1) {
            cartItem.quantity_items_cart = (cartItem.quantity_items_cart || 1) - 1;
            this.cart = [...this.cart];
        } else {
            // Если количество равно 1, удаляем товар из корзины
            this.cart = this.cart.filter(item => item.id !== id);
        }
        addCartItems(this.convertProductToCart(this.cart), localStorage.getItem("token") || "");
    }

    @computed
    public getCartProducts(): IProduct[] {
        return this.cart.slice();
    }
}

export default new DataCartStores()