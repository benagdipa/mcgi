<?php
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventAdminController;
use Illuminate\Support\Facades\Route;

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

/*
|--------------------------------------------------------------------------
| Public Routes (No Auth Required)
|--------------------------------------------------------------------------
|
| These routes are accessible to all users without login
|
*/
Route::controller(PageController::class)->group(function () {
    Route::get('/', 'homePage')->name('home');
    Route::get('/about-us', 'aboutPage')->name('about');
    Route::get('/contact-us', 'contactPage')->name('contact');
    Route::get('/privacy-policy', 'privacyPage')->name('privacy-and-policy');
    Route::get('/terms-conditions', 'conditionPage')->name('terms-and-condition');
    Route::get('/gallery', 'gallery_page')->name('gallery');
    Route::get('/new-visitor', 'visitorGuidePage')->name('visitor.guide');
});

Route::post('/contact-us', [ContactController::class, 'store'])->name('contact.store');

// Public blog and event routes
Route::controller(PostController::class)->group(function () {
    Route::get('/blogs', 'index')->name('blogs.index');
    Route::get('/blogs/getAllPost', 'getAllPosts')->name('blogs.allpost');
    Route::get('/blogs/{slug}', 'show')->name('blogs.show');
});

Route::controller(EventController::class)->group(function () {
    Route::get('/events', 'index')->name('events.index');
    Route::get('/events/form', 'event_form')->name('events.form');
    Route::post('/events/form/validate', 'validate_event_form')->name('validate.event.form');
    Route::post('/events/form/store', 'event_form_store')->name('event.form.store');
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Login Required)
|--------------------------------------------------------------------------
|
| These routes are only accessible to logged in users
|
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard route - accessible to members and admins
    Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
    
    // Profile routes - accessible to all authenticated users
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Admin blog routes
    Route::controller(PostController::class)->group(function () {
        Route::middleware(['permission:create_blog_posts|edit_blog_posts|delete_blogs_posts'])->group(function () {
            Route::get('/dashboard/blogs', 'admin_blogs_index')->name('admin.blogs.index');
            Route::get('/dashboard/blogs/add', 'admin_blogs_add')->name('admin.blogs.add');
            Route::post('/dashboard/blogs/add', 'admin_blogs_store')->name('admin.blogs.store');
            Route::get('/dashboard/blogs/{id}/edit', 'admin_blogs_edit')->name('admin.blogs.edit');
            Route::post('/dashboard/blogs/{id}/edit', 'admin_blogs_update')->name('admin.blogs.update');
            Route::delete('/dashboard/blogs/{id}', 'admin_blogs_delete')->name('admin.blogs.delete');
            Route::post('/dashboard/blogs/{id}/restore', 'admin_blogs_restore')->name('admin.blogs.restore');
            Route::delete('/dashboard/blogs/{id}/force-delete', 'admin_blogs_force_delete')->name('admin.blogs.force.delete');
            Route::post('/dashboard/blogs/tempimg','admin_blogs_tempImg')->name('admin.blogs.tempImg');
            Route::post('/dashboard/blogs/tempimgUrl','fetchUrl')->name('admin.blogs.tempImgUrl');
        });

        Route::middleware(['permission:create_categories|edit_categories|delete_categories'])->group(function () {
            Route::get('/dashboard/blogs/categories', 'admin_categories_index')->name('admin.blogs.categories.index');
            Route::post('/dashboard/blogs/categories/store', 'admin_categories_store')->name('admin.blogs.categories.store');
            Route::post('/dashboard/blogs/categories/{id}', 'admin_categories_update')->name('admin.blogs.categories.update');
            Route::delete('/dashboard/blogs/categories/{id}', 'admin_categories_delete')->name('admin.blogs.categories.delete');
        });

        Route::middleware(['permission:create_tags|edit_tags|delete_tags'])->group(function () {
            Route::get('/dashboard/blogs/tags', 'admin_tags_index')->name('admin.blogs.tags.index');
            Route::post('/dashboard/blogs/tags/store', 'admin_tags_store')->name('admin.blogs.tags.store');
            Route::post('/dashboard/blogs/tags/{id}', 'admin_tags_update')->name('admin.blogs.tags.update');
            Route::delete('/dashboard/blogs/tags/{id}', 'admin_tags_delete')->name('admin.blogs.tags.delete');
        });
        
        Route::post('upload_image', 'admin_image_upload')->name('admin.image.upload');
    });

    // Admin event routes
    Route::middleware(['auth', 'verified', 'permission:create_events|edit_events|delete_events'])->group(function () {
        Route::prefix('admin/events')->name('admin.events.')->group(function () {
            Route::get('/', [EventAdminController::class, 'index'])->name('index');
            Route::get('/create', [EventAdminController::class, 'create'])->name('create');
            Route::post('/', [EventAdminController::class, 'store'])->name('store');
            Route::get('/{id}/edit', [EventAdminController::class, 'edit'])->name('edit');
            Route::post('/{id}', [EventAdminController::class, 'update'])->name('update');
            Route::delete('/{id}', [EventAdminController::class, 'destroy'])->name('destroy');
            Route::get('/{id}/attendances', [EventAdminController::class, 'attendances'])->name('attendances');
            Route::get('/{id}/export', [EventAdminController::class, 'exportAttendances'])->name('export');
            Route::post('/{event_id}/attendance/{attendance_id}/check-in', [EventAdminController::class, 'checkIn'])->name('attendance.check-in');
            Route::put('/{event_id}/attendance/{attendance_id}', [EventAdminController::class, 'updateAttendance'])->name('attendance.update');
            Route::delete('/{event_id}/attendance/{attendance_id}', [EventAdminController::class, 'deleteAttendance'])->name('attendance.delete');
        });
    });

    // ... Keep the rest of your authenticated routes ...
});

Route::controller(AttendanceController::class)->group(function () {
    Route::post('/attendance/store', 'store')->name('event.attendance.create');
    Route::middleware(['auth', 'verified', 'permission:create_events|edit_events|delete_events'])->group(function () {
        Route::get('/dashboard/attendances', 'admin_index')->name('admin.events.attendances.index');
    });
});

Route::controller(LocaleController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_locale|edit_locale|delete_locale'])->group(function () {
        Route::get('/dashboard/locale', 'admin_index')->name('admin.locale.index');
        Route::post('/dashboard/locale', 'admin_store')->name('admin.locale.store');
        Route::post('/dashboard/locale/{id}/edit', 'admin_update')->name('admin.locale.update');
        Route::delete('/dashboard/locale/{id}', 'admin_delete')->name('admin.locale.delete');
    });
});

Route::controller(LocationController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_church_locations|edit_church_locations|delete_church_locations'])->group(function () {
        Route::get('/dashboard/locations', 'admin_index')->name('admin.location.index');
        Route::post('/dashboard/locations', 'admin_store')->name('admin.location.store');
        Route::post('/dashboard/locations/{id}/edit', 'admin_update')->name('admin.location.update');
        Route::delete('/dashboard/locations/{id}', 'admin_delete')->name('admin.location.delete');
    });
});

Route::controller(UserController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_users|edit_users|delete_users'])->group(function () {
        Route::get('/dashboard/users', 'admin_user_index')->name('admin.users.index');
        Route::post('/dashboard/users', 'admin_user_store')->name('admin.users.store');
        Route::post('/dashboard/users/{id}', 'admin_user_update')->name('admin.users.update');
        Route::post('/dashboard/users-approval', 'admin_user_approval')->name('admin.users.approval');
        Route::delete('/dashboard/users/{id}', 'admin_user_delete')->name('admin.users.delete');
    });
});

Route::controller(AlbumController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_albums|edit_albums|delete_albums'])->group(function () {
        Route::get('/dashboard/albums', 'admin_album_index')->name('admin.album.index');
        Route::post('/dashboard/albums', 'admin_album_store')->name('admin.album.store');
        Route::get('/dashboard/albums/{id}/view', 'admin_album_view')->name('admin.album.view');
        Route::post('/dashboard/albums/{id}/edit', 'admin_album_update')->name('admin.album.update');
        Route::delete('/dashboard/albums/{id}', 'admin_album_delete')->name('admin.album.delete');

        Route::post('/dashboard/albums/image', 'admin_album_image_store')->name('admin.album.image.store');
        Route::post('/dashboard/albums/image/{id}/edit', 'admin_album_image_update')->name('admin.album.image.update');
        Route::delete('/dashboard/albums/image/{id}', 'admin_album_image_delete')->name('admin.album.image.delete');
    });
});

Route::controller(BannerController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_banners|edit_banners|delete_banners'])->group(function () {
        Route::get('/dashboard/banners', 'admin_banner_index')->name('admin.banner.index');
        Route::post('/dashboard/banners', 'admin_banner_store')->name('admin.banner.store');
        Route::post('/dashboard/banners/reorder/{id}', 'admin_banner_reorder')->name('admin.banner.reorder');
        Route::post('/dashboard/banners/reorder-all', 'admin_banner_reorder_all')->name('admin.banner.reorder-all');
        Route::delete('/dashboard/banners/{id}', 'admin_banner_delete')->name('admin.banner.delete');
    });
});

Route::controller(EmailTemplateController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_email_templates|edit_email_templates|delete_email_templates'])->group(function () {
        Route::get('/dashboard/email-templates', 'admin_index')->name('admin.email.index');
        Route::post('/dashboard/email-templates', 'admin_store')->name('admin.email.store');
        Route::post('/dashboard/email-templates/{id}/edit', 'admin_update')->name('admin.email.update');
        Route::delete('/dashboard/email-templates/{id}', 'admin_delete')->name('admin.email.delete');
    });
});

Route::controller(RoleManagementController::class)->group(function () {
    Route::middleware(['auth', 'verified', 'permission:create_roles|edit_roles|delete_roles'])->group(function () {
        Route::get('/dashboard/roles', 'admin_index')->name('admin.roles.index');
        Route::post('/dashboard/roles', 'admin_store')->name('admin.roles.store');
        Route::post('/dashboard/roles/{id}/edit', 'admin_update')->name('admin.roles.update');
        Route::delete('/dashboard/roles/{id}', 'admin_delete')->name('admin.roles.delete');
    });
});

// Event routes
Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index'])->name('events.index');
    Route::get('/data', [EventController::class, 'getData'])->name('events.data');
    Route::get('/share/{id}', [EventController::class, 'share'])->name('events.share');
    Route::get('/{id}', [EventController::class, 'show'])->name('events.show');
    Route::post('/attendance', [EventController::class, 'storeAttendance'])->name('event.attendance.store')
        ->middleware(['auth', 'verified']);
    Route::post('/quick-check-in', [EventController::class, 'quickCheckIn'])->name('event.quick.check.in')
        ->middleware(['auth', 'verified']);
});

Route::get('/local-chapters', [LocationController::class, 'localChapters'])->name('local.chapters');

require __DIR__ . '/auth.php';

