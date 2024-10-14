<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProfileRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use App\Models\User;

class ProfileController extends Controller
{
    public function __construct() {
        $this->middleware('auth'); // Проверка авторизации
    }
    /**
     * Show the user profile.
     */
    public function show(): View 
    {
        /** @var User $user */
        $user = Auth::user();
        return view('profile.show', compact('user'));
    }

    /**
     * Update the user profile.
     */
    public function update(ProfileRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();

        // Валидация данных
        $validatedData = $request->validated();

        DB::beginTransaction(); // Начало транзакции
        try {
            // Если есть загруженный файл изображения
            if ($request->hasFile('avatar')) {
                $validatedData['image'] = $this->handleImageUpload($request, $user);
            }

            // Обновление данных пользователя
            $user->update($validatedData);

            DB::commit(); // Подтверждение транзакции

            return redirect()->back()->with('status', __('Profile updated successfully.'));
        } catch (\Exception $e) {
            DB::rollBack(); // Откат транзакции в случае ошибки
            return redirect()->back()->withErrors(['error' => __('An error occurred while updating the profile.')]);
        }
    }

    /**
     * Обработка загрузки изображения.
     * 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return string Путь к загруженному изображению.
     */
    private function handleImageUpload(Request $request, $user): string
    {
        // Сохранение нового изображения
        $avatarPath = $request->file('avatar')->store('avatars', 'public');

        // Удаление старого изображения, если оно есть
        if ($user->image) {
            Storage::disk('public')->delete($user->image);
        }

        return $avatarPath;
    }
}
