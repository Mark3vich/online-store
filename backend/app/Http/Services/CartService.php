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
            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();

            if (!$user) {
                // Обработка случая, если пользователь не найден
                throw new Exception('Пользователь с указанным токеном не найден.');
            }

            // Проверка, что `cart_id` существует и принадлежит текущему пользователю
            $cart = Cart::where('id', $cartData['cart_id'])->where('user_id', $user->id)->first();
            if (!$cart) {
                throw new Exception('Указанная корзина не найдена или не принадлежит пользователю.');
            }

            // Проверка, что `product_id` существует в таблице `products`
            $product = Product::find($cartData['product_id']);
            if (!$product) {
                throw new Exception('Указанный продукт не найден.');
            }

            // Добавление `cart_id`, `product_id` и `quantity` в таблицу `cart_items`
            return DB::transaction(function () use ($cartData) {
                return CartItem::create([
                    'cart_id' => $cartData['cart_id'],
                    'product_id' => $cartData['product_id'],
                    'quantity' => $cartData['quantity'] ?? 1, // количество по умолчанию
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
