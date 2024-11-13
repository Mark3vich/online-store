<?php

namespace App\Http\Services;

use App\Models\Like;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Auth\Access\AuthorizationException;

class LikeService
{
    /**
     * Получить все лайки пользователя.
     */
    public function getAllLikesUser(string $token): Collection
    {
        // 1. Аутентификация пользователя
        $authService = new AuthService();
        $user = $authService->authenticate($token);

        // Если пользователь не найден, выбрасываем исключение
        if (!$user) {
            throw new AuthorizationException('Invalid token or user not found');
        }

        // 2. Получение всех продуктов, которые пользователь лайкнул
        $likes = Like::where('user_id', $user->id)
            ->with('product') // Загружаем связанную модель Product
            ->get();

        // 3. Извлекаем продукты из лайков и возвращаем как Eloquent\Collection
        $likedProducts = $likes->map(function ($like) {
            return $like->product;
        })->filter(); // Убираем возможные null значения

        return new Collection($likedProducts);
    }

    public function toggleLike(string $token, int $product_id)
    {
        // Аутентификация пользователя
        $authService = new AuthService();
        $user = $authService->authenticate($token);

        if (!$user) {
            throw new AuthorizationException('Invalid token or user not found');
        }

        // Поиск существующего лайка
        $existingLike = Like::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->first();

        if ($existingLike) {
            // Удаление лайка
            $existingLike->delete();
            return [
                'status' => 'removed',
                'product' => Product::find($product_id)
            ];
        }

        // Добавление лайка
        $like = new Like();
        $like->user_id = $user->id;
        $like->product_id = $product_id;
        $like->save();

        // Возвращаем продукт
        $product = Product::find($product_id);

        return [
            'status' => 'added',
            'product' => $product
        ];
    }


    /**
     * Удалить лайк по ID.
     */
    public function deleteLike(int $likeId): bool
    {
        $like = Like::find($likeId);

        if ($like) {
            return $like->delete();
        }

        return false;
    }
}
