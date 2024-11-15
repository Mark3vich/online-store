<?php

namespace App\Http\Controllers\Word;

use App\Http\Controllers\Controller;
use App\Models\User;
use PhpOffice\PhpWord\PhpWord;

class WordUserExportController extends Controller
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
        $table->addCell()->addText('Имя');
        $table->addCell()->addText('Email');

        // Пример данных для таблицы
        $users = User::all();

        foreach ($users as $user) {
            $table->addRow();
            $table->addCell()->addText($user['id']);
            $table->addCell()->addText($user['name']);
            $table->addCell()->addText($user['email']);
        }

        // Сохранение документа
        $fileName = 'exported_document_users.docx';
        $filePath = storage_path($fileName);
        $phpWord->save($filePath, 'Word2007');

        // Скачивание файла
        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
