<?php

use App\Http\Controllers\BlogsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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
        Route::get('/dashboard/blogs', 'admin_blogs_index')->name('admin.blogs.index');
        Route::get('/dashboard/blogs/add', 'admin_blogs_add')->name('admin.blogs.add');
        Route::post('/dashboard/blogs/add', 'admin_blogs_store')->name('admin.blogs.store');
        Route::get('/dashboard/blogs/{id}/edit', 'admin_blogs_edit')->name('admin.blogs.edit');
        Route::post('/dashboard/blogs/{id}/edit', 'admin_blogs_update')->name('admin.blogs.update');
        Route::delete('/dashboard/blogs/{id}', 'admin_blogs_delete')->name('admin.blogs.delete');

        Route::get('/dashboard/blogs/categories', 'admin_categories_index')->name('admin.blogs.categories.index');
        Route::post('/dashboard/blogs/categories/store', 'admin_categories_store')->name('admin.blogs.categories.store');
        Route::post('/dashboard/blogs/categories/{id}', 'admin_categories_update')->name('admin.blogs.categories.update');
        Route::delete('/dashboard/blogs/categories/{id}', 'admin_categories_delete')->name('admin.blogs.categories.delete');

        Route::get('/dashboard/blogs/tags', 'admin_tags_index')->name('admin.blogs.tags.index');
        Route::post('/dashboard/blogs/tags/store', 'admin_tags_store')->name('admin.blogs.tags.store');
        Route::post('/dashboard/blogs/tags/{id}', 'admin_tags_update')->name('admin.blogs.tags.update');
        Route::delete('/dashboard/blogs/tags/{id}', 'admin_tags_delete')->name('admin.blogs.categories.delete');

        Route::post('upload_image', 'admin_image_upload')->name('admin.image.upload');
    });
});

Route::controller(EventsController::class)->group(function () {
    Route::get('/events', 'index')->name('events.index');
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard/events', 'admin_events_index')->name('admin.events.index');
        Route::get('/dashboard/events/add', 'admin_events_add')->name('admin.events.add');
        Route::post('/dashboard/events/store', 'admin_events_store')->name('admin.events.store');
        Route::get('/dashboard/events/{id}/edit', 'admin_events_edit')->name('admin.events.edit');
        Route::post('/dashboard/events/{id}/edit', 'admin_events_update')->name('admin.events.update');
        Route::delete('/dashboard/events/{id}', 'admin_events_delete')->name('admin.events.delete');
    });
});

Route::controller(UserController::class)->group(function () {
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard/users','admin_user_index')->name('admin.user.index');
    });
});


require __DIR__ . '/auth.php';
