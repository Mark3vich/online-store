<?php

namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    /**
     * Get all users
     *
     * @return LengthAwarePaginator
     */
    public function getAllProducts(): LengthAwarePaginator
    {
        $products = Product::with('category:id,title')
            ->select('id', 'title', 'description', 'image', 'price', 'discount', 'category_id')
            ->paginate(9);

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

    /** 
     * Create new user
     *
     * @param array $data
     * @return Product
     */
    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    /**
     * Update user
     *
     * @param array $data
     * @param string $id    
     * @return Product
     */
    public function updateProduct(array $data, string $id): Product
    {
        $product = $this->getProductById($id);
        $product->update($data);
        return $product;
    }

    /**
     * Delete user
     *
     * @param string $id
     * @return bool true on success
     */
    public function deleteProduct(string $id): bool
    {
        $product = $this->getProductById($id);
        return $product->delete();
    }
}