<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Attachment;
use Illuminate\Support\Facades\Cache;

class GalleryController extends Controller
{
    /**
     * Get all albums with basic information
     */
    public function getAlbums(Request $request)
    {
        // Cache albums for 1 hour
        $albums = Cache::remember('gallery_albums', 3600, function () {
            return Album::select('id', 'name', 'description', 'is_featured', 'created_at')
                ->withCount('attachments')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function($album) {
                    // Get the first image as featured image
                    $featuredImage = Attachment::where('album_id', $album->id)
                        ->select('path')
                        ->first();
                        
                    $album->featured_image = $featuredImage ? $featuredImage->path : null;
                    $album->created_date = $album->created_at ? $album->created_at->format('F j, Y') : null;
                    
                    return $album;
                });
        });
        
        return response()->json([
            'success' => true,
            'albums' => $albums
        ]);
    }
    
    /**
     * Get a specific album with all its images
     */
    public function getAlbum(Request $request, $id)
    {
        // Cache individual album for 30 minutes
        $album = Cache::remember('gallery_album_'.$id, 1800, function () use ($id) {
            $album = Album::with(['attachments' => function($query) {
                $query->select('id', 'album_id', 'name', 'path', 'alt_text', 'width', 'height')
                    ->orderBy('created_at', 'desc');
            }])->findOrFail($id);
            
            $album->created_date = $album->created_at ? $album->created_at->format('F j, Y') : null;
            return $album;
        });
        
        return response()->json([
            'success' => true,
            'album' => $album
        ]);
    }
    
    /**
     * Get images with pagination and filtering options
     */
    public function getImages(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $albumId = $request->input('album_id');
        $search = $request->input('search');
        $sort = $request->input('sort', 'newest');
        
        $query = Attachment::select('id', 'album_id', 'name', 'path', 'alt_text', 'created_at');
        
        // Apply filters
        if ($albumId) {
            $query->where('album_id', $albumId);
        }
        
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('alt_text', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Apply sorting
        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            default: // newest
                $query->orderBy('created_at', 'desc');
                break;
        }
        
        // Get the images with pagination
        $images = $query->paginate($perPage);
        
        // Add album name to each image
        $images->getCollection()->transform(function ($image) {
            $album = Album::select('name')->find($image->album_id);
            $image->album_name = $album ? $album->name : null;
            return $image;
        });
        
        return response()->json([
            'success' => true,
            'images' => $images
        ]);
    }
} 