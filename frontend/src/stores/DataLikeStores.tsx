import { makeObservable, observable, action, runInAction } from 'mobx';
import { getLikes, postLike } from '../services/LikesService';
import IProduct from '../interfaces/IProduct';

class DataLikeStores {
    public likes: IProduct[] = []
    constructor() {
        makeObservable(this, {
            likes: observable,
            addLikeProduct: action,
            fetchLikesProducts: action
        });
    }

    public async fetchLikesProducts() {
        try {
            const likes = await getLikes();
            this.likes = likes.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
                price: item.price,
                discount: item.discount,
                category: item.category
            }));
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
        return this.likes.slice();
    }

    public async addLikeProduct(product: IProduct): Promise<void> {
        if (!product) return;
    
        const token = localStorage.getItem('token') || '';
        if (!token) {
            console.error("Token is missing");
            return;
        }
    
        try {
            // Отправляем запрос на сервер и получаем статус операции
            const { status, product: likedProduct } = await postLike(String(product.id));
    
            runInAction(() => {
                if (status === 'removed') {
                    // Если продукт был удалён
                    this.likes = this.likes.filter((likedProduct) => likedProduct.id !== product.id);
                } else if (status === 'added') {
                    // Если продукт был добавлен
                    this.likes = [...this.likes, likedProduct];
                }
            });
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }

    public getLikes(): IProduct[] {
        return this.likes.slice();
    }
}

export default new DataLikeStores();