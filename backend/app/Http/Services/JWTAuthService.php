<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;


class JWTAuthService {

    public function register(array $data) {
        $data['password'] = Hash::make($data['password']);
        $data['role_id'] = 2;

        if (isset($data['image'])) {
            $imagePath = $data['image']->store('avatars', 'public'); 
            $data['image'] = $imagePath; 
        }

        $user = User::create($data);
        $token = JWTAuth::fromUser($user);
        return compact('user', 'token');
    }    

    public function login(array $credentials) {
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