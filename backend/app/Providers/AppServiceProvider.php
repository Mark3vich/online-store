<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Services\UserService;
use App\Http\Services\JWTAuthService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register services, if needed
        $this->app->singleton(UserService::class, function ($app) {
            return new UserService();
        });

        $this->app->singleton(JWTAuthService::class, function ($app) {
            return new JWTAuthService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
