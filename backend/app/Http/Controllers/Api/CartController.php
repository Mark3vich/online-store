<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Services\CartService;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cart) {
        $this->cartService = $cart;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CartRequest $request)
    {
        $validatedData = $request->validated();
        $cart = $this->cartService->createCartItemsUser($validatedData, $request->user()->id);
        return response()->json($cart, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $cart = $this->cartService->getCartItemsUser($id);
        return response()->json($cart);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
    }
}
