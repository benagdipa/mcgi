<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Never redirect the home page
        if ($request->is('/') || $request->is('')) {
            return $next($request);
        }
        
        // List of routes that don't require email verification
        $publicRoutes = [
            'about-us', // About page
            'gallery', // Gallery page
            'contact-us', // Contact page
            'privacy-policy', // Privacy policy page
            'terms-conditions', // Terms and conditions page
            'new-visitor', // Visitor guide page
            'blogs', // Blog listing page
            'events', // Events listing page
        ];
        
        // If the route is public, skip verification check
        $path = $request->path();
        if (in_array($path, $publicRoutes) || 
            preg_match('/^blogs\/[^\/]+$/', $path) || 
            preg_match('/^events\/[^\/]+$/', $path) || 
            preg_match('/^events\/share\/[^\/]+$/', $path)) {
            return $next($request);
        }
        
        // Only check if the user is authenticated and on a protected route
        if (Auth::check() && !Auth::user()->email_verified_at) {
            return redirect()->route('verification.notice');
        }

        return $next($request);
    }
} 