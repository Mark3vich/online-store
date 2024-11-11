<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Services\JWTAuthService;
use App\Http\Services\UserService;
use Illuminate\Validation\ValidationException;

class JWTAuthController extends Controller
{
    protected $jwtAuthService;
    protected $userService;

    public function __construct(JWTAuthService $jwtAuthService, UserService $userService)
    {
        $this->jwtAuthService = $jwtAuthService;
        $this->userService = $userService;
    }

    /**
     * Register a new user
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function register(UserRequest $request)
    {
        $registerResponse = $this->jwtAuthService->register($request->validated());
        return response()->json($registerResponse, 201);
    }

    /**
     * Login user
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function login(UserRequest $request)
    {
        $loginResponse = $this->jwtAuthService->login($request->only('email', 'password'));
        return response()->json($loginResponse, $loginResponse['status']);
    }

    /**
     * Проверка токена
     */
    public function checkToken()
    {
        $isValid = $this->jwtAuthService->checkTokenValidity();
        return response()->json(['valid' => $isValid]);
    }

    public function refresh()
    {
        $response = $this->jwtAuthService->refreshToken();

        // Если произошла ошибка, возвращаем статус 401
        if (isset($response['error'])) {
            return response()->json($response, 401);
        }

        return response()->json($response);
    }


    /**
     * Logout user
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $response = $this->jwtAuthService->logout();
        return response()->json($response);
    }
}
