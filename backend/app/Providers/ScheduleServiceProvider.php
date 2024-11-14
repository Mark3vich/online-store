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
    }
}
