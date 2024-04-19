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
        $albums = Album::select('albums.*', DB::raw('COUNT(attachments.id) as attachment_count'))
            ->leftJoin('attachments', 'albums.id', '=', 'attachments.album_id')
            ->groupBy('albums.id')
            ->get();
        return Inertia::render('Album/AlbumAdmin', [
            'albums' => $albums
        ]);

    }
    public function admin_album_store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $album = Album::create([
            'name' => $request->input('name'),
        ]);

        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            foreach ($files as $file) {
                $name = now()->timestamp . "_{$file->getClientOriginalName()}";
                $path = $file->storeAs('album_images', $name, 'public');
                $file_path = "/storage/{$path}";
                Attachment::create([
                    'album_id' => $album->id,
                    'name' => $name,
                    'path' => $file_path
                ]);
            }
        }
        if ($album) {
            return to_route('admin.album.index');
        }
    }
    public function admin_album_view($id)
    {
        $album = Album::with('attachments')->findOrFail($id);
        return Inertia::render('Album/AlbumAdminView', [
            'album' => $album
        ]);
    }

    public function admin_album_image_store(Request $request)
    {
        $request->validate([
            'attachments' => 'required',
        ]);
        $album_id = $request->input('album_id');
        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            foreach ($files as $file) {
                $name = now()->timestamp . "_{$file->getClientOriginalName()}";
                $path = $file->storeAs('album_images', $name, 'public');
                $file_path = "/storage/{$path}";
                Attachment::create([
                    'album_id' => $album_id,
                    'name' => $name,
                    'path' => $file_path
                ]);
            }
        }
        return to_route('admin.album.view', $album_id);
    }

    public function admin_album_update(Request $request, $id)
    {
        $album = Album::findOrFail($id);
        if ($album) {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);
            $album->name = $request->name;
            $album->update();
            return to_route('admin.album.index');
        }
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
