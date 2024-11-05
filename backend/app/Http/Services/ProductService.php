<?php

namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ProductService
{
    /**
     * Get all users
     *
     * @return LengthAwarePaginator
     */
    public function getAllProducts(Request $request): LengthAwarePaginator
    {
        $query = Product::with('category:id,title')
            ->select('id', 'title', 'description', 'image', 'price', 'discount', 'category_id');

        // Filter by category if category_id is provided
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by minimum price if min_price is provided
        if ($request->filled('min_price') && is_numeric($request->min_price)) {
            $query->where('price', '>=', (float) $request->min_price);
        }

        // Filter by maximum price if max_price or max is provided
        $maxPrice = $request->input('max_price', $request->input('max'));
        if (!is_null($maxPrice) && is_numeric($maxPrice)) {
            $query->where('price', '<=', (float) $maxPrice);
        }

        // Paginate results
        $products = $query->paginate(9);

        // Transform the result to include only required fields
        $products->getCollection()->transform(function ($product) {
            return [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'image' => $product->image,
                'price' => $product->price,
                'discount' => $product->discount,
                'category' => optional($product->category)->title,
            ];
        });

        return $products;
    }


    /**
     * Get user by id
     *
     * @param string $id
     * @return array
     */
    public function getProductById(int $id): array
    {
        $product = Product::with('category:id,title')
            ->select('id', 'title', 'description', 'image', 'price', 'discount', 'category_id')
            ->findOrFail($id);

        return [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'image' => $product->image,
            'price' => $product->price,
            'discount' => $product->discount,
            'category' => $product->category->title ?? null,
        ];
    }
}