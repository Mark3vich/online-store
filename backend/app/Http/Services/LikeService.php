<?php

namespace App\Http\Services;

use App\Models\Like;
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

        // 2. Получение всех лайков пользователя для всех продуктов
        $likes = Like::where('user_id', $user->id)->get();

        // 3. Возвращаем коллекцию лайков
        return $likes;
    }

    public function createLike(string $token, int $product_id)
    {
        // 1. Аутентификация пользователя
        $authService = new AuthService();
        $user = $authService->authenticate($token);

        // Если пользователь не найден, выбрасываем исключение
        if (!$user) {
            throw new AuthorizationException('Invalid token or user not found');
        }

        // 2. Проверка, поставил ли пользователь лайк на этот продукт
        $existingLike = Like::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->first();

        if ($existingLike) {
            // Если лайк уже существует, то удаляем его (можно поменять логику на обновление)
            $existingLike->delete();
            return response()->json(['message' => 'Like removed'], 200);
        }

        // 3. Если лайка нет, создаём новый
        $like = new Like();
        $like->user_id = $user->id;
        $like->product_id = $product_id;
        $like->save();

        return response()->json(['message' => 'Like created'], 201);
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
