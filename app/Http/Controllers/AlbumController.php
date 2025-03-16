<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Album;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AlbumController extends Controller
{
    public function admin_album_index()
    {
        $albums = Album::select('albums.id', 'albums.name', 'albums.description', 'albums.is_featured', 'albums.created_at', 'albums.updated_at', DB::raw('COUNT(attachments.id) as attachment_count'))
        ->leftJoin('attachments', 'albums.id', '=', 'attachments.album_id')
        ->groupBy('albums.id', 'albums.name', 'albums.description', 'albums.is_featured', 'albums.created_at', 'albums.updated_at')
        ->orderBy('albums.created_at', 'desc')
        ->get();
    
        return Inertia::render('Album/AlbumAdmin', [
            'albums' => $albums
        ]);
    }
    public function admin_album_store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);
        
        $album = Album::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'is_featured' => $request->input('is_featured', false),
        ]);

        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            foreach ($files as $file) {
                $name = now()->timestamp . "_{$file->getClientOriginalName()}";
                $path = $file->storeAs('album_images', $name, 'public');
                $file_path = "/storage/{$path}";
                
                // Get file information
                $fileSize = $file->getSize();
                list($width, $height) = getimagesize($file->getRealPath());
                
                Attachment::create([
                    'album_id' => $album->id,
                    'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                    'path' => $file_path,
                    'file_size' => $fileSize,
                    'width' => $width,
                    'height' => $height,
                    'file_type' => $file->getClientOriginalExtension(),
                ]);
            }
        }
        
        if ($album) {
            return to_route('admin.album.index')->with('message', 'Album created successfully');
        }
    }
    public function admin_album_view($id)
    {
        $album = Album::with(['attachments' => function($query) {
            $query->orderBy('created_at', 'desc');
        }])->findOrFail($id);
        
        return Inertia::render('Album/AlbumAdminView', [
            'album' => $album
        ]);
    }

    public function admin_album_image_store(Request $request)
    {
        $request->validate([
            'attachments' => 'required',
            'album_id' => 'required|exists:albums,id',
        ]);
        
        $album_id = $request->input('album_id');
        $count = 0;
        
        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            foreach ($files as $file) {
                $name = now()->timestamp . "_{$file->getClientOriginalName()}";
                $path = $file->storeAs('album_images', $name, 'public');
                $file_path = "/storage/{$path}";
                
                // Get file information
                $fileSize = $file->getSize();
                
                try {
                    list($width, $height) = getimagesize($file->getRealPath());
                } catch (\Exception $e) {
                    $width = null;
                    $height = null;
                }
                
                Attachment::create([
                    'album_id' => $album_id,
                    'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                    'path' => $file_path,
                    'file_size' => $fileSize,
                    'width' => $width,
                    'height' => $height,
                    'file_type' => $file->getClientOriginalExtension(),
                ]);
                
                $count++;
            }
        }
        
        return to_route('admin.album.view', $album_id)
            ->with('message', $count . ' images uploaded successfully');
    }

    public function admin_album_update(Request $request, $id)
    {
        $album = Album::findOrFail($id);
        
        if ($album) {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'is_featured' => 'boolean',
            ]);
            
            $album->name = $request->name;
            $album->description = $request->description;
            $album->is_featured = $request->is_featured ?? false;
            $album->update();
            
            return to_route('admin.album.index')
                ->with('message', 'Album updated successfully');
        }
    }

    public function admin_album_image_update(Request $request, $id)
    {
        $attachment = Attachment::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'alt_text' => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        
        $attachment->name = $request->name;
        $attachment->alt_text = $request->alt_text;
        $attachment->description = $request->description;
        $attachment->update();
        
        return to_route('admin.album.view', $attachment->album_id)
            ->with('message', 'Image details updated successfully');
    }

    public function admin_album_delete($id)
    {
        $album = Album::findOrFail($id);
        if ($album) {
            $attachments = $album->attachments;
            if ($attachments) {
                foreach ($attachments as $attachment) {
                    $path = $attachment->path;
                    Storage::disk('public')->delete(str_replace('/storage/', '', $path));
                    $attachment->delete();
                }
            }
            $album->delete();
            return to_route('admin.album.index');
        }
    }

    public function admin_album_image_delete($id)
    {
        $attachment = Attachment::findOrFail($id);
        $album_id = $attachment->album_id;
        $path = $attachment->path;
        Storage::disk('public')->delete(str_replace('/storage/', '', $path));
        $attachment->delete();
        return to_route('admin.album.view', $album_id);
    }
}
