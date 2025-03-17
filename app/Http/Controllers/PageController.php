<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Attachment;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\EventsOption;
use App\Models\Location;
use App\Models\Post;
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
        // Fetch the latest 3 published posts with enhanced features
        $posts = Post::with('author')
            ->published()
            ->featured()
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($post) {
                // Add category information to each post
                $post->category = $post->category();
                
                // Convert HTML content to excerpt if excerpt is empty
                if (empty($post->excerpt)) {
                    $plainText = strip_tags($post->content ?? '');
                    $post->excerpt = \Illuminate\Support\Str::limit($plainText, 150);
                }
                
                return $post;
            });
    
        $currentDate = Carbon::now();
    
        // Get the 'attend_duration' option value from the database
        // Use try-catch to handle case when table doesn't exist
        try {
            $option = EventsOption::where('name', 'attend_duration')->first();
            $attendDuration = $option ? $option->value : 30; // Default to 30 minutes if not found
        } catch (\Exception $e) {
            // If table doesn't exist or any other error, use default value
            $attendDuration = 30; // Default to 30 minutes
        }
    
        // Fetch upcoming events and calculate 'isImminent' for each event
        $events = Event::where('start_date', '>=', $currentDate)
            ->where('status', 'publish')
            ->orderBy('start_date', 'asc')
            ->take(9)
            ->get()
            ->map(function ($event) use ($currentDate, $attendDuration) {
                // Calculate if event is imminent
                $timeDiff = $currentDate->diffInMinutes($event->start_date);
                $event->isImminent = $timeDiff <= $attendDuration;
                return $event;
            });
    
        // Fetch banners and sort them by position directly in the query
        $imageData = BannerImage::select('id', 'title', 'bannerpath', 'position')
            ->orderBy('position', 'asc')
            ->get()
            ->map(function ($image) {
                return [
                    'id' => $image->id,
                    'title' => $image->title,
                    'bannerpath' => Storage::url('uploads/' . $image->bannerpath),
                    'position' => $image->position
                ];
            });
    
        // Return the data to the Inertia view
        return Inertia::render('HomePage', [
            'posts' => $posts,
            'events' => $events,
            'banners' => $imageData,
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
        $albums = Album::with('images')
            ->where('status', 'active')
            ->where('visibility', 'public')
            ->get();
        
        return Inertia::render('GalleryPage', [
            'albums' => $albums
        ]);
    }
    
    public function visitorGuidePage()
    {
        $upcomingEvents = Event::where('start_date', '>=', Carbon::now())
            ->where('status', 'publish')
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get();
            
        $locations = Location::all();
        
        return Inertia::render('VisitorGuide', [
            'upcomingEvents' => $upcomingEvents,
            'locations' => $locations
        ]);
    }
    
    public function dashboard()
    {
        // Get the authenticated user
        $user = auth()->user();
        
        // If the user has no role, assign them the guest role as a fallback
        if (!$user->hasRole('admin') && !$user->hasRole('member') && 
            !$user->hasRole('super-admin') && !$user->hasAnyRole(['guest', 'Guest'])) {
            $user->assignRole('guest');
        }
        
        // Redirect guest users to the homepage
        if ($user->hasAnyRole(['guest', 'Guest'])) {
            return redirect()->route('home')->with('message', 'You do not have access to the dashboard area.');
        }
        
        // Redirect super-admin users to the admin dashboard
        if ($user->hasRole('super-admin')) {
            return redirect()->route('admin.dashboard');
        }
        
        // Continue with dashboard data for members and admins
        $user_count = User::count();
        $blog_counts = Post::count();
        $attendance_summary = Event::with('attendances')->withCount('attendances')->get();
        
        return Inertia::render('Dashboard', [
            'count' => [
                'users' => $user_count,
                'blogs' => $blog_counts,
                'events' => Event::count(),
                'albums' => Attachment::count(),
                'attendees' => Attendance::count()
            ],
            'data' => [
                'events' => Event::orderBy('id', 'desc')->select('id', 'title')->take(5)->get(),
                'blogs' => Post::orderBy('id', 'desc')->select('id', 'title')->take(5)->get(),
                'users' => User::orderBy('id', 'desc')->select('id', 'first_name', "last_name", 'email', 'phone')->take(5)->get(),
                'attendance_summary' => $attendance_summary,
            ],
        ]);
    }
    
    public function adminDashboard()
    {
        // Get the authenticated user
        $user = auth()->user();
        
        // Only allow super-admin users to access this page
        if (!$user->hasRole('super-admin')) {
            return redirect()->route('dashboard')->with('message', 'You do not have access to the admin dashboard.');
        }
        
        // Provide expanded data for the super admin dashboard
        $user_count = User::count();
        $blog_counts = Post::count();
        
        return Inertia::render('AdminDashboard', [
            'count' => [
                'users' => $user_count,
                'blogs' => $blog_counts,
                'events' => Event::count(),
                'albums' => Attachment::count(),
                'attendees' => Attendance::count()
            ],
            'data' => [
                'events' => Event::orderBy('id', 'desc')->select('id', 'title')->take(5)->get(),
                'blogs' => Post::orderBy('id', 'desc')->select('id', 'title')->take(5)->get(),
                'users' => User::orderBy('id', 'desc')->select('id', 'first_name', "last_name", 'email', 'phone')->take(5)->get(),
            ],
        ]);
    }

    public function eventsPage()
    {
        return Inertia::render('EventsPage');
    }
}
