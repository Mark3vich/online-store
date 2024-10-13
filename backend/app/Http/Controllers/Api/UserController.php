<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Services\UserService;
use App\Http\Services\JWTAuthService;
use App\Http\Controllers\Api\JWTAuthController;

class UserController extends JWTAuthController
{
    protected $userService;

    public function __construct(UserService $userService, JWTAuthService $jwtAuthService)
    {
        parent::__construct($jwtAuthService);
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->getAllUsers();
        
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validatedData = $request->validated();

        $user = $this->userService->createUser($validatedData);

        return response()->json($user, 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userService->getUserById($id);
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $validatedData = $request->validated();
        
        $user = $this->userService->updateUser($id, $validatedData);

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->userService->deleteUser($id);  
        return response()->json(null, 204);
    }
}
