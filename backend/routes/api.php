<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{UserController, CategoryController, ProductController};

Route::apiResource('users', UserController::class);
Route::apiResource('categories', CategoryController::class);
Route::get('categories_products', [CategoryController::class, 'getAllCategoriesWithProducts']);
Route::apiResource('products', ProductController::class);