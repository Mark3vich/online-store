<?php

namespace App\Http\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Collection;

class CategoryService 
{
    /** Get all users
    *
    * @return Collection
    */
   public function getAllCategorys(): Collection
   {
       return Category::all();
   }
}