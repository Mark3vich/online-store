<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\LikeService;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }

    public function index(Request $request){ 
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }
        try{
            $like = $this->likeService->getAllLikesUser($token);
            return response()->json($like);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
    } 

    public function store(Request $request, string $product_id)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }
        try{
            $like = $this->likeService->toggleLike($token, (int)$product_id);
            return response()->json($like);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
}
