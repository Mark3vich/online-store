<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;
    use Filterable;
    protected $guarded = false;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Получить цену с учетом скидки.
     *
     * @return float
     */
    public function getDiscountedPriceAttribute()
    {
        if ($this->discount) {
            $discountAmount = ($this->price * $this->discount) / 100;
            return round($this->price - $discountAmount, 2); // Цена со скидкой
        }

        return $this->price; // Возвращает обычную цену, если скидки нет
    }
}
