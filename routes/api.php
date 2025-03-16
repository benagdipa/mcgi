<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GalleryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/search/users', [EventController::class, 'search_user'])->name('api.search.user');
Route::post('/admin/search/users', [UserController::class, 'admin_user_search'])->name('admin.search.user');

Route::post('/export/attendee', [AttendanceController::class, 'export_attendee'])->name('api.export.attendee');
Route::post('/search/attendee', [AttendanceController::class, 'search_attendee'])->name('api.search.attendee');
Route::get('/export/form', [EventController::class, 'export_form'])->name('api.export.form');

// Gallery API routes
Route::get('/gallery/albums', [GalleryController::class, 'getAlbums']);
Route::get('/gallery/albums/{id}', [GalleryController::class, 'getAlbum']);
Route::get('/gallery/images', [GalleryController::class, 'getImages']);

// Dashboard API routes
Route::middleware(['auth:sanctum'])->prefix('admin/dashboard')->group(function () {
    Route::get('/stats', [\App\Http\Controllers\Api\DashboardController::class, 'getStats']);
    Route::get('/user-growth', [\App\Http\Controllers\Api\DashboardController::class, 'getUserGrowth']);
    Route::get('/revenue', [\App\Http\Controllers\Api\DashboardController::class, 'getRevenue']);
    Route::get('/platform-activity', [\App\Http\Controllers\Api\DashboardController::class, 'getPlatformActivity']);
    Route::get('/recent-transactions', [\App\Http\Controllers\Api\DashboardController::class, 'getRecentTransactions']);
    Route::get('/notifications', [\App\Http\Controllers\Api\DashboardController::class, 'getNotifications']);
});
