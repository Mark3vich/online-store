<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;
    // protected $guarded = false;

    // public function roles(): HasOne
    // {
    //     return $this->hasOne(Role::class);
    // }
}
