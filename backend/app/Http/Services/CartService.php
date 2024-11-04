<?php

namespace App\Http\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Auth\Access\AuthorizationException;

class CartService
{
    // Получение всех элементов корзины конкретного пользователя
    public function getCartItemsUser(string $token): Collection
    {
        try {
            $authService = new AuthService();
            $user = $authService->authenticate($token);
            // Ensure the user has an associated cart
            $cart = $user->cart;

            if (!$cart) {
                // If the user has no cart, return an empty collection
                return collect();
            }

            // Retrieve and return the cart items
            return $cart->cartItems;
        } catch (AuthorizationException $e) {
            throw new AuthorizationException('Необходима авторизация.');
        } catch (Exception $e) {
            // Handle any other exceptions
            throw new Exception('Ошибка при получении товаров корзины: ' . $e->getMessage());
        }
    }

    // Создание нового элемента корзины для пользователя
    public function updateOrCreateCartItemsForUser(array $cartItemsData, string $token): array
    {
        try {
            // Аутентификация пользователя по токену
            $authService = new AuthService();
            $user = $authService->authenticate($token);

            // Проверка на наличие данных для добавления в корзину
            if (empty($cartItemsData) || !is_array($cartItemsData)) {
                throw new Exception('Отсутствуют данные для добавления в корзину.');
            }

            // Убираем дублирующиеся товары по `product_id`, суммируя `quantity` для дубликатов
            $uniqueCartItems = [];
            foreach ($cartItemsData as $itemData) {
                $productId = $itemData['product_id'];
                $quantity = $itemData['quantity'] ?? 1; // Если `quantity` отсутствует, по умолчанию используем 1

                // Если продукт уже в массиве, добавляем его количество
                if (isset($uniqueCartItems[$productId])) {
                    $uniqueCartItems[$productId]['quantity'] += $quantity;
                } else {
                    // Если продукт ещё не добавлен, добавляем его как новый элемент
                    $uniqueCartItems[$productId] = array_merge($itemData, ['quantity' => $quantity]);
                }
            }

            // Преобразуем результат обратно в простой массив
            $uniqueCartItems = array_values($uniqueCartItems);

            // Находим или создаем корзину с новыми полями `quantity` и `status`
            $cart = Cart::firstOrCreate(
                ['user_id' => $user->id],
                ['quantity' => 0, 'status' => false]
            );

            $cart->cartItems()->delete();

            // Находим корзину, связанную с этим пользователем
            $cart = Cart::where('user_id', $user->id)->first();
            if (!$cart) {
                throw new Exception('Корзина для пользователя не найдена.');
            }

            $createdItems = []; // Массив для хранения созданных элементов
            $totalQuantity = 0;
            // Транзакция для добавления всех элементов корзины
            DB::transaction(function () use ($uniqueCartItems, $cart, &$createdItems, &$totalQuantity) {
                foreach ($uniqueCartItems as $itemData) {
                    // Проверка, что `product_id` существует
                    $product = Product::find($itemData['product_id']);
                    if (!$product) {
                        throw new Exception("Продукт с ID {$itemData['product_id']} не найден.");
                    }

                    // Создание элемента корзины
                    $cartItem = CartItem::updateOrCreate(
                        [
                            'cart_id' => $cart->id,
                            'product_id' => $itemData['product_id'],
                        ],
                        [
                            'quantity_items_cart' => $itemData['quantity_items_cart'],
                        ]
                    );

                    $createdItems[] = $cartItem;
                    $totalQuantity += $cartItem->quantity_items_cart;
                }

                $cart->update([
                    'quantity' => $totalQuantity, // Обновляем количество
                    'status' => true, // Здесь можно задать логику для обновления статуса, например, в зависимости от количества товаров
                ]);
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
