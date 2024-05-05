<?php
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BannerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routesadmin.banner.index
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
    Route::get('/privacy-policy', 'privacyPage')->name('privacy-and-policy');
    Route::get('/terms-conditions', 'conditionPage')->name('terms-and-condition');
    Route::get('/gallery', 'gallery_page')->name('gallery');
});

Route::post('/contact-us', [ContactController::class, 'store'])->name('contact.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'role:admin|super-admin'])->name('dashboard');

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

    Route::middleware(['auth', 'permission:create_events|edit_events|delete_events'])->group(function () {
        Route::get('/dashboard/events', 'admin_events_index')->name('admin.events.index');
        Route::get('/dashboard/events/add', 'admin_events_add')->name('admin.events.add');
        Route::post('/dashboard/events/store', 'admin_events_store')->name('admin.events.store');
        Route::get('/dashboard/events/{id}/view', 'admin_events_view')->name('admin.events.view');
        Route::get('/dashboard/events/{id}/edit', 'admin_events_edit')->name('admin.events.edit');
        Route::post('/dashboard/events/{id}/edit', 'admin_events_update')->name('admin.events.update');
        Route::delete('/dashboard/events/{id}', 'admin_events_delete')->name('admin.events.delete');
    });
});

Route::controller(AttendanceController::class)->group(function () {
    Route::post('/attendance/store', 'store')->name('event.attendence.store');
    Route::get('/dashboard/attendances', 'admin_index')->name('admin.events.attendances.index');
});

Route::controller(LocaleController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_locales|edit_locales|delete_locales'])->group(function () {
        Route::get('/dashboard/locale', 'admin_index')->name('admin.locale.index');
        Route::post('/dashboard/locale', 'admin_store')->name('admin.locale.store');
        Route::post('/dashboard/locale/{id}/edit', 'admin_update')->name('admin.locale.update');
        Route::delete('/dashboard/locale/{id}', 'admin_delete')->name('admin.locale.delete');
    });
});

Route::controller(LocationController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_locations|edit_locations|delete_locations'])->group(function () {
        Route::get('/dashboard/locations', 'admin_index')->name('admin.location.index');
        Route::post('/dashboard/locations', 'admin_store')->name('admin.location.store');
        Route::post('/dashboard/locations/{id}/edit', 'admin_update')->name('admin.location.update');
        Route::delete('/dashboard/locations/{id}', 'admin_delete')->name('admin.location.delete');
    });
});

Route::controller(UserController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_users|edit_users|delete_users'])->group(function () {
        Route::get('/dashboard/users', 'admin_user_index')->name('admin.users.index');
        Route::post('/dashboard/users', 'admin_user_store')->name('admin.users.store');
        Route::post('/dashboard/users/{id}', 'admin_user_update')->name('admin.users.update');
        Route::delete('/dashboard/users/{id}', 'admin_user_delete')->name('admin.users.delete');
    });
});

Route::controller(AlbumController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_albums|edit_albums|delete_albums'])->group(function () {
        Route::get('/dashboard/albums', 'admin_album_index')->name('admin.album.index');
        Route::post('/dashboard/albums', 'admin_album_store')->name('admin.album.store');
        Route::get('/dashboard/albums/{id}/view', 'admin_album_view')->name('admin.album.view');
        Route::post('/dashboard/albums/{id}/edit', 'admin_album_update')->name('admin.album.update');
        Route::delete('/dashboard/locations/{id}', 'admin_album_delete')->name('admin.album.delete');

        Route::post('/dashboard/albums/image', 'admin_album_image_store')->name('admin.album.image.store');
        Route::delete('/dashboard/albums/image/{id}', 'admin_album_image_delete')->name('admin.album.image.delete');
    });
});

Route::controller(BannerController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_banners|edit_banners|delete_banners'])->group(function () {
        Route::get('/dashboard/banners', 'admin_banner_index')->name('admin.banner.index');
        Route::post('/dashboard/banners', 'admin_banner_store')->name('admin.banner.store');
        Route::delete('/dashboard/banners/{id}','admin_banner_delete')->name('admin.banner.delete');
    });
});

Route::controller(EmailTemplateController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_email_templates|edit_email_templates|delete_email_templates'])->group(function () {
        Route::get('/dashboard/email-templates', 'admin_index')->name('admin.email.index');
        Route::post('/dashboard/email-templates', 'admin_store')->name('admin.email.store');
        // Route::post('/dashboard/email-templates/{id}/edit', 'admin_update')->name('admin.email-templates.update');
        // Route::delete('/dashboard/email-templates/{id}', 'admin_delete')->name('admin.email-templates.delete');
    });
});

Route::controller(RoleManagementController::class)->group(function () {
    Route::middleware(['auth', 'permission:create_roles|edit_roles|delete_roles'])->group(function () {
        Route::get('/dashboard/roles', 'admin_index')->name('admin.roles.index');
        Route::post('/dashboard/roles', 'admin_store')->name('admin.roles.store');
        Route::post('/dashboard/roles/{id}/edit', 'admin_update')->name('admin.roles.update');
        Route::delete('/dashboard/roles/{id}', 'admin_delete')->name('admin.roles.delete');
    });
});


require __DIR__ . '/auth.php';
