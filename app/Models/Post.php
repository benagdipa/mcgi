<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'title',
        'slug',
        'featured_image',
        'content',
        'excerpt',
        'meta_title',
        'meta_description',
        'tags',
        'categories',
        'author',
        'status',
        'published_at',
        'seo_keywords',
        'reading_time',
        'views',
        'is_featured',
        'allow_comments',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'allow_comments' => 'boolean',
        'views' => 'integer',
    ];

    protected $appends = ['reading_time'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author');
    }

    public function getReadingTimeAttribute()
    {
        // Calculate reading time based on content (average reading speed: 200 words per minute)
        $wordCount = str_word_count(strip_tags($this->content ?? ''));
        $minutes = ceil($wordCount / 200);
        return $minutes > 0 ? $minutes : 1;
    }

    public function category()
    {
        if (empty($this->categories)) {
            return null;
        }
        
        $categoryId = explode(',', $this->categories)[0];
        return Category::find($categoryId);
    }

    public function getCategoriesArrayAttribute()
    {
        if (empty($this->categories)) {
            return [];
        }
        
        $categoryIds = explode(',', $this->categories);
        return Category::whereIn('id', $categoryIds)->get();
    }

    public function getTagsArrayAttribute()
    {
        if (empty($this->tags)) {
            return [];
        }
        
        $tagIds = explode(',', $this->tags);
        return Tag::whereIn('id', $tagIds)->get();
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeDrafts($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled')
                     ->where('published_at', '>', now());
    }

    public function incrementViews()
    {
        $this->views = ($this->views ?? 0) + 1;
        return $this->save();
    }

    public function getExcerpt($length = 150)
    {
        if (!empty($this->excerpt)) {
            return $this->excerpt;
        }
        
        $content = strip_tags($this->content ?? '');
        return Str::limit($content, $length);
    }
} 