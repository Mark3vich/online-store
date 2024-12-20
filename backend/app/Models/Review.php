<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'product_id', 'review', 'rating'];

    // Связь с пользователем (кто оставил отзыв)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Связь с продуктом (о каком продукте отзыв)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
