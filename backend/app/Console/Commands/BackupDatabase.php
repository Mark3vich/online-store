<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;

class BackupDatabase extends Command
{
    protected $signature = 'backup:database';
    protected $description = 'Create a PostgreSQL database backup and upload it to Yandex Object Storage';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Настройка
        $database = env('DB_DATABASE');
        $username = env('DB_USERNAME');
        $password = env('DB_PASSWORD');
        $host = env('DB_HOST');
        $port = env('DB_PORT', 5432);
        $backupFile = storage_path('app/backups/' . $database . '_backup_' . date('Y-m-d_H-i-s') . '.sql');

        // Создание директории backups, если ее нет
        if (!is_dir(storage_path('app/backups'))) {
            mkdir(storage_path('app/backups'), 0755, true);
        }

        // Генерация дампа базы данных для PostgreSQL
        $this->info('Creating PostgreSQL database backup...');
        $env = ['PGPASSWORD' => $password];
        $dumpCommand = "pg_dump -h {$host} -p {$port} -U {$username} -d {$database} -F c > {$backupFile}"; // -F c (Custom format) или -F t (tar)
        $process = Process::fromShellCommandline($dumpCommand, null, $env);
        $process->run();

        if (!$process->isSuccessful()) {
            $this->error('Error creating database backup: ' . $process->getErrorOutput());
            return 1; // Код ошибки
        }

        $this->info('Database backup created: ' . $backupFile);

        // Загрузка дампа в Yandex Object Storage
        $this->info('Uploading backup to Yandex Object Storage...');
        $backupFileName = 'backups/' . basename($backupFile);

        try {
            Storage::disk('s3')->put($backupFileName, file_get_contents($backupFile));
            $this->info('Backup uploaded successfully: ' . $backupFileName);
        } catch (\Exception $e) {
            $this->error('Error uploading backup: ' . $e->getMessage());
            return 1; // Код ошибки
        }

        // Удаление локального бэкапа, если не нужен
        unlink($backupFile);
        $this->info('Local backup file deleted.');

        return 0; // Успешное завершение
    }
}
