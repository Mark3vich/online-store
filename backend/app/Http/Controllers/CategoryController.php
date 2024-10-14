<?php

namespace App\Http\Controllers;

use App\Models\Category; // Не забудьте подключить модель Category
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Отображение всех категорий
    public function show()
    {
        $categories = Category::all(); // Получаем все категории
        return view('categories.index', compact('categories')); // Возвращаем представление с категориями
    }

    // Страница редактирования категории
    public function edit(Category $category)
    {
        return view('categories.edit', compact('category')); // Возвращаем представление для редактирования категории
    }

    // Обновление данных категории
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $category->update($validated); // Обновляем данные категории
        return redirect()->route('category.index')->with('success', 'Category updated successfully!');
    }
}
