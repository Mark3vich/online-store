<?php

namespace App\Http\Controllers\Api;


use App\Http\Services\UserService;
use App\Http\Controllers\Api\JWTAuthController;
use Illuminate\Http\Request;
class UserController extends JWTAuthController
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function learn_user(Request $request)
    {
        // Извлекаем токен из заголовка
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token is missing'], 401);
        }

        $user = $this->userService->getUser($token);

        // Если пользователь не найден, возвращаем ошибку
        if (!$user) {
            return response()->json(['error' => 'User not found or invalid token'], 404);
        }

        return response()->json($user, 200);
    }
}
