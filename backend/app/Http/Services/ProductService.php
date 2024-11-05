<?php

namespace App\Http\Services;

use App\Filters\ProductFilter;
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
        $filters = new ProductFilter($request->all());

        $query = Product::filter($filters)
            ->with('category:id,title')
            ->select('id', 'title', 'description', 'image', 'price', 'discount', 'category_id')
            ->paginate(9);

        $query->getCollection()->transform(function ($product) {
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

        return $query;
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