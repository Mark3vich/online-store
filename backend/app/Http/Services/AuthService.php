<?php 

namespace App\Http\Services;

use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function authenticate(string $token)
    {
        JWTAuth::setToken($token);
        $user = JWTAuth::authenticate();

        if (!$user) {
            throw new Exception('Пользователь с указанным токеном не найден.');
        }

        return $user;
    }
}
