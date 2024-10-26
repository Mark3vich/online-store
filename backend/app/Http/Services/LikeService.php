<?php

namespace App\Http\Services;

use App\Models\Like;
use Illuminate\Database\Eloquent\Collection;

class LikeService
{
    /**
     * Получить все лайки пользователя.
     */
    public function getAllLikesUser(int $userId): Collection
    {
        return Like::where('user_id', $userId)->get();
    }

    /**
     * Создать новый лайк для пользователя.
     */
    public function createLike(array $data): Like
    {
        return Like::create($data);
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
