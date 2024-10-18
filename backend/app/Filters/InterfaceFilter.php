<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

interface InterfaceFilter
{
    public function apply(Builder $builder);
}