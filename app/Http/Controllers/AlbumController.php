<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Inertia\Inertia;
use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function admin_album_index()
    {
        $albums = Album::all();
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

    public function admin_album_update(Request $request, $id)
    {
        // $album = Album::findOrFail($id);
        // if ($album) {
        //     $request->validate([
        //         'name' => 'required|string|max:255',
        //     ]);
        //     $album->name = $request->name;
        //     $album->update();
        //     return to_route('admin.album.index');
        // }
    }

    public function admin_album_delete($id)
    {
        // $album = Album::findOrFail($id);
        // if ($album) {
        //     $album->delete();
        //     return to_route('admin.album.index');
        // }
    }
}
