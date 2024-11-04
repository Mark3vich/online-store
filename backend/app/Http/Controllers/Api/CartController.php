<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cart)
    {
        $this->cartService = $cart;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CartRequest $request)
    {
        $validatedData = $request->validated();
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }

        try {
            $cart = $this->cartService->updateOrCreateCartItemsForUser($validatedData, $token);
            return response()->json($cart, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, CartService $cartService)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }
        try {
            $cart = $cartService->getCartItemsUser($token);
            return response()->json($cart);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }
}
