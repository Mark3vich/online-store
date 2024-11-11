<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Illuminate\Support\Facades\Auth;


class JWTAuthService
{

    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $data['role_id'] = 2;

        if (isset($data['image'])) {
            $imagePath = $data['image']->store('avatars', 'public');
            $data['image'] = $imagePath;
        }

        $user = User::create($data);
        $user->cart()->create();
        $token = JWTAuth::fromUser($user);
        return compact('user', 'token');
    }

    public function login(array $credentials)
    {
        if (!$token = JWTAuth::attempt($credentials)) {
            return [
                'error' => 'Invalid credentials',
                'status' => 401,
            ];
        }

        $user = Auth::user();

        return [
            'user' => $user,
            'token' => $token,
            'status' => 200,
        ];
    }

    /**
     * Проверка валидности токена.
     * @return bool
     */
    public function checkTokenValidity()
    {
        try {
            // Проверяем, существует ли пользователь по токену
            if (JWTAuth::parseToken()->authenticate()) {
                return true;
            }
            return false;
        } catch (TokenExpiredException $e) {
            return false;
        } catch (TokenInvalidException $e) {
            return false;
        } catch (JWTException $e) {
            return false;
        }
    }


    /**
     * Обновление (refresh) истекшего токена.
     * @return array
     */
    public function refreshToken()
    {
        try {
            // Проверяем, есть ли токен в запросе
            if (!JWTAuth::getToken()) {
                return ['error' => 'Token is absent'];
            }

            // Обновляем токен, даже если он истек, но находится в пределах refresh window
            $newToken = JWTAuth::parseToken()->refresh();
            return ['token' => $newToken];
        } catch (TokenExpiredException $e) {
            return ['error' => 'Token has expired, but can be refreshed'];
        } catch (TokenInvalidException $e) {
            return ['error' => 'Token is invalid'];
        } catch (JWTException $e) {
            return ['error' => 'Token refresh failed'];
        }
    }

    public function logout()
    {
        try {
            $token = JWTAuth::getToken();

            if (!$token) {
                return ['error' => 'Token not provided'];
            }

            JWTAuth::invalidate($token);

            return ['message' => 'Successfully logged out'];
        } catch (JWTException $e) {
            return ['error' => 'Could not log out, please try again.', 'code' => $e->getCode()];
        }
    }
}