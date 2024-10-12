<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    /**
     * Получаем всех пользователей с отформатированным полем роли
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        // Жадная загрузка пользователей с ролями, выбираем только title из роли
        $users = User::with('role:id,title')
            ->select('id', 'name', 'image', 'email', 'password', 'role_id', 'created_at', 'updated_at')
            ->get();

        // Преобразуем коллекцию, но возвращаем её как Eloquent\Collection
        return new Collection($users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'image' => $user->image,
                'email' => $user->email,
                'password' => $user->password,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'role' => optional($user->role)->title, // Преобразуем поле role в строку с названием роли
            ];
        }));
    }

    /**
     * Create new user
     *
     * @param array $data
     * @return User
     */
    public function createUser(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    /**
     * Get user by id
     *
     * @param int $id
     * @return array
     */
    public function getUserById(int $id): array
    {
        // Жадная загрузка пользователей с ролями, выбираем только title из роли
        $user = User::with('role:id,title')
        ->select('id', 'name', 'image', 'email', 'password', 'role_id', 'created_at', 'updated_at')
        ->findOrFail($id);

        return [
            'id' => $user->id,
            'name' => $user->name,
            'image' => $user->image,
            'email' => $user->email,
            'password' => $user->password,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'role' => optional($user->role)->title
        ];
    }

    /**
     * Update user
     *
     * @param int $id
     * @param array $data
     * @return User
     */
    public function updateUser(int $id, array $data): User
    {
        $user = User::findOrFail($id);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        return $user;
    }

    /**
     * Delete user
     *
     * @param int $id
     */
    public function deleteUser(int $id): void
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}