<?php

namespace App\Http\Controllers\Pdf;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\User;

class PDFExportUserController extends Controller
{
    public function export()
    {
        // Получаем данные из базы данных
        $users = User::all();

        // Загружаем представление и передаем данные
        $pdf = Pdf::loadView('pdf.users', compact('users'));

        // Возвращаем PDF для загрузки
        return $pdf->download('users.pdf');
    }
}
