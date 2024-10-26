<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{UserController, CategoryController, ProductController, CartController};

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::post('cart', [CartController::class, 'store']);
    Route::get('cart', [CartController::class, 'show']);
});

Route::get('products', [ProductController::class, 'index']);
Route::get('categories_all', [CategoryController::class, 'getAllCategoriesWithProducts']);