<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Model
{
    use HasFactory;
    protected $guarded = false;

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
