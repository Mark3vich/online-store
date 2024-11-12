<?php

namespace App\Http\Controllers\Api;


use App\Http\Services\UserService;
use App\Http\Controllers\Api\JWTAuthController;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends JWTAuthController
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function learn_user()
    {
        try {
            // Получаем пользователя из токена
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json($user, 200);
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token is missing'], 401);
        }
    }
}
