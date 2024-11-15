<?php

namespace App\Http\Controllers\Pdf;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFExportCategoryController extends Controller
{
    public function export()
    {
        // Получаем данные из базы данных
        $categories = Category::all();

        // Загружаем представление и передаем данные
        $pdf = PDF::loadView('pdf.categories', compact('categories'));

        // Возвращаем PDF для загрузки
        return $pdf->download('categories.pdf');
    }
}
