<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'featured_image',
        'content',
        'tags',
        'categories',
        'author',
        'status',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author');
    }
}
