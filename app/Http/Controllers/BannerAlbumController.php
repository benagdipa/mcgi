<?php

namespace App\Http\Controllers;

use App\Models\BannerAlbums;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerAlbumController extends Controller
{
    public function admin_banner_index()
    {
        $albums = BannerAlbums::all();
        return Inertia::render('Banner/BannerAdmin', [
            'banners' => $albums
        ]);
    }

    public function admin_banner_store(Request $request)
    {
        $request->validate([
            'banners.*' => 'image|mimes:jpeg,png,webp,jpg,gif|max:2048'
        ]);
    }
}
