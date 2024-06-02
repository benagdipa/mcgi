<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Attachment;
use App\Models\Attendance;
use App\Models\Events;
use App\Models\EventsOption;
use App\Models\Location;
use App\Models\Posts;
use App\Models\BannerImage;
use App\Models\User;
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
        if (auth()->user()->hasRole('guest') || auth()->user()->hasRole('Guest')) {
            return redirect()->route('home');
        }
        $user_count = User::count();
        $blog_counts = Posts::count();
        $attendance_summary = Events::with('attendances')->withCount('attendances')->get();
        return Inertia::render('Dashboard', [
            'count' => [
                'users' => $user_count,
                'blogs' => $blog_counts,
                'events' => Events::count(),
                'albums' => Attachment::count(),
                'attendees' => Attendance::count()
            ],
            'data' => [
                'events' => Events::orderBy('id', 'desc')->select('id', 'title')->take(5)->get(),
                'blogs' => Posts::orderBy('id', 'desc')->select('id', 'title')->take(5)->get(),
                'users' => User::orderBy('id', 'desc')->select('id', 'first_name', "last_name", 'email', 'phone')->take(5)->get(),
                'attendance_summary' => $attendance_summary,
            ],
        ]);
    }
}
