<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{UserController, CategoryController, ProductController, CartController, JWTAuthController};

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [JWTAuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::put('cart', [CartController::class, 'store']);
    Route::get('cart', [CartController::class, 'show']);
});

Route::get('products', [ProductController::class, 'index']);
Route::get('categories_all', [CategoryController::class, 'getAllCategoriesWithProducts']);