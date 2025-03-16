<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerAlbums extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'location',
        'is_active'
    ];
    
    public function images()
    {
        return $this->hasMany(BannerImage::class, 'banner_album_id');
    }
}
