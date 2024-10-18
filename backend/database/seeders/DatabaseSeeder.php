<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Role, User, Category, Product, Review};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::factory()->count(2)->create();
        User::factory(100)->create();
        Category::factory(10)->create();
        Product::factory(100)->create();
        Review::factory(100)->create();
    }
}
