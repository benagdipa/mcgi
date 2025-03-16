<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Never redirect the home page to login
        if ($request->is('/') || $request->is('')) {
            return null;
        }
        
        // Public routes that don't require authentication
        $publicRoutes = [
            'about-us', // About page
            'gallery', // Gallery page
            'contact-us', // Contact page
            'privacy-policy', // Privacy policy page
            'terms-conditions', // Terms and conditions page
            'blogs', // Blog listing page
            'events', // Events listing page
            'new-visitor', // Visitor guide page
        ];

        // Don't redirect to login if the user is accessing a public page       
        $path = $request->path();
        if (in_array($path, $publicRoutes) || 
            preg_match('/^blogs\/[^\/]+$/', $path) ||
            preg_match('/^events\/[^\/]+$/', $path) || // Individual event pages
            preg_match('/^events\/share\/[^\/]+$/', $path)) { // Event share pages
            return null;
        }

        return $request->expectsJson() ? null : route('login');
    }
} 