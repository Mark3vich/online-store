<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\UserController;

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('change-password', [ChangePasswordController::class, 'show'])->name('profile.change-password');
    Route::post('change-password', [ChangePasswordController::class, 'updatePassword'])->name('profile.update.password');

    Route::get('users', [UserController::class, 'show'])->name('users.index');
    Route::get('users/{user}', [UserController::class, 'edit'])->name('users.edit');
    Route::post('users/{user}', [UserController::class, 'update'])->name('users.update');

    Route::get('product', [ProductController::class, 'show'])->name('product.index');
    Route::get('product/{product}', [ProductController::class, 'edit'])->name('product.edit');
    Route::post('product', [ProductController::class, 'update'])->name('product.update');

    Route::get('category', [ProductController::class, 'show'])->name('category.index');
    Route::get('category/{category}', [ProductController::class, 'edit'])->name('category.edit');
    Route::post('category', [ProductController::class, 'update'])->name('category.update');
});


Auth::routes();
Route::get('/home', [HomeController::class, 'index'])->name('home');


Route::get('/', function () {
    return redirect()->route('home');
});