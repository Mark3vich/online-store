<?php

namespace App\Http\Controllers\Pdf;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFExportProdutController extends Controller
{
    public function export()
    {
        // Получаем данные из базы данных
        $products = Product::all();

        // Загружаем представление и передаем данные
        $pdf = PDF::loadView('pdf.products', compact('products'));

        // Возвращаем PDF для загрузки
        return $pdf->download('products.pdf');
    }
}
