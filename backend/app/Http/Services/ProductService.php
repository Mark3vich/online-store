<?php

namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Collection;

class ProductService 
{
    /**
     * Get all users
     *
     * @return Collection
     */
    public function getAllProducts(): Collection
    {
        return Product::all();
    }

    /**
     * Get user by id
     *
     * @param string $id
     * @return Product
     */
    public function getProductById(string $id): Product
    {
        return Product::find($id);
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