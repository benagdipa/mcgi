<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'map_code', 'address', 'city', 'state', 'postal_code', 'phone', 'email'];

    public function locale()
    {
        return $this->belongsTo(Locale::class);
    }
}
