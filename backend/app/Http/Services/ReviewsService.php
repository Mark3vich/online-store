<?php

namespace App\Http\Services;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class ReviewsService
{
    public function addReviews(array $request, string $token, string $id): Collection
    {
        $authService = new AuthService();
        $user = $authService->authenticate($token);

        // Проверка, существует ли товар с переданным id
        $product = Product::find((int) $id);
        if (!$product) {
            throw ValidationException::withMessages(['product_id' => 'Product does not exist']);
        }

        Review::create([
            'user_id' => $user->id,
            'product_id' => (int) $id,
            'review' => $request['review'],
            'rating' => $request['rating'],
        ]);

        return Review::where('product_id', (int) $id)->get();
    }

    public function getReviewsProduct(string $id): Collection
    {
        return Review::where('product_id', $id)->get();
    }

    public function getRatingProduct(string $productId)
    {
        // Вычисляем средний рейтинг для продукта
        $averageRating = Review::where('product_id', $productId)
            ->avg('rating');

        // Если отзывов нет, возвращаем 0
        return $averageRating ?? 0.0;
    }

    public function updateReview(array $request, string $token, string $productId): array
    {
        // Аутентифицируем пользователя по токену
        $authService = new AuthService();
        $user = $authService->authenticate($token);

        // Находим отзыв по ID товара и ID отзыва
        $review = Review::where('product_id', $productId)
            ->where('id', $request['review_id'])
            ->where('user_id', $user->id)
            ->first();

        // Проверяем, существует ли отзыв и принадлежит ли он пользователю
        if (!$review) {
            throw new \Exception('Review not found or unauthorized', 403);
        }

        // Обновляем отзыв
        $review->update([
            'review' => $request['review'] ?? $review->review,
            'rating' => $request['rating'] ?? $review->rating,
        ]);

        // Возвращаем обновленный отзыв в виде коллекции
        return ['new review' => $review];
    }
    public function deleteReview(string $productId, string $reviewId, string $token): bool
    {
        // Аутентифицируем пользователя по токену
        $authService = new AuthService();
        $user = $authService->authenticate($token);

        // Находим отзыв по ID товара и ID отзыва
        $review = Review::where('product_id', $productId)
            ->where('id', $reviewId)
            ->where('user_id', $user->id)
            ->first();

        // Проверяем, существует ли отзыв и принадлежит ли он пользователю
        if (!$review) {
            throw new \Exception('Review not found or unauthorized', 403);
        }

        // Удаляем отзыв
        return $review->delete();
    }

}