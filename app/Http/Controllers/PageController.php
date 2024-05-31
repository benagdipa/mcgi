<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Events;
use App\Models\EventsOption;
use App\Models\Location;
use App\Models\Posts;
use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    public function homePage()
    {
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
        $posts = Posts::take(3)->get();
        $currentDate = Carbon::now();
        $option = EventsOption::where('name', 'attend_duration')->first();
        $events = Events::where('start_date', '>=', $currentDate)->orderBy('start_date', 'asc')->take(9)->get()->map(function ($event) use ($currentDate, $option) {
            $timeDiff = $currentDate->diffInMinutes($event->start_date);
            $event->isImminent = $timeDiff <= $option->value;
            return $event;
        });
        $imageData = BannerImage::select('id', 'title', 'bannerpath', 'position')->orderBy('position', 'asc')->get()->sortBy(function ($image) {
            return $image->position == 0 ? PHP_INT_MAX : $image->position;
        })->map(function ($image) {
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
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
        return Inertia::render('AboutPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function contactPage()
    {
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
        $locations = Location::all();
        return Inertia::render('ContactPage', [
            'locations' => $locations
        ]);

    }
    public function privacyPage()
    {
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
        return Inertia::render('PrivacyandPolicy');
    }
    public function conditionPage()
    {
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
        return Inertia::render('TermsandCondition');
    }

    public function gallery_page()
    {
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
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
