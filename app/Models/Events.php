<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Events extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'address',
        'status',
        'author',
        'content',
        "featured_image",
    ];

    // Define the reverse relationship
    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'event_id', 'id');
    }
}
