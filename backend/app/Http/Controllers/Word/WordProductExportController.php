<?php

namespace App\Http\Controllers\Word;

use App\Http\Controllers\Controller;
use App\Models\Product;
use PhpOffice\PhpWord\PhpWord;

class WordProductExportController extends Controller
{
    public function exportToWord()
    {
        // Создаём новый документ Word
        $phpWord = new PhpWord();
        $section = $phpWord->addSection();

        // Добавляем таблицу (пример)
        $table = $section->addTable();
        $table->addRow();
        $table->addCell()->addText('ID');
        $table->addCell()->addText('Название');
        $table->addCell()->addText('Описание');
        $table->addCell()->addText('Цена');
        $table->addCell()->addText('Категория');

        // Пример данных для таблицы
        $products = Product::all();

        foreach ($products as $product) {
            $table->addRow();
            $table->addCell()->addText($product['id']);
            $table->addCell()->addText($product['title']);
            $table->addCell()->addText($product['description']);
            $table->addCell()->addText($product['price']);
            $table->addCell()->addText($product['category']);
        }

        // Сохранение документа
        $fileName = 'exported_document_products.docx';
        $filePath = storage_path($fileName);
        $phpWord->save($filePath, 'Word2007');

        // Скачивание файла
        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
