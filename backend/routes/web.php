<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Pdf\PDFExportCategoryController;
use App\Http\Controllers\Pdf\PDFExportProdutController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Pdf\PDFExportUserController;


Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('change-password', [ChangePasswordController::class, 'show'])->name('profile.change-password');
    Route::post('change-password', [ChangePasswordController::class, 'updatePassword'])->name('profile.update.password');

    Route::get('users', [UserController::class, 'show'])->name('users.index');
    Route::get('users/{user}', [UserController::class, 'edit'])->name('users.edit');
    Route::post('users/{user}', [UserController::class, 'update'])->name('users.update');

    Route::get('products', [ProductController::class, 'show'])->name('product.index');
    Route::get('products/{product}', [ProductController::class, 'edit'])->name('product.edit');
    Route::post('products/{product}', [ProductController::class, 'update'])->name('product.update');

    Route::get('categories', [CategoryController::class, 'show'])->name('category.index');
    Route::get('categories/{category}', [CategoryController::class, 'edit'])->name('category.edit');
    Route::post('categories/{category}', [CategoryController::class, 'update'])->name('category.update');

    Route::get('/export-pdf-users', [PDFExportUserController::class, 'export']);
    Route::get('/export-pdf-categories', [PDFExportCategoryController::class, 'export']);
    Route::get('/export-pdf-products', [PDFExportProdutController::class, 'export']);
});


Auth::routes();
Route::get('/home', [HomeController::class, 'index'])->name('home');


Route::get('/', function () {
    return redirect()->route('home');
});