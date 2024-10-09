<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->numberBetween(100, 1000),
            'discount' => $this->faker->numberBetween(0, 100),
            'image' => $this->faker->imageUrl(),
            'category_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
