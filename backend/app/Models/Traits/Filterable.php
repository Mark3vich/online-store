<?php 

namespace App\Models\Traits;

use App\Filters\InterfaceFilter;
use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * @param Builder $builder
     * @param InterfaceFilter $filter
     *
     * @return Builder
     */
    public function scopeFilter(Builder $builder, InterfaceFilter $filter)
    {
        $filter->apply($builder);

        return $builder;
    }
}