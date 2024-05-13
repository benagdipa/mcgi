<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Events;
use App\Models\Location;
use App\Models\Posts;
use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    public function homePage()
    {
        $posts = Posts::take(3)->get();
        $currentDate = Carbon::now();
        $events = Events::where('start_date', '>=', $currentDate)->orderBy('start_date', 'asc')->take(9)->get();
        // $imageData = BannerImage::select('id', 'title', 'bannerpath')->get()->toArray();
        $imageData = BannerImage::select('id', 'title', 'bannerpath', 'position')
            ->orderBy('position', 'asc')
            ->get()
            ->sortBy(function ($image) {
                return $image->position == 0 ? PHP_INT_MAX : $image->position;
            })
            ->map(function ($image) {
                return [
                    'id' => $image->id,
                    'title' => $image->title,
                    'bannerpath' => Storage::url('uploads/' . $image->bannerpath),
                    'position' => $image->position
                ];
            });
        $imageDataArray = $imageData->values()->toArray();
        return Inertia::render('HomePage', [
            'posts' => $posts,
            'events' => $events,
            'banners' => $imageDataArray,
        ]);
    }
    public function aboutPage()
    {
        return Inertia::render('AboutPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function contactPage()
    {
        $locations = Location::all();
        return Inertia::render('ContactPage', [
            'locations' => $locations
        ]);

    }
    public function privacyPage()
    {
        return Inertia::render('PrivacyandPolicy');
    }
    public function conditionPage()
    {
        return Inertia::render('TermsandCondition');
    }

    public function gallery_page()
    {
        $albums = Album::with('attachments')->get();
        return Inertia::render('GalleryPage', [
            'albums' => $albums
        ]);
    }
    public function dashboard()
    {
        echo "here";
        exit;
    }
}
