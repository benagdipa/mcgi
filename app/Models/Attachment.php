<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Attachment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'album_id', 
        'name', 
        'path', 
        'alt_text', 
        'description',
        'width',
        'height',
        'file_size',
        'file_type'
    ];
    
    protected $appends = ['full_url', 'thumbnail_url'];
    
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }
    
    /**
     * Get the full URL for the attachment
     */
    public function getFullUrlAttribute()
    {
        if (strpos($this->path, 'http') === 0) {
            return $this->path;
        }
        
        return url($this->path);
    }
    
    /**
     * Get a thumbnail URL for the attachment
     * This could be enhanced with actual thumbnail generation
     */
    public function getThumbnailUrlAttribute()
    {
        if (strpos($this->path, 'http') === 0) {
            return $this->path;
        }
        
        return url($this->path);
    }
    
    /**
     * Parse file details on save
     */
    protected static function booted()
    {
        static::creating(function ($attachment) {
            // Set name from file if not provided
            if (empty($attachment->name)) {
                $attachment->name = pathinfo($attachment->path, PATHINFO_FILENAME);
            }
            
            // Auto-detect file type
            if (empty($attachment->file_type)) {
                $extension = pathinfo($attachment->path, PATHINFO_EXTENSION);
                $attachment->file_type = strtolower($extension);
            }
            
            // Try to get image dimensions and size
            try {
                if (file_exists(public_path(ltrim($attachment->path, '/')))) {
                    $imgData = getimagesize(public_path(ltrim($attachment->path, '/')));
                    if ($imgData) {
                        $attachment->width = $imgData[0];
                        $attachment->height = $imgData[1];
                    }
                    
                    $attachment->file_size = filesize(public_path(ltrim($attachment->path, '/')));
                }
            } catch (\Exception $e) {
                // Silently fail if we can't get image data
            }
        });
    }
}
