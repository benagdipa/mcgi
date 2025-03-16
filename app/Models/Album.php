<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    
    protected $fillable = ["name", "description", "is_featured"];
    
    protected $casts = [
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
    
    /**
     * Get the attachment count for this album
     */
    public function getAttachmentCountAttribute()
    {
        return $this->attachments()->count();
    }
    
    /**
     * Get the featured image for this album (first image)
     */
    public function getFeaturedImageAttribute()
    {
        $featuredImage = $this->attachments()->first();
        return $featuredImage ? $featuredImage->path : null;
    }
}
