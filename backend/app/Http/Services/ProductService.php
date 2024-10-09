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
}