<?php

use App\Http\Controllers\BlogsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::controller(PageController::class)->group(function () {
    Route::get('/', 'homePage')->name('home');
    Route::get('/about-us', 'aboutPage')->name('about');
    Route::get('/contact-us', 'contactPage')->name('contact');

});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');    
});

Route::controller(BlogsController::class)->group(function () {
    Route::get('/blogs', 'index')->name('blogs.index');
    Route::get('/blogs/{slug}', 'show')->name('blogs.show');

    Route::middleware('auth')->group(function () {
        Route::get('/dashboard/blogs','admin_blogs_index')->name('admin.blogs.index');
        Route::get('/dashboard/blogs/add','admin_blogs_add')->name('admin.blogs.add');
        
        Route::get('/dashboard/blogs/categories','admin_categories_index')->name('admin.blogs.categories.index');
        Route::get('/dashboard/blogs/tags','admin_tags_index')->name('admin.blogs.tags.index');
    });
});

Route::controller(EventsController::class)->group(function () {
    Route::get('/events', 'index')->name('events.index');
});


require __DIR__ . '/auth.php';
