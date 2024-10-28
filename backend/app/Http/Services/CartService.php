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
    public function createCartItemsUser(array $cartItemsData, string $token): array
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

            $createdItems = []; // Массив для хранения созданных элементов

            // Транзакция для добавления всех элементов корзины
            DB::transaction(function () use ($cartItemsData, $cart, &$createdItems) {
                foreach ($cartItemsData as $itemData) {
                    // Проверка, что `product_id` существует
                    $product = Product::find($itemData['product_id']);
                    if (!$product) {
                        throw new Exception("Продукт с ID {$itemData['product_id']} не найден.");
                    }

                    // Создание элемента корзины
                    $createdItems[] = CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $itemData['product_id'],
                        'quantity' => $itemData['quantity'] ?? 1,
                        'status' => $itemData['status'] ?? true,
                    ]);
                }
            });

            return $createdItems;

        } catch (Exception $e) {
            throw new Exception('Ошибка при добавлении элементов в корзину: ' . $e->getMessage());
        }
    }

    // Удаление всех элементов корзины пользователя
    public function deleteCartItemsUser(int $userId): bool
    {
        return Cart::where('user_id', $userId)->delete() > 0;
    }
}
