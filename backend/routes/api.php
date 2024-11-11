<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{UserController, CategoryController, ProductController, CartController, JWTAuthController, ReviewsController};

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);
Route::post('check_token', [JWTAuthController::class, 'checkToken']);
Route::post('refresh', [JWTAuthController::class, 'refresh']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [JWTAuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);
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