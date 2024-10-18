<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ProductFilter extends AbstractFilter
{
    public const CATEGORY = 'category';

    // Получаем коллбэки для фильтров
    protected function getCallbacks(): array
    {
        return [
            self::CATEGORY  => [$this, 'filterByCategory'],
        ];
    }

    // Метод фильтрации по category_id
    public function filterByCategory(Builder $builder, $value)
    {
        // Фильтруем продукты по переданному значению category_id
        if ($value) {
            $builder->where('category_id', $value);
        }
    }
}
