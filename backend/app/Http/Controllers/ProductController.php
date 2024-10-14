<?php

namespace App\Http\Controllers;

use App\Models\Product; // Не забудьте подключить модель Product
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Отображение всех продуктов
    public function show()
    {
        $products = Product::all(); // Получаем все продукты
        return view('products.index', compact('products')); // Возвращаем представление с продуктами
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
