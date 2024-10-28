<?php

namespace App\Http\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartService
{
    // Получение всех элементов корзины конкретного пользователя
    public function getCartItemsUser(int $userId): Collection
    {
        if ($userId !== Auth::id()) {
            throw new AuthorizationException("You are not authorized to view another user's cart.");
        }
        return Cart::where('user_id', $userId)->get();
    }

    // Создание нового элемента корзины для пользователя
    public function createCartItemsUser(array $cartData, string $token): CartItem
    {
        try {
            // Аутентификация пользователя по токену
            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();

            if (!$user) {
                throw new Exception('Пользователь с указанным токеном не найден.');
            }

            // Находим корзину, связанную с этим пользователем
            $cart = Cart::where('user_id', $user->id)->first();
            if (!$cart) {
                throw new Exception('Корзина для пользователя не найдена.');
            }

            // Автоматически устанавливаем `cart_id` в данных корзины
            $cartData['cart_id'] = $cart->id;

            // Проверка существования продукта
            $product = Product::find($cartData['product_id']);
            if (!$product) {
                throw new Exception('Указанный продукт не найден.');
            }

            // Создание записи в таблице `cart_items` с `cart_id`
            return DB::transaction(function () use ($cartData) {
                return CartItem::create([
                    'cart_id' => $cartData['cart_id'],
                    'product_id' => $cartData['product_id'],
                    'quantity' => $cartData['quantity'] ?? 1,
                ]);
            });

        } catch (Exception $e) {
            // Обработка ошибок
            throw new Exception('Ошибка при создании элемента корзины: ' . $e->getMessage());
        }
    }


    // Удаление всех элементов корзины пользователя
    public function deleteCartItemsUser(int $userId): bool
    {
        return Cart::where('user_id', $userId)->delete() > 0;
    }
}
