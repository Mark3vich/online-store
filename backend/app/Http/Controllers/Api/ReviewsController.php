<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewsRequest;
use App\Http\Services\ReviewsService;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    protected $reviewsService;

    public function __construct(ReviewsService $reviews)
    {
        $this->reviewsService = $reviews;
    }
    public function getRatingProduct(string $id) {
        $reviews = $this->reviewsService->getRatingProduct($id);
        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewsRequest $request, string $id)
    {
        $reviewsResponse = $request->validated();
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }

        try {
            $reviews = $this->reviewsService->addReviews($reviewsResponse, $token, $id);
            return response()->json($reviews, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reviews = $this->reviewsService->getReviewsProduct($id);
        return response()->json($reviews);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewsRequest $request, string $id)
    {
        $reviewsResponse = $request->validated();
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }

        try {
            $reviews = $this->reviewsService->updateReview($reviewsResponse, $token, $id);
            return response()->json($reviews, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $reviewId = $request->input('review_id');
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['error' => 'Authorization token is missing'], 400);
        }
        try {
            $reviews = $this->reviewsService->deleteReview($id, $reviewId, $token);
            return response()->json($reviews, 200);
        } catch (\Exception $e) {
            return response()->json(['error'=> $e->getMessage()], 400);
        }
    }
}
