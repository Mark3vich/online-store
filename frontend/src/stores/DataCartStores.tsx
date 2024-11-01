import { makeAutoObservable, observable, action, computed } from "mobx";
import ICartItem from "../interfaces/ICartItem";
import IProduct from "../interfaces/IProduct";

class DataCartStores {
    @observable cart: IProduct[] = [];
    @observable cartItems: ICartItem[] = [];
    @observable totalPrice: number = 0;
    @observable totalQuantity: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    public addCartProduct(product: IProduct | undefined) {
        if (!product) return;
        this.cart.push(product);
    }

    @computed
    public getCartProducts(): IProduct[] {
        return this.cart.slice();
    }

    @action
    public setTotalPrice(totalPrice: number) {
        this.totalPrice = totalPrice;
    }

    @action
    public setTotalQuantity(totalQuantity: number) {
        this.totalQuantity = totalQuantity;
    }

    @action
    public clearCart() {
        this.cartItems = [];
        this.totalPrice = 0;
        this.totalQuantity = 0;
    }

    @action
    public addCartItem(cartItem: ICartItem) {
        this.cartItems.push(cartItem);
    }

    @action
    public removeCartItem(productId: number) {
        this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
    }

    @action
    public updateCartItemQuantity(productId: number, quantity: number) {
        const cartItem = this.cartItems.find(item => item.product_id === productId);
        if (cartItem) {
            cartItem.quantity_items_cart = quantity;
        }
    }

    @action
    public calculateTotalPrice() {

    }

    @action
    public calculateTotalQuantity() {
        this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity_items_cart, 0);
    }

    @action
    public calculateTotalPriceAndQuantity() {
        this.calculateTotalPrice();
        this.calculateTotalQuantity();
    }

    @action
    public getCartItems(): ICartItem[] {
        return this.cartItems;
    }

    @action
    public getTotalPrice(): number {
        return this.totalPrice;
    }

    @action
    public getTotalQuantity(): number {
        return this.totalQuantity;
    }
}

export default new DataCartStores()