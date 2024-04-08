<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'start_date',
        'end_date',
        'featured_image',
        'status',
        'author',
        'content'
    ];
}
