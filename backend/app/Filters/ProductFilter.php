<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ProductFilter extends AbstractFilter
{
    public const CATEGORY = 'category';
    public const SORT_BY = 'sort_by';
    public const ORDER = 'order';
    public const MIN_PRICE = 'min_price';
    public const MAX_PRICE = 'max_price';
    public const TITLE = 'title';

    // Define all callbacks for the filters
    protected function getCallbacks(): array
    {
        return [
            self::CATEGORY => [$this, 'filterByCategory'],
            self::SORT_BY => [$this, 'applySorting'],
            self::MIN_PRICE => [$this, 'filterByMinPrice'],
            self::MAX_PRICE => [$this, 'filterByMaxPrice'],
            self::TITLE => [$this, 'filterByTitle'],
        ];
    }

    // Filter by category
    public function filterByCategory(Builder $builder, $value)
    {
        if ($value) {
            $builder->where('category_id', $value);
        }
    }

    // Filter by minimum price
    public function filterByMinPrice(Builder $builder, $value)
    {
        if (is_numeric($value)) {
            $builder->where('price', '>=', (float) $value);
        }
    }

    // Filter by maximum price
    public function filterByMaxPrice(Builder $builder, $value)
    {
        if (is_numeric($value)) {
            $builder->where('price', '<=', (float) $value);
        }
    }

    // Apply sorting based on provided field and order
    public function applySorting(Builder $builder, $value)
    {
        $order = request('order', 'asc'); // Default sorting order is ascending
        $builder->orderBy($value, $order);
    }

    // Filter by title for soft/partial search
    public function filterByTitle(Builder $builder, $value)
    {
        if (!empty($value)) {
            $builder->where('title', 'LIKE', '%' . $value . '%');
        }
    }
}

