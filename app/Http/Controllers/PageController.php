<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Events;
use App\Models\Location;
use App\Models\Posts;
use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    public function homePage()
    {
        $posts = Posts::take(3)->get();
        $events = Events::take(9)->get();
             // Access authenticated user's ID
  

          
             // You can now use $userId as needed
         
         $imageData = BannerImage::select('id', 'title', 'bannerpath')->get()->toArray();
     
       
         $ids=[];
         $titles=[];
         $bannerpath=[];
         $imageUrls=[];
         foreach ($imageData as $image) {
     $ids[] = $image['id'];
     $titles[] = $image['title'];
     $bannerpath[] = $image['bannerpath'];
     $imageUrls[] = Storage::url('uploads/' . $image['bannerpath']);
         }
        return Inertia::render('HomePage', [
            'posts' => $posts,
            'events' => $events,
            'imagesUrl'=>$imageUrls,
            'imageTitles'=>$titles,
      
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
}
