<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Filters\ProductFilter;

class ProductController extends Controller
{
    // Отображение всех продуктов
    public function show(Request $request)
    {
        $categories = Category::all();

        $filters = new ProductFilter($request->all());

        $products = Product::filter($filters)->with(['reviews.user'])->get();

        return view('products.index', compact('products', 'categories'));
    }

    // Страница редактирования продукта
    public function edit(Product $product)
    {
        return view('products.edit', compact('product')); // Возвращаем представление для редактирования продукта
    }

    // Обновление данных продукта
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $product->update($validated); // Обновляем данные продукта
        return redirect()->route('product.index')->with('success', 'Product updated successfully!');
    }
}
