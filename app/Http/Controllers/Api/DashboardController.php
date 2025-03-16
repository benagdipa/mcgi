<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;
use App\Models\Blog;
use App\Models\Album;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStats()
    {
        // Get user counts
        $totalUsers = User::count();
        $lastMonthUsers = User::where('created_at', '<', Carbon::now()->subMonth())->count();
        $userTrend = $lastMonthUsers > 0 
            ? round(($totalUsers - $lastMonthUsers) / $lastMonthUsers * 100, 1) 
            : 100;
        
        // Get active users (users who logged in within the last 24 hours)
        $activeUsers = User::where('last_login_at', '>=', Carbon::now()->subDay())->count();
        $lastMonthActiveUsers = User::where('last_login_at', '>=', Carbon::now()->subMonth()->subDay())
            ->where('last_login_at', '<', Carbon::now()->subMonth())
            ->count();
        $activeTrend = $lastMonthActiveUsers > 0 
            ? round(($activeUsers - $lastMonthActiveUsers) / $lastMonthActiveUsers * 100, 1) 
            : 100;
        
        // For demo purposes, we'll use mock revenue data
        // In a real application, you would fetch this from your database
        $totalRevenue = 142568;
        $lastMonthRevenue = 116380;
        $revenueTrend = $lastMonthRevenue > 0 
            ? round(($totalRevenue - $lastMonthRevenue) / $lastMonthRevenue * 100, 1) 
            : 100;
        
        // Mock conversion rate
        $conversionRate = 3.6;
        $lastMonthConversionRate = 3.63;
        $conversionTrend = $lastMonthConversionRate > 0 
            ? round(($conversionRate - $lastMonthConversionRate) / $lastMonthConversionRate * 100, 1) 
            : 0;
        
        return response()->json([
            'totalUsers' => [
                'value' => $totalUsers,
                'trend' => ($userTrend >= 0 ? '+' : '') . $userTrend . '%',
                'trendDirection' => $userTrend >= 0 ? 'up' : 'down',
                'comparedTo' => 'Last month'
            ],
            'activeUsers' => [
                'value' => $activeUsers,
                'trend' => ($activeTrend >= 0 ? '+' : '') . $activeTrend . '%',
                'trendDirection' => $activeTrend >= 0 ? 'up' : 'down',
                'comparedTo' => 'Last month'
            ],
            'totalRevenue' => [
                'value' => $totalRevenue,
                'formatted' => '$' . number_format($totalRevenue),
                'trend' => ($revenueTrend >= 0 ? '+' : '') . $revenueTrend . '%',
                'trendDirection' => $revenueTrend >= 0 ? 'up' : 'down',
                'comparedTo' => 'Last month'
            ],
            'conversionRate' => [
                'value' => $conversionRate,
                'trend' => ($conversionTrend >= 0 ? '+' : '') . $conversionTrend . '%',
                'trendDirection' => $conversionTrend >= 0 ? 'up' : 'down',
                'comparedTo' => 'Last month'
            ]
        ]);
    }

    /**
     * Get user growth data
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserGrowth(Request $request)
    {
        $timeRange = $request->input('timeRange', '30d');
        $now = Carbon::now();
        
        switch ($timeRange) {
            case '7d':
                $startDate = $now->copy()->subDays(7)->startOfDay();
                $groupBy = 'date_format(created_at, "%a")'; // Group by day of week
                $labelFormat = 'D'; // Short day name
                break;
            case '90d':
                $startDate = $now->copy()->subDays(90)->startOfDay();
                $groupBy = 'date_format(created_at, "%b")'; // Group by month
                $labelFormat = 'M'; // Short month name
                break;
            case '30d':
            default:
                $startDate = $now->copy()->subDays(30)->startOfDay();
                $groupBy = 'date(created_at)'; // Group by date
                $labelFormat = 'j'; // Day of month without leading zeros
                break;
        }
        
        // Get new users per period
        $userData = User::select(DB::raw("{$groupBy} as period"), DB::raw('count(*) as count'))
            ->where('created_at', '>=', $startDate)
            ->groupBy(DB::raw($groupBy))
            ->orderBy(DB::raw('min(created_at)'))
            ->get()
            ->keyBy('period');
        
        // Prepare data structure based on time range
        $labels = [];
        $data = [];
        
        if ($timeRange === '7d') {
            $dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            foreach ($dayLabels as $day) {
                $labels[] = $day;
                $data[] = $userData->get($day) ? $userData->get($day)->count : 0;
            }
        } elseif ($timeRange === '90d') {
            // For 90 days we'll use the last 3 months
            $currentMonth = $now->copy();
            for ($i = 0; $i < 3; $i++) {
                $month = $currentMonth->copy()->subMonths($i)->format('M');
                $labels[] = $month;
                $data[] = $userData->get($month) ? $userData->get($month)->count : 0;
            }
            // Reverse to get chronological order
            $labels = array_reverse($labels);
            $data = array_reverse($data);
        } else {
            // For 30 days we'll show each day
            for ($i = 0; $i < 30; $i++) {
                $date = $startDate->copy()->addDays($i);
                $labels[] = $date->format($labelFormat);
                $key = $date->format('Y-m-d');
                $data[] = $userData->get($key) ? $userData->get($key)->count : 0;
            }
        }
        
        return response()->json([
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'New Users',
                    'data' => $data,
                    'borderColor' => '#4F46E5',
                    'backgroundColor' => 'rgba(79, 70, 229, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ]
            ]
        ]);
    }

    /**
     * Get revenue data
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRevenue(Request $request)
    {
        $timeRange = $request->input('timeRange', '30d');
        
        // For demo purposes, we'll return mock data
        // In a real application, you would fetch this from your database
        $now = Carbon::now();
        
        switch ($timeRange) {
            case '7d':
                $labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                $data = [4500, 5200, 3800, 6400, 7100, 4800, 5600];
                break;
            case '90d':
                // Last 3 months
                $month3 = $now->copy()->subMonths(2)->format('M');
                $month2 = $now->copy()->subMonth()->format('M');
                $month1 = $now->format('M');
                $labels = [$month3, $month2, $month1];
                $data = [124500, 158000, 182200];
                break;
            case '30d':
            default:
                $labels = range(1, 30);
                $data = [];
                for ($i = 0; $i < 30; $i++) {
                    $data[] = rand(2000, 12000);
                }
                break;
        }
        
        return response()->json([
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Revenue',
                    'data' => $data,
                    'borderColor' => '#10B981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ]
            ]
        ]);
    }

    /**
     * Get user activity by platform data
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPlatformActivity()
    {
        // For demo purposes, we'll return mock data
        // In a real application, you would fetch this from your database or analytics service
        return response()->json([
            'labels' => ['Desktop', 'Mobile', 'Tablet'],
            'datasets' => [
                [
                    'data' => [62, 28, 10],
                    'backgroundColor' => [
                        'rgba(79, 70, 229, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                    ],
                    'borderColor' => '#fff',
                    'borderWidth' => 2,
                ],
            ]
        ]);
    }

    /**
     * Get recent transactions
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRecentTransactions()
    {
        // For demo purposes, we'll return mock data
        // In a real application, you would fetch this from your database
        return response()->json([
            [
                'id' => 'TRX-001',
                'user' => 'John Smith',
                'userEmail' => 'john.smith@example.com',
                'amount' => 125.95,
                'status' => 'completed',
                'date' => Carbon::now()->subHours(2)->toIso8601String()
            ],
            [
                'id' => 'TRX-002',
                'user' => 'Sarah Johnson',
                'userEmail' => 'sarah.j@example.com',
                'amount' => 79.99,
                'status' => 'completed',
                'date' => Carbon::now()->subDay()->addHours(8)->toIso8601String()
            ],
            [
                'id' => 'TRX-003',
                'user' => 'Michael Brown',
                'userEmail' => 'mbrown@example.com',
                'amount' => 245.50,
                'status' => 'pending',
                'date' => Carbon::now()->subDay()->addHours(3)->toIso8601String()
            ],
            [
                'id' => 'TRX-004',
                'user' => 'Emma Wilson',
                'userEmail' => 'emma.w@example.com',
                'amount' => 189.99,
                'status' => 'completed',
                'date' => Carbon::now()->subDays(2)->addHours(10)->toIso8601String()
            ],
            [
                'id' => 'TRX-005',
                'user' => 'David Lee',
                'userEmail' => 'david.lee@example.com',
                'amount' => 59.95,
                'status' => 'failed',
                'date' => Carbon::now()->subDays(2)->addHours(3)->toIso8601String()
            ]
        ]);
    }

    /**
     * Get system notifications
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNotifications()
    {
        // For demo purposes, we'll return mock data
        // In a real application, you would fetch this from your database
        return response()->json([
            [
                'id' => 1,
                'title' => 'System Update',
                'message' => 'System will be updated to version 2.4.0 tonight at 2:00 AM UTC',
                'type' => 'info',
                'date' => Carbon::now()->toIso8601String(),
                'read' => false
            ],
            [
                'id' => 2,
                'title' => 'New Feature Released',
                'message' => 'Advanced reporting features are now available in the analytics section',
                'type' => 'success',
                'date' => Carbon::now()->subDay()->toIso8601String(),
                'read' => true
            ],
            [
                'id' => 3,
                'title' => 'Server Maintenance',
                'message' => 'Scheduled maintenance on '.Carbon::now()->addDays(3)->format('F j').' from 1:00 AM to 3:00 AM UTC',
                'type' => 'warning',
                'date' => Carbon::now()->subDays(2)->toIso8601String(),
                'read' => true
            ],
            [
                'id' => 4,
                'title' => 'Security Alert',
                'message' => 'Multiple failed login attempts detected for admin account',
                'type' => 'error',
                'date' => Carbon::now()->subDays(3)->toIso8601String(),
                'read' => true
            ]
        ]);
    }
} 