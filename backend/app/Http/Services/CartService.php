<?php

namespace App\Http\Services;

use App\Models\Cart;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

class CartService {

    // Получение всех элементов корзины конкретного пользователя
    public function getCartItemsUser(int $userId): Collection {
        if ($userId !== Auth::id()) {
            throw new AuthorizationException("You are not authorized to view another user's cart.");
        }
        return Cart::where('user_id', $userId)->get();
    }

    // Создание нового элемента корзины для пользователя
    public function createCartItemsUser(array $cartData, int $userId): Cart {
        // Вставка user_id в данные корзины
        $cartData['user_id'] = $userId;
        
        // Создание записи в базе данных и возврат созданного элемента
        return Cart::create($cartData);
    }

    // Удаление всех элементов корзины пользователя
    public function deleteCartItemsUser(int $userId): bool {
        return Cart::where('user_id', $userId)->delete() > 0;
    }
}
