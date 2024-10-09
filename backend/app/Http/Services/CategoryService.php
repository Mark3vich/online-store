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
   public function getAllCategories(): Collection
   {
       return Category::all();
   }

   /** Get user by id
    *
    * @param int $id
    * @return Category
    */
   public function getCategoryById(int $id): Category
   {
       return Category::find($id);
   }

   /** Create new user
    *
    * @param array $data
    * @return Category
    */
   public function createCategory(array $data): Category
   {
       return Category::create($data);
   }
   
   /** Update user
    *
    * @param array $data
    * @return Category
    */
   public function updateCategory(array $data, int $id): Category
   {
       // Обновляем категорию
        Category::where('id', $id)->update($data);

        // Возвращаем обновлённую категорию
        return Category::findOrFail($id);
   }

   /** Delete user
    *
    * @param int $id
    * @return void
    */
   public function deleteCategory(int $id): void
   {
       $category = Category::findOrFail($id);
       $category->delete();
   }
}