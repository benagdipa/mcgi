<?php

namespace App\Http\Controllers;
use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PageController extends Controller
{
    public function homePage()
    {
        $posts = Posts::take(3)->get();
        return Inertia::render('HomePage', [
            'posts' => $posts,
        ]);

        return Inertia::render('HomePage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
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
        return Inertia::render('ContactPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);

    }
    public function privacyPage(){
        return Inertia::render('PrivacyandPolicy');
    }
}
