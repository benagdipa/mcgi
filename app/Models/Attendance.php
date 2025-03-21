<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['event_id', 'name', 'email', 'phone', 'locale', 'member_type'];

    public function event()
    {
        return $this->belongsTo(Events::class, 'event_id', 'id');
    }

    public function locale()
    {
        return $this->belongsTo(Locale::class, 'locale', 'id');
    }
}
