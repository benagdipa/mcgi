<?php

use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Dashboard API Routes
|--------------------------------------------------------------------------
|
| These routes are used for the admin dashboard API endpoints.
| NOTE: These routes are commented out as they're already defined in api.php
|
*/

// These routes are already defined in api.php
// Keeping them here for reference only
/*
Route::middleware(['auth:sanctum'])->prefix('api/admin/dashboard')->group(function () {
    Route::get('/stats', [DashboardController::class, 'getStats']);
    Route::get('/user-growth', [DashboardController::class, 'getUserGrowth']);
    Route::get('/revenue', [DashboardController::class, 'getRevenue']);
    Route::get('/platform-activity', [DashboardController::class, 'getPlatformActivity']);
    Route::get('/recent-transactions', [DashboardController::class, 'getRecentTransactions']);
    Route::get('/notifications', [DashboardController::class, 'getNotifications']);
});
*/ 