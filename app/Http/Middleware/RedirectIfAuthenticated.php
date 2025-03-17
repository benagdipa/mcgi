<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $user = Auth::guard($guard)->user();
                
                // If the user is on the root URL or a public page, let them stay regardless of role
                if ($request->is('/') || $request->is('')) {
                    return $next($request);
                }
                
                // List of public routes that should not redirect authenticated users
                $publicRoutes = [
                    'about-us',
                    'gallery',
                    'contact-us',
                    'privacy-policy',
                    'terms-conditions',
                    'blogs',
                    'events',
                    'new-visitor',
                ];
                
                $path = $request->path();
                if (in_array($path, $publicRoutes) || 
                    preg_match('/^blogs\/[^\/]+$/', $path) || 
                    preg_match('/^events\/[^\/]+$/', $path) ||
                    preg_match('/^events\/share\/[^\/]+$/', $path)) {
                    return $next($request);
                }
                
                // Redirect based on user role
                $role = $user->roles->pluck('name')->first();
                
                if ($role === 'super-admin') {
                    return redirect()->route('admin.dashboard');
                } elseif (in_array($role, ['member', 'admin'])) {
                    return redirect()->route('dashboard');
                } else {
                    return redirect()->route('home');
                }
            }
        }

        return $next($request);
    }
} 