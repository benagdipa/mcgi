<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/search/users', [EventsController::class, 'search_user'])->name('api.search.user');
Route::post('/admin/search/users', [UserController::class, 'admin_user_search'])->name('admin.search.user');

Route::post('/export/attendee', [AttendanceController::class, 'export_attendee'])->name('api.export.attendee');
Route::post('/search/attendee', [AttendanceController::class, 'search_attendee'])->name('api.search.attendee');
Route::get('/export/form', [EventsController::class, 'export_form'])->name('api.export.form');
