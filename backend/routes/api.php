<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{UserController, CategoryController, ProductController, CartController, JWTAuthController, ReviewsController, PaymentController, LikeController};

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::post('check_token', [JWTAuthController::class, 'checkToken']);
Route::post('refresh', [JWTAuthController::class, 'refresh']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [JWTAuthController::class, 'logout']);
    Route::post('user', [UserController::class, 'learn_user']);
    Route::post('create_payment_intent', [PaymentController::class, 'createPaymentIntent']);
    Route::get('like', [LikeController::class, 'index']);
    Route::post('like/{product_id}', [LikeController::class, 'store']);
    Route::put('cart', [CartController::class, 'store']);
    Route::get('cart', [CartController::class, 'show']);
    Route::post('review/{id}', [ReviewsController::class, 'store']);
    Route::put('review/{id}', [ReviewsController::class, 'update']);
    Route::delete('review/{id}', [ReviewsController::class, 'destroy']);
});

Route::get('reviews/{id}', [ReviewsController::class, 'show']);
Route::get('reviews/rating/{id}', [ReviewsController::class, 'getRatingProduct']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('categories_all', [CategoryController::class, 'getAllCategoriesWithProducts']);