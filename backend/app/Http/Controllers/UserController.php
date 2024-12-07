<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache; // Use the Cache facade

class UserController extends Controller
{
    public function show()
    {
        $users = [];
        $userIds = User::pluck('id')->toArray();

        foreach ($userIds as $userId) {
            $user = Cache::remember('user:' . $userId, 60, function () use ($userId) {
                return User::with(['reviews.product'])->find($userId);
            });

            if ($user) {
                $users[] = $user;
            }
        }

        return view('users.index', compact('users'));
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        // Clear the cache for the updated user only
        Cache::forget('user:' . $user->id); // Use Cache::forget()

        return redirect()->route('users.index')->with('success', 'User updated successfully!');
    }
}