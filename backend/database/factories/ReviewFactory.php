<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\{Review,Product,User};

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Review::class;
    public function definition(): array
    {
        return [
            'product_id' => Product::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id,
            'review' => $this->faker->sentence(),
            'rating' => $this->faker->numberBetween(1, 5),
        ];
    }
}
