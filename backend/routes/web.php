<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChangePasswordController;

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('change-password', [ChangePasswordController::class, 'show'])->name('profile.change-password');
    Route::post('change-password', [ChangePasswordController::class, 'updatePassword'])->name('profile.update.password');
});


Auth::routes();
Route::get('/', [HomeController::class, 'index'])->name('home');
