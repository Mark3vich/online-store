<?php

namespace App\Http\Controllers\Word;

use App\Http\Controllers\Controller;
use App\Models\Category;
use PhpOffice\PhpWord\PhpWord;

class WordCategoryExportController extends Controller
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

        // Пример данных для таблицы
        $categorys = Category::all();

        foreach ($categorys as $category) {
            $table->addRow();
            $table->addCell()->addText($category['id']);
            $table->addCell()->addText($category['title']);
        }

        // Сохранение документа
        $fileName = 'exported_document_categories.docx';
        $filePath = storage_path($fileName);
        $phpWord->save($filePath, 'Word2007');

        // Скачивание файла
        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
