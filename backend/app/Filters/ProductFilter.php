<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ProductFilter extends AbstractFilter
{
    public const CATEGORY = 'category';
    public const SORT_BY = 'sort_by';
    public const ORDER = 'order';

    // Получаем коллбэки для фильтров
    protected function getCallbacks(): array
    {
        return [
            self::CATEGORY  => [$this, 'filterByCategory'],
            self::SORT_BY => [$this, 'applySorting'],
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

    // Метод для сортировки
    public function applySorting(Builder $builder, $value)
    {
        $order = request('order', 'asc'); // По умолчанию сортировка по возрастанию
        $builder->orderBy($value, $order);
    }
}
