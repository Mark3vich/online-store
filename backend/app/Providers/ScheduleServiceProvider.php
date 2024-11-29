<?php

namespace App\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\ServiceProvider;

class ScheduleServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(Schedule $schedule)
    {
        // Настройка автоматического запуска команды раз в две недели
        $schedule->command('backup:run')
            ->twiceMonthly(1, 15, '00:00')
            ->timezone('UTC')
            ->appendOutputTo(storage_path('logs/backup.log'));
        
        // Настройка автоматического создания бэкапа базы данных и отправки в облако
        $schedule->command('backup:database')
            ->twiceMonthly(1, 15, '02:00') // Запуск 1-го и 15-го числа в 2:00 по UTC
            ->timezone('UTC'); // Часовой пояс UTC
    }
}
