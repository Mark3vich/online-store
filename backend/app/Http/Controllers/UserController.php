<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }
    // Страница редактирования пользователя
    public function edit(User $user)
    {
        return view('users.edit', compact('user')); // Возвращаем представление с данными конкретного пользователя
    }

    // Обновление данных пользователя
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($validated); // Обновляем данные пользователя
        return redirect()->route('users.index')->with('success', 'User updated successfully!');
    }
}
