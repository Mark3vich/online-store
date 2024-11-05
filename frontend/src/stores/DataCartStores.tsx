import { action, computed, makeAutoObservable, observable } from "mobx";

import IProduct from "../interfaces/IProduct";
import ICartItem from "../interfaces/ICartItem";
import { addCartItems, getCartItems } from "../services/CartService";

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

    @action
    public async fetchCartProducts() {
        const token = localStorage.getItem("token") || "";
        try {
            const cartItems = await getCartItems(token);
            this.cart = cartItems.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
                price: item.price,
                discount: item.discount,
                category: item.category,
                quantity_items_cart: item.quantity_items_cart
            })); 
        } catch (error) {
            console.error("Error fetching cart products:", error);
        }
        return this.cart.slice();
    }

    @computed
    public getCartProducts(): IProduct[] {
        return this.cart.slice();
    }
}

export default new DataCartStores()