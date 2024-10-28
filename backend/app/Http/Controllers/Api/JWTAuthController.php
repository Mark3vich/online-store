<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Services\JWTAuthService;
use Illuminate\Validation\ValidationException;

class JWTAuthController extends Controller
{
    protected $jwtAuthService;

    public function __construct(JWTAuthService $jwtAuthService)
    {
        $this->jwtAuthService = $jwtAuthService;
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
        $user = $registerResponse['user']; 

        $user->cart()->create();

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
     * Logout user
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $response = $this->jwtAuthService->logout();
        return response()->json($response);
    }
}
